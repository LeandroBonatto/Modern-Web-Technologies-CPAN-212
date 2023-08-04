const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const book = require("../models/book");

let Book = require("../models/book");
let User = require("../models/user");

let genres = [
  "adventure",
  "science fiction",
  "tragedy",
  "romance",
  "horror",
  "comedy",
];

router
  .route("/add")
  .get(ensureAuthenticated, (req, res) => {
    res.render("add_book", {
      genres: genres,
    });
  })
  .post(ensureAuthenticated, async (req, res) => {
    await check("title", "Title is required").notEmpty().run(req);
    await check("author", "Author is required").notEmpty().run(req);
    await check("pages", "Pages is required").notEmpty().run(req);
    await check("rating", "Rating is required").notEmpty().run(req);
    await check("genres", "Genre is required").notEmpty().run(req);

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      let book = new Book();
      book.title = req.body.title;
      book.author = req.body.author;
      book.pages = req.body.pages;
      book.genres = req.body.genres;
      book.rating = req.body.rating;
      book.posted_by = req.user.id;

      let result =  await book.save()
      if (!result) {
        res.send("Could not save book")
      } else {
        res.redirect("/");
      }
    } else {
      res.render("add_book", {
        errors: errors.array(),
        genres: genres,
      });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    let book = await Book.findById(req.params.id)
    console.log(book)
    if(!book){
      res.send("Could not find book")
    }
    let user = User.findById(book.posted_by)
    if (!user) {
      res.send("Could not find user")
    } else {
        res.render("book", {
          book: book,
          posted_by: user.name,
        });
      };
    })
  .delete(async (req, res) => {
    if (!req.user._id) {
      res.status(500).send();
    }

    let query = { _id: req.params.id };

    let book = await Book.findById(req.params.id)
    if(!book){
      res.send("Could not find book")
    }
    if (book.posted_by != req.user._id) {
      res.status(500).send();
    } else {
      let result = Book.deleteOne(query, function (err) {
      if (!result) {
        res.status(500).send();
      }
      res.send("Successfully Deleted");
      });
    }
    });

router
  .route("/edit/:id")
  .get(ensureAuthenticated, async (req, res) => {
    let book = await Book.findById(req.params.id)
      if(!book){
        res.send("Could not find book")
      }
      if (book.posted_by != req.user._id) {
        res.redirect("/");
      }
      res.render("edit_book", {
        book: book,
        genres: genres,
      });
    })
  .post(ensureAuthenticated, async (req, res) => {
    let book = {};

    book.title = req.body.title;
    book.author = req.body.author;
    book.pages = req.body.pages;
    book.genres = req.body.genres;
    book.rating = req.body.rating;

    let query = { _id: req.params.id };

    let book_db = await Book.findById(req.params.id)
    if(!book_db){
      res.send("Could not find book")
    }
    console.log(book_db)
    if (book_db.posted_by != req.user._id) {
      res.send("Only user who posted book can edit")
    } else {
      let result = await Book.updateOne(query, book)
        if (!result) {
          res.send("Could not update book")
        } else {
          res.redirect("/");
        }
    }
  })

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/users/login");
  }
}

module.exports = router;

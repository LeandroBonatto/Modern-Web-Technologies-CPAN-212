const express = require("express");
const router = express.Router() 
const axios = require('axios');
const { check, validationResult } = require("express-validator");

let Book = require("../models/book");
let User = require("../models/user")

let genres = [
  "adventure",
  "science fiction",
  "tragedy",
  "romance",
  "horror",
  "comedy",
];

function ensureAuthenticated(req, res, next){
    res.render("add_book", {
      genres: genres,
    });
  }

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
    await check("isbn", "isbn is required").notEmpty().run(req);


    const errors = validationResult(req);
      res.render("add_book", {
        genres: genres,
      });
  })

    if (errors.isEmpty()) {
      let book = new Book();
      book.title = req.body.title;
      book.author = req.body.author;
      book.pages = req.body.pages;
      book.genres = req.body.genres;
      book.rating = req.body.rating;
      book.posted_by = req.user.id;
      book.isbn = req.user.id;

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

router
  .route("/:id")
  .get(async (req, res) => {
    let book = await Book.findById(req.params.id)
    console.log(book)
    if(!book){
      res.send("Could not find book")
    }
    let User = await User.findById(req.params.id)
    console.log(user)
    if(!user){
      res.send("Could not find User")
    }
    console.log(user)
    res.render("book", {
      "book": book,
      "posted_by": user.name
    })
  })

router
    .route("/:id")
    .get(async (req, res) => {
      let book = await Book.findById(req.params.id)
      console.log(book)
      if(!book){
        res.send("Could not find book")
      }
      let isbn = book.isbn;
      let response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${isbn}+isbn&maxResults=1`);
      let data = response.data;
      let bookInfo = {}
      book.description = req.body.description;
      book.publisher = req.body.publisher;
      book.pages = req.body.pages;
      book.publishDate = req.body.publishDate;
      book.thumbnail  = req.body.thumbnail;
    res.render('view-book', { book, bookInfo 
    });

  })
  .delete(async (req, res) => {
    let query = { _id: req.params.id };

    let book = await Book.findById(req.params.id)
    if(!book){
      res.send("Could not find book")
    }
    let result = Book.deleteOne(query, function (err) {
      if (!result) {
        res.status(500).send();
      } else {
        res.send("Successfully Deleted");
      }
    }) 
  });

router
  .route("/edit/:id")
  .get(ensureAuthenticated, async (req, res) => {
    let book = await Book.findById(req.params.id)
    if(!book){
      res.send("Could not find book")
    } else {
      res.render("edit_book", {
        book: book,
        genres: genres,
      });
    }
  })
  .post(async (req, res) => {
    let book = {};

    book.title = req.body.title;
    book.author = req.body.author;
    book.pages = req.body.pages;
    book.genres = req.body.genres;
    book.rating = req.body.rating;
    book.isbn = req.body.isbn
  })

    let query = { _id: req.params.id };
    console.log(query);

    let book_db = await Book.findById(req.params.id)
    if(!book_db){
      res.send("Could not find book") 
    }
      if (book_db.posted_by != req.user.id) {
        res.redirect("/")
      } else {
        let result = Book.deleteOne(query, function (err) {
        if (!result) {
          res.status(500).send();
        }
        res.send("Successfully Deleted");
        });
    }

router
  .get('/search', (req, res) => {
  res.render('search');
  });

router
  .post('/search', async (req, res) => {
      let isbn = req.body.isbn;
      const book = await Book.findOne(isbn);
      if(!book){
        res.send("Could not find book")
      } else {
        res.render("/books/${book._id}", {      
      });
    }
  })

  res.render = {'book', {
    book.title = req.body.title;
    book.author = req.body.author;
    book.pages = req.body.pages;
    book.description = req.body.description;
    book.publisher = req.body.publisher;
    book.publishDate = req.body.publishDate,
    book.thumbnail = req.body.thumbnail,
    };
  
module.exports = router;
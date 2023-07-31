const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

const { check, validationResult } = require("express-validator");

let User = require("../models/user");

router
  .route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post(async (req, res) => {
    await check("name", "Name is required").notEmpty().run(req);
    await check("email", "Email is required").notEmpty().run(req);
    await check("email", "Email is invalid").isEmail().run(req);
    await check("password", "Password is required").notEmpty().run(req);
    await check("confirm_password", "Confirm password is required")
      .notEmpty()
      .run(req);
    await check(
      "confirm_password",
      "Password and confirm password do not match"
    )
      .equals(req.body.password)
      .run(req);

        const errors = validationResult(req)

        let book = new Book()

        if(errors.isEmpty()){
            let book = new Book()
    
            book.title = req.body.title
            book.author = req.body.author
            book.pages = req.body.pages
            book.rating = req.body.rating
            book.genres = req.body.genres

            try{
                await book.save()
                res.redirect("/")
            } catch {
                console.log("Error saving book")
                return
            }
        } else {
            console.log(erros)
            res.render("add_book", {
                "genres": genres,
                "errors": errors.array()
            })
        }
    })

route.get("/book/:id", async function(req, res){
    let book;
    try{
        book = await Book.findById(req.params.id)
    } catch{}

    if(!book){
        res.send("No book Found")
    } else {
        res.render("book", {
            book: book
        })
    }
})

route.delete("/book/:id", async function(req, res) {
    let query = {_id: req.params,id}

    let result;
    try{
        result = await Book.deleteOne(query)
    } catch{}

    if(!result){
        res.send("Book not deleted")
    } else {
        res.send("Sucessfully Deleted")
    }
})

route.route("/book/edit/:id")
    .get(async function (req, res) {
        let book;
        try{
            book = await Book.findById(req.params.id)
        } catch{}

        if(!book){
            res.send("No book Found")
        } else {
            res.render("book", {
                book: book
            })
        }
    })

    route.get((req, res) => {
        res.render("add_book", {
            "genres": genres
        })
    })

module.exports = router;
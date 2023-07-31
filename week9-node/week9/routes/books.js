const express = require("express");
const router = express.Router() 
const { check, validationResult } = require("express-validator");
let Book_routes = require("../models/book")

let genres = ["adventure", "science fiction", "tragedy", "romance", "comedy", "horror"]

route.get("/", async function(req, res){
    let books = await Book.find({})
    if(!books){
        console.log("No books found")
        return
    } else {
        res.render("index", {
            books: books
        })
    }
})

route.route("/book/add") 
    .get((req, res) => {
        res.render("add_book", {
            "genres": genres
        })
    })
    .post(async function (req, res){
        await check("title", "Title is required").notEmpty().run(req)
        await check("author", "Author is required").notEmpty().run(req)
        await check("pages", "Pages is required").notEmpty().run(req)
        await check("rating", "Rating is required").notEmpty().run(req)
        await check("genres", "Genres is required").notEmpty().run(req)

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

    .post(async function (req, res){
        let book = {}
    
        book.title = req.body.title
        book.author = req.body.author
        book.pages = req.body.pages
        book.rating = req.body.rating
        book.genres = req.body.genres

        let query = {_id: req.params.id}

        try{
            await book.save(query, book)
            res.redirect("/")
        } catch {
            console.log("Error updating book")
            return
        }
    })

module.exports = router;
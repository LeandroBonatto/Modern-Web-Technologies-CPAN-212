const express = require('express')
const path = require("path")
const mongoose = require("mongoose")
const Book_routes = require("./routes/books.js")

mongoose.connect("mongodb://localhost/bookstore")
let db = mongoose.connection

db.once("open", function(){
    console.log("Connect to mongoDB")
})

db.on("error", function(err){
    console.log("Error connecting to MongoDB")
    console.log(err)
})

const app = express()

app.set("/", path.join(__dirname, "views"))
app.set("view engine", "pug")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public" ))

app.use("/", Book_routes)

PORT = 8000
app.listen(PORT, () => {console.log("Server Running...")})
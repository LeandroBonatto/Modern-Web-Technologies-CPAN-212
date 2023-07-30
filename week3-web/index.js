//import express
const express = require('express');
const router = require("./routes");

// Initialize express app
const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use("/", router)

const hello_1 = function(req, res, next) {
    console.log("hello 1")
    next()
}

function hello_2(req, res, next) {
    console.log("hello 2")
    next()
    console.log("hello 2 Done")
}
 
app.get("/", function(request, response) {
    response.send("<h1>Hello World!</h1>")
})

app.post("/", function(request, response) {
    response.send(request.body)
    response.send()
})

app.get("/about", (req, res) => { 
    res.send('about')
})

/*
app.get("/ab?cd", function(request, response) {
    response.send("<h1>ab?cd</h1>")
})

app.get("/ab+cd", function(request, response) {
    response.send("<h1>ab+cd</h1>")
})

app.get("/ab*cd", function(request, response) {
    response.send("<h1>ab*cd</h1>")
})

app.get("/ab(cd)?e'", function(request, response) {
    response.send("<h1>ab(cd)?e'</h1>")
})

app.get("/ab(cd)+d", function(request, response) {
    response.send("<h1>ab(cd)+d</h1>")
})

app.get("/a/", function(request, response) {
    response.send("<h1>/a/</h1>")
})

app.get('/users/:userId/:movieId', (req, res) => {
    res.send(req.params)
})
*/

app.get('/users/:userId/:moveId', (req, res) => {
    res.send(req.params)
})

app.get('/flights/:from-:to', (req, res) => {
    res.send(req.params)
})

app.get("/b", (req, res, next) => {
    console.log("First function")
    res.send('First function')
    next()
}, (req, res) => {
    console.log("Second function")
})

app.get("/c", [hello_1, hello_2], (req, res, next) => {
    console.log("Third function")
    res.send('Third function')
    next()
}, (req, res) => {
    console.log("Fourth function")
})

//Set constant for port
app.route("/books")
.get((req, res) => {
    res.send("Get Book")
})
.post((req, res) => {
    res.send(req.body)
})
.put((req, res) => {
    res.send("Put Book")
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`))
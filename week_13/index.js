const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cors = require('cors')
const config = require("./config/database");

var book_routes = require("./routes/books");

var user_routes = require("./routes/users");

mongoose.connect(config.database);
let db = mongoose.connection;

db.once("open", function () {
  console.log("Connected to MongoDB");
});

db.on("error", function (err) {
  console.log("DB Error");
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {},
}));

require("./config/passport")(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors())

let Book = require("./models/book");

app.set("/", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("*", function(req, res, next){
    res.locals.user = req.user || null;
    next();
})

app.use("/users", user_routes);
app.use("/book", book_routes);

app.use("/", async function (req, res) {
  let books = await Book.find({})
    if (!books) {
      res.send("No books found")
    } else {
      res.render("index", {
        books: books,
      });
}});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

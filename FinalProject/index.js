const express = require('express');
const app = express();
const mongoose = require("mongoose");
const Movie = require('.model/movie');
const moviesRouter = require('./routes/movies');
const User = require('./model/user');
const registrationRouter = require('./views/registration');
const loginRouter = require('./views/login');
const logoutRouter = require('./views/logout');


app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index');
});

mongoose.connect(config.database);
let db = mongoose.connection;

db.once("open", function () {
  console.log("Connected to MongoDB");
});

db.on("error", function (err) {
  console.log("DB Error");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/register', registrationRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);



app.use("/search", async function (req, res) {
  let movie = await Movie.find({})
    if (!movie) {
      res.send("No movie found")
    } else {
      res.render("index", {
        movie: movies,
      });
    }
});

app.get("*", function(req, res, next){
  res.locals.user = req.user || null;
  next();
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
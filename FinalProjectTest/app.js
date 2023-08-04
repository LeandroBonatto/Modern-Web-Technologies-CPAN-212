const express = require('express');
const mongoose = require('mongoose');
const app = express();
const moviesRouter = require('./routes/movies');
const Movie = require('.model/movie');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/movies', (req, res) => {
  const movies = ['The Godfather', 'The Shawshank Redemption', 'The Dark Knight'];
  res.render('movies', { movies });
});

app.set('view engine', 'pug');
app.set('views', './views');

mongoose.connect('mongodb://localhost/my_movie_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Error connecting to database', err));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'pug');
app.set('views', './views');


app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
  
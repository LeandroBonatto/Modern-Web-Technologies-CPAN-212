const express = require('express');
const router = express.Router();
const Movie = require('../model/movie');

router
    .get('/', async (req, res) => {
    const movies = await Movie.find();
    res.render('movies', { movies });
  });

app
    .get('/movies', (req, res) => {
    const movies = ['The Godfather', 'The Shawshank Redemption', 'The Dark Knight'];
    res.render('movies', { movies });
  });

router
    .get('/add', (req, res) => {
    res.render('add_movie', { movie: new Movie() });
  });

router
    .post('/', async (req, res) => {
    const movie = new Movie({
        name: req.body.name,
        description: req.body.description,
        year: req.body.year,
        genres: req.body.genres.split(','),
        rating: req.body.rating,
    });

    try {
        await movie.save();
        res.redirect('/movies');
    } catch (err) {
        res.render('add_movie', { movie, errors: err.errors });
    }
});

router
    .get('/:id', async (req, res) => {
        try {
        const movie = await Movie.findById(req.params.id);
        res.render('movie_details', { movie });
        } catch (err) {
        res.redirect('/movies');
        }
    });

router
    .get('/:id/edit', async (req, res) => {
        let movie  = await Movie.findById(req.params.id)
        if(!movie ){
        res.send("Could not find movie")
        } else {
        res.render("edit_movie", {
            moive: movie,
            genres: genres,
        });
        }
    })

router
    .post('/:id/edit', async (req, res) => {
        const { name, description, year, genres, rating } = req.body;
      
        const errors = [];
        if (!name) {
          errors.push({ message: 'Please enter a movie name.' });
        }
        if (!description) {
          errors.push({ message: 'Please enter a movie description.' });
        }
        if (!year) {
          errors.push({ message: 'Please enter a movie year.' });
        }
        if (!genres) {
          errors.push({ message: 'Please enter at least one movie genre.' });
        }
        if (!rating) {
          errors.push({ message: 'Please enter a movie rating.' });
        }
      
        if (errors.length > 0) {
          const movie = {
            _id: req.params.id,
            name,
            description,
            year,
            genres,
            rating
          };
          res.render('movie_edit', { movie, errors });
        } else {
          try {
            const movie = await Movie.findByIdAndUpdate(req.params.id, {
              name,
              description,
              year,
              genres,
              rating
            });
            res.redirect(`/movies/${movie._id}`);
          } catch (err) {
            res.redirect('/movies');
          }
        }
      });

router
    .put('/:id', async (req, res) => {
        let movie;
        
        try {
            movie = await Movie.findById(req.params.id);
            movie.name = req.body.name;
            movie.description = req.body.description;
            movie.year = req.body.year;
            movie.genres = req.body.genres.split(',');
            movie.rating = req.body.rating;
            await movie.save();
            res.redirect(`/movies/${movie.id}`);
        } catch (err) {
            if (movie) {
            res.render('edit_movie', { movie, errors: err.errors });
            } else {
            res.redirect('/movies');
            }
        }
    });

    router
    .get('/search', (req, res) => {
    res.render('search_form', {
        errors: errors.array(),
    });
})

router
    .post('/search', async (req, res) => {
        await check("name", "Name is required").notEmpty().run(req);

        const errors = validationResult(req);
            res.render("search_form", {
                genres: genres,
                });
            })

            if (errors.isEmpty()) {
                let movie = new Movie();
                movie.name = req.body.name;
        
            let result =  await movie.search()
            if (!result) {
              res.send("Could not search movie")
            } else {
              res.redirect("/");
            }
          } else {
            res.render("search_form", {
              errors: errors.array(),
            });
        }

router
    .get('/:id/recipe', async (req, res) => {
        try {
            const movie = await Movie.findById(req.params.id);
            res.render('movie_recipe', { movie });
        } catch (err) {
            res.redirect('/movies');
        }
    });

function isAuthenticated(req, res, next) {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.redirect('/login');
        }
    }

router
    .get('/add', isAuthenticated, (req, res) => {
        res.render('add-movie', {
            title: 'Add Movie',
            message: req.flash('message')
            });
        });

router
    .post('/add', isAuthenticated, async (req, res) => {
        const { name, description, year, genres, rating } = req.body;
        const userId = req.session.user._id;
        const movie = new Movie({
            name,
            description,
            year,
            genres,
            rating,
            userId
        });
        
        try {
            await movie.save();
            req.flash('message', 'Movie added successfully.');
            res.redirect('/');
        } catch (error) {
            console.log(error);
            req.flash('message', 'Error adding movie.');
            res.redirect('/movies/add');
        }
    });

    function isMovieOwner(req, res, next) {
        const movieId = req.params.id;
        const userId = req.session.user._id;
      
        Movie.findById(movieId, (err, movie) => {
          if (err) {
            console.log(err);
            res.redirect('/');
          } else if (movie.userId.equals(userId)) {
            next();
          } else {
            res.redirect('/');
          }
        });
    }
    
router
    .get('/:id/edit', isAuthenticated, isMovieOwner, (req, res) => {
    // render the edit movie form
    });
      
router
    .post('/:id/edit', isAuthenticated, isMovieOwner, async (req, res) => {
    // update the movie and redirect to the movie details page
    });
      
router
    .post('/:id/delete', isAuthenticated, isMovieOwner, async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) {
        throw new Error('Movie not found');
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.redirect(`/movies/${req.params.id}`);
        }
    });
      
    function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
    }
    
    async function isMovieOwner(req, res, next) {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
        throw new Error('Movie not found');
        }
        if (movie.user.toString() !== req.user._id.toString()) {
        throw new Error('You are not the owner of this movie');
        }
        next();
    } catch (error) {
        console.error(error);
        res.redirect(`/movies/${req.params.id}`);
        }
    }
      
module.exports = router;
      
      





module.exports = router;
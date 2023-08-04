const express = require('express');
const router = express.Router();

router
    .get('/', (req, res) => {
        let movie = Movie.findById(req.params.id)
        console.log(movie)
        if(!movie){
        res.send("Could not find movie")
    } else {
        res.render('movie-details', {movie});
        };
    });

router
    .delete(async (req, res) => {
        let query = { _id: req.params.id };

        let movie = await Movie.findById(req.params.id)
        if(!movie){
        res.send("Could not find movie")
        }
        let result = Movie.deleteOne(query, function (err) {
        if (!movie) {
            res.status(500).send();
        } else {
            res.send("Successfully Deleted");
        }
        }) 
    });

router
    .get('/add', (req, res) => {
    res.render('add_movie', {
        errors: errors.array(),
    });
})

router
    .post('/add', (req, res) => {
        (ensureAuthenticated, async (req, res) => {
            await check("name", "Name is required").notEmpty().run(req);
            await check("description", "Description is required").notEmpty().run(req);
            await check("year", "Year is required").notEmpty().run(req);
            await check("genres", "Genres is required").notEmpty().run(req);
            await check("rating", "Rating is required").notEmpty().run(req);
        
            const errors = validationResult(req);
              res.render("add_movie", {
                genres: genres,
              });
          })
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
    .get('/:id/recipe', async (req, res) => {
        let movie  = await Movie.findById(req.params.id)
        if(!movie ){
        res.send("Could not find movie")
        } else {
        res.render("movie_recipe", {
            moive: movie,
            genres: genres,
        });
        }
    })




module.exports = router;

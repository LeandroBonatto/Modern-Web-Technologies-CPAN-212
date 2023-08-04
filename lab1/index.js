const { random, difference } = require("lodash");
const _ = require("lodash")
const Movie = require("./movie")

let movies = [
    new Movie("Rocky Balboa", 
    9.4, 
    ["Rocky works at a restaurant and mourns the loss of his beloved wife, Adrian. Longing for his glory days, he intends to get back in the ring and accepts the challenge to fight the current heavyweight champion of the world, Mason Dixon.", 
    ["Drama"]]),
    new Movie("Titanic", 
    8.6, 
    ["Worldwide success, directed by James Cameron, in 1997. Based on real facts, it portrays the maritime disaster, which occurred at the beginning of the 20th century, which left deep marks on the history of this century.", 
    ["Drama", "Romance"]]),
    new Movie("King Richard: Creating Champions", 
    9.1, 
    ["It is a biographical drama about Richard Williams, father and coach of tennis stars Serena and Venus Williams.", 
    ["Action", "Drama"]])
]

movies.forEach(function(movie) {
    console.log(`Name: ${movie.name}`);
    console.log(`Rating: ${movie.rating}`);
  })

  random.movie_1 = _.sample(movies)
  random.movie_2 = _.sample(movies)
  random.movie_3 = _.sample(movies)
  

  different_movies = _.difference(random_movie_1.genres, random_movie_2.genres)
  different_movies.concat(_.difference(random_movie_2.genres, random_movie_1.genres))
  console.log(different_movies)
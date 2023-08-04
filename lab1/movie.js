class Movie {
    constructor(name, rating, description, genres) {
        this.name = name;
        this.rating = rating;
        this.description = description;
        this.genres = genres;
    }

    details() {
        console.log(`Movie name: ${this.name}, 
                    rating: ${this.rating}, 
                    description: ${this.description}, 
                    genre: ${this.genres} `)
    }
}

module.exports = Movie
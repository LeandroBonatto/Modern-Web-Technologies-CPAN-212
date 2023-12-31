const mongoose = require("mongoose")

let recipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    steps: {
        type: [Number],
        required: true
    },
})

let recipe = module.exports = mongoose.model("Recipe", bookSchema)
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [1900, 'Year must be at least 1900'],
    max: [new Date().getFullYear(), `Year can't be in the future`],
  },
  genres: {
    type: [String],
    required: [true, 'At least one genre is required'],
    validate: {
      validator: function (v) {
        return v.length <= 3;
      },
      message: props => `${props.path} can't have more than 3 genres`
    }
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [0, 'Rating must be at least 0'],
    max: [10, 'Rating must be at most 10'],
  },
});

let Movie = mongoose.model('Movie', movieSchema);

module.exports = mongoose.model('Movie', movieSchema);

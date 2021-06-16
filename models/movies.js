const mongoose = require ('mongoose');
const Joi = require('joi');
const {genreSchema} =require('./genres');

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        mingLength: 3
    },
    genre:{
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        default: 0
    },
    dailyRentalRate: {
        type: Number,
        default: 2
    }
  });

const Movie = mongoose.model('movie', movieSchema);

// add validate function
function validateMovie(movie) {
    //Define schema 
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        genreId: Joi.string().required()
    });
    
    return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;
module.exports.movieSchema = movieSchema;
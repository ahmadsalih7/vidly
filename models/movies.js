const mongoose = require ('mongoose');
const Joi = require('joi');
const {genreSchema} =require('./genres');

const Moive = mongoose.model('movie', mongoose.Schema({
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
    DailyRentalRate: {
        type: Number,
        default: 0
    }
  }) 
);

// add validate function
function validateMovie(movie) {
    //Define schema 
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        genreId: Joi.string()
    });
    
    return schema.validate(movie);
}

exports.Moive = Moive;
exports.validate = validateMovie;
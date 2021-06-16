const mongoose = require('mongoose');
const Joi = require('joi');
const {customerSchema } = require('./customers');
const {movieSchema} = require('../models/movies');

const rentalSchema = mongoose.Schema({
    customer: {
        type: customerSchema,
        required: true
    },
    movie: {
        type: movieSchema,
        required: true
    },
    dateOfRent: {
        type: Date,
        default: new Date()
    },
    returnDate: {
        type: Date,
    },
    rentalFee:{
        type: Number,
        min: 0
    }
});

const Rental = mongoose.model('Rental', rentalSchema);

// add validate function
function validateRental(rental) {
    //Define schema 
    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required(),
    });
    
    return schema.validate(rental);
}

exports.Rental = Rental;
exports.validate = validateRental;
module.exports.rentalSchema = rentalSchema;
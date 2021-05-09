const express = require('express');
const { Customer } = require('../models/customers');
const { Movie } = require('../models/movies');
const {Rental, validate} = require('../models/rentals');
const mongoose = require('mongoose');
const Fawn = require('fawn');

Fawn.init(mongoose);

const router = express.Router();
router.use(express.json());
// Get rentals response
router.get('/', async (req, res)=>{
    //Getting docs from database
    const rentals = await Rental.find();
    res.send(rentals);
});

router.post('/', async (req, res)=>{
    //validate the JSON input is a valid movie object
    const {error} = validate (req.body);
    // If it's  not valid send the error and return
    if (error) return res.status(400).send(error.details[0].message);
    //Fetch the customer data
    let customer;
    try{
        customer = await Customer.findById(req.body.customerId);  
    }
    catch{
        res.status(400).send('Invalid customer Id');
        return;
    }
    //Fetch the movie data
    let movie;
    try{
        movie = await Movie.findById(req.body.movieId);  
    }
    catch{
        res.status(400).send('Invalid movie Id');
        return;
    }
    // found on stock
    if (movie.numberInStock == 0){
        res.status(400).send('Not found on stock');
        return;
    }
    // else create a Rental instance
    const rental = new Rental({
        customer: customer,
        movie: movie  
    });
    try {
        new Fawn.Task()
        .save('rentals', rental)
        .update('movies', {_id: movie._id}, {
            $inc: {numberInStock: -1}
        })
        .run();
        res.send(rental);
    }
    catch{
        res.status(500).send("Internal error...");
    }
});

module.exports = router;
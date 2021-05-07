const {Moive, validate} = require('../models/movies');
const express = require('express');
const mongoose = require('mongoose');
const {Genre} = require('../models/genres');

const router = express.Router();

router.use(express.json());

//add movie
router.post('/', async (req, res)=>{
    //validate the JSON input is a valid movie object
    const {error} = validate (req.body);
    // If it's  not valid send the error and return
    if (error) return res.status(400).send(error.details[0].message);
    let genre;
    try{
        genre = await Genre.findById(req.body.genreId);  
    }
    catch{
        res.status(400).send('Invalid genre Id');
        return;
    }
    // else create a movie instance
    const movie = new Moive({
        title: req.body.title,
        genre: {
            _id: req.body.genreId,
            name: genre.name
        }
    });
    //Save to db
    const result = await movie.save();
    //Create a response with the genre
    res.send(result);
});


//
module.exports = router;

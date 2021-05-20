const {Movie, validate} = require('../models/movies');
const {Genre} = require('../models/genres');
const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(express.json());

// Get movies response
router.get('/', async (req, res)=>{
    //Getting docs from database
    const movies = await Movie.find();
    res.send(movies);
});

// Get movie by ID
router.get('/:id', async (req, res) =>{
    try{
    // Check if the ID is existed
    const movie = await Movie.findById(req.params.id);
    res.send(movie);
    }
    catch{
    // if there is no movie found
    return res.status(404).send("No movie was found with this ID.");
    }
});
//add movie
router.post('/', auth, async (req, res)=>{
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
    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: req.body.genreId,
            name: genre.name
        },
        numberInStock:req.body.numberInStock,
        DailyRentalRate: req.body.DailyRentalRate
    });
    //Save to db
    const result = await movie.save();
    //Create a response with the movie
    res.send(result);
});

// Update movie using PUT request

router.put('/:id', auth,  async (req, res) => {
    try{
        // Check if the ID is existed
        const movie = await Movie.findById(req.params.id);
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
        // else update movie object
        movie.set({
            title: req.body.title,
            genre: {
                _id: req.body.genreId,
                name: genre.name
            },
            numberInStock:req.body.numberInStock,
            DailyRentalRate: req.body.DailyRentalRate
        });
        const result = await movie.save();
        // response with the appended movie
        res.send(result);

    }
    catch {
        // if there is no movie found
        return res.status(404).send("No movie was found with this ID.");
    }
});

// delete movies using delete request
router.delete('/:id', async (req, res)=> {
try{
    // Check if the ID is existed
    const movie = await Movie.findById(req.params.id);
    // else delete movie object
    await movie.remove();
    //Response with the deleted movie
    res.send(movie);
}

catch{
    // if there is no movie found
    return res.status(404).send("No movie was found with this ID.");

}
});


//
module.exports = router;

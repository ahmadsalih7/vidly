//import router object
const express = require('express');
const mongoose = require ('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre, validate} = require('../models/genres');
router = express.Router();

router.use(express.json());


// Get genres response
router.get('/', async (req, res)=>{
    //Getting docs from data base
    const genres = await Genre.find();
    res.send(genres);
});

// Get genre by ID
router.get('/:id', async (req, res) =>{
    try{
    // Check if the ID is existed
    const genre = await Genre.findById(req.params.id);
    res.send(genre);
    }
    catch{
    // if there is no genre found 
    return res.status(404).send("No genre was found with this ID.");
    }
});

// Add genre using POST 
router.post('/', auth, async (req, res)=>{
    //validate the JSON input is a valid genre object
    const {error} = validate (req.body);
    // If it's  not valid send the error and return
    if (error) return res.status(400).send(error.details[0].message);
    // else create a Genre instance
    const genre = new Genre({
        name: req.body.name
    });
    //Save to db
    const result = await genre.save();
    //Create a response with the genre
    res.send(result);
});

// Update genre using PUT request

router.put('/:id', auth, async (req, res) => {
    try{
        // Check if the ID is existed
        const genre = await Genre.findById(req.params.id);
        //validate the JSON input is a valid genre object
        const {error} = validate (req.body);
        // If it's  not valid send the error and return
        if (error) return res.status(400).send(error.details[0].message);
        // else update genre object
        genre.set({
            name: req.body.name
        });
        const result = await genre.save();
        // response with the appended genre
        res.send(result);

    }
    catch {
        // if there is no genre found
        return res.status(404).send("No genre was found with this ID.");
    }
});

// delete genres using delete request
router.delete('/:id', auth, admin, async (req, res)=> {
try{
    // Check if the ID is existed
    const genre = await Genre.findById(req.params.id);
    // else delete genre object
    await genre.remove();
    //Response with the deleted genre
    res.send(genre);
}

catch{
    // if there is no genre found
    return res.status(404).send("No genre was found with this ID.");

}
});

//export the Router obejct
module.exports = router;
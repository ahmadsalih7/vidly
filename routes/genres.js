//import router object
const express = require('express');
const mongoose = require ('mongoose');
const Joi = require('joi');
router = express.Router();

router.use(express.json())
//Connect to a local mongodb data base
mongoose.connect('mongodb://localhost/genres',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log('Connected to mongodb....'))
  .catch((err) => console.log(err.message));

  //Create mongoose schema
  const genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        mingLength: 3
    }
  }) ;

  //create a mongoose model
const Genre = mongoose.model('genre', genreSchema);

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
router.post('/', async (req, res)=>{
    //validate the JSON input is a valid genre object
    const {error} = validateGenre (req.body);
    // If it's  not valid send the error and return
    if (error) return res.status(400).send(error.details[0].message);
    // else create a Genre instance
    const genre = new Genre({
        name: req.body.name
    });
    console.log(genre);
    //Save to db
    const result = await genre.save();
    //Create a response with the genre
    res.send(result);
});

// Update genre using PUT request

router.put('/:id', async (req, res) => {
    try{
        // Check if the ID is existed
        const genre = await Genre.findById(req.params.id);
        //validate the JSON input is a valid genre object
        const {error} = validateGenre (req.body);
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
router.delete('/:id', (req, res)=> {
// Check if the ID is existed
const genre = genres.find(x=> x.id === parseInt(req.params.id));
// if there is no genre found
if (!genre) return res.status(404).send("No genre was found with this ID.");
// else delete genre object
const index = genres.indexOf(genre);
genres.splice(index, 1);

//Response with the deleted genre
res.send(genre);

});



// add validate function
function validateGenre(genre) {
    //Define schema 
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    
    return schema.validate(genre);
}

//export the Router obejct

module.exports = router;
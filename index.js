const express = require('express');
const app = express();

const Joi = require('joi');

app.use(express.json());

var genres = [
    {id: 1, name: "Horror"},
    {id: 2, name: "Action"},
    {id: 3, name: "Comdey"},
];

// preparing listening ports
app.listen(3000, ()=>{
    console.log("Listening to port 3000 .... ");
});

// Root page response
app.get('/', (req, res) => {
    res.send("Welcome to Vidly project");
});

// Get genres response
app.get('/api/genres', (req, res)=>{
    res.send(genres);
});

// Get genre by ID
app.get('/api/genres/:id', (req, res) =>{
    // Check if the ID is existed
    const genre = genres.find(x=> x.id === parseInt(req.params.id));
    // if there is no genre found 
    if (!genre) return res.status(404).send("No genre was found with this ID.");
    // else: 
    res.send(genre);
});

// Add genre using POST 
app.post('/api/genres', (req, res)=>{
    //validate the JSON input is a valid genre object
    const {error} = validateGenre (req.body);
    // If it's  not valid send the error and return
    if (error) return res.status(400).send(error.details[0].message);
    // else create genre object
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    // append it to the current genres 
    genres.push(genre);
    // response with the appended genre
    res.send(genre);
});

// Update genre using PUT request

app.put('/api/genres/:id', (req, res) => {
    // Check if the ID is existed
    const genre = genres.find(x=> x.id === parseInt(req.params.id));
    // if there is no genre found
    if (!genre) return res.status(404).send("No genre was found with this ID.");
    //validate the JSON input is a valid genre object
    const {error} = validateGenre (req.body);
    // If it's  not valid send the error and return
    if (error) return res.status(400).send(error.details[0].message);
    // else update genre object
    genre.name = req.body.name;
    // response with the appended genre
    res.send(genre);
});

// delete genres using delete request
app.delete('/api/genres/:id', (req, res)=> {
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
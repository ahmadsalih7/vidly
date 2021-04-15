const express = require('express');
const app = express();

const Joi = require('joi');

var genres = [
    {id: 1, genre: "Horror"},
    {id: 2, genre: "Action"},
    {id: 3, genre: "Comdey"},
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
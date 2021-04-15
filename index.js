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
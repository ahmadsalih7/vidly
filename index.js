const express = require('express');
const app = express();

const Joi = require('joi');

var genres = [
    {id: 1, genre: "Horror"},
    {id: 2, genre: "Action"},
    {id: 3, genre: "Comdey"},
];

app.listen(3000, ()=>{
    console.log("Listening to port 3000 .... ");
});

app.get('/', (req, res) => {
    res.send("Welcome to Vidly project");
});
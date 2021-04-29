const mongoose = require ('mongoose');
const Joi = require('Joi');

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


// add validate function
function validateGenre(genre) {
    //Define schema 
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    
    return schema.validate(genre);
}

exports.Genre = Genre;
exports.validate = validateGenre;
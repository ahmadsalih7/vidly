const mongoose = require ('mongoose');
const Joi = require('joi');

//Create mongoose schema
const genreSchema = mongoose.Schema({
name: {
    type: String,
    required: true,
    minLength: 5
}
}) ;

//create a mongoose model
const Genre = mongoose.model('genre', genreSchema);


// add validate function
function validateGenre(genre) {
    //Define schema 
    const schema = Joi.object({
        name: Joi.string().min(5).required()
    });
    
    return schema.validate(genre);
}
exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;
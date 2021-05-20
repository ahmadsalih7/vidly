const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
        },
    email: {
        type: String,
        unique: true,
        /* validate: {
            validator: function (v) {
                return v.indexOf('@') !== -1
            },
        message: 'Email must have an "@"' 
        }, */
        required: true
    },
    password: {
        type: String,
        minlength: 8,
        required: true
    },
    isAdmin: Boolean

    });

userSchema.methods.generateAuthToken = function(){
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
};
// Create user model
const User = mongoose.model('user', userSchema);

// add validate function
function validateUser(movie) {
    //Define schema 
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required(),
    });
    
    return schema.validate(movie);
}

module.exports.User = User;
module.exports.validate = validateUser;
module.exports.userSchema = userSchema;
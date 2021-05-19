const express = require('express');
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User} = require('../models/users');

const router = express.Router();
router.use(express.json());
router.post('/',async(req, res) => {
    //validate the JSON input is a valid movie object
    const {error} = validate (req.body);
    // If it's  not valid send the error and return
    if (error) return res.status(400).send(error.details[0].message);
    //Fetch the user data
    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Invalid username or password');
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(400).send('Invalid username or password');

    res.send(true);
} );

// add validate function
function validate(user) {
    //Define schema 
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required(),
    });
    
    return schema.validate(user);
}

module.exports = router;
const config = require('config');
const jwt = require('jsonwebtoken');
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/users');


const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

router.post('/',async(req, res) => {
    //validate the JSON input is a valid movie object
    const {error} = validate (req.body);
    // If it's  not valid send the error and return
    if (error) return res.status(400).send(error.details[0].message);
    //Fetch the user data
    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User Already exists');
    user = new User (_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
} );
module.exports = router;
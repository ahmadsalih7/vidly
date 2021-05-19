const express = require('express');
const _ = require('lodash');
const { model } = require('mongoose');
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
    user.save();
    res.send(_.pick(user, ['_id', 'name', 'email']));
} );
module.exports = router;
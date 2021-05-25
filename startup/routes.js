const express = require('express');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const home = require('../routes/home');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const errorHandler = require('../middleware/error')
const logger = require('../middleware/logger');


module.exports = function (app) {
    app.use(express.json());
    app.use('/', home);
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.set('view engine', 'pug');
    app.use(errorHandler)
    app.use(logger);
    app.use(express.static("public"));
   
}
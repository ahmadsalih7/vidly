const mongoose = require ('mongoose');
const winston = require('winston');

module.exports = function () {
    //Connect to a local mongodb data base
    mongoose.connect('mongodb://localhost/vidly',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => winston.info('Connected to mongodb....'))
}

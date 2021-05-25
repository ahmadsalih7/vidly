const mongoose = require ('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function () {
    //Connect to a local mongodb data base
    const db = config.get('db');
    mongoose.connect(db,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => winston.info(`Connected to ${db}....`))
}

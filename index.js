require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const config = require('config');
const mongoose = require ('mongoose');
const express = require('express');
const logger = require('./middleware/logger');
const startupDebugger = require('debug')('app:startup');
const dbdebugger = require('debug')('app:db');
const app = express();
require('./startup/routes')(app);

/* process.on('uncaughtException', (ex) => {
  console.log('We have got uncaught exception');
  winston.error(ex.message, ex);
}) */

winston.exceptions.handle(
  new winston.transports.File({filename: "uncaughtExceptions.log"})
);

process.on('unhandledRejection', (ex) => {
  /* console.log('We have got unhandled Rejection');
  winston.error(ex.message, ex); */
  throw ex; //to throw an exception to be handeled by winston
})


winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.MongoDB({ db:'mongodb://localhost/vidly'}));

app.use(logger);
app.use(express.static("public"));
// console.log(`name: ${config.get('name')}`);
// console.log(`password: ${config.get('mail.password')}`);

//Connect to a local mongodb data base
mongoose.connect('mongodb://localhost/vidly',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log('Connected to mongodb....'))
  .catch((err) => console.log(err.message));

  if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
  }
  
startupDebugger("This is a startup message");
dbdebugger("This is a db message");

// preparing listening ports
app.listen(3000, ()=>{
    console.log("Listening to port 3000.... ");
});


const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');


module.exports = function () {
    /* process.on('uncaughtException', (ex) => {
  console.log('We have got uncaught exception');
  winston.error(ex.message, ex);
}) */

winston.exceptions.handle(
    new winston.transports.File({filename: "uncaughtExceptions.log"}),
    new winston.transports.Console({colorize:true, prettyPrint: true})
  );
  
  process.on('unhandledRejection', (ex) => {
    /* console.log('We have got unhandled Rejection');
    winston.error(ex.message, ex); */
    throw ex; //to throw an exception to be handeled by winston
  })
    
  winston.add(new winston.transports.File({ filename: 'logfile.log' }));
  winston.add(new winston.transports.Console({colorize:true, prettyPrint: true}));
     
}
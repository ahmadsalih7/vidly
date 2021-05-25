const config = require('config');
const express = require('express');
const logger = require('./middleware/logger');
const startupDebugger = require('debug')('app:startup');
const dbdebugger = require('debug')('app:db');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();

app.use(logger);
app.use(express.static("public"));
// console.log(`name: ${config.get('name')}`);
// console.log(`password: ${config.get('mail.password')}`);

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


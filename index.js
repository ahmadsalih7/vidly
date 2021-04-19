const config = require('config');
const express = require('express');
const logger = require('./middleware/logger');
const startupDebugger = require('debug')('app:startup');
const dbdebugger = require('debug')('app:db');
const app = express();
const genres = require('./routes/genres');
const home = require('./routes/home');

app.use('/api/genres', genres);
app.set('view engine', 'pug');
app.use(express.json());
app.use(logger);
app.use(express.static("public"));
app.use('/', home);
console.log(`name: ${config.get('name')}`);
console.log(`password: ${config.get('mail.password')}`);

startupDebugger("This is a startup message");
dbdebugger("This is a db message");

// preparing listening ports
app.listen(3000, ()=>{
    console.log("Listening to port 3000.... ");
});


const config = require('config');
const mongoose = require ('mongoose');
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
// console.log(`name: ${config.get('name')}`);
// console.log(`password: ${config.get('mail.password')}`);

//Connect to a local mongodb data base
mongoose.connect('mongodb://localhost/genres',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log('Connected to mongodb....'))
  .catch((err) => console.log(err.message));

  
startupDebugger("This is a startup message");
dbdebugger("This is a db message");

// preparing listening ports
app.listen(3000, ()=>{
    console.log("Listening to port 3000.... ");
});


const startupDebugger = require('debug')('app:startup');
const dbdebugger = require('debug')('app:db');

module.exports = function () {
    startupDebugger("This is a startup message");
    dbdebugger("This is a db message");    
}
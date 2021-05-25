const config = require('config');

module.exports = function () {
    // console.log(`name: ${config.get('name')}`);
// console.log(`password: ${config.get('mail.password')}`);

if(!config.get('jwtPrivateKey')){
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
  }
    
}
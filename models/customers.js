const mongoose = require ('mongoose');
const Joi = require('joi');
//create a mongoose model
const Customer = mongoose.model('customer', mongoose.Schema({
    name: {
        type: String,
        required: true,
        mingLength: 3
    },
    isGold:{
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        required: true,
        mingLength: 5
    }
  }) 
);


// add validate function
function validateCustomer(customer) {
    //Define schema 
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().required()
    });
    
    return schema.validate(customer);
}
exports.Customer = Customer;
exports.validate = validateCustomer;

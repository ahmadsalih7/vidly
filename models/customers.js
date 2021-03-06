const mongoose = require ('mongoose');
const Joi = require('joi');

const customerSchema = mongoose.Schema({
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
        minLength: 5
    }
  }) ;

//create a mongoose model
const Customer = mongoose.model('customer', customerSchema);


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
module.exports.customerSchema = customerSchema;
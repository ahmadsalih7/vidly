//import router object
const express = require('express');
const mongoose = require ('mongoose');
const auth = require('../middleware/auth');
const {Customer, validate} = require('../models/customers');
router = express.Router();

router.use(express.json());

// Get customers response
router.get('/', async (req, res)=>{
    //Getting docs from data base
    const customers = await Customer.find();
    res.send(customers);
});

// Get customer by ID
router.get('/:id', async (req, res) =>{
    // Check if the ID is existed
    const customer = await Customer.findById(req.params.id)
    .catch(()=> {
        res.status(404).send("No customer was found with this ID.");
        return;
    });
    res.send(customer)

}
);

// Add customer using POST 
router.post('/', auth, async (req, res)=>{
    //validate the JSON input is a valid customer object
    const {error} = validate (req.body);
    // If it's  not valid send the error and return
    if (error) return res.status(400).send(error.details[0].message);
    // else create a Customer instance
    const customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    res.send( await customer.save());
});

// Update customer using PUT request

router.put('/:id', auth, async (req, res) => {
    //validate the JSON input is a valid customer object
    const {error} = validate (req.body);
    // If it's  not valid send the error and return
     if (error) return res.status(400).send(error.details[0].message);
     //Update
     try {

        const customer = await Customer.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        },{new: true});
        res.send(customer);
     }
    catch{
       return res.status(404).send('No customer was found with this id');
    } 
});

// delete customer using delete request
router.delete('/:id', async (req, res)=> {
try{
    // Check if the ID is existed
    const customer = await Customer.findById(req.params.id);
    // else delete customer object
    await customer.remove();
    //Response with the deleted customer
    res.send(customer);
}

catch{
    // if there is no customer found
    return res.status(404).send("No customer was found with this ID.");

}
});

//export the Router obejct
module.exports = router;
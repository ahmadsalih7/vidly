const express = require('express')
const {Rental} = require('../models/rentals');
const auth = require('../middleware/auth')
const moment = require('moment');


const router = express.Router()
router.use(express.json())

router.post('/', auth, async (req, res)=>{
    if(!req.body.customerId) return res.status(400).send('customerId is required.')
    if(!req.body.movieId) return res.status(400).send('movieId is required.')

    const rental = await Rental.findOne({
        'customer._id' : req.body.customerId,
        'movie._id' : req.body.movieId
    })

    if (!rental) return res.status(404).send('No rental found.')
    if (rental.returnDate) return res.status(400).send('Rental already processed')
    rental.returnDate = new Date()
    const rentalDays = moment().diff(rental.dateOfRent, 'days')
    rental.rentalFee = rentalDays * rental.movie.dailyRentalRate
    await rental.save()
    res.status(200).send('it works')
})
module.exports = router
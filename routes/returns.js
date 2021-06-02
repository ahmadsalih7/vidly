const express = require('express')
const auth = require('../middleware/auth')


const router = express.Router()
router.use(express.json())

router.post('/', auth, (req, res)=>{
    if(!req.body.customerId) return res.status(400).send('customerId is required.')
    res.status(200).send('it works')
})
module.exports = router
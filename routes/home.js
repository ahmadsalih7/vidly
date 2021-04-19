const express = require('express');
const router = express.Router();
// Root page response
router.get('/', (req, res) => {
    res.render('index', {title: "Vidly", message: "Welcome to Vidly"});
});

module.exports = router;
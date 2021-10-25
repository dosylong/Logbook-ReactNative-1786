const express = require('express');
const router = express.Router();
const rentalzController = require('../controllers/RentalZController');

// route rentalz/createForm
router.post('/createForm', rentalzController.createForm);

// route rentalz/createForm
router.get('/getAllForm', rentalzController.getAllForm);

module.exports = router;

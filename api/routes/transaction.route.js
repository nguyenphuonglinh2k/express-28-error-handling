const express = require('express');

var transactionController = require('../controllers/transaction.controller.js');

var router = express.Router();

router.get('/transactions', transactionController.index);

module.exports = router;
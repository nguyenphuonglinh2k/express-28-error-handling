const express = require('express');

var transactionController = require('../controllers/transaction.controller.js')

var router = express.Router();

router.get('/', transactionController.index);

router.get('/create', transactionController.create);

router.get('/:id/complete', transactionController.isComplete);

module.exports = router;
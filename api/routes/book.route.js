const express = require('express');

var bookController = require('../controllers/book.controller.js');

var router = express.Router();

router.get('/books', bookController.index);

module.exports = router;
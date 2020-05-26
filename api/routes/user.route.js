const express = require('express');

var userController = require('../controllers/user.controller.js');

var router = express.Router();

router.get('/users', userController.index);

module.exports = router;
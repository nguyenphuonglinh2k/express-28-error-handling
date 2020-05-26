const express = require('express');

var loginController = require('../controllers/login.controller.js');

var router = express.Router();

router.post('/login', loginController.postLogin);

module.exports = router;
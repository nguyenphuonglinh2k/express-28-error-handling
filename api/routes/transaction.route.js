const express = require('express');

var router = express.Router();

router.get('/transactions', authController.login);

module.exports = router;
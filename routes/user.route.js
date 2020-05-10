const express = require('express');
var userController = require('../controllers/user.controller.js');
var userValidate = require('../validate/user.validate.js');

var router = express.Router();

router.get('/', userController.index);

router.get('/add', userController.add);

router.get('/:id/delete', userController.delete);

router.get('/:id/update', userController.update);

router.post('/add', userValidate.postAdd(), userController.postAdd);

router.post('/:id/update', userController.postUpdate);

module.exports = router;
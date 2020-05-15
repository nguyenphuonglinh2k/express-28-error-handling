const express = require('express');
var multer = require('multer');
var bookController = require('../controllers/book.controller.js');

var upload = multer({ dest: './public/' });

var router = express.Router();

router.get('/', bookController.index);

router.get('/add', bookController.add);

router.get('/:id/delete', bookController.delete);

router.get('/:id/update', bookController.update);

router.post('/add', upload.single('coverUrl'), bookController.postAdd);

router.post('/:id/update', bookController.postUpdate);

module.exports = router;
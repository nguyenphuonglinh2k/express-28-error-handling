require('dotenv').config(); 

const shortid = require('shortid');
var db = require('../db');
var cloudinary = require('cloudinary').v2;
var Book = require('../models/book.model.js');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

module.exports.index = function(req, res) {
  // res.render('book', {
  //   books: db.get('books').value()
  // });
  
  Book.find().then(books => console.log(books));
  
  // res.render('book');
};

module.exports.add = function(req, res) {
  res.render('add');
};

module.exports.delete = function(req, res) {
  var id = req.params.id;
  var item = db.get('books').find({ id: id }).value();
  var index = db.get('books').indexOf(item).value();
  
  db.get('books').splice(index, 1).write();
  
  res.redirect('back');
};

module.exports.update = function(req, res) {
  var id = req.params.id;
  res.render('update', {
    id: id
  });
};

module.exports.postAdd = function(req, res) {
  var id = shortid.generate();
  var title = req.body.title;
  var des = req.body.description;
  var image = 'https://22-sessionn.glitch.me/' + req.file.path.slice(7);
  
  cloudinary.uploader.upload(image, 
    function(error, result) {
      console.log(result, error);
      db.get('books').push({ 
        id: id, 
        title: title,
        description: des,
        coverUrl: result.url
      }).write();
  });
  
  res.redirect('/books');
};

module.exports.postUpdate = function(req, res) {
  var id = req.params.id;
  var title = req.body.newTitle;
  db.get('books').find({ id: id }).value().title = title;
  
  res.redirect('/books');
};


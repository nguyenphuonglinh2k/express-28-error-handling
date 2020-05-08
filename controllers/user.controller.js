const shortid = require('shortid');
var db = require('../db');

module.exports.index = function(req, res) {
  res.render('users/index', {
    users: db.get('users').value()
  });
};

module.exports.add = function(req, res) {
  res.render('add');
};

module.exports.delete = function(req, res) {
  var id = req.params.id;
  var item = db.get('users').find({ id: id }).value();
  var index = db.get('users').indexOf(item).value();
  
  db.get('users').splice(index, 1).write();
  
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
  db.get('users').push({ 
    id: id, 
    title: title,
    description: des
  }).write();
  
  res.redirect('/users');
};

module.exports.postUpdate = function(req, res) {
  var id = req.params.id;
  var title = req.body.newTitle;
  db.get('users').find({ id: id }).value().title = title;
  
  res.redirect('/users');
};


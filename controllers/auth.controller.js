var db = require('../db');
var shortid = require('shortid');

module.exports.login = function(req, res) {
  res.render('auth/login');
}

module.exports.postLogin = function(req, res, next) {
  var errs = [];
  var name = req.body.name;
  var password = req.body.passowrd;
  
  var user = db.get('users').find({ name: name }).value();
  
  if (!user) {
    res.render('auth/login', {
      errs: [
        'Email is not exist'
      ],
      values: req.body
    });
    return;
  }
  
  if (password !== '123123') {
    res.render('auth/login', {
      errs: [
        'Wrong password'
      ],
      values: req.body
    });
    return;
  }
  
  res.cookie('user-id', shortid.generate());
  res.redirect('/transactions');
}
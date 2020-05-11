var shortid = require('shortid');
var db = require('../db');

module.exports.login = function(req, res) {
  res.render('auth/login');
}

module.exports.postLogin = function(req, res, next) {
  var errs = [];
  var email = req.body.email;
  var password = req.body.password;

  var user = db.get('users').find({ email: email }).value();

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
  
  res.cookie('userId', shortid.generate());
  res.redirect('/transactions');
}
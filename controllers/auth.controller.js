var shortid = require('shortid');
var db = require('../db');
var bcrypt = require('bcrypt');

module.exports.login = function(req, res) {
  res.render('auth/login');
}

module.exports.postLogin = function(req, res, next) {
  var errs = [];
  var valueCompare;
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
  
  bcrypt.compare(password, user.password, function(err, result) {
    if (user.wrongLoginCount >= 4) {
      return res.render('/auth/login', {
        errs: [
          'Bạn nhập sai quá số lần cho phép'
        ]
      });
    } else if (!result) {
        user.wrongLoginCount = user.wrongLoginCount++;
        return res.render('auth/login', {
          errs: [
            'Wrong password'
          ],
          values: req.body
        });
      } else {
        res.cookie('userId', user.id);
        return res.redirect('/transactions');
      }
    });

}
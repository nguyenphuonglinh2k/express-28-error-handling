var db = require('../db');

module.exports.login = function(req, res) {
  res.render('auth/login');
}

module.exports.postLogin = function(req, res, next) {
  var errs = [];
  var name = req.body.name;
  var password = req.body.passowrd;
  
  var user = db.get('users').find({ name: name }).value();
  

}
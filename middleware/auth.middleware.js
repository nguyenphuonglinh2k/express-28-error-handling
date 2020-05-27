var db = require("../db");
var User = require("../models/user.model.js");

module.exports.authLogin = function(req, res, next) {
    var cookie = req.signedCookies.userId;
  
    // var user = db.get("users").find({ id: cookie }).value();
    User.findById({ _id: cookie}).then(result => res.locals.user = result);
  
    res.locals.userId = cookie;
    
    if (!cookie) {
      res.redirect('/auth/login');
      return;
    }
  
    next();
};
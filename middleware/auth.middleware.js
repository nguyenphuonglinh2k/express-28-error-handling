var db = require("../db");

module.exports.authLogin = function(req, res, next) {
    var cookie = req.signedCookies.userId;
  
    var user = db.get("users").find({ id: cookie }).value();
    
    if (!cookie) {
      res.redirect('/auth/login');
    }
  
    res.locals.user = user;
    next();
};
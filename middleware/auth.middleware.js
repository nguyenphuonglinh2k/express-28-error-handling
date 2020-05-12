module.exports.authLogin = function(req, res, next) {
    var cookie = req.signedCookies.userId;
  
    if (!cookie) {
      res.redirect('/auth/login');
    }
  
    next();
};
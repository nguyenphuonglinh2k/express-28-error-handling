module.exports.authLogin = function(req, res, next) {
    var cookie = req.cookies.userId;
  
    if (!cookie) {
      res.redirect('/auth/login');
    }
  
    res.locals.user = db.get('users')
    next();
};
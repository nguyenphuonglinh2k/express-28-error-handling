module.exports.cookie = function(req, res, next) {
  if (req.cookies) {
    console.log(res.locals.count);
  }
  
  next();
};
module.exports.cookie = function(req, res, next) {
  if (req.cookies) {
    
    console.log(`${req.cookies.cookie}: ${res.get('count')}`);
    res.set('count', res.get('count')
  }
  
  next();
};
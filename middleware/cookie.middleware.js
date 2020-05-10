var count = 1;

module.exports.cookie = function(req, res, next) {
  if (req.cookies) {
    
    console.log(`${req.cookies.cookie}: ${count}`);
    count++;
  }
  
  next();
};
module.exports.countCookie = function(req, res, next) {
  if (req.cookies) {
    console.log(`${req.cookies}: ${1++}`)
  }
};
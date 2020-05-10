module.exports.postAdd = function(req, res, next) {
  var name = req.body.name
  
  if(name.length > 30) {
    res.render('users/add', {
      err: 'Name must be shorter than 30 words'
    });
    return;
  }
  
  next();
};
var db = require('../db');

module.exports.index = function(req, res) {
  var userId = req.signedCookies.userId;
  var page = parseInt(req.query.page) || 1;
  var perPage = 8;
  var drop = (page -1) * perPage;
  
  res.render('transaction/index', {
    transactions: db.get('transactions').drop(drop).take(perPage).value(),
    userId: userId
  });
};

module.exports.create = function(req, res) {
  res.render('transaction/create');
};

module.exports.isComplete = function(req, res) {
  var id = req.params.id;
  var item = db.get('transactions').find({ id: id }).value();
  
  if(!item) {
    res.render('transaction/index', {
      transactions: db.get('transactions').value(),
      err: 'ID is not exist'
    });
    return;
  }
  
  db.get('transactions').find({ id: id }).value().isComplete = true;
  res.redirect('back');
};
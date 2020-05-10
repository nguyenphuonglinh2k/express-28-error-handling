var db = require('../db');

module.exports.index = function(req, res) {
  res.render('transaction/index', {
    transactions: db.get('transactions').value()
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
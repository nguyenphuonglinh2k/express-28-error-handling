var db = require('../db');
var Transaction = require("../models/transaction.model.js");

module.exports.index = function(req, res) {
  var userId = req.signedCookies.userId;
  var page = parseInt(req.query.page) || 1;
  var perPage = 8;
  var drop = (page -1) * perPage;
  
  // res.render('transaction/index', {
  //   transactions: db.get('transactions').drop(drop).take(perPage).value(),
  //   userId: userId
  // });
  Transaction.find({}, null, { skip: drop, limit: perPage }).then(function(transactions) {
    res.render('transaction/index', {
      transactions: transactions,
      userId: userId
    });
  });
};

module.exports.create = function(req, res) {
  res.render('transaction/create');
};

module.exports.isComplete = function(req, res) {
  var id = req.params.id;
  // var item = db.get('transactions').find({ id: id }).value();
  Transaction.find().then(transactions => {
    if(!transactions) {
      res.render('transaction/index', {
        transactions: transactions,
        err: 'ID is not exist'
      });
      return;
    }

    // db.get('transactions').find({ id: id }).value().isComplete = true;
  });
  
  Transaction.findOneAndReplace({ _id: id}, {isComplete: true}).then(result => {});
  res.redirect('back');
};
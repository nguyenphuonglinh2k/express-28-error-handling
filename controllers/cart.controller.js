var db = require("../db");
const shortid = require("shortid");

var Transaction = require("../models/transaction.model.js");

module.exports.addToCart = function(req, res) {
  var bookId = req.params.id;
  var sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect("/books");
    return;
  }

  var count = db
    .get("sessions")
    .find({ id: sessionId })
    .get("cart." + bookId, 0)
    .value();

  db.get("sessions")
    .find({ id: sessionId })
    .set("cart." + bookId, count + 1)
    .write();

  res.redirect("/books");
};

module.exports.addTransaction = function(req, res) {
  var bookId = req.params.id;
  var sessionId = req.signedCookies.sessionId;
  // var transactionId = shortid.generate();

  if (!sessionId) {
    res.redirect("/books");
    return;
  }

  // db.get('transactions').push({
  //   id: transactionId,
  //   sessionId: sessionId,
  //   bookId: bookId,
  //   isComlete: false
  // }).write();

  var transaction = new Transaction({
    sessionId: sessionId,
    bookId: bookId,
    isComlete: false
  });
  
  transaction.save(function (err, transaction) {
      if (err) return console.error(err);
      console.log("transaction saved to bookstore collection.");
    });

  res.redirect("/books");
};

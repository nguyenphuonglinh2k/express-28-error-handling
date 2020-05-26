var Transaction = require("../../models/transaction.model.js");

module.exports.index = async function(req, res) {
  var transactions = await Transaction.find();
  res.json(transactions);
};
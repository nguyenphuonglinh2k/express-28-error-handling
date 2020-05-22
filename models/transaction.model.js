var mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  avatarUrl: String,
  wrongLoginCount: Number
}, { versionKey: false });

var Transaction = mongoose.model('Transaction', transactionSchema, 'transactions');

module.exports = Transaction;
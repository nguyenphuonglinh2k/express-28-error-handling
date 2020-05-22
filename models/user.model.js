var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  avatarUrl: String,
  wrongLoginCount: Number
}, { versionKey: false });

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;
var User = require("../../models/user.model.js");

module.exports.index = async function(req, res) {
  var users = await User.find();
  res.json(users);
};
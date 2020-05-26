var Book = require("../../models/book.model.js");

module.exports.index = async function(req, res) {
  var books = await Book.find();
  res.json(books);
};
const shortid = require("shortid");
var db = require("../db");

module.exports.index = function(req, res) {
  res.render("users/index", {
    users: db.get("users").value()
  });
};

module.exports.add = function(req, res) {
  res.render("users/add");
};

module.exports.delete = function(req, res) {
  var id = req.params.id;
  var item = db
    .get("users")
    .find({ id: id })
    .value();
  var index = db
    .get("users")
    .indexOf(item)
    .value();

  db.get("users")
    .splice(index, 1)
    .write();

  res.redirect("back");
};

module.exports.update = function(req, res) {
  var id = req.params.id;
  res.render("users/update", {
    id: id
  });
};

module.exports.postAdd = function(req, res) {
  req.body.id = shortid.generate();

  db.get("users")
    .push(req.body)
    .write();

  res.redirect("/users");
};

module.exports.postUpdate = function(req, res) {
  var id = req.params.id;
  var name = req.body.newName;
  db
    .get("users")
    .find({ id: id })
    .value().name = name;

  res.redirect("/users");
};

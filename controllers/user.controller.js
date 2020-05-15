const shortid = require("shortid");
var db = require("../db");
var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'coders-tokyo',
  api_key: '316918985498395',
  api_secret: '7Fd6PRv0653kJyMoofFOHkNhyWw'
});

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

module.exports.profile = function(req, res) {
  res.render('users/profile');
};

module.exports.uploadAvatar = function(req, res) {
  res.render('users/avatar', {
    user: res.locals.user
  });
};

module.exports.postUpLoadAvatar = function(req, res) {
 
  cloudinary.uploader.upload(req.file.path.slice(7), 
    function(error, result) {console.log(result, error)});
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

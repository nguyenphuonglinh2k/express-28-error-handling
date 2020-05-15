require('dotenv').config(); 

const shortid = require("shortid");
var db = require("../db");
var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
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
  res.render('users/profile', {
    user: res.locals.user
  });
};

module.exports.uploadAvatar = function(req, res) {
  res.render('users/avatar', {
    user: res.locals.user
  });
};

module.exports.postUpLoadAvatar = function(req, res) {
  var avatar = 'https://21-file-uploadd.glitch.me/' + req.file.path.slice(7);
  
  cloudinary.uploader.upload(avatar, 
    function(error, result) {
      console.log(result, error);
      db.get("users").find({ id: res.locals.user.id}).set('avatarUrl', result.url).write();
  });
  
  res.redirect('/users/profile');
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

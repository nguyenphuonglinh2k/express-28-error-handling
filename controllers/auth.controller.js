var shortid = require("shortid");
var db = require("../db");
var bcrypt = require("bcrypt");
var count = 0;

module.exports.login = function(req, res) {
  res.render("auth/login");
};

module.exports.postLogin = function(req, res, next) {
  var errs = [];
  var email = req.body.email;
  var password = req.body.password;

  var user = db
    .get("users")
    .find({ email: email })
    .value();

  if (!user) {
    res.render("auth/login", {
      errs: ["Email is not exist"],
      values: req.body
    });
    return;
  }

  bcrypt.compare(password, user.password, function(err, result) {
    if (user.wrongLoginCount >= 4) {
      return res.render("auth/login", {
        errs: ["Bạn nhập sai quá số lần cho phép"]
      });
    } else if (!result) {
      db.get("users")
        .find({ email: email })
        .set("wrongLoginCount", ++count)
        .write();
      
      return res.render("auth/login", {
        errs: ["Wrong password"],
        values: req.body
      });
    } else {
      db.get("users")
        .find({ email: email })
        .set("wrongLoginCount", 0)
        .write();
      
      count = 0;
      
      res.cookie("userId", user.id, {
        signed: true
      });
      return res.redirect("/transactions");
    }
  });
};

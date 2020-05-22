require('dotenv').config();

var shortid = require("shortid");
var db = require("../db");
var bcrypt = require("bcrypt");
const sgMail = require('@sendgrid/mail');
var User = require("../models/user.model.js");

var count = 0;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.login = function(req, res) {
  res.render("auth/login");
};

module.exports.postLogin = function(req, res, next) {
  var errs = [];
  var email = req.body.email;
  var password = req.body.password;

  // var user = db
  //   .get("users")
  //   .find({ email: email })
  //   .value();
  var user = User.findOne({ email: email }).then(result => console.log(result));
  

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
          // User.findOneAndUpdate({ email: email }, { wrongLoginCount: ++count});
          
           if (count === 3) {
            const msg = {
              to: user.email,
              from: 'nguyenphuonglinh11102000@gmail.com',
              subject: 'Login Warning',
              text: 'you had entered wrong password 3 times',
              html: '<strong>You had entered wrong password 3 times.</strong>',
            };

            sgMail.send(msg).then(() => {
                console.log('Message sent')
            }).catch((error) => {
                console.log(error.response.body)
                // console.log(error.response.body.errors[0].message)
            });
          }
        
          return res.render("auth/login", {
            errs: ["Wrong password"],
            values: req.body
          });

        } else {
          // db.get("users")
          //   .find({ email: email })
          //   .set("wrongLoginCount", 0)
          //   .write();
          User.findOneAndUpdate({ email: email}, { wrongLoginCount: 0});

          count = 0;

          res.cookie("userId", user.id, {
            signed: true
          });
          return res.redirect("/transactions");
        }
  });
};

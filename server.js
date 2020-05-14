require('dotenv').config();

const express = require('express');
var shortid = require('shortid');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

var userRoute = require('./routes/user.route.js');
var bookRoute = require('./routes/book.route.js');
var transactionRoute = require('./routes/transaction.route.js');
var authRoute = require('./routes/auth.route.js');
var cookieMiddleware = require('./middleware/cookie.middleware.js');
var authMiddleware = require('./middleware/auth.middleware.js');

const app = express();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'nguyenphuonglinh11102000@gmail.com',
  from: 'nguyenphuonglinh11102000@gmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

sgMail.send(msg).then(() => {
    console.log('Message sent')
}).catch((error) => {
    console.log(error.response.body)
    // console.log(error.response.body.errors[0].message)
})

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser('hauoeiwnwh7618y989'));

app.use('/users', authMiddleware.authLogin, cookieMiddleware.cookie, userRoute);
app.use('/books', authMiddleware.authLogin, cookieMiddleware.cookie, bookRoute);
app.use('/transactions', authMiddleware.authLogin, cookieMiddleware.cookie, transactionRoute);
app.use('/auth', authRoute);

app.get('/', function(req, res) {
  res.cookie('cookie', shortid.generate());
  
  res.send('Hello everyone!');
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

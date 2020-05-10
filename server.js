const express = require('express');
var shortid = require('shortid');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')

var userRoute = require('./routes/user.route.js');
var bookRoute = require('./routes/book.route.js');
var transactionRoute = require('./routes/transaction.route.js');


const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/users', userRoute);
app.use('/books', bookRoute);
app.use('/transactions', transactionRoute);

app.get('/', function(req, res) {
  res.cookie = {
    cookie: shortid.generate(),
    count: 0
  };
  console.log(req.cookies.cookie);
  res.send('Hello everyone!');
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

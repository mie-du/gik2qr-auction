var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', require('./routes/UsersRoute'));
app.use('/items', require('./routes/ItemsRoute'));
app.use('/auctions', require('./routes/AuctionsRoute'));

/* Error handling - first 404, then catch other errors */
app.use(function (req, res, next) {
  next({ status: 404, message: 'Kunde inte hitta sökväg' });
});

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message || 'Okänt fel',
    stack: err.stack
  });
});
module.exports = app;

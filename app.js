'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

//require: models
var model = require('./model/user');

//require: routers
var users = require('./routes/users');

var app = express();

/**
 * allow the application to reconnect in case of errors.
 * @function connection
 * @todo change url if the environment is equal to dev or production
 */
var connection = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect('mongodb://localhost/runningheroes', options);
};
connection();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connection);

//logger
var logger = require('./lib/logger')(app.get('env'));
app.use(morgan("combined",{"stream": logger.stream }));

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routers middleware
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});


module.exports = app;

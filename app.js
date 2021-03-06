var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var Task = require('./models/todoListModel');
var User = require('./models/userModel');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + process.env.DBUSER + ':' + process.env.DBPASSWORD + '@ds015740.mlab.com:15740/my-first-test',function(err){
  console.log(err);
});

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'lkeng', resave: true, saveUninitialized: true, cookie: { maxAge: 14400000 }}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.locals.logined = req.session.logined;
  res.locals.username = req.session.username;
  next();
});

app.use('/', index);
var routes = require('./routes/indexRoutes'); //importing route
routes(app); //register the route

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

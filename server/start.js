var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var routes = require('./routes');
var users = require('./routes/users');
var cors = require('cors')
var config = require('./config');
var bodyParser = require('body-parser');
// Passport
var passport = require('passport')
var passportSystem = require('./system/passport');
app.use(passport.initialize())
app.use(passport.session());



//Mongodb connections
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.db)
  .then(() =>  console.log('Database connection succesful'))
  .catch((err) => console.error(err));

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  // app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.use(cors())
app.use('/api', routes);
app.use('/api/users', users);

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

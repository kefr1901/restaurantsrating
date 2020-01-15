var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
var logger = require('morgan');
const mysql = require('mysql');
const passport = require("passport");
let methodOverride = require("method-override");
const session = require("express-session");




var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var resturantRouter = require("./routes/resturant")

//PASSPORT CONFIG
require("./config/passport")(passport);


var app = express();
app.use(bodyParser.json());
app.use(methodOverride("_method")) //skriver över 

//passport config 
require('./config/passport')(passport);
 

//Connect to mysql
let mysqlConnecticon = mysql.createConnection({
    host: "xav-p-mariadb01.xavizus.com",
    user: 'kevin',
    password: 'BtlQYI9Pp0lKlIYH',
    database: 'kevin',
    port: 16200
});

 

// view engine setup

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
//BODYPARSER
app.use(express.urlencoded({ extended: false }));

//express Session
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
  
}))
//Passport middelware
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




//Routes
app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use("/resturant", resturantRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.listen(3000);

module.exports = app;

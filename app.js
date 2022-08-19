const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/user");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();



// database setup
const mongoDB = process.env.DEV_DB_URL;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// session setup
app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true}));


passport.use(
  new LocalStrategy({usernameField: "email", passwordField: "password"}, (email, password, done) => {
    User.findOne({email: email}, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, {message: "Incorrect email"});
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // Passwords match -> Log In.
          return done(null, user)
        } else {
          // Passwords don't match.
          return done(null, false, {message: "Incorrect password!"})
        }
      })
    })
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  })
})



app.use(passport.initialize());
app.use(passport.session());
/* app.use(express.urlencoded({extended: false})); */


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;

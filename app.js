var createError = require('http-errors');
var favicon = require('serve-favicon');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
require('dotenv/config');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todotaskRouter = require('./routes/todotask');
var flash = require('connect-flash');
var session = require('express-session');
const passport = require('passport');

//Set webapp icon
app.use(favicon(__dirname + '/public/images/favicon.ico'));

//Passport config
require('./config/passport')(passport);

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(logger('dev'));

//Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Express Session
app.use(session({
    secret: 'secret ',
    resave: true,
    saveUninitialized: true,
}))

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash
app.use(flash());

//Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user;
    next();
})

//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todotask', todotaskRouter);

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
    res.render('pages/error');
});

//Connect to DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log("MongoDB Connected!"))
    .catch(err => console.log(err));

module.exports = app;
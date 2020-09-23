const createError = require('http-errors');
const favicon = require('serve-favicon');
require('dotenv/config');

const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');

const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const todotaskRouter = require('./routes/todotask');
const chatRouter = require('./routes/chat');


const app = express()
const server = http.createServer(app);
const io = socketio(server);

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
    //App message
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');

    //User Authenticate
    res.locals.user_is_logged_in = req.isAuthenticated();
    res.locals.user = req.user;

    next();
})

//Routes
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/todotask', todotaskRouter);
app.use('/chat', chatRouter);

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

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
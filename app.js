var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session') // connect-flash 也要引入這個來用
var flash = require('connect-flash')
var app = express();
var validator = require('express-validator')
var http = require('http')

// routes ('./routes資料夾/routes檔案')
var contact = require('./routes/contact')
var messageBoard = require('./routes/messageBoard')
var setBar = require('./routes/setBar')

// database firebase_admin module export
var fireData = require('./connections/firebase_admin')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// session
app.use(express.static("public"));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'cat',
  resave:true,
  saveUninitialized:true
}))

app.use(flash())
app.use(validator())

app.use('/', setBar)
app.use('/contact', contact);
app.use('/messageBoard',messageBoard)


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



// 監聽 port
var port = process.env.PORT || 8080
app.listen(port);

module.exports = app;
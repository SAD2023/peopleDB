var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var router = express.Router()

var mongoClient = require('mongodb').MongoClient;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var helpRouter = require('./routes/help');
var formRouter = require('./routes/form');
var peopleRouter = require('./routes/viewPeople');
const { response } = require('express');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());


app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/help', helpRouter);
app.use('/form', formRouter);
app.use('/people', peopleRouter)


// handle post requests
app.post('/', function (req, res) {
  // handles requests from the 'people' page. Sends data from db back.
  if (req.body.form) {
    //Note: the login details here are just placeholders.
    mongoClient.connect('mongodb+srv://username:password@cluster0.xy7gp.mongodb.net/test?authSource=admin&replicaSet=atlas-596utp-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
      function (err, client) {
        var object = {
          list: []
        }

        var db = client.db('people');
 
        db.collection('peopleCollection').find({}).toArray().then((docs) => {
          object.list = docs
          console.log(JSON.stringify(object));
          res.end(JSON.stringify(object))
        })

      });
  }
  // handles requests from the form page. Sends data to the db
  else {
    mongoClient.connect('mongodb+srv://sadman:sad2023@cluster0.xy7gp.mongodb.net/test?authSource=admin&replicaSet=atlas-596utp-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
      function (err, client) {

        var db = client.db('people');
        db.collection('peopleCollection', function (err, collection) {

          collection.insert(req.body);
        });

      });
  }
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

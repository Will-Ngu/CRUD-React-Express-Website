var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var indexRouter = require('./routes/index');

//Grabs the testAPI.js file.
var testAPIRouter = require("./routes/testAPI");

var app = express();
//Gets sqlite3 module
const sqlite3 = require('sqlite3').verbose();
const db_name = 'data/apptest.db'
const db = new sqlite3.Database(db_name, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQLite Database. Congrats')
});

// const sql_create = `CREATE TABLE IF NOT EXISTS Books (
//   Book_ID INTEGER PRIMARY KEY AUTOINCREMENT,
//   Title VARCHAR(100) NOT NULL,
//   Author VARCHAR(100) NOT NULL,
//   Comments TEXT
// );`;
const sql_create = `CREATE TABLE IF NOT EXISTS JHA (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  job VARCHAR(100) NOT NULL UNIQUE,
  selectedDate VARCHAR(100) NOT NULL,
  status VARCHAR(100) NOT NULL,
  title VARCHAR(100) NOT NULL,
  supervisor VARCHAR(100) NOT NULL,
  analyst VARCHAR(100) NOT NULL,
  organization VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  review VARCHAR(100) NOT NULL,
  ppe VARCHAR(100) NOT NULL,
  training VARCHAR(100) NOT NULL
);`;

const sql_step_table = `CREATE TABLE IF NOT EXISTS JHASTEPS (
  job VARCHAR(100) NOT NULL,
  step INTEGER NOT NULL,
  seqJob VARCHAR(100) NOT NULL,
  potHaz VARCHAR(100) NOT NULL,
  control VARCHAR(100) NOT NULL,
  FOREIGN KEY (job) REFERENCES JHA(job)
);`;

db.run(sql_create, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of the 'JHA' table");

  // const sql_insert = `INSERT INTO Books (Book_ID, Title, Author, Comments) VALUES
  // (1, 'Mrs. Bridge', 'Evan S. Connell', 'First in the serie'),
  // (2, 'Mr. Bridge', 'Evan S. Connell', 'Second in the serie'),
  // (3, 'L''ingénue libertine', 'Colette', 'Minne + Les égarements de Minne');`;
  // db.run(sql_insert, err => {
  //   if (err) {
  //     return console.error(err.message);
  //   }
  //   console.log("Successful creation of 3 books");
  // });
});

db.run(sql_step_table, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of the 'steps' table");
});


// Database seeding

// db.close((err) => {
//   if (err) {
//     return console.error(error.message)
//   }
//   console.log('Close the database connection')
// });






// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('', indexRouter);
app.use('/create', indexRouter);
app.use('/edit', indexRouter);
app.use('/delete', indexRouter);


//New Line added in by me to test the new file testAPI.js
//Calls the testAPIRouter var
app.use("/testAPI", testAPIRouter);


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

});

module.exports = app;

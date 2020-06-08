/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('app');
const morgan = require('morgan'); //logger
const path = require('path');
const chalk = require('chalk');
const bodyParser = require('body-parser');
//const session = require('express-session');
// const cookieParser = require('cookie-parser');
const app = express();
//const cors = require('cors')

// const mysql = require('mysql');

//process.env.NODE_ENV = 'production';
require('./config/config.js');

mongoose.connect(global.gConfig.database_url, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(cors())
// app.use(cookieParser());
// app.use(session(sessionOptions));
app.use(morgan('tiny'))

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery.easing/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const Sites = require('./src/models/touristSites');
const touristSitesRouter = require('./src/routes/touristSitesRoutes')(Sites);
const authRouter = require('./src/routes/authRoutes')();
const mailingRouter = require('./src/routes/mailingRoutes')();


require('./src/controllers/touristSitesController');


app.use('/tours', touristSitesRouter);
app.use('/signin', authRouter);
app.use('/mailer', mailingRouter);


// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Ololade1",
//   database: "lollykrown"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected to database...!");

//   // // create database
//   // con.query("CREATE DATABASE lollykrown", function (err, result) {
//   //   if (err) throw err;
//   //   debug(chalk.red("Database created", result));
//   // });

//   // //create table
//   // const sql = "CREATE TABLE books (title VARCHAR(255), description VARCHAR(255))";
//   // con.query(sql, function (err, result) {
//   //   if (err) throw err;
//   //   console.log(chalk.red("Table created", result));
//   // });

//   // const sqll = "INSERT INTO books (title, description) VALUES ('Alchemy', 'my fav book')";
//   // con.query(sqll, function (err, result) {
//   //   if (err) throw err;
//   //   debug(chalk.red("1 record inserted", result));
//   // });

//     // const sql = "INSERT INTO books (title, description) VALUES ?";
//     // const values = [
//     //   ['John', 'Highway 71'],
//     //   ['Peter', 'Lowstreet 4'],
//     //   ['Amy', 'Apple st 652'],
//     //   ['Hannah', 'Mountain 21'],
//     //   ['Michael', 'Valley 345'],
//     //   ['Sandy', 'Ocean blvd 2'],
//     //   ['Betty', 'Green Grass 1'],
//     //   ['Richard', 'Sky st 331'],
//     //   ['Susan', 'One way 98'],
//     //   ['Vicky', 'Yellow Garden 2'],
//     //   ['Ben', 'Park Lane 38'],
//     //   ['William', 'Central st 954'],
//     //   ['Chuck', 'Main Road 989'],
//     //   ['Viola', 'Sideway 1633']
//     // ];
//     // con.query(sql, [values], function (err, result) {
//     //   if (err) throw err;
//     //   console.log("Number of records inserted: " + result.affectedRows);
//     // });

//     con.query("SELECT * FROM books", function (err, result, fields) {
//       if (err) throw err;
//       debug(result);
//     });
// });

// app.use(function (req, res) {
// 	const err = new Error('Not Found')
// 	err.status = 404
// 	res.json(err)
// })

//const tourists = require('./tourist')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Connected to MongoDB');
    (async function mongo() {
      try {
          // Sites.insertMany(tourists, function(err, docs) {
          //   if (err) {debug(chalk.red(err))}
          //   debug(chalk.red(docs.length));
          // });
      } catch (err) {
        debug(err.stack);
      }
    })();
});

app.get('/', (req, res) => {
  (async function mongo() {
    try {
      const tourSites = await Sites.find({}).exec();
      res.render(
        'index', { title: tourSites });
      debug(chalk.yellow(tourSites.length));
    } catch (err) {
      debug(err.stack);
    }
  })();
});

app.listen(global.gConfig.node_port, function () {
  console.log(`${global.gConfig.app_name} Listening on port ${global.gConfig.node_port}...`)
})


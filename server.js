const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

const mongoose = require("mongoose")
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);

const db = require('../../config/db');

app.use(session({
  secret: 'asdfHJsdfbnsklbFSEfbDS',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: db.url,
  })
}))

app.use(express.static(__dirname + "/public"));
app.use('/view*', express.static(__dirname + "/public"));
app.use('/sign*', express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes')(app);

app.listen(port, () => {
  console.log('port: ' + port);
});
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const db = require('./config/db');

app.use(bodyParser.json());

app.use(session({
  secret: 'asdfHJsdfbnsklbFSEfbDS',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: db.url,
  })
}));

app.use('/', express.static(__dirname + "/public"));
app.use('/view*', express.static(__dirname + "/public"));
app.use('/sign*', express.static(__dirname + "/public"));

require('./app/routes')(app, db);

app.listen(port);
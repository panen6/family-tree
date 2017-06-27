const MongoClient = require('mongodb').MongoClient;
const db = require('../../config/db');

module.exports = function (app) {
  app.get('/', (req, res) => {
    res.redirect('/public/');
  });

  app.get('/notes', (req, res) => {
    MongoClient.connect(db.url, (err, db) => {
      if (err) return console.log(err)
      db.collection('notes').find({}).toArray(function (err, items) {
        if (err) {
          res.send({ 'error': 'An error has occurred' });
        } else {
          res.send(items);
        }
      });
    });
  });

  app.get('/notes/:id', (req, res) => {
    MongoClient.connect(db.url, (err, db) => {
      if (err) return console.log(err)
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      db.collection('notes').findOne(details, (err, item) => {
        if (err) {
          res.send({ 'error': 'An error has occurred' });
        } else {
          res.send(item);
        }
      });
    });
  });

  app.post('/notes', (req, res) => {
    MongoClient.connect(db.url, (err, db) => {
      if (err) return console.log(err)
      const note = { text: req.body.body, title: req.body.title };
      db.collection('notes').insert(note, (err, result) => {
        if (err) {
          res.send({ 'error': 'An error has occurred' });
        } else {
          res.send(result.ops[0]);
        }
      });
    });
  });

  app.delete('/notes/:id', (req, res) => {
    MongoClient.connect(db.url, (err, db) => {
      if (err) return console.log(err)
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      db.collection('notes').remove(details, (err, item) => {
        if (err) {
          res.send({ 'error': 'An error has occurred' });
        } else {
          res.send('Note ' + id + ' deleted!');
        }
      });
    });

    app.put('/notes/:id', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      const note = { text: req.body.body, title: req.body.title };
      db.collection('notes').update(details, note, (err, result) => {
        if (err) {
          res.send({ 'error': 'An error has occurred' });
        } else {
          res.send(note);
        }
      });
    });
  });
};
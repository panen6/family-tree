const api = require('../api');

module.exports = function (app, db) {

  /* Создание пользователя */
  app.post('/api/signup', function (req, res) {
    api.createUser(req.body)
      .then(function (result) {
        res.status(201).send();
      })
      .catch(function (error) {
        if (error.toJSON && error.toJSON().code && error.toJSON().code == 11000) {
          res.status(500).send({ "error": "Пользователь с таким email'ом уже существует" });
        } else {
          res.status(500).send(error);
        }
      });
  });

  app.post('/api/signin', function (req, res) {
    api.checkUser(req.body)
      .then(function (user) {
        if (user) {
          req.session.user = { id: user._id, name: user.name };
          res.send();
        }
      })
      .catch(function (error) {
        res.status(500).send({ "error": "Не правильный логин/пароль" });
      });
  });

  app.post('/api/signout', function (req, res, next) {
    if (req.session.user) {
      delete req.session.user;
      res.send();
    }
  });

}
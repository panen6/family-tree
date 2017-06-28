const mongoose = require('mongoose');
const crypto = require('crypto');
const db = require('../config/db');
const db_connect = mongoose.connect(db.url);
const User = require('./models/user');

exports.createUser = function (userData) {
	if (userData.name && userData.email && userData.password) {
		var user = {
			name: userData.name,
			email: userData.email,
			password: hash(userData.password)
		}
		return new User(user).save();
	} else {
		return Promise.reject({"error": "Не заполнены все поля"});
	}
}

exports.getUser = function (id) {
	return User.findOne(id);
}

exports.checkUser = function (userData) {
	return User
		.findOne({ email: userData.email })
		.then(function (doc) {
			if (doc.password == hash(userData.password)) {
				return Promise.resolve(doc);
			} else {
				return Promise.reject("Не правильный логин/пароль");
			}
		})
}

function hash(text) {
	return crypto.createHash('sha1').update(text).digest('base64');
}
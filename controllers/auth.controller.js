const User = require('../models/user.model');
const createError = require('http-errors');
const passport = require('passport');

module.exports.register = (req, res, next) => {

  console.log(" en REGISTROOOOOOOOOOO ")
  const { email } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        throw createError(409, 'Email already registered');
      } else {
        console.log("creo un nuevo usuario")
        return new User(req.body).save();
      }
    })
    .then(user => res.status(201).json(user))
    .catch(next);
}

module.exports.authenticate = (req, res, next) => {
  passport.authenticate('auth-local', (error, user, message) => {
    if (error) {
      next(error);
    } else if (!user) {
      next(createError(401, message))
    } else {
      req.login(user, (error) => {
        if (error) {
          next(error);
        } else {
          console.log("ME LOGEÉ OOKK")
          res.status(201).json(user);
        }
      })
    }
  })(req, res, next);
}

module.exports.logout = (req, res, next) => {
  req.logout();
  res.status(204).json();
}



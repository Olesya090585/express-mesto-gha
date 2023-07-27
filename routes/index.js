const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/users');
const { usersRoutes } = require('./users');
const { cardsRoutes } = require('./cards');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { urlPattern } = require('../utils/constans');

const routes = express.Router();

routes.use('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    avatar: Joi.string().pattern(urlPattern),
    password: Joi.string().required().min(8),
  }),
}), createUser);
routes.use('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

routes.use(auth);
routes.use('/users', usersRoutes);
routes.use('/cards', cardsRoutes);
routes.use('/*', (req, res, next) => next(
  new NotFoundError('Страница не найдена.'),
));

module.exports = {
  routes,
};

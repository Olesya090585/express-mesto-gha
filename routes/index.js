const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/users');
const { usersRoutes } = require('./users');
const { cardsRoutes } = require('./cards');
const auth = require('../middlewares/auth');

const routes = express.Router();

routes.use('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
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

routes.use('/*', (req, res) => {
  res.status(404).send({
    message: 'Страница не найдена',
  });
});

module.exports = {
  routes,
};

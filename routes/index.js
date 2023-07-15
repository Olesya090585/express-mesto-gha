const express = require('express');
const { usersRoutes } = require('./users');
const { cardsRoutes } = require('./cards');

const routes = express.Router();

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

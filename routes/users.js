const express = require('express');
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserId,
  updateUser,
  updateAvatar,
  getUserMe,
} = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/', getUsers);
usersRoutes.get('/me', getUserMe);
usersRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
usersRoutes.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().required(),
  }),
}), getUserId);
usersRoutes.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
  }),
}), updateAvatar);
module.exports = { usersRoutes };

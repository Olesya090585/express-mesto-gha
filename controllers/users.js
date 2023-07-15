const User = require('../models/user');

const { OK_STATUS_CODE } = require('../utils/errors');
const { ERROR_BAD_REQUEST } = require('../utils/errors');
const { ERROR_NOT_FOUND } = require('../utils/errors');
const { ERROR_INTERNAL_SERVER } = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(OK_STATUS_CODE).send(users))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR_BAD_REQUEST)
          .send({
            message: 'Переданы некорректные данные при создании пользователя.',
          });
      }
      return res
        .status(ERROR_INTERNAL_SERVER)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.status(OK_STATUS_CODE).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR_BAD_REQUEST)
          .send({
            message: 'Переданы некорректные данные при создании пользователя.',
          });
      }
      return res
        .status(ERROR_INTERNAL_SERVER)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_BAD_REQUEST).send({
          message: 'Переданы некорректные данные при создании пользователя.',
        });
      }
      return res
        .status(ERROR_INTERNAL_SERVER)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.status(OK_STATUS_CODE).send(user))
    .catch((err) => {
      if (err === 'CastError') {
        return res.status(ERROR_BAD_REQUEST).send({
          message: 'Переданы некорректные данные при обновлении профиля.',
        });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Пользователь с указанным _id не найден.' });
      }
      return res
        .status(ERROR_INTERNAL_SERVER)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.status(OK_STATUS_CODE).send(user))
    .catch((err) => {
      if (err === 'CastError') {
        return res.status(ERROR_BAD_REQUEST).send({
          message: 'Переданы некорректные данные при обновлении профиля.',
        });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Пользователь с указанным _id не найден.' });
      }
      return res
        .status(ERROR_INTERNAL_SERVER)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};

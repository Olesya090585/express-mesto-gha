const Card = require('../models/card');
const { OK_STATUS_CODE } = require('../utils/errors');
const { ERROR_BAD_REQUEST } = require('../utils/errors');
const { ERROR_NOT_FOUND } = require('../utils/errors');
const { ERROR_INTERNAL_SERVER } = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(OK_STATUS_CODE).send(cards))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR_BAD_REQUEST)
          .send({
            message: 'Переданы некорректные данные при создании карточки',
          });
      }
      return res
        .status(ERROR_INTERNAL_SERVER)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(OK_STATUS_CODE).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR_BAD_REQUEST)
          .send({
            message: 'Переданы некорректные данные при создании карточки',
          });
      }
      return res
        .status(ERROR_INTERNAL_SERVER)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Карточка с указанным _id не найдена.' });
      }
      return res.status(OK_STATUS_CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR_BAD_REQUEST)
          .send({ message: 'Некорректные данные.' });
      }
      return res
        .status(ERROR_INTERNAL_SERVER)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.status(OK_STATUS_CODE).send(card);
    })

    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR_BAD_REQUEST)
          .send({
            message:
              'Переданы некорректные данные для постановки/снятии лайка.',
          });
      }
      return res
        .status(ERROR_INTERNAL_SERVER)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.status(OK_STATUS_CODE).send(card);
    })

    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR_BAD_REQUEST)
          .send({
            message:
              'Переданы некорректные данные для постановки/снятии лайка.',
          });
      }
      return res
        .status(ERROR_INTERNAL_SERVER)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};

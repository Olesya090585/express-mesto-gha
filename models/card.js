const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // validate: {
    //   validator: ({ length }) => length >= 2 && length <= 30,
    //   message: 'Колличество символов должно быть от 2 до 30 символов',
    // },
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат url',
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  likes: [{
    type: mongoose.Types.ObjectId,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);

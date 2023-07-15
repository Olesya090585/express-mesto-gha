const express = require('express');
const {
  getUsers,
  getUserId,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/', getUsers);
usersRoutes.get('/:userId', getUserId);
usersRoutes.post('/', createUser);
usersRoutes.patch('/me', updateUser);
usersRoutes.patch('/me/avatar', updateAvatar);
module.exports = { usersRoutes };

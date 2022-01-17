const usersRoutes = require('express').Router();
const { check } = require('express-validator');
const { signup, login } = require('../controllers/user-controllers');
const fileUpload = require('../middleware/file-upload');

usersRoutes.post(
  '/signup',
  fileUpload.single('image'),

  signup
);
usersRoutes.post('/login', login);

module.exports = usersRoutes;

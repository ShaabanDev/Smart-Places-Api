const usersRoutes = require('express').Router();
const { check } = require('express-validator');
const { signup, login } = require('../controllers/user-controllers');
const fileUpload = require('../middleware/file-upload');

usersRoutes.post(
  '/signup',
  fileUpload.single('image'),
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }).isStrongPassword(),
  ],
  signup
);
usersRoutes.post('/login', login);

module.exports = usersRoutes;

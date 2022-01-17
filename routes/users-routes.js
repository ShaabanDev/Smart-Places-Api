const usersRoutes = require('express').Router();
const { check } = require('express-validator');
const { signup, login } = require('../controllers/user-controllers');

usersRoutes.post(
  '/signup',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  signup
);
usersRoutes.post('/login', login);

module.exports = usersRoutes;

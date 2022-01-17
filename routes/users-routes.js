const usersRoutes = require('express').Router();
const { signup, login } = require('../controllers/user-controllers');


usersRoutes.post('/signup', signup);
usersRoutes.post('/login', login);

module.exports = usersRoutes;

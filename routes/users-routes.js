const usersRoutes = require('express').Router();
const { signup } = require('../controllers/user-controllers');


usersRoutes.post('/signup', signup);

module.exports = usersRoutes;

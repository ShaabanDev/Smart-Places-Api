const usersRoutes = require('express').Router();

usersRoutes.get('/', (req, res, next) => {
  res.json({ message: 'It works' });
});

module.exports = usersRoutes;

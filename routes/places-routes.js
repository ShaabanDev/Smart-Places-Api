const placesRouter = require('express').Router();

placesRouter.get('/:id', (req, res, next) => {
  res.json({ message: 'It works' });
});

module.exports = placesRouter;

const placeModel = require('../models/placeModel');

const placesRouter = require('express').Router();

placesRouter.post('/', async (req, res, next) => {
  try {
    const place = new placeModel({ ...req.body });
    await place.save();
    res.status(200).send();
  } catch (error) {
    console.log(error);
  }
});

placesRouter.get('/:pid', async (req, res) => {
  try {
    const placeID = req.params.pid;
    const place = await placeModel.findById(placeID);
    res.status(200).send(place);
  } catch (error) {
    console.log(error);
  }
});

placesRouter.get('/user/:uid', async (req, res) => {
  try {
    const userID = req.params.uid;
    const place = await placeModel.find({ creator: userID });
    res.status(200).send(place);
  } catch (error) {
    console.log(error);
  }
});

module.exports = placesRouter;

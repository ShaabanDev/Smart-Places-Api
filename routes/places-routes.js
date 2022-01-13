const HttpError = require('../models/http-error');
const placeModel = require('../models/placeModel');

const placesRouter = require('express').Router();


// create new place
placesRouter.post('/', async (req, res, next) => {

  const place = new placeModel({ ...req.body });
  await place.save();
  res.status(200).send();

});

// find place by place id
placesRouter.get('/:pid', async (req, res, next) => {
  let place;
  try {
    const placeID = req.params.pid;
    place = await placeModel.findById(placeID);
  } catch (err) {
    const error = new HttpError('Fetching places failed, Please try again later.', 500);
    return next(error)
  }

  if (!place) {
    return next(new HttpError('Could not find a place with the provided id', 404));
  }
  res.status(200).send(place);
});


// find places by user id
placesRouter.get('/user/:uid', async (req, res, next) => {
  let place;

  try {
    const userID = req.params.uid;
    place = await placeModel.find({ creator: userID });
  } catch (err) {
    const error = new HttpError('Fetching places failed, Please try again later.', 500)
    return next(error);
  }

  if (place.length === 0 || !place) {
    return next(new HttpError('Could not find a place with the provided id', 404));
  }
  res.status(200).send(place);
});

// update place by id

placesRouter.patch('/:pid', async (req, res, next) => {
  let place;
  const pid = req.params.pid;
  const availableUpdates = ["title", "description", "image", "address"];
  const requestKeys = Object.keys(req.body);
  const isValid = requestKeys.every((update) =>
    availableUpdates.includes(update)
  );
  if (!isValid) {
    return next(new HttpError('Invalid Updates, Please Valid it, Then update', 422));
  }

  try {
    place = await placeModel.findById(pid);
    requestKeys.forEach((update) => {
      place[update] = req.body[update];
    })
    await place.save();
  } catch (err) {
    const error = new HttpError('error', 400)
    return next(error)
  }
  if (!place) {
    return next(new HttpError('Could not find a place with the provided id', 404));
  }
  res.status(200).json(place);

})

// delete place by id 

placesRouter.delete('/:pid', async (req, res, next) => {
  let place;
  try {
    place = await placeModel.findOneAndDelete({ _id: req.params.pid });
  } catch (err) {
    const error = new HttpError('Some thing Went Wrong, Please try again later.');
  }
  if (!place) {
    return next(new HttpError('Could not find a place with the provided id', 404));
  }
  res.status(200).json(place);
})

module.exports = placesRouter;

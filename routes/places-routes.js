const { getPlaceByID, postNewPlace, getPlacesByCreatorID: getPlacesByCreatorID, updatePlaceByID, deletePlaceByID } = require('../controllers/place-controllers');
const HttpError = require('../models/http-error');
const placeModel = require('../models/placeModel');

const placesRouter = require('express').Router();


// create new place
placesRouter.post('/', postNewPlace);

// find place by place id
placesRouter.get('/:pid', getPlaceByID);


// find places by user id
placesRouter.get('/user/:uid', getPlacesByCreatorID);

// update place by id

placesRouter.patch('/:pid', updatePlaceByID);

// delete place by id 

placesRouter.delete('/:pid', deletePlaceByID);

module.exports = placesRouter;

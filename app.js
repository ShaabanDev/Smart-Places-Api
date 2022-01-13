const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const placesRouter = require('./routes/places-routes');
const HttpError = require('./models/http-error');
dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/places/', placesRouter);

app.use((req, res, next) => {
  return next(new HttpError('unsupported request', 501))
})
app.use((error, req, res, next) => {
  if (res.headerSent) {
    console.log(res.headerSent)
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
})

const PORT = process.env.PORT;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`The server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

connect();

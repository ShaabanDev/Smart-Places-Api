const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const placesRouter = require('./routes/places-routes');
dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/places/', placesRouter);

app.use((error, req, res, next) => {
  if (res.headerSent) {
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

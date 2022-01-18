const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const placesRouter = require('./routes/places-routes');
const HttpError = require('./models/http-error');
const usersRoutes = require('./routes/users-routes');
dotenv.config();
const app = express();

app.use(express.json());
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use('/api/places/', placesRouter);
app.use('/api/users/', usersRoutes);
app.use((req, res, next) => {
  return next(new HttpError('unsupported request', 501));
});
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

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

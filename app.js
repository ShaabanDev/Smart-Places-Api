const express = require('express');
const placesRouter = require('./routes/places-routes');
const app = express();

app.use('/api/places/', placesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});

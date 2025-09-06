const mongoose = require('mongoose');

module.exports = mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('--------------- MongoDB connected ---------------');
  })
  .catch((error) => {
    console.log('MONGODB_URI: ' + process.env.MONGODB_URI);
    console.error('MongoDB connection error:', error);
  });

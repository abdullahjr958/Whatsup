const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  initials: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 2,
  },
  refreshToken: {
    type: String,
  }
},
{ timestamps: true });

module.exports = mongoose.model('User', userSchema);
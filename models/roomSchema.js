const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },],
  isGroup: {
    type: Boolean,
    default: false
  },
  roomName: {
    type: String,
    required: true,
    trim: true
  },
  initials: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  lastMessageAt: {
    type: Date,
    default: Date.now
  },
  lastMessageSnippet: {
    type: String,
    default: '',
    trim: true
  }
},
{ timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
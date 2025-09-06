const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    default: 'text'
  },
  isOwn: {
    type: Boolean,
    default: false
  },
  sentAt: {
    type: String,
    default: '00:00'
  }
},
{ timestamps: true });

messageSchema.index({ room: 1, createdAt: -1});

module.exports = mongoose.model('Message', messageSchema);
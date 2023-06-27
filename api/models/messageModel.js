const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create message schema
const messageSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  content: { type: String, trim: true },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
  },
});

module.exports = mongoose.model('Message', messageSchema);

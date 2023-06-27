const Message = require('../models/messageModel');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const messageService = require('../services/messageService');

//Send a message
const sendMessage = async (req, res, next) => {
  const { content, chatId, senderId } = req.body;

  try {
    const message = await messageService.sendMessage(senderId, content, chatId);
    res.json(message);
  } catch (error) {
    next({ message: error.message });
  }
};

//Get all messages
const allMessages = async (req, res, next) => {
  try {
    const messages = await messageService.getAllMessages(req.params.chatId);
    res.json(messages);
  } catch (error) {
    next({ message: error.message });
  }
};
module.exports = { sendMessage, allMessages };

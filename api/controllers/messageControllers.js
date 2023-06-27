const Message = require('../models/messageModel');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const messageService = require('../services/messageService');

//Send a message
const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log('Invalid data passed into request');
    return res.sendStatus(400);
  }

  try {
    const message = await messageService.sendMessage(req.user._id, content, chatId);
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

//Get all messages
const allMessages = async (req, res) => {
  try {
    const messages = await messageService.getAllMessages(req.params.chatId);
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};
module.exports = { sendMessage, allMessages };

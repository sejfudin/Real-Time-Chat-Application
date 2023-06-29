const Message = require('../models/messageModel');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const { updateLastMessage } = require('./chatService');

const createMessage = async (senderId, content, chatId) => {
  const newMessage = {
    sender: senderId,
    content,
    chat: chatId,
  };

  let message = await Message.create(newMessage);
  return message;
};

const populateMessage = async (message) => {
  message = await message.populate('sender', 'name');
  message = await message.populate('chat');
  message = await User.populate(message, {
    path: 'chat.users',
    select: 'name email',
  });
  return message;
};

const sendMessage = async (senderId, content, chatId) => {
  if (!content || !chatId || !senderId) {
    throw new Error('Invalid data passed into request');
  }
  let message = await createMessage(senderId, content, chatId);
  message = await populateMessage(message);
  await updateLastMessage(chatId, message);
  return message;
};

const getAllMessages = async (chatId) => {
  return await Message.find({ chat: chatId }).populate('sender', 'name').populate('chat');
};

module.exports = {
  createMessage,
  populateMessage,
  sendMessage,
  getAllMessages,
};

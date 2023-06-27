const Message = require('../models/messageModel');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');

const sendMessage = async (senderId, content, chatId) => {
  const newMessage = {
    sender: senderId,
    content,
    chat: chatId,
  };

  let message = await Message.create(newMessage);

  message = await message.populate('sender', 'name').execPopulate();
  message = await message.populate('chat').execPopulate();
  message = await User.populate(message, {
    path: 'chat.users',
    select: 'name email',
  });

  await Chat.findByIdAndUpdate(chatId, {
    latestMessage: message,
  });

  return message;
};

const getAllMessages = async (chatId) => {
  return await Message.find({ chat: chatId }).populate('sender', 'name email').populate('chat');
};

module.exports = {
  sendMessage,
  getAllMessages,
};

const chatService = require('../services/chatService');

//Chat access
const accessChat = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const chat = await chatService.accessChat(req.user?._id, userId);
    res.send(chat);
  } catch (error) {
    next({ message: error.message });
  }
};

//Fetch chats
const fetchChats = async (req, res, next) => {
  try {
    const chats = await chatService.fetchChats(req.user._id);
    res.status(200).send(chats);
  } catch (error) {
    next({ message: error.message });
  }
};

//Create group
const createGroupChat = async (req, res, next) => {
  const { users, name, admin } = req.body;

  try {
    const groupChat = await chatService.createGroupChat(users, name, admin);
    res.status(200).json(groupChat);
  } catch (error) {
    next({ message: error.message });
  }
};

//Rename group
const renameGroup = async (req, res, next) => {
  const { chatId, chatName } = req.body;

  try {
    const updatedChat = await chatService.renameGroup(chatId, chatName);
    res.json(updatedChat);
  } catch (error) {
    next({ status: 400, message: 'Chat Not Found' });
  }
};

//Add group
const addToGroup = async (req, res, next) => {
  const { chatId, userId } = req.body;

  try {
    console.log(chatId, userId);
    const added = await chatService.addToGroup(chatId, userId);
    res.json(added);
  } catch (error) {
    next({ status: 400, message: 'Chat Not Found' });
  }
};

//Remove from group
const removeFromGroup = async (req, res, next) => {
  const { chatId, userId } = req.body;

  try {
    const removed = await chatService.removeFromGroup(chatId, userId);
    res.json(removed);
  } catch (error) {
    next({ status: 400, message: 'Chat Not Found' });
  }
};

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};

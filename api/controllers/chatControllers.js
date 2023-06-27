const chatService = require('../services/chatService');

//Chat access
const accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log('UserId param not sent');
    return res.status(400);
  }

  try {
    const chat = await chatService.accessChat(req.user._id, userId);
    res.send(chat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

//Fetch chats
const fetchChats = async (req, res) => {
  try {
    const chats = await chatService.fetchChats(req.user._id);
    res.status(200).send(chats);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

//Create group
const createGroupChat = async (req, res) => {
  const { users, name } = req.body;

  try {
    const groupChat = await chatService.createGroupChat(users, req.user, name);
    res.status(200).json(groupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

//Rename group
const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  try {
    const updatedChat = await chatService.renameGroup(chatId, chatName);
    res.json(updatedChat);
  } catch (error) {
    res.status(404);
    throw new Error('Chat Not Found');
  }
};

//Add group
const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const added = await chatService.addToGroup(chatId, userId);
    res.json(added);
  } catch (error) {
    res.status(404);
    throw new Error('Chat Not Found');
  }
};

//Remove from group
const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const removed = await chatService.removeFromGroup(chatId, userId);
    res.json(removed);
  } catch (error) {
    res.status(404);
    throw new Error('Chat Not Found');
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

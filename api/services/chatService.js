const Chat = require('../models/chatModel');
const User = require('../models/userModel');

const accessChat = async (currentUserId, userId) => {
  const isChat = await Chat.find({
    isGroupChat: false, // this is one to one chat
    $and: [
      { users: { $elemMatch: { $eq: currentUserId } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate('users', '-password')
    .populate('latestMessage');

  const isChatPopulated = await User.populate(isChat, {
    path: 'latestMessage.sender',
    select: 'name email',
  });

  if (isChatPopulated.length > 0) {
    return isChatPopulated[0]; // in this array will be just one result
  } else {
    const chatData = {
      chatName: 'sender',
      isGroupChat: false,
      users: [currentUserId, userId],
    };

    const createdChat = await Chat.create(chatData);
    const fullChat = await Chat.findOne({ _id: createdChat._id }).populate('users', '-password');
    return fullChat;
  }
};

const fetchChats = async (userId) => {
  const chats = await Chat.find({ users: { $elemMatch: { $eq: userId } } })
    .populate('users', '-password')
    .populate('groupAdmin', '-password')
    .populate('latestMessage')
    .sort({ updatedAt: -1 });

  return await User.populate(chats, {
    path: 'latestMessage.sender',
    select: 'name email',
  });
};

const createGroupChat = async (users, groupAdmin, name) => {
  const groupExists = await Chat.findOne({ chatName: name });

  if (groupExists) {
    throw new Error('Group already exists');
  }

  if (users.length < 2) {
    throw new Error('More than two users are required to form a group chat');
  }

  users.push(groupAdmin); // Add logged in user to users array

  const groupChat = await Chat.create({
    chatName: name,
    users,
    isGroupChat: true,
    groupAdmin,
  });

  return await Chat.findOne({ _id: groupChat._id })
    .populate('users', '-password')
    .populate('groupAdmin', '-password');
};

const renameGroup = async (chatId, chatName) => {
  return await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');
};

const addToGroup = async (chatId, userId) => {
  return await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    { new: true }
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');
};

const removeFromGroup = async (chatId, userId) => {
  return await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    { new: true }
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');
};

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};

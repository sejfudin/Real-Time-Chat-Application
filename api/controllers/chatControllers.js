const Chat = require('../models/chatModel');
const User = require('../models/userModel');

const accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log('UserId param not sent');
    return res.status(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false, //this is one to one chat
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate('users', '-password')
    .populate('latestMessage');

  isChat = await User.populate(isChat, {
    path: 'latestMessage.sender',
    select: 'name, email',
  });

  if (isChat.length > 0) {
    res.send(isChat[0]); //in this array will be just one result
  } else {
    var chatData = {
      chatName: 'sender',
      isGroupChat: false,
      users: [req.user._id, userId],
    };
  }
  try {
    const createdChat = await Chat.create(chatData);

    //get chat from db and send it in response
    const FullChat = await Chat.findOne({ _id: createdChat._id }).populate('users', '-password');
    res.status(200).send(FullChat);
  } catch (error) {}
};

const fetchChats = async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .populate('latestMessage')
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: 'latestMessage.sender',
          select: 'name, email',
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};
const createGroupChat = async (req, res) => {
  var users = JSON.parse(req.body.users);
  if (users.length < 2) {
    return res.status(400).send('MOre than two users are required to form a group chat');
  }
  users.push(req.user); //Add logged in user to users array
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users,
      isGroupChat: true,
      groupAdmin: req.User,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate('users', '-password')
      .populate('groupAdmin', '-password');

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

module.exports = { accessChat, fetchChats, createGroupChat };

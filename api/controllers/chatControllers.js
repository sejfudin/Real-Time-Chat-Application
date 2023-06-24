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

module.exports = { accessChat };

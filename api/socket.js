const socketIO = require('socket.io');

function configureSocket(server) {
  const io = socketIO(server, {
    pingTimeot: 60000,
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('connected to socket.io');

    socket.on('setup', (userData) => {
      socket.join(userData?._id); //create room for the user
      socket.emit('connected');
    });

    socket.on('joinChat', (room) => {
      socket.join(room);
      console.log('User joined room' + room);
    });

    // socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('typing', (room, user) => socket.in(room).emit('typing', user));

    socket.on('stopTyping', (room) => socket.in(room).emit('stopTyping'));

    socket.on('newMessage', (newMessageReceived) => {
      let chat = newMessageReceived.chat;
      if (!chat.users) return console.log('chat.users not defined');
      chat.users.forEach((user) => {
        if (user?._id === newMessageReceived.sender._id) return; //User will not send messages to himself
        socket.in(user._id).emit('messageReceived', newMessageReceived);
      });
    });
    socket.on('newGroup', (newGroup) => {
      newGroup.users.forEach((user) => {
        if (user._id === newGroup.groupAdmin._id) return;
        socket.in(user._id).emit('groupCreated', newGroup);
      });
    });
    socket.on('updateGroup', (updatedGroup) => {
      let { chatName } = updatedGroup;
      updatedGroup.users.forEach((user) => {
        if (user._id === updatedGroup.groupAdmin._id) return;
        socket.in(user._id).emit('groupUpdated', updatedGroup);
      });
    });
  });
}

module.exports = configureSocket;

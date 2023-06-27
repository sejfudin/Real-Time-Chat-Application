const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const chats = require('./dummyData/data');
const mongo = require('./config/mongo');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
dotenv.config();

mongo();
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(express.json());
app.use('/user', userRoutes);
app.use('/chat', chatRoutes);
app.use('/message', messageRoutes);

app.use(errorHandler);

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const io = require('socket.io')(server, {
  pingTimeot: 60000,
  cors: {
    origin: 'http://localhost:3000',
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

  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stopTyping', (room) => socket.in(room).emit('stopTyping'));

  socket.on('newMessage', (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    if (!chat.users) return console.log('chat.users not defined');
    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return; //User will not send messages to himself
      socket.in(user._id).emit('messageReceived', newMessageReceived);
    });
  });
});

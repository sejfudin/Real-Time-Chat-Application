const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongo = require('./config/mongo');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const errorHandler = require('./middleware/errorHandler');
const configureSocket = require('./socket');
const redisClient = require('./redis');

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

configureSocket(server);

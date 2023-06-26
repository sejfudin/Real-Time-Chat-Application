const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const chats = require('./dummyData/data');
const mongo = require('./config/mongo');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

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

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

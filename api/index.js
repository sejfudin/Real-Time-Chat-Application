const express = require('express');
const dotenv = require('dotenv');
const chats = require('./dummy-data/data');

const app = express();
dotenv.config();

app.get('/chat', (req, res) => {
  res.send(chats);
});

app.get('/chat/:id', (req, res) => {
  const { id } = req.params;
  const singleChat = chats.find((c) => c._id === id);
  res.send(singleChat);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

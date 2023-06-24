const express = require('express');
const dotenv = require('dotenv');
const chats = require('./dummyData/data');
const mongo = require('./config/mongo');
const userRoutes = require('./routes/userRoutes');

const app = express();
dotenv.config();

mongo();

app.use(express.json());
app.use('/user', userRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

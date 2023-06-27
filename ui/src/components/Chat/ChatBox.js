import React from 'react';
import { Paper } from '@mui/material';
import SingleChat from './SingleChat';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  return (
    <Paper>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Paper>
  );
};

export default ChatBox;

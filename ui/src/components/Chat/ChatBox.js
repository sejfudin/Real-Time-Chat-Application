import React from 'react';
import { Paper } from '@mui/material';
import { useChatState } from '../../Context/ChatProvider';
import SingleChat from './SingleChat';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = useChatState();

  return (
    <Paper>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Paper>
  );
};

export default ChatBox;

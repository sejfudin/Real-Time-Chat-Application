import React from 'react';
import { Grid } from '@mui/material';
import SideDrawer from './SideDrawer';
import MyChats from './MyChats';
import ChatBox from './ChatBox';
import { useChatState } from '../../Context/ChatProvider';

const ChatPage = () => {
  const { user } = useChatState();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {user && <SideDrawer />}
      </Grid>
      <Grid item xs={12} sm={4}>
        {user && <MyChats />}
      </Grid>
      <Grid item xs={12} sm={8}>
        {user && <ChatBox />}
      </Grid>
    </Grid>
  );
};

export default ChatPage;

import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import SideDrawer from './SideDrawer';
import MyChats from './MyChats';
import ChatBox from './ChatBox';
import { useNavigate } from 'react-router';

const ChatPage = () => {
  const navigate = useNavigate();

  const [fetchAgain, setFetchAgain] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!user && navigate().pathname === '/chats') {
      navigate('/');
    }
    if (user) {
      navigate('/chats');
    }
  }, [navigate]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SideDrawer />
      </Grid>
      <Grid item xs={12} sm={4}>
        <MyChats fetchAgain={fetchAgain} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Grid>
    </Grid>
  );
};

export default ChatPage;

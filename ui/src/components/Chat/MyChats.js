import React, { useEffect, useState } from 'react';
// import { makeStyles } from '@mui/styles';
import { Box, Paper, Typography } from '@mui/material';
import { useChatState } from '../../Context/ChatProvider';
import { fetchChats } from '../../utils/helpers';
import UserListItem from '../User/UserListItem';
import { getSender } from '../../config/chatLogics';

// const useStyles = makeStyles((theme) => ({
//   myChats: {
//     width: '100%',
//     marginBottom: theme.spacing(2),
//     padding: theme.spacing(2),
//   },
// }));

const MyChats = () => {
  // const classes = useStyles();
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = useChatState();

  const getChats = async () => {
    const data = await fetchChats();
    return data;
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    const fetchData = async () => {
      const data = await getChats();
      setChats(data);
    };
    fetchData();
  }, [setChats]);
  return (
    <Box
    // className={ classes.myChats }
    >
      {chats?.map((chat) => (
        <Box
          onClick={() => setSelectedChat(chat)}
          sx={{
            width: 250,
            margin: 2,
            padding: 2,
            backgroundColor: '#DCDCDC',
            borderRadius: 4,
            '&:hover': {
              backgroundColor: 'primary.main',
              opacity: [0.9, 0.8, 0.7],
            },
          }}>
          <Typography sx={{ fontWeight: 'bold' }}>
            {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default MyChats;

import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useChatState } from '../../Context/ChatProvider';
import { fetchChats } from '../../services/chatService';
import { getSender } from '../../config/chatLogics';
import GroupChatModal from '../Modals/GroupChatModal';

const TitleText = styled(Typography)`
  margin-right: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding-top: 10px;
  font-size: 20px;
  font-weight: bold;
  color: black;
`;

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, chats, setChats } = useChatState();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  }, [setChats, fetchAgain]);

  return (
    <Paper sx={{ minHeight: '85vh', padding: 2 }}>
      <Stack direction='row' alignItems='center' mb={2}>
        <TitleText>My Chats</TitleText>
        <Button variant='contained' onClick={() => setIsModalOpen(true)}>
          New Group Chat
        </Button>
      </Stack>

      {chats?.map((chat) => (
        <Box
          key={chat._id}
          onClick={() => setSelectedChat(chat)}
          sx={{
            width: 250,
            margin: 2,
            padding: 2,
            backgroundColor: selectedChat?._id === chat?._id ? 'primary.main' : '#DCDCDC',
            borderRadius: 4,
            '&:hover': {
              backgroundColor: 'primary.main',
              opacity: [0.9, 0.8, 0.7],
            },
          }}>
          <Typography sx={{ fontWeight: 'bold' }}>
            {!chat?.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
          </Typography>
        </Box>
      ))}
      <GroupChatModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Paper>
  );
};

export default MyChats;

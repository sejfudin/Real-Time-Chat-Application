import { Box, FormControl, Input, Paper, Stack, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useChatState } from '../../Context/ChatProvider';
import UpdateGroupChatModal from '../Modals/UpdateGroupChatModal';
import { getSender, getSenderFull } from '../../utils/helpers.js/chatLogics';
import ProfileModal from '../Modals/ProfileModal';
import { useEffect, useState } from 'react';
import { getMessages, messageSend } from '../../services/messageService';
import ScrollableChat from './ScrollableChat';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);

  const { user, selectedChat } = useChatState();

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }

    const data = await getMessages(selectedChat._id);
    setMessages(data);
  };
  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line
  }, [selectedChat]);

  const sendMessage = async (e) => {
    const updateData = {
      content: newMessage,
      chatId: selectedChat._id,
    };
    if (e.key === 'Enter' && newMessage) {
      setNewMessage('');
      const data = await messageSend(updateData);

      setMessages([...messages, data]);
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Typography variant='h5'>
            {!selectedChat.isGroupChat ? (
              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <span>{getSender(user, selectedChat.users)}</span>
                <ProfileModal
                  user={getSenderFull(user, selectedChat.users)}
                  open={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
                <VisibilityIcon sx={{ marginRight: '30px' }} onClick={() => setIsModalOpen(true)} />
              </Stack>
            ) : (
              <>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                  <span>{selectedChat.chatName.toUpperCase()}</span>
                  <UpdateGroupChatModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    fetchMessages={fetchMessages}
                    open={isUpdateModalOpen}
                    onClose={() => setIsUpdateModalOpen(false)}
                  />
                  <VisibilityIcon
                    sx={{ marginRight: '30px' }}
                    onClick={() => setIsUpdateModalOpen(true)}
                  />
                </Stack>
              </>
            )}
          </Typography>
          <Box
            sx={{
              minHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}>
            <ScrollableChat messages={messages} />
            <FormControl onKeyDown={sendMessage} required sx={{ marginTop: '3px' }}>
              <Input placeholder='Enter a message...' onChange={typingHandler} value={newMessage} />
            </FormControl>
          </Box>
        </>
      ) : (
        <Paper
          sx={{
            minHeight: '85vh',
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Typography variant='h5' align='center'>
            Click on a user to start chatting
          </Typography>
        </Paper>
      )}
    </>
  );
};

export default SingleChat;

import { Box, FormControl, Input, Paper, Stack, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useChatState } from '../../Context/ChatProvider';
import UpdateGroupChatModal from '../Modals/UpdateGroupChatModal';
import { getSender, getSenderFull } from '../../utils/helpers/chatLogics';
import ProfileModal from '../Modals/ProfileModal';
import { useEffect, useState } from 'react';
import { getMessages, messageSend } from '../../services/messageService';
import ScrollableChat from './ScrollableChat';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socket from '../../utils/helpers/socket';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(false);

  const { user, selectedChat, notification, setNotification } = useChatState();

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }

    const data = await getMessages(selectedChat._id);
    setMessages(data);

    socket.emit('joinChat', selectedChat._id);
  };

  useEffect(() => {
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing', () => {
      const typingUser = user;
      const { name } = typingUser;
      setIsTyping(true);
      setTypingUser(name);
    });

    socket.on('stopTyping', () => setIsTyping(false));

    return () => {
      socket.off('connected');
      socket.off('typing');
      socket.off('stopTyping');
    };
  }, [user]);

  useEffect(() => {
    fetchMessages();

    // selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on('messageReceived', (newMessageReceived) => {
      if (!selectedChat || selectedChat._id !== newMessageReceived.chat._id) {
        //give notification
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
    return () => {
      socket.off('messageReceived');
    };
  });

  const sendMessage = async (e) => {
    const updateData = {
      content: newMessage,
      chatId: selectedChat._id,
      senderId: user._id,
    };
    if (e.key === 'Enter' && newMessage) {
      socket.emit('stopTyping', selectedChat._id);
      setNewMessage('');
      try {
        const data = await messageSend(updateData);
        socket.emit('newMessage', data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;

    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit('stopTyping', selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
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
              {isTyping && <div>{`${typingUser} typing...`}</div>}
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
      <ToastContainer autoClose={30000} />
    </>
  );
};

export default SingleChat;

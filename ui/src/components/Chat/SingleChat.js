import { Box, Paper, Stack, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useChatState } from '../../Context/ChatProvider';
import UpdateGroupChatModal from '../Modals/UpdateGroupChatModal';
import { getSender, getSenderFull } from '../../config/chatLogics';
import ProfileModal from '../Modals/ProfileModal';
import { useState } from 'react';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat } = useChatState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

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
          <Box>{/* Messages here */}</Box>
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

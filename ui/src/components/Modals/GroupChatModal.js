import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  styled,
  Box,
  Button,
  TextField,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useChatState } from '../../Context/ChatProvider';
import { searchUser } from '../../services/userService';
import UserListItem from '../User/UserListItem';
import { createGroupChat } from '../../services/chatService';

const ModalTitle = styled(DialogTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CreateChatButton = styled(Button)`
  text-transform: none; /* Remove uppercase */
`;

const CloseButton = styled(IconButton)`
  margin-left: auto;
`;

const GroupChatModal = ({ open, onClose }) => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const { user, chats, setChats } = useChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    const data = await searchUser(search);
    setSearchResult(data);
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleRemove = (userToRemove) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel !== userToRemove));
  };

  const handleCloseAfterSubmit = () => {
    setGroupName('');
    setSelectedUsers([]);
    setSearch('');
    onClose();
  };

  const handleCreateChat = async () => {
    const formData = {
      name: groupName,
      users: JSON.stringify(selectedUsers.map((user) => user._id)),
    };
    const createdGroup = await createGroupChat(formData);
    setChats([createdGroup, ...chats]);
    handleCloseAfterSubmit();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <ModalTitle>
        <Typography variant='h6'>Create Group Chat</Typography>
        <CloseButton aria-label='close' onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      </ModalTitle>
      <DialogContent>
        <TextField
          label='Group Name'
          variant='outlined'
          name='groupName'
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          fullWidth
          margin='normal'
          required
        />
        <TextField
          label='Member Names'
          variant='outlined'
          name='memberNames'
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          fullWidth
          margin='normal'
          required
        />
        {selectedUsers.map((user) => (
          <Chip
            label={`${user.name} X`}
            variant='outlined'
            sx={{ backgroundColor: 'primary.main', cursor: 'pointer' }}
            onClick={() => handleRemove(user)}
          />
        ))}

        {searchResult &&
          search &&
          searchResult.map((user) => (
            <UserListItem user={user} key={user._id} handleFunction={() => handleGroup(user)} />
          ))}
      </DialogContent>
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-end', padding: '8px', marginRight: '20px' }}>
        <CreateChatButton variant='contained' color='primary' onClick={handleCreateChat}>
          Create Chat
        </CreateChatButton>
      </Box>
    </Dialog>
  );
};

export default GroupChatModal;

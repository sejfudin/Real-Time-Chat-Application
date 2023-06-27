import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  styled,
  Chip,
  TextField,
  Box,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UserListItem from '../User/UserListItem';
import { useChatState } from '../../Context/ChatProvider';
import {
  addUserToGroupChat,
  removeUserFromGroupChat,
  updateGroupChat,
} from '../../services/chatService';
import { searchUser } from '../../services/userService';

const ModalTitle = styled(DialogTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled(IconButton)`
  margin-left: auto;
`;
const UpdateGroupButton = styled(Button)`
  text-transform: none; /* Remove uppercase */
  margin-left: 5px;
  padding: 12px;
`;

const LeaveGroupButton = styled(Button)`
  text-transform: none; /* Remove uppercase */
`;

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, open, onClose, fetchMessages }) => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [groupName, setGroupName] = useState('');

  const { selectedChat, setSelectedChat, user } = useChatState();
  const loggedUser = JSON.parse(localStorage.getItem('userInfo'));
  const { _id: userId } = user;

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    const data = await searchUser(search);
    setSearchResult(data);
  };

  const handleRemoveUser = async (userToRemove) => {
    //just admin can remove user
    if (selectedChat.groupAdmin?._id !== user._id && userToRemove._id !== user._id) {
      return;
    }
    const updateData = {
      chatId: selectedChat._id,
      userId: userToRemove._id,
    };
    const data = await removeUserFromGroupChat(updateData);
    userToRemove._id === user._id ? setSelectedChat() : setSelectedChat(data);
    setSelectedChat(data);
    setFetchAgain(!fetchAgain);
    fetchMessages();
  };

  const handleAddUser = async (userToAdd) => {
    if (selectedChat.users.find((user) => user._id === userToAdd._id)) {
      return;
    }

    //Just Admin can add someone
    if (selectedChat.groupAdmin?._id !== userId) {
      return;
    }
    const addToChatData = {
      chatId: selectedChat._id,
      userId: userToAdd._id,
    };

    const data = await addUserToGroupChat(addToChatData);
    setSelectedChat(data);
    setFetchAgain(!fetchAgain);
  };

  const handleUpdate = async () => {
    const updateData = {
      chatId: selectedChat._id,
      chatName: groupName,
    };
    const updatedGroup = await updateGroupChat(updateData);
    setSelectedChat(updatedGroup);
    setFetchAgain(!fetchAgain);
    setGroupName('');
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <ModalTitle>
        <Typography variant='h6'>{selectedChat.chatName}</Typography>
        <CloseButton aria-label='close' onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      </ModalTitle>
      <DialogContent>
        {selectedChat.users.map((u) => {
          if (u._id !== user._id) {
            return (
              <Chip
                key={u._id}
                label={`${u.name} X`}
                variant='outlined'
                sx={{ backgroundColor: 'primary.main', cursor: 'pointer' }}
                onClick={() => handleRemoveUser(u)}
              />
            );
          }
          return null;
        })}
        {selectedChat.users.length === 1 && (
          <Typography sx={{ color: 'red' }}>You are alone in the group*</Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
          <UpdateGroupButton
            variant='contained'
            color='primary'
            sx={{ height: '100%' }}
            size='large'
            disabled={!groupName}
            onClick={handleUpdate}>
            Update
          </UpdateGroupButton>
        </Box>

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

        {searchResult &&
          search &&
          searchResult.map((user) => (
            <UserListItem user={user} key={user._id} handleFunction={() => handleAddUser(user)} />
          ))}
      </DialogContent>
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-end', padding: '8px', marginRight: '20px' }}>
        <LeaveGroupButton
          variant='contained'
          color='error'
          onClick={() => {
            handleRemoveUser(loggedUser);
            setSelectedChat('');
            onClose();
          }}>
          Leave Group
        </LeaveGroupButton>
      </Box>
    </Dialog>
  );
};
export default UpdateGroupChatModal;

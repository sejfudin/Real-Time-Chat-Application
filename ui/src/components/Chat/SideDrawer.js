import React, { useState } from 'react';
import {
  Paper,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  TextField,
  Button,
  Badge,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/system';
import { useChatState } from '../../Context/ChatProvider';
import ProfileModal from '../Modals/ProfileModal';
import { logout, searchUser } from '../../services/userService';
import { createChat } from '../../services/chatService';
import UserListItem from '../User/UserListItem';
import { useNavigate } from 'react-router';
import { getSender } from '../../utils/helpers/chatLogics';

const SideDrawerContainer = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;

const SearchContainer = styled('div')`
  display: flex;
  align-items: center;
`;

const SearchInput = styled(Typography)`
  margin-right: 8px;
  cursor: pointer;
`;

const LiveChatText = styled(Typography)`
  flex-grow: 1;
  text-align: center;
`;
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
const SideDrawer = () => {
  const { user, setSelectedChat, chats, setChats, notification, setNotification } = useChatState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState();
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationOpen = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl1(null);
  };

  const handleOpenModal = () => {
    setIsProfileModalOpen(true);
    handleMenuClose();
  };

  const handleCloseModal = () => {
    setIsProfileModalOpen(false);
  };

  const handleDrawerOpen = async () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = async () => {
    setSearchResult(await searchUser(searchValue));
  };

  const accessChat = async (userId) => {
    const data = await createChat(userId);
    if (!chats.find((c) => c._id === data._id)) {
      setChats([data, ...chats]);
    }
    setSelectedChat(data);
    handleDrawerClose();
  };

  const logoutUser = async () => {
    const loggedUser = JSON.parse(localStorage.getItem('userInfo'));
    await logout(loggedUser._id);
    navigate('/');
  };

  return (
    <>
      <SideDrawerContainer elevation={2}>
        <SearchContainer>
          <SearchInput variant='body1' onClick={handleDrawerOpen}>
            Search user
          </SearchInput>
          <IconButton aria-label='search' onClick={handleDrawerOpen}>
            <SearchIcon />
          </IconButton>
        </SearchContainer>
        <LiveChatText variant='body1'>Live Chat Application</LiveChatText>
        <div>
          <IconButton aria-label='notifications' onClick={handleNotificationOpen}>
            <Badge badgeContent={notification.length} color='secondary'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={anchorEl1}
            open={Boolean(anchorEl1)}
            onClose={handleNotificationClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}>
            {!notification.length && 'No New Messages'}
            {notification.map((n) => {
              return (
                <MenuItem
                  key={n._id}
                  onClick={() => {
                    setSelectedChat(n.chat);
                    setNotification(notification.filter((notif) => notif !== n));
                    handleNotificationClose();
                  }}>
                  {n.chat.isGroupChat
                    ? `New Message in ${n.chat.chatName}`
                    : `New Message from ${getSender(user, n.chat.users)} `}
                </MenuItem>
              );
            })}
          </Menu>
          <IconButton aria-label='profile' onClick={handleMenuOpen}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}>
            <MenuItem onClick={handleOpenModal}>My Profile</MenuItem>
            <MenuItem onClick={logoutUser}>Logout</MenuItem>
          </Menu>
        </div>
      </SideDrawerContainer>
      <Drawer anchor='left' open={isDrawerOpen} onClose={handleDrawerClose}>
        <TitleText>Search user</TitleText>
        <List>
          <ListItem>
            <TextField
              placeholder='Search user'
              value={searchValue}
              size='small'
              onChange={handleSearchChange}
            />
            <Button
              onClick={handleSearchSubmit}
              size='small'
              variant='outlined'
              sx={{ ml: 2 }}
              disabled={!searchValue}>
              GO
            </Button>
          </ListItem>
          {searchResult?.map((user) => (
            <UserListItem key={user._id} user={user} handleFunction={() => accessChat(user._id)} />
          ))}
        </List>
      </Drawer>
      <ProfileModal open={isProfileModalOpen} onClose={handleCloseModal} user={user} />
    </>
  );
};

export default SideDrawer;

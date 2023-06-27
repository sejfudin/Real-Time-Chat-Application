import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ModalTitle = styled(DialogTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled(IconButton)`
  margin-left: auto;
`;

const ProfileModal = ({ open, onClose, user }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <ModalTitle>
        <Typography variant='h6'>Profile</Typography>
        <CloseButton aria-label='close' onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      </ModalTitle>
      <DialogContent>
        <Typography variant='body1'>Name: {user?.name}</Typography>
        <Typography variant='body1'>Email: {user?.email}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;

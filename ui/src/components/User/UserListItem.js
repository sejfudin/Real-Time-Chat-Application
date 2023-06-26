import { Typography, Box } from '@mui/material';

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
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
      <Typography sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
    </Box>
  );
};
export default UserListItem;

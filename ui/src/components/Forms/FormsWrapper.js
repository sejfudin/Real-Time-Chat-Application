import React, { useEffect, useState } from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router';

const FormsWrapper = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (user) {
      navigate('/chats');
    }
  }, [navigate]);

  const handleShowRegisterForm = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };

  const handleShowLoginForm = () => {
    setShowRegisterForm(false);
    setShowLoginForm(true);
  };

  return (
    <Grid container justifyContent='center' alignItems='center' sx={{ minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ padding: '2rem', maxWidth: '400px' }}>
        <Typography variant='h4' gutterBottom sx={{ textAlign: 'center', marginBottom: '2rem' }}>
          Live Chat Application
        </Typography>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={6}>
            <Button onClick={handleShowRegisterForm} variant='contained' color='primary' fullWidth>
              Register
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleShowLoginForm} variant='contained' color='secondary' fullWidth>
              Login
            </Button>
          </Grid>
        </Grid>
        {showRegisterForm && <RegisterForm />}
        {showLoginForm && <LoginForm />}
      </Paper>
    </Grid>
  );
};

export default FormsWrapper;

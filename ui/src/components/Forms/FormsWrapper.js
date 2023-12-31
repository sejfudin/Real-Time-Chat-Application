import React, { useEffect, useState } from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router';

const FormsWrapper = () => {
  const navigate = useNavigate();

  const [activeForm, setActiveForm] = useState('login');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (user) {
      navigate('/chats');
    }
  }, [navigate]);

  return (
    <Grid container justifyContent='center' alignItems='center' sx={{ minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ padding: '2rem', maxWidth: '400px' }}>
        <Typography variant='h4' gutterBottom sx={{ textAlign: 'center', marginBottom: '2rem' }}>
          Live Chat Application
        </Typography>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={6}>
            <Button
              onClick={() => setActiveForm('register')}
              variant='contained'
              color='primary'
              fullWidth>
              Register
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => setActiveForm('login')}
              variant='contained'
              color='secondary'
              fullWidth>
              Login
            </Button>
          </Grid>
        </Grid>
        {activeForm === 'register' ? <RegisterForm /> : <LoginForm />}
      </Paper>
    </Grid>
  );
};

export default FormsWrapper;

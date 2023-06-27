import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { loginUser } from '../../services/userService';
import { useNavigate } from 'react-router';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(formData, navigate);
  };

  return (
    <Container
      maxWidth='sm'
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <form
        onSubmit={handleSubmit}
        style={{ width: '100%', border: '1px solid #ccc', padding: '20px' }}>
        <TextField
          label='Email'
          name='email'
          type='email'
          value={formData.email}
          onChange={handleInputChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label='Password'
          name='password'
          type='password'
          value={formData.password}
          onChange={handleInputChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type='submit' variant='contained' color='primary' sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;

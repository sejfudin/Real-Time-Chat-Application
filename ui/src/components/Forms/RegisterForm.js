import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { registerUser } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    await registerUser(formData, navigate);
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <Container
      maxWidth='sm'
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <form
        onSubmit={handleSubmit}
        style={{ width: '100%', border: '1px solid #ccc', padding: '20px' }}>
        <TextField
          label='Name'
          name='name'
          value={formData.name}
          onChange={handleInputChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
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
        <TextField
          label='Confirm Password'
          name='confirmPassword'
          type='password'
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type='submit' variant='contained' color='primary' sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default RegisterForm;

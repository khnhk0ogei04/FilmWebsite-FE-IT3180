import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, InputLabel, Card, Alert } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FooterComponent1 } from '../footer1/FooterComponent1';

export const RegisterComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [user, setUser] = useState({
    username: '',
    password: '',
    fullname: '',
    email: '',
    city: '',
    phone: '',
  });

  const navigate = useNavigate();
  const EMAIL_REGEX = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]{2,6}$/;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!EMAIL_REGEX.test(user.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
      });
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/users', user);
      Swal.fire({
        icon: 'success',
        title: 'Account Created',
        text: 'Your account has been created successfully!',
      });
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.');
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.response?.data?.message || 'Something went wrong.',
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f7f7f7',
          padding: '20px',
        }}
      >
        <Card
          sx={{
            maxWidth: '600px',
            width: '100%',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: 'center',
              color: '#1976D2',
              fontWeight: 'bold',
              marginBottom: '20px',
            }}
          >
            Create New Account
          </Typography>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  variant="outlined"
                  type="password"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Full Name"
                  name="fullname"
                  value={user.fullname}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ fontWeight: 'bold', marginBottom: '8px' }}>Upload Avatar</InputLabel>
                <Button variant="contained" component="label">
                  Upload Image
                  <input type="file" hidden onChange={handleImageChange} />
                </Button>
                {imagePreview && (
                  <Box mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      src={imagePreview}
                      alt="Avatar Preview"
                      style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  name="city"
                  value={user.city}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  padding: '10px 20px',
                  backgroundColor: '#1976D2',
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: '#115293' },
                }}
              >
                Register
              </Button>
            </Box>
          </form>
        </Card>
      </Box>
      <Box sx={{ marginTop: '30px' }}>
        <FooterComponent1 />
      </Box>
    </>
  );
};

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Link, Box, Grid, Container, Paper } from '@mui/material';
import { FooterComponent1 } from '../footer1/FooterComponent1';

export const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleCreateNewAccount = () => {
    navigate("/register");
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
      const { jwt, role } = response.data;
      localStorage.setItem('token', jwt);
      const cleanedRole = role.replace(/[\[\]']+/g, '');
      localStorage.setItem('role', cleanedRole);

      if (cleanedRole === 'ROLE_ADMIN') {
        navigate('/admin');
      } else if (cleanedRole === 'ROLE_USER') {
        navigate('/user');
      }
    } catch (error) {
      setErrorMessage('Login failed: Incorrect username or password');
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={6} sx={{ padding: 4, borderRadius: 4 }}>
          <Box textAlign="center" mb={3}>
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              color="primary"
              gutterBottom
            >
              SIGN IN
            </Typography>
            <img
              src="https://fami.hust.edu.vn/sohoa/assets/logo-59e9d691.png"
              alt="ABC"
              style={{ height: '80px', marginBottom: '20px' }}
            />
          </Box>
          <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextField
              label="Username"
              variant="outlined"
              type="text"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
            {errorMessage && (
              <Typography color="error" sx={{ mt: 1, textAlign: 'center' }}>
                {errorMessage}
              </Typography>
            )}
                <Button
                onClick={handleLogin}
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                >
                Login
                </Button>
            </form>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                <Grid item>
                <NavLink
                    to={'/reset-password'}
                    style={{ textDecoration: 'none', color: '#1976d2', fontSize: '14px' }}
                >
                    Forgot Password?
                </NavLink>
                </Grid>
                <Grid item>
                <Button
                    variant="text"
                    onClick={handleCreateNewAccount}
                    sx={{ textTransform: 'none', fontSize: '14px' }}
                >
                    Create New Account
                </Button>
                </Grid>
                </Grid>
            </Paper>
        </Container>
        <Box sx={{ marginTop: '50px' }}>
            <FooterComponent1 />
        </Box>
    </>
  );
};

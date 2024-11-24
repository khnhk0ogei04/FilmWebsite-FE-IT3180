import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Avatar, Paper, Grid, CircularProgress, Divider, Card } from '@mui/material';
import axios from 'axios';

export const UserDetailInfo = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch user details');
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleBack = () => {
    navigate('/admin/users');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4, maxWidth: 700, width: '100%', borderRadius: 3, backgroundColor: '#f9f9f9' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          User Information
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Avatar
            alt={user.fullname}
            src={user.avatar || 'https://via.placeholder.com/150'}
            sx={{
              width: 150,
              height: 150,
              border: '4px solid #1976d2',
              boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
            }}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              Full Name:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {user.fullname}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              Username:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{user.username}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              Email:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{user.email}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              City:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{user.city || 'N/A'}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              Phone:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{user.phone || 'N/A'}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              Role:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{user.role?.name || 'N/A'}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBack}
            sx={{
              px: 4,
              py: 1,
              fontWeight: 'bold',
              borderRadius: 2,
              boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
            }}
          >
            Back to User List
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

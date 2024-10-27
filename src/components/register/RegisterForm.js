import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

export const RegisterComponent = () => {

    const [user,setUser] = useState({
        username: '',
        fullname: '',
        avatar: '',
        email: '',
        city: '',
        phone: '',
    });

    const navigate = useNavigate();
    const EMAIL_REGEX = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]{2,6}$/;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = async(event) => {
        event.preventDefault();

        if (!EMAIL_REGEX.test(user.email)){
            Swal.fire({
                icon: 'error',
                title: 'Invalid format email, try again...',
                text: 'Please enter a valid email, which contains @, [A-Za-z0-9]'
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/users', user);
            Swal.fire({
                icon: 'success',
                title: 'Account Created',
                text: 'Your account has been created successfully!',
            });
            navigate('/login');
        } catch (error) {
            if (error.response) {
                Swal.fire({
                  icon: 'error',
                  title: 'Username Exists',
                  text: 'This username is already taken.',
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Registration Failed',
                  text: 'Wrong',
                });
              }
        }
    }
    return (
        <>
            <Box className="register-box" sx={{ padding: '40px', backgroundColor: '#f9f9f9', borderRadius: '8px', maxWidth: '600px', marginTop: '80px', marginLeft: 'auto', marginRight: 'auto' }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontSize: '32px', textAlign: 'center', color: '#cf1627', fontWeight: 'bold' }}
                >
                    Create New Account
                </Typography>
                <form className="register-form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            label="Username"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            variant="outlined"
                            type='text'
                            fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            label="Password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            variant="outlined"
                            type='password'
                            fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            label="Full Name"
                            name="fullname"
                            value={user.fullname}
                            onChange={handleChange}
                            variant="outlined"
                            type='text'
                            fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            label="Avatar URL"
                            name="avatar"
                            value={user.avatar}
                            onChange={handleChange}
                            variant="outlined"
                            type='text'
                            fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            label="Email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            variant="outlined"
                            type='text'
                            fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            label="City"
                            name="city"
                            value={user.city}
                            onChange={handleChange}
                            variant="outlined"
                            type='text'
                            fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            label="Phone"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            variant="outlined"
                            type='text'
                            fullWidth
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{ backgroundColor: '#4CAF50', color: '#fff' }}
                        >
                            Register
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    )
}
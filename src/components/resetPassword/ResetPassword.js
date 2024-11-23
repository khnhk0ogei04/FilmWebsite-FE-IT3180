import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Paper, Container } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import FooterComponent1 from '../footer1/FooterComponent1';

export const ResetPassword = () => {

    const [username, setUsername] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/users/reset-password", null, {
                params: { username }
            });
            Swal.fire({
                icon: 'success',
                title: 'Successfully',
                text: response.data,
                timer: 1500,
                showConfirmButton: false
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.response ? error.response.data : 'An unexpected error occurred.',
                timer: 1500,
                showConfirmButton: false
            });
        }
    };

    return (
        <>
            <Container maxWidth="sm" sx={{ mt: 10, mb: 6 }}>
                <Paper elevation={6} sx={{ padding: 4, borderRadius: 4 }}>
                    <Box textAlign="center" mb={3}>
                        <Typography variant="h4" component="h1" fontWeight="bold" color="primary" gutterBottom>
                            Reset Password
                        </Typography>
                        <img
                            src="https://fami.hust.edu.vn/sohoa/assets/logo-59e9d691.png"
                            alt="Logo"
                            style={{ height: '80px', marginBottom: '20px' }}
                        />
                    </Box>
                    <Typography
                        variant="body1"
                        align="center"
                        color="textSecondary"
                        sx={{ mb: 3 }}
                    >
                        Hãy cho chúng tôi biết Username của bạn và chúng tôi<br />
                        sẽ gửi cho bạn liên kết đặt lại mật khẩu qua email.
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="username"
                            label="Username"
                            variant="outlined"
                            fullWidth
                            required
                            placeholder="Nhập Username của bạn"
                            margin="normal"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Gửi liên kết mật khẩu
                        </Button>
                    </form>
                </Paper>
            </Container>
            <Box sx={{ mt: 5 }}>
                <FooterComponent1 />
            </Box>
        </>
    );
};

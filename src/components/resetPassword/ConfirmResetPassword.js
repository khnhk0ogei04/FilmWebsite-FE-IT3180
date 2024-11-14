import { Typography, TextField, Button, Box, Grid } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

export const ConfirmResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    let { token } = useParams();
    const navigate = useNavigate();
    if (token.startsWith("token=")) {
        token = token.substring(6);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/users/reset-password/confirm", null, {
                params: { token, newPassword }
            });
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: response.data,
                timer: 1500
            })
            .then(() => {
                navigate('/login');
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: error.response ? error.response.data : "Đã xảy ra lỗi.",
            });
        }
    };

    return (
        <Box 
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                padding: 2,
                margin: 1
            }}
        >
            <Grid 
                container
                justifyContent= 'center'
                alignItems= 'center'
                sx = {{maxWidth: 500, backgroundColor: '#fff', borderRadius: 2, boxShadow: 3, padding: 3}}
            >
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" gutterBottom sx={{fontWeight: 'bold', color: 'red'}}>
                        RESET PASSWORD
                    </Typography>
                </Grid>
                <Grid item xs={12} >
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Mật khẩu mới"
                            variant="outlined"
                            fullWidth
                            required
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            margin="normal"
                        />
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            fullWidth
                            sx={{marginTop: 2}}
                        >
                            Đổi Mật Khẩu
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Box>
    );
};

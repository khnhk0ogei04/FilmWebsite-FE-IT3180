import { Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

export const ConfirmResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    let { token } = useParams();
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
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: error.response ? error.response.data : "Đã xảy ra lỗi.",
            });
        }
    };

    return (
        <div className="confirm-reset-password-box">
            <Typography variant="h4" align="center">Đặt Lại Mật Khẩu</Typography>
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
                >
                    Đổi Mật Khẩu
                </Button>
            </form>
        </div>
    );
};

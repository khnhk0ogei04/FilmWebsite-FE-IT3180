import { Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './ResetPassword.css';

export const ResetPassword = () => {

    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/users/reset-password", null, {
                params: {username}
            });
            setMessage(response.data);
            Swal.fire({
                icon: 'success',
                title: 'Successfully',
                text: response.data,
                timer: 1500,
                showConfirmButton: false
            })
        } catch (error) {
            setMessage(error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error,
                timer: 1500,
                showConfirmButton: false
            })
        }
    }


    return (
        <>
            <div className="resetPasswordBox">
                <div className="resetPasswordContainer">
                    <div className="header">
                        <h4 className="title" style={{color: '#CF1627'}}>Reset Password</h4>
                        <div className="logo-container">
                            <img src="https://fami.hust.edu.vn/sohoa/assets/logo-59e9d691.png" alt="Logo" className="logo-image" />
                        </div>
                    </div>
                    <Typography variant="body1" className="description" align="center" margin={"20px 0px"}>
                        Hãy cho chúng tôi biết Username của bạn và chúng tôi<br/>sẽ gửi cho bạn liên kết đặt lại mật khẩu qua email.
                    </Typography>
                    <form method="POST" className="forgot-password-form" onSubmit={handleSubmit}>
                        <div className="form-item">
                            <TextField
                                id="username"
                                label="username"
                                variant="outlined"
                                fullWidth
                                required
                                placeholder="Nhập Username của bạn"
                                margin="normal"
                                value = {username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="form-item">
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary" 
                                className="submit-button"
                                fullWidth
                            >
                                Gửi liên kết mật khẩu
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

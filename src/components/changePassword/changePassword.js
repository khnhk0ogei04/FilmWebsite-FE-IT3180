
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import './changePasswordComponent.css';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';

export const ChangePasswordComponent = () => {
    const [username, setUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChangePassword = async(event) => {
        event.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setErrorMessage("New password and confirmed password must be the same");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await axios.post("http://localhost:8080/api/auth/change-password", {
                username, currentPassword, newPassword
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setSuccessMessage("Password changed successfully");
            setErrorMessage("");
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Successfully changed password!',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error("Change Password Error:", error);
            setErrorMessage("Failed to change password");
            setSuccessMessage("");
        }
    };

    return (
        <div className="change-password-box">
            <Typography 
                variant="h4" 
                gutterBottom 
                sx={{
                    fontSize: '36px',
                    textAlign: 'center',
                    color: '#00ADEF',
                    fontWeight: 'bold',
                    marginTop: '20px'
                }}
            >
                Change Password
            </Typography>
            <form className='change-password-form' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                    label={
                        <Typography component="span">
                            Username <span style={{ color: 'red' }}>*</span>
                        </Typography>
                    }
                    type="text"
                    variant="outlined"
                    margin='normal'
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    sx={{
                        width: '100%',
                        maxWidth: '350px'
                    }}
                />
                <TextField
                    label={
                        <Typography component="span">
                            Current Password <span style={{ color: 'red' }}>*</span>
                        </Typography>
                    }
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)} 
                    sx={{
                        maxWidth: '350px',
                        width: '100%',
                    }}
                />
                <TextField
                    label="New Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    sx={{
                        maxWidth: '350px',
                        width: '100%',
                    }}
                />
                <TextField
                    label="Confirm New Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={confirmNewPassword} 
                    onChange={(e) => setConfirmNewPassword(e.target.value)} 
                    sx={{
                        maxWidth: '350px',
                        width: '100%',
                    }}
                />
                {errorMessage && <Typography color="error" sx={{ textAlign: 'center' }}>{errorMessage}</Typography>}
                {successMessage && <Typography color="primary" sx={{ textAlign: 'center' }}>{successMessage}</Typography>}
                <Button
                    variant="contained"
                    sx={{ alignSelf: 'center', marginTop: '20px' }}
                    onClick={handleChangePassword}
                >
                    Change Password
                </Button>
            </form>
        </div>
    );
}

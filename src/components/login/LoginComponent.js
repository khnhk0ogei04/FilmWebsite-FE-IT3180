import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Link } from '@mui/material';
import FooterComponent1 from '../footer1/FooterComponent1';

export const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


    const handleCreateNewAccount = () => {
        navigate("/register");
    }

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });       
            console.log("Response Data:", response.data); 
            const { jwt, role } = response.data; 
            localStorage.setItem('token', jwt);
            const cleanedRole = role.replace(/[\[\]']+/g, '');
            localStorage.setItem('role', cleanedRole);
            if (cleanedRole === 'ROLE_ADMIN') {
                navigate('/admin');  // chuyển hướng tới trang quản trị viên
            } else if (cleanedRole === 'ROLE_USER') {
                navigate('/user');  // chuyển hướng tới trang người dùng
            }
        } catch (error) {
            console.error("Login Error:", error);
            setErrorMessage('Login failed: Incorrect username or password');
        }
    };

//   return (
//     <div className="login-box">
//       <Typography variant="h2" gutterBottom>Sign In</Typography>
//       <form className="login-form">
//         <TextField
//           label="Username"
//           variant="outlined"
//           type="text"
//           margin="normal"
//           fullWidth
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <TextField
//           label="Password"
//           variant="outlined"
//           type="password"
//           margin="normal"
//           fullWidth
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         {errorMessage && <Typography color="error">{errorMessage}</Typography>}
//         <Button variant="contained" onClick={handleLogin}>Login</Button>
//       </form>
//     </div>
//   );
    return (
        <>
                    <div className="login-box">
                        <Typography 
                            variant="h2" 
                            gutterBottom 
                            sx={{
                                fontSize: '48px',       
                                textAlign: 'center',    
                                color: '#cf1627',        
                                fontWeight: 'bold', 
                                marginTop: '20px',
                            }}
                        >
                            SIGN IN
                        </Typography>
                        <form className='login-form'  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src='https://fami.hust.edu.vn/sohoa/assets/logo-59e9d691.png' alt='ABC' 
                                style={{height: '90px'}}
                            />
                            <TextField
                                label="Username"
                                variant="outlined"
                                type='text'
                                margin="normal"
                                className="input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{
                                    maxWidth: '350px',
                                    width: '100%',
                                }}
                                required= 'true'
                            />
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                className="input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{
                                    maxWidth: '350px',
                                    width: '100%',
                                }}
                                required='true'
                            />
                            {errorMessage && <Typography color="error" sx={{ textAlign: 'center' }}>{errorMessage}</Typography>}
                            <Button
                                onClick={handleLogin}
                                variant="contained"
                                id="login-button"
                                sx={{ alignSelf: 'center', marginBottom: '20px', marginTop: '20px'}}
                            >
                                Login
                            </Button>
                        </form>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div className='forgotPassword' style={{ display: 'flex', alignItems: 'center' }}>
                                <NavLink 
                                    to={'/reset-password'} 
                                    style={{ fontSize: '16px', fontFamily: 'Roboto, sans-serif', textDecoration: 'none', color: '#00ADEF' }} 
                                >
                                    Forgot Password?
                                </NavLink>
                            </div>
                            <hr style={{ width: '350px', border: '1px dashed #ccc', marginTop: '25px' }} />
                            <Button
                                variant="contained"
                                style={{ backgroundColor: '#4CAF50', color: '#fff', marginTop: '10px' }}
                                onClick={handleCreateNewAccount}
                            >
                                Create New Account
                            </Button>
                        </div>
                    </div>    
                    <div className='footer' style={{marginTop: '150px'}}>
                        <FooterComponent1 />
                    </div>
        </>
    )
};

import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState("");
    const [fullName, setFullName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (token){
            setIsLoggedIn(true);
            axios.get("http://localhost:8080/api/auth/me", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log(response);
                setFullName(response.data.fullname);
                setAvatarUrl(response.data.avatar);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }, []);
    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', marginLeft: "40px" }}>
                    <img
                        src="https://bhdstar.vn/wp-content/uploads/2024/09/logo2024.png" 
                        alt="Logo"
                        style={{ height: '40px', marginRight: '10px' }}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ mr: 2 }}>Xin chào, {fullName}</Typography>
                    <IconButton sx={{ p: 0 }}>
                        <Avatar src={avatarUrl} />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

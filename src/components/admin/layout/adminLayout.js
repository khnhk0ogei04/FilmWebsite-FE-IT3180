import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import NavBar from '../navbar/NavBar';
import ResponsiveAppBar from '../header/Header';
import { Footer } from '../footer/Footer';

const drawerWidth = 240; 

const AdminLayout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Box sx={{ width: '100%', position: 'fixed', top: 0, zIndex: 1201 }}>
                <ResponsiveAppBar />
            </Box>
            <Box sx={{ display: 'flex', flex: 1, mt: 8 }}>
                <Box sx={{ width: `${drawerWidth}px`, flexShrink: 0 }}>
                    <NavBar />
                </Box>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        padding: 3,
                        mt: 8,
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    mt: 'auto',
                    zIndex: 1200, 
                    backgroundColor: '#f9f9f9',
                }}
            >
                <Footer />
            </Box>
        </Box>
    );
};

export default AdminLayout;

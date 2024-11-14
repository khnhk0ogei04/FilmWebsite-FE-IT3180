import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import NavBar from '../navbar/NavBar';
import ResponsiveAppBar from '../header/Header';

const drawerWidth = 240; 

const AdminLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Header */}
            <Box sx={{ width: '100%', position: 'fixed', top: 0, zIndex: 1201 }}>
                <ResponsiveAppBar />
            </Box>
            <Box sx={{ width: `${drawerWidth}px`, flexShrink: 0, mt: 8 }}>
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
    );
};

export default AdminLayout;

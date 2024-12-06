import React from 'react';
import { Box, Button, Typography, Card, CardMedia, CardContent } from '@mui/material';

export const Donate = () => {
    return (
        <Box 
            sx={{
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh', 
                backgroundColor: '#FFF7', 
                padding: 4
            }}
        >
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, mb: 4 }}>
                <CardMedia
                    component="img"
                    image="https://res.cloudinary.com/davwqqao1/image/upload/v1730040475/ny7ywevgkghy8fidmhgy.png" 
                    alt="QR Code for Donation"
                    sx={{ width: 300, height: 'auto', mb: 2 }}
                />
                <CardContent>
                    <Typography variant="h6" color="text.primary" align="center">
                        NGUYEN DUY KHANH
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" align="center">
                        0470801122004
                    </Typography>
                </CardContent>
            </Card>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: '#1e90ff',
                    color: '#fff',
                    padding: '10px 20px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    borderRadius: '25px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.2s ease, background-color 0.3s ease',
                    '&:hover': {
                        backgroundColor: '#0077cc',
                        transform: 'scale(1.1)',
                    },
                }}
            >
                DONATE HERE
            </Button>
        </Box>
    );
};

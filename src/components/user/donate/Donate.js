import React from 'react';
import { Box, Button, Typography, Card, CardMedia, CardContent } from '@mui/material';

export const Donate = () => {
    return (
        <Box 
            sx={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh', 
                backgroundColor: '#FFF7', 
                padding: 4
            }}
        >
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, mr: 8 }}>
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

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign:'center' }}>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                    Chọn cách cúng dường
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ mb: 2, width: 200 }}
                >
                    Cúng chuyển khoản
                </Button>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    sx={{ mb: 2, width: 200 }}
                >
                    Cúng ở hòm công đức
                </Button>
                <Button 
                    variant="contained" 
                    color="success" 
                    sx={{ width: 200 }}
                >
                    Nhét vào tay tượng phật
                </Button>
            </Box>
        </Box>
    );
};

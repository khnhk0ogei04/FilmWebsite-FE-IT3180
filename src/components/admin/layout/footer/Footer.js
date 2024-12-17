import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

export const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#f5f5f5',
                py: 4,
                mt: 5,
                borderTop: '1px solid #ddd'
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={3} justifyContent={'center'} marginTop={3}>
                    <Typography
                        variant='h6'
                        gutterBottom
                        sx={{
                            color: '#333',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}
                    >
                        CAPSTONE PROJECT OF IT3180 - INTRODUCTION TO SOFTWARE ENGINEERING
                    </Typography>
                </Grid>
                <Grid container spacing={2} justifyContent={'center'} marginTop={2}>
                    <Typography
                        variant='body1'
                        gutterBottom
                        sx={{
                            color: '#555',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}
                    >
                        Group 21 - Admin UI
                    </Typography>
                </Grid>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: 3,
                        gap: 3
                    }}
                >
                    <Link href="#" target="_blank" rel="noopener">
                        <Twitter sx={{ fontSize: '24px', color: '#1DA1F2', '&:hover': { color: '#0d8bec' } }} />
                    </Link>
                    <Link href="#" target="_blank" rel="noopener">
                        <Facebook sx={{ fontSize: '24px', color: '#1877F2', '&:hover': { color: '#145dbf' } }} />
                    </Link>
                    <Link href="#" target="_blank" rel="noopener">
                        <Instagram sx={{ fontSize: '24px', color: '#E1306C', '&:hover': { color: '#bc2a8d' } }} />
                    </Link>
                    <Link href="#" target="_blank" rel="noopener">
                        <LinkedIn sx={{ fontSize: '24px', color: '#0A66C2', '&:hover': { color: '#004182' } }} />
                    </Link>
                </Box>
                <Typography
                    variant="body2"
                    align="center"
                    sx={{ mt: 3, color: '#777' }}
                >
                    © 2024.1 - 154018 - All rights reserved
                </Typography>
            </Container>
        </Box>
    );
};

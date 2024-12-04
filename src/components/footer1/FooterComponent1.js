import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

export const FooterComponent1 = () => {
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
                <Grid container spacing={3} justifyContent="center">
                    <Grid item>
                        <Link href="#" underline="none" sx={{ color: '#555', fontWeight: 'bold', fontSize: '24px' }}>
                            GROUP 21 - CAPSTONE PROJECT - INTRODUCTION TO SOFTWARE ENGINEERING
                        </Link>
                    </Grid>
                </Grid>
                <Grid container mt={2} justifyContent="center">
                    <Grid item>
                        <Typography variant='h6' gutterBottom sx={{color: '#F56040', fontWeight: 600}}>
                            -- Cinema Booking Ticket Website --
                        </Typography>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: 3,
                        gap: 2
                    }}
                >
                    <Link href="#" color="inherit">
                        <Twitter sx={{ fontSize: '24px', color: '#1DA1F2' }} />
                    </Link>
                    <Link href="https://www.facebook.com/khanhnd0112" color="inherit">
                        <Facebook sx={{ fontSize: '24px', color: '#17A9FD' }} />
                    </Link>
                    <Link href="https://www.facebook.com/khanhnd0112" color="inherit">
                        <Instagram sx={{ fontSize: '24px', color: '#E1306C' }} />
                    </Link>
                    <Link href="#" color="inherit">
                        <LinkedIn sx={{ fontSize: '24px', color: '#0A66C2' }} />
                    </Link>
                </Box>

                <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                    sx={{ mt: 2, color: '#777' }}
                >
                    © 2024.1 - 154018 - All right reserved
                </Typography>
            </Container>
        </Box>
    );
};

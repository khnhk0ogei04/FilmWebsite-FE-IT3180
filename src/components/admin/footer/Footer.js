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
                <Grid container spacing={3} justifyContent="center">
                    <Grid item>
                        <Link href="#" underline="none" sx={{ color: '#555', fontWeight: 'bold', fontSize: '14px' }}>
                            Features
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" underline="none" sx={{ color: '#555', fontWeight: 'bold', fontSize: '14px' }}>
                            Enterprise
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" underline="none" sx={{ color: '#555', fontWeight: 'bold', fontSize: '14px' }}>
                            Support
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" underline="none" sx={{ color: '#555', fontWeight: 'bold', fontSize: '14px' }}>
                            ICO
                        </Link>
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
                        <Twitter sx={{ fontSize: '24px', color: '#555' }} />
                    </Link>
                    <Link href="#" color="inherit">
                        <Facebook sx={{ fontSize: '24px', color: '#555' }} />
                    </Link>
                    <Link href="#" color="inherit">
                        <Instagram sx={{ fontSize: '24px', color: '#555' }} />
                    </Link>
                    <Link href="#" color="inherit">
                        <LinkedIn sx={{ fontSize: '24px', color: '#555' }} />
                    </Link>
                </Box>

                <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                    sx={{ mt: 2, color: '#777' }}
                >
                    © 2024 Pied Piper. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

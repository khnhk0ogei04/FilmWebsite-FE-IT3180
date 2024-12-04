import React from 'react';
import { Box, Typography, IconButton, Grid, Link, Container } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, Image } from '@mui/icons-material';

export const Footer = () => {
    return (
        <Box sx={{
            backgroundColor: '#F5F5F5',
            py: 4,
            mt: 5,
            borderTop: '1px solid #ddd'
        }}>
            <Container sx={{marginLeft: 'auto', marginRight: 'auto', maxWidth: "lg"}}            
            >
                <Grid item>
                    <Typography variant='h5' href="#" underline='none' sx={{color: '#555', fontWeight: 'bold', fontSize: '24px', textDecoration: 'none', textAlign: 'center'}}>
                        GROUP 21 - CAPSTONE PROJECT - INTRODUCTION TO SOFTWARE ENGINEERING
                    </Typography>
                </Grid>
                <Grid container mt={2} spacing={3} justifyContent="center" alignItems={'center'} textAlign={'center'}>
                    <Typography variant='h6' fontWeight={500} sx={{color: '#777'}}>Frontend UI </Typography>
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
                        <Twitter sx={{fontSize: '24px', color: '#657786', alignItems: 'center'}} />
                    </Link>
                    <Link href="#" color="inherit">
                        <Facebook sx={{ fontSize: '24px', color: '#657786' }} />
                    </Link>
                    <Link href="#" color="inherit">
                        <Instagram sx={{ fontSize: '24px', color: '#657786' }} />
                    </Link>
                    <Link href="#" color="inherit">
                        <LinkedIn sx={{ fontSize: '24px', color: '#657786' }} />
                    </Link>

                </Box>
                <Grid item>
                    <Typography variant = 'body2' sx={{color: 'text-secondary', mt: 2, color: '#777', justifyContent: 'center', textAlign: 'center', fontWeight: '500', fontSize: '18px'}}                    
                    >
                        @2024.1 - 154918 - Copyright Reserved
                    </Typography>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;

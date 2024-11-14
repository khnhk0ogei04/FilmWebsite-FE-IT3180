import React from 'react';
import { Box, Typography, IconButton, Grid, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, Image } from '@mui/icons-material';

export const Footer = () => {
    return (
        <Box sx={{ bgcolor: '#f9f9f9', py: 5, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
                <img src='https://bhdstar.vn/wp-content/uploads/2023/08/logo.png' alt="Image" style={{marginRight: "20px", width: "48px", height:"48px"}}/>
            </Typography>
            <Grid container justifyContent="center" spacing={3}>
                <Grid item>
                    <Link href="#" underline="none" sx={{ color: 'text.primary' }}>
                        First Link
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" underline="none" sx={{ color: 'text.primary' }}>
                        Second Link
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" underline="none" sx={{ color: 'text.primary' }}>
                        Third Link
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" underline="none" sx={{ color: 'text.primary' }}>
                        Fourth Link
                    </Link>
                </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
                <IconButton href="#" color="primary">
                    <Facebook />
                </IconButton>
                <IconButton href="#" color="primary">
                    <Twitter />
                </IconButton>
                <IconButton href="#" color="primary">
                    <Instagram />
                </IconButton>
                <IconButton href="#" color="primary">
                    <LinkedIn />
                </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, color: '#E5E5E5', fontWeight: 'bold' }}>
                © 2024 Nereus. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;

import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';
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
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    textAlign="center"
                    sx={{ fontSize: '20px', letterSpacing: '1px', mb: 2 }}
                >
                    GROUP 21 - CAPSTONE PROJECT - INTRODUCTION TO SOFTWARE ENGINEERING
                </Typography>
                <Typography
                    variant="subtitle1"
                    textAlign="center"
                    sx={{ fontSize: '16px', color: '#BDBDBD', mb: 3 , fontWeight: 'bold'}}
                >
                    Frontend UI
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 3,
                        mb: 3,
                    }}
                >
                    <Link href="#" target="_blank" rel="noopener">
                        <Twitter
                            sx={{
                                fontSize: '30px',
                                color: '#1DA1F2',
                                '&:hover': { color: '#0D8BEC' },
                            }}
                        />
                    </Link>
                    <Link href="#" target="_blank" rel="noopener">
                        <Facebook
                            sx={{
                                fontSize: '30px',
                                color: '#1877F2',
                                '&:hover': { color: '#145DBF' },
                            }}
                        />
                    </Link>
                    <Link href="#" target="_blank" rel="noopener">
                        <Instagram
                            sx={{
                                fontSize: '30px',
                                color: '#E1306C', 
                                '&:hover': { color: '#BC2A8D' },
                            }}
                        />
                    </Link>
                    <Link href="#" target="_blank" rel="noopener">
                        <LinkedIn
                            sx={{
                                fontSize: '30px',
                                color: '#0A66C2', 
                                '&:hover': { color: '#004182' },
                            }}
                        />
                    </Link>
                </Box>
                <Typography
                    variant="body2"
                    textAlign="center"
                    sx={{
                        color: '#BDBDBD',
                        fontSize: '14px',
                        letterSpacing: '0.5px',
                    }}
                >
                    @2024.1 - 154918 - All Rights Reserved
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;

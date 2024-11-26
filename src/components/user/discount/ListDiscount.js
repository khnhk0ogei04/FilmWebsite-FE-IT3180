import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Grid, Typography, Box, Pagination, Dialog, DialogContent, Button } from '@mui/material';
import axios from 'axios';

export const ClientListDiscount = () => {
    const [discounts, setDiscounts] = useState([]);
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);

    useEffect(() => {
        axios.get('http://localhost:8080/api/discounts')
            .then(response => {
                setDiscounts(response.data);
            })
            .catch(error => {
                console.log('Error fetching discounts:', error);
            });
    }, []);

    const handleOpenModal = (discount) => {
        setSelectedDiscount(discount);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setSelectedDiscount(null);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDiscounts = discounts.slice(indexOfFirstItem, indexOfLastItem);

    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Box sx={{ py: 6, px: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
            <Typography 
                variant="h3" 
                align="center" 
                sx={{ fontWeight: "bold", color: "#007BFF", mb: 4 }}
            >
                DISCOUNT
            </Typography>

            <Grid container spacing={4}>
                {currentDiscounts.map((discount) => (
                    <Grid item xs={12} sm={6} md={4} key={discount.id}>
                        <Card 
                            sx={{
                                boxShadow: 4,
                                borderRadius: 2,
                                cursor: "pointer",
                                overflow: "hidden",
                                transition: "transform 0.3s",
                                '&:hover': { transform: "scale(1.05)", boxShadow: 6 },
                            }}
                            onClick={() => handleOpenModal(discount)}
                        >
                            <CardMedia
                                component="img"
                                width= '100%'
                                height='auto'
                                image={discount.imageUrl || 'https://bhdstar.vn/wp-content/uploads/2024/10/Combo-online-web.jpg'}
                                alt={discount.notificationTitle}
                                sx={{ objectFit: "cover" }}
                            />
                            <CardContent>
                                <Typography 
                                    variant="h6" 
                                    align="center" 
                                    fontWeight="bold" 
                                    sx={{ color: '#32a852' }}
                                >
                                    {discount.notificationTitle}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog 
                open={open} 
                onClose={handleCloseModal} 
                maxWidth="md" 
                fullWidth
            >
                <DialogContent sx={{ p: 4 }}>
                    {selectedDiscount && (
                        <Grid container spacing={3} alignItems="center">
                            <Grid item xs={12} md={5}>
                                <img
                                    src={selectedDiscount.imageUrl || "https://bhdstar.vn/wp-content/uploads/2024/10/Combo-online-web.jpg"}
                                    alt={selectedDiscount.notificationTitle}
                                    style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                                />
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <Typography 
                                    variant="h5" 
                                    gutterBottom 
                                    sx={{ fontWeight: "bold", color: "#007BFF" }}
                                >
                                    {selectedDiscount.notificationTitle}
                                </Typography>
                                <div
                                    dangerouslySetInnerHTML={{ __html: selectedDiscount.notificationContent }}
                                    style={{ color: '#555', lineHeight: '1.6', marginTop: '16px' }}
                                />
                                <Box sx={{ textAlign: 'right', mt: 3 }}>
                                    <Button 
                                        variant="outlined" 
                                        onClick={handleCloseModal}
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        Close
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
            </Dialog>

            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    mt: 4 
                }}
            >
                <Pagination
                    count={Math.ceil(discounts.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handleChangePage}
                    color="primary"
                    size="large"
                    shape="rounded"
                />
            </Box>
        </Box>
    );
};

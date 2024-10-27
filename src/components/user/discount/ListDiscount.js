import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Grid, Typography, Box, Pagination, Dialog, DialogContent } from '@mui/material';
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
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Khuyến mãi
            </Typography>

            <Grid container spacing={3}>
                {currentDiscounts.map((discount) => (
                    <Grid item xs={12} sm={6} md={4} key={discount.id}>
                        <Card sx={{ boxShadow: 3, borderRadius: 2, border: "1px solid #ddd", cursor:"pointer", padding: 2 }} onClick={() => handleOpenModal(discount)}>
                            <CardMedia
                                component="img"
                                height="250"
                                image="https://bhdstar.vn/wp-content/uploads/2024/10/Combo-online-web.jpg"
                                alt={discount.notificationTitle}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                    sx={{ color: '#32a852' }} 
                                >
                                    {discount.notificationTitle}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            
            <Dialog open={open} onClose={handleCloseModal} maxWidth="md" fullWidth>
                <DialogContent>
                    {selectedDiscount && (
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5}>
                                <img
                                    src={selectedDiscount.imageUrl || "https://bhdstar.vn/wp-content/uploads/2024/10/Combo-online-web.jpg"}
                                    alt={selectedDiscount.notificationTitle}
                                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                                />
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <Typography gutterBottom variant="h5" component="div" sx={{ color: '#32a852' }}>
                                    {selectedDiscount.notificationTitle}
                                </Typography>
                                <div
                                    dangerouslySetInnerHTML={{ __html: selectedDiscount.notificationContent }}
                                    style={{ color: '#000', lineHeight: '1.6' }}
                                />
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
            </Dialog>


            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                    count={Math.ceil(discounts.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handleChangePage}
                    color="primary"
                />
            </Box>
        </Box>
    );
};

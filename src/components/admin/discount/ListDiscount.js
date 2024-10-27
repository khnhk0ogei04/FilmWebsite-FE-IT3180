import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Card } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


export const ListDiscount = () => {
    const [discounts, setDiscounts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get('http://localhost:8080/api/discounts', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setDiscounts(response.data);
            } catch (error) {
                console.error('Error', error);
            }
        };

        fetchDiscounts();
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete?',
            text: "Delete Account",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteDiscount(id);
            }
        });
    };

    const deleteDiscount = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8080/api/discounts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            Swal.fire('Deleted', 'Discount has been deleted', 'success');
            setDiscounts(discounts.filter(discount => discount.id !== id));
        } catch (error) {
            console.error('Error', error);
            Swal.fire('Error', 'Error deleting account', 'error');
        }
    };

    const handleAddNewDiscount = () => {
        navigate("/admin/discount/add")
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom align="center">Discount List</Typography>
            <Button variant="contained" startIcon={<Add />} sx={{ mb: 2 }} onClick={handleAddNewDiscount}>
                Add New Discount
            </Button>
            <Card sx={{ p: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Content</TableCell>
                            <TableCell>Percentage</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {discounts.map(discount => (
                            <TableRow key={discount.id}>
                                <TableCell>{discount.id}</TableCell>
                                <TableCell>{discount.notificationTitle}</TableCell>
                                <TableCell>{discount.notificationContent}</TableCell>
                                <TableCell>{discount.discountPercentage}%</TableCell>
                                <TableCell>
                                    <IconButton color="error" onClick={() => handleDelete(discount.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </Box>
    );
};

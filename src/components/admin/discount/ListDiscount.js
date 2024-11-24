import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Card,
    TableContainer,
    Paper,
} from '@mui/material';
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
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setDiscounts(response.data);
            } catch (error) {
                console.error('Error fetching discounts:', error);
            }
        };

        fetchDiscounts();
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete?',
            text: 'Do you want to delete this discount?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
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
                    'Authorization': `Bearer ${token}`,
                },
            });
            Swal.fire('Deleted!', 'Discount has been deleted.', 'success');
            setDiscounts(discounts.filter((discount) => discount.id !== id));
        } catch (error) {
            console.error('Error deleting discount:', error);
            Swal.fire('Error!', 'Error deleting discount.', 'error');
        }
    };

    const handleAddNewDiscount = () => {
        navigate('/admin/discount/add');
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography
                variant="h4"
                gutterBottom
                align="center"
                sx={{ fontWeight: 'bold', mb: 3 }}
            >
                Discount List
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    color="primary"
                    onClick={handleAddNewDiscount}
                >
                    Add New Discount
                </Button>
            </Box>
            <Card>
                <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow
                                sx={{
                                    backgroundColor: '#1976d2',
                                }}
                            >
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Title</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Content</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Percentage</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {discounts.map((discount) => (
                                <TableRow
                                    key={discount.id}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                        },
                                    }}
                                >
                                    <TableCell>{discount.id}</TableCell>
                                    <TableCell>{discount.notificationTitle}</TableCell>
                                    <TableCell>
                                        <Typography
                                            component="div"
                                            dangerouslySetInnerHTML={{
                                                __html: discount.notificationContent,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{discount.discountPercentage}%</TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(discount.id)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
};

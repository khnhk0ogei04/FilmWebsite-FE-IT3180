import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Alert,
    Container,
} from '@mui/material';

export const CategoriesList = () => {
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setErrorMessage('Missing token. Please log in.');
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/api/categories', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);

                if (error.response && error.response.status === 403) {
                    setErrorMessage('You are not authorized to view this resource.');
                } else {
                    setErrorMessage('Error fetching categories.');
                }
            }
        };

        fetchCategories();
    }, [navigate]);

    const handleAddNewCategory = () => {
        const role = localStorage.getItem('role');
        if (role && role.includes('ADMIN')) {
            navigate(`/admin/categories/add`);
        } else {
            setErrorMessage('You do not have permission to add a category.');
        }
    };

    const handleCategoryClick = (categoryId) => {
        navigate(`/admin/categories/${categoryId}`);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant='h3' gutterBottom sx={{fontSize: '38px', fontWeight: 'bold', color: '#1976d2', textAlign: 'center'}}>
                CATEGORIES LIST
            </Typography>

            {errorMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errorMessage}
                </Alert>
            )}

            <Box display="flex" justifyContent="flex-end" sx={{ mb: 3 }}>
                <Button
                    variant="contained"
                    color="info"
                    onClick={handleAddNewCategory}
                >
                    Add New Category
                </Button>
            </Box>

            <Grid container spacing={3} justifyContent="center" alignItems="stretch">
                {categories.map((category) => (
                    <Grid item xs={12} sm={6} md={4} key={category.id}>
                        <Card
                            sx={{
                                height: '100%',
                                cursor: 'pointer',
                                boxShadow: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.03)',
                                },
                            }}
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            <CardMedia
                                component="img"
                                height="450"
                                image={category.image}
                                alt={category.categoryName}
                                sx={{
                                    objectFit: 'cover',
                                    borderTopLeftRadius: '4px',
                                    borderTopRightRadius: '4px',
                                }}
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {category.categoryName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Description...
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

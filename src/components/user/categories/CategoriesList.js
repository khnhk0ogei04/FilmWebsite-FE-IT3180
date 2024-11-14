import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const CategoriesListUser = () => {

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories: ', error);
            }
        };
        fetchCategories();
    }, []);

    const handleCardClick = (categoryId) => {
        navigate(`/user/categories/${categoryId}`)
    }

    return (
        <>
            <Box sx={{p: 4}}>
                <Typography variant='h3' gutterBottom fontWeight='bold' align={'center'} >
                    Movie Categories
                </Typography>
                <Grid container spacing={4}>
                    {categories.map((category) => (
                    <Grid item xs={12} sm={6} md={4} key={category.id}>
                        <Card sx={{ maxWidth: 345, mx: 'auto', boxShadow: 3, borderRadius: 2 }}
                            onClick={() => handleCardClick(category.id)}
                        >
                        <CardMedia
                            component="img"
                            height="400"
                            image={category.image || 'https://via.placeholder.com/200'}
                            alt={category.categoryName}
                            sx={{ objectFit: 'cover' }}
                        />
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                            {category.categoryName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {category.movies.length} {category.movies.length === 1 ? 'movie' : 'movies'}
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )
}
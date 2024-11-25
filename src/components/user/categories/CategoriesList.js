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
        navigate(`/user/categories/${categoryId}`);
    };

    return (
        <Box sx={{ py: 6, px: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
            <Typography 
                variant="h3" 
                gutterBottom 
                align="center" 
                sx={{ 
                    fontWeight: "bold", 
                    color: "linear-gradient(to right, #FF6F61, #D72638)", 
                    mb: 4, 
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", 
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                }}
            >
                Movie Categories
            </Typography>
            <Grid container spacing={4}>
                {categories.map((category) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
                        <Card 
                            sx={{ 
                                maxWidth: 345, 
                                mx: "auto", 
                                boxShadow: 4, 
                                borderRadius: 3, 
                                overflow: "hidden", 
                                transition: "transform 0.3s", 
                                '&:hover': { transform: "scale(1.05)" },
                                cursor: "pointer",
                            }}
                            onClick={() => handleCardClick(category.id)}
                        >
                            <CardMedia
                                component="img"
                                height="400px"
                                image={category.image || 'https://via.placeholder.com/400'}
                                alt={category.categoryName}
                                sx={{ objectFit: "cover" }}
                            />
                            <CardContent sx={{ textAlign: "center", backgroundColor: "#fff" }}>
                                <Typography 
                                    variant="h6" 
                                    fontWeight="bold" 
                                    sx={{ color: "#333", mb: 1 }}
                                >
                                    {category.categoryName}
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    color="text.secondary"
                                    sx={{ color: "#555" }}
                                >
                                    {category.movies.length} {category.movies.length === 1 ? 'movie' : 'movies'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

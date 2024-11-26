import { Box, Card, CardContent, CardMedia, Grid, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const CategoriesListUser = () => {

    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

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

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedCategories = categories.slice(startIndex, endIndex);

    return (
        <Box sx={{ py: 6, px: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
            <Typography 
                variant="h3" 
                gutterBottom 
                align="center" 
                sx={{ 
                    variant: "h3",
                    align: "center",
                    fontWeight:"bold",
                    color: '#007BFF', 
                    marginBottom: '30px'
                }}
            >
                Movie Categories
            </Typography>
            <Grid container spacing={4}>
                {displayedCategories.map((category) => (
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
            <Box
                sx={{
                    mt: 6,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}
            >
                <Pagination
                    count={Math.ceil(categories.length / itemsPerPage)}
                    onChange={handlePageChange}
                    color="primary"
                    shape="rounded"
                    variant="outlined"
                    size="large"
                    showFirstButton
                    showLastButton
                />
            </Box>
        </Box>
    );
};

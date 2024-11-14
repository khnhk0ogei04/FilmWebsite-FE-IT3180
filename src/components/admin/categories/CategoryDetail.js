import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

export const CategoryDetail = () => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/categories/${categoryId}`);
                setCategory(response.data);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        fetchCategory();
    }, [categoryId]);

    if (!category) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Typography variant="h4">{category.categoryName}</Typography>
            <CardMedia component="img" image={category.image} alt={category.categoryName} style={{ height: '300px', objectFit: 'cover' }} />
            <Typography variant="h6">Movies in this category:</Typography>
            <Grid container spacing={2}>
                {category.movies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} key={movie.id}>
                        <Link to={`/admin/movies/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Card>
                                <CardMedia component="img" image={movie.image} alt={movie.movieName}/>
                                <CardContent>
                                    <Typography variant="h5">{movie.movieName}</Typography>
                                    <Typography variant="body2">{movie.description}</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

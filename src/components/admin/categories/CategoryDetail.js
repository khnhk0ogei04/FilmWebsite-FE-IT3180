import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
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
        <Container style={{ paddingTop: '20px', textAlign: 'center' }}>
            <Typography
                variant="h4"
                style={{
                    textAlign: 'center',
                    color: '#1e90ff',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                }}
            >
                {category.categoryName}
            </Typography>

            <CardMedia
                component="img"
                image={category.image}
                alt={category.categoryName}
                style={{
                    display: 'block',
                    margin: '0 auto',
                    maxWidth: '400px',
                    height: 'auto',
                    objectFit: 'cover',
                    marginBottom: '30px',
                    borderRadius: '10px',
                }}
            />

            <Typography
                variant="h4"
                style={{
                    marginTop: '30px',
                    marginBottom: '30px',
                    color: '#1e90ff',
                    fontWeight: 'bold',
                }}
            >
                Movies in this category:
            </Typography>

            <Grid container spacing={3}>
                {category.movies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} key={movie.id}>
                        <Link
                            to={`/admin/movies/${movie.id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <Card
                                style={{
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    transition: 'transform 0.3s ease',
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.transform = 'scale(1.05)')
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.transform = 'scale(1)')
                                }
                            >
                                <CardMedia
                                    component="img"
                                    image={movie.image}
                                    alt={movie.movieName}
                                    style={{
                                        height: 'auto',
                                        objectFit: 'cover',
                                    }}
                                />
                                <CardContent>
                                    <Typography
                                        variant="h5"
                                        style={{
                                            fontWeight: 'bold',
                                            color: '#1e90ff',
                                        }}
                                    >
                                        {movie.movieName}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        style={{ color: '#555' }}
                                        dangerouslySetInnerHTML={{ __html: movie.description }}
                                    />
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

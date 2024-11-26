import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Card, CardMedia, CardContent, Grid, Divider } from '@mui/material';
import axios from 'axios';

export const CategoriesDetailUser = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategoriesDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/categories/${categoryId}`);
        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching category details:', error);
      }
    };
    fetchCategoriesDetail();
  }, [categoryId]);

  if (!category) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h5" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Typography
        variant="h3"
        align="center"
        fontWeight="bold"
        gutterBottom
        sx={{ color: '#007BFF', mb: 4 }}
      >
        {category.categoryName}
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4} display="flex" justifyContent="center">
          <CardMedia
            component="img"
            image={category.image || 'https://via.placeholder.com/400'}
            alt={category.categoryName}
            sx={{
              width: '100%',
              maxWidth: 350,
              height: 'auto',
              borderRadius: 3,
              boxShadow: 4,
            }}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ color: '#F08080', mb: 2, textAlign: 'center', justifyContent: 'center' }}
          >
            Movies in this Category
          </Typography>
          <Divider sx={{ mb: 3, borderColor: '#007BFF' }} />

          {category.movies.length > 0 ? (
            category.movies.map((movie) => (
              <Card
                key={movie.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 3,
                  boxShadow: 3,
                  borderRadius: 3,
                  textDecoration: 'none',
                  backgroundColor: '#fff',
                  '&:hover': {
                    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                  },
                }}
                component={Link}
                to={`/user/movies/${movie.id}`}
              >
                <CardMedia
                  component="img"
                  image={movie.image || 'https://via.placeholder.com/100'}
                  alt={movie.movieName}
                  sx={{
                    width: 120,
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '3px 0 0 3px',
                  }}
                />
                <CardContent sx={{ flex: 1, p: 2 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: '#007BFF', mb: 1 }}
                  >
                    {movie.movieName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5, fontStyle: 'italic' }}
                  >
                    <strong>Director:</strong> {movie.directors}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontStyle: 'italic' }}
                  >
                    <strong>Cast:</strong> {movie.cast}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              No movies available in this category.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

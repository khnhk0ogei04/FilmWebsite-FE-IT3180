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
        console.error('Error', error);
      }
    };
    fetchCategoriesDetail();
  }, [categoryId]);

  if (!category) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
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
              height: 'auto',
              maxWidth: 350,
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Movies in this Category:
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {category.movies.map((movie) => (
            <Card
              key={movie.id}
              sx={{
                display: 'flex',
                mb: 2,
                boxShadow: 2,
                borderRadius: 2,
                textDecoration: 'none',
              }}
              component={Link}
              to={`/user/movies/${movie.id}`} 
            >
              <CardMedia
                component="img"
                image={movie.image || 'https://via.placeholder.com/100'}
                alt={movie.movieName}
                sx={{ width: 100, height: 'auto', objectFit: 'cover' }}
              />
              <CardContent sx={{ flex: 1, p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  {movie.movieName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Director: {movie.directors}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cast: {movie.cast}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

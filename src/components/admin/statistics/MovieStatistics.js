import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CardMedia,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ViewAgendaOutlined, VisibilityOutlined } from '@mui/icons-material';

export const MovieStatistics = () => {
  const [movies, setMovies] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('id');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const itemsPerPage = 5;

  useEffect(() => {
    fetchMovieStatistics(sortCriteria, page - 1);
  }, [sortCriteria, page]);

  const fetchMovieStatistics = async (sort, currentPage) => {
    try {
      const response = await axios.get('http://localhost:8080/api/statistics/movies', {
        params: {
          sort: sort,
          page: currentPage,
          size: itemsPerPage,
        },
      });
      setMovies(response.data.content);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching:', error);
      setLoading(false);
    }
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleViewStatistics = (movieId) => {
    Swal.fire({
      icon: 'info',
      title: 'Loading Statistics',
      text: `Redirecting to detailed statistics for movie ID: ${movieId}`,
      timer: 1500,
      showConfirmButton: false,
    });
    navigate(`/admin/statistics/${movieId}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <img
          src="https://png.pngtree.com/png-clipart/20220719/original/pngtree-loading-icon-vector-transparent-png-image_8367371.png"
          alt="Loading"
          style={{ width: '150px', height: '150px' }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Movie Statistics
      </Typography>

      <Grid container justifyContent="flex-end" sx={{ mb: 3 }}>
        <Grid item>
          <FormControl variant="outlined" size="small">
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              value={sortCriteria}
              onChange={handleSortChange}
              label="Sort By"
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="id">Sort by ID</MenuItem>
              <MenuItem value="rating">Sort by Rating</MenuItem>
              <MenuItem value="tickets">Sort by Tickets Sold</MenuItem>
              <MenuItem value="revenue">Sort by Revenue</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table aria-label="movie statistics table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Movie Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Image</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Average Rating</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Tickets Sold</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Revenue</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow
                key={movie.movieId}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <TableCell sx={{ textAlign: 'center' }}>{movie.movieId}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{movie.movieName}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <CardMedia
                    component="img"
                    image={movie.image}
                    alt={movie.movieName}
                    sx={{
                      width: '120px',
                      height: 'auto',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      margin: 'auto',
                    }}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{movie.averageRating.toFixed(1)}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{movie.ticketsSold.toLocaleString()}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{movie.revenue.toLocaleString()}đ</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {movie.status === 1 ? (
                    <Typography color="green">Active</Typography>
                  ) : (
                    <Typography color="red">Inactive</Typography>
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <IconButton 
                    variant='contained'
                    color = 'primary' 
                    onClick={() => handleViewStatistics(movie.movieId)}
                  >
                    <VisibilityOutlined sx={{color: '#1976d2', fontSize: '28px'}}/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container justifyContent="center" sx={{ mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Grid>
    </Box>
  );
};

import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid, Pagination, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const MovieStatistics = () => {
  const [movies, setMovies] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('id'); 
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const itemsPerPage = 10;

  useEffect(() => {
    fetchMovieStatistics(sortCriteria, page - 1); 
  }, [sortCriteria, page]);

  const fetchMovieStatistics = async (sort, currentPage) => {
    try {
      const response = await axios.get('http://localhost:8080/api/statistics/movies', {
        params: {
          sort: sort,
          page: currentPage,
          size: itemsPerPage
        }
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
    navigate(`/admin/statistics/${movieId}`);
  };

  if (loading) {
    return (
        <>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img src='https://png.pngtree.com/png-clipart/20220719/original/pngtree-loading-icon-vector-transparent-png-image_8367371.png' 
                    alt = "Loading"
                    style={{width: '300px', height: '300px'}}
                />
            </div>    
        </>
    )
  }
  console.log(movies);
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Movie Statistics
      </Typography>

      <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
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

      <TableContainer component={Paper}>
        <Table aria-label="movie statistics table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Movie Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Average Rating</TableCell>
              <TableCell>Tickets Sold</TableCell>
              <TableCell>Revenue</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>View Statistics</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.movieId}>
                <TableCell>{movie.movieId}</TableCell>
                <TableCell>{movie.movieName}</TableCell>
                <TableCell>
                  <img src={movie.image} alt={movie.movieName} style={{ width: '100px', height: 'auto' }} />
                </TableCell>
                <TableCell>{movie.averageRating.toFixed(1)}</TableCell>
                <TableCell>{movie.ticketsSold}</TableCell>
                <TableCell>{movie.revenue.toFixed(0)}đ</TableCell> 
                <TableCell>
                  {movie.status === 1 ? (
                    <Typography color="green">Active</Typography>
                  ) : (
                    <Typography color="red">Inactive</Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleViewStatistics(movie.movieId)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
      </Grid>
    </Box>
  );
};

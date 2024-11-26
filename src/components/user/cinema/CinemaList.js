import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardActions, Button, Typography, Modal, Box, Pagination } from '@mui/material';
import axios from 'axios';

const CinemaList = () => {
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false); // Move useState here

  const ITEMS_PER_PAGE = 3; // Number of items per page

  useEffect(() => {
    const fetchCinemas = async () => {
      axios
        .get('http://localhost:8080/api/cinemas')
        .then((response) => {
          setCinemas(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching cinemas:', error);
        });
    };
    fetchCinemas();
  }, []);

  if (loading) {
    return (
      <Typography
        variant="h4"
        gutterBottom
        style={{ textAlign: 'center', marginTop: '20px', color: '#007BFF' }}
      >
        Loading...
      </Typography>
    );
  }

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const displayedCinemas = cinemas.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  const handleOpen = (cinema) => {
    setSelectedCinema(cinema);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCinema(null);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 600,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="cinema-list-container" style={{ padding: '20px 40px', backgroundColor: '#f9f9f9' }}>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        fontWeight="bold"
        sx={{ color: '#007BFF', marginBottom: '30px' }}
      >
        Cinema System
      </Typography>
      <Grid container spacing={4}>
        {displayedCinemas.map((cinema) => (
          <Grid item xs={12} sm={6} md={4} key={cinema.id}>
            <Card
              sx={{
                borderRadius: '8px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  cursor: 'pointer',
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              <img
                src={cinema.imageUrl || 'https://bhdstar.vn/wp-content/uploads/2023/12/0000000010.png'}
                alt={cinema.cinemaName}
                style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ fontWeight: 'bold', color: '#333', marginBottom: '8px' }}
                >
                  {cinema.cinemaName}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', paddingBottom: '16px' }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpen(cinema)}
                  sx={{
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: '#0056b3' },
                  }}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{ mt: 4, textAlign: 'center', justifyContent: 'center', alignItems: 'center', display: 'flex' }}
      >
        <Pagination
          count={Math.ceil(cinemas.length / ITEMS_PER_PAGE)}
          page={currentPage}
          color="primary"
          variant="outlined"
          shape="rounded"
          size="large"
          showFirstButton
          showLastButton
          onChange={handleChangePage}
        />
      </Box>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h5" fontWeight="bold" sx={{ color: '#007BFF', marginBottom: '16px' }}>
            {selectedCinema?.cinemaName}
          </Typography>
          <Typography id="modal-description" variant="body1" sx={{ marginBottom: '16px', color: '#555' }}>
            Address: {selectedCinema?.cinemaAddress}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{
                fontWeight: 'bold',
                textTransform: 'none',
                color: '#007BFF',
                borderColor: '#007BFF',
                '&:hover': {
                  backgroundColor: '#f0f8ff',
                },
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CinemaList;

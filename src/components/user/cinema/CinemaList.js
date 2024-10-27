import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardActions, Button, Typography, Modal, Box } from '@mui/material';
import axios from 'axios';

const CinemaList = () => {
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/cinemas')
      .then(response => {
        setCinemas(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching cinemas:', error);
      });
  }, []);

  if (loading){
    return (
      <Typography variant="h4" gutterBottom style={{textAlign: 'center'}}>
        LOADING...
      </Typography>
    )
  }

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
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="cinema-list-container" style={{marginLeft: '50px', marginRight: '50px'}}>
      <Typography variant="h3" gutterBottom align="center" fontWeight="bold" marginTop="20px" marginBottom="20px">
        Hệ thống rạp
      </Typography>
      <Grid container spacing={3}>
        {cinemas.map((cinema) => (
          <Grid item xs={12} sm={6} md={4} key={cinema.id}> 
            <Card>
              <img
                src={cinema.imageUrl || 'https://bhdstar.vn/wp-content/uploads/2023/12/0000000010.png'}
                alt={cinema.cinemaName}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom>
                  {cinema.cinemaName}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpen(cinema)}
                >
                  Thông tin chi tiết
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={open && selectedCinema !== null} 
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {selectedCinema?.cinemaName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Address: {selectedCinema?.cinemaAddress}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button onClick={handleClose} variant="outlined" sx={{ mt: 3 }} style={{ textAlign: 'center' }}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CinemaList;

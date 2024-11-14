import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Grid, Chip } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const ScheduleDetail = () => {
  const { id } = useParams(); 
  const [scheduleDetail, setScheduleDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScheduleDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/schedules/${id}`);
        setScheduleDetail(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching schedule details:', error);
        setLoading(false);
      }
    };
    fetchScheduleDetail();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      {scheduleDetail ? (
        <>
          <Typography variant="h4" gutterBottom>
            {scheduleDetail.movieName} 
          </Typography>
          <img 
            src={scheduleDetail.movieAvatar} 
            alt={scheduleDetail.movieName} 
            style={{ width: '200px', height: 'auto' }} 
          /> 

          <Typography variant="h4" gutterBottom>
            Schedule Details for Cinema: {scheduleDetail.schedule.cinemaName}
          </Typography>
          <Typography variant="h6">Date: {scheduleDetail.schedule.scheduleDate}</Typography>
          <Typography variant="h6">Shift: {scheduleDetail.schedule.shiftName}</Typography>
          <Typography variant="h6">Total Seats: {scheduleDetail.schedule.totalSeats}</Typography>
          <Typography variant="h6">Booked Seats: {scheduleDetail.schedule.bookedSeats}</Typography>
          
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Seat Map
          </Typography>
          <Grid container spacing={1}>
            {scheduleDetail.seats.map((seat) => (
              <Grid item key={seat.id} xs={1}>
                <Chip
                  label={`${seat.seatRow}${seat.seatNumber}`}
                  color={scheduleDetail.seatStatus[seat.id] ? 'error' : seat.seatType === 'VIP' ? 'primary' : 'default'}
                  variant="outlined"
                  sx={{
                    width: '100%',
                    color: 'white',
                    backgroundColor: scheduleDetail.seatStatus[seat.id]
                      ? '#e74c3c'
                      : seat.seatType === 'VIP'
                      ? '#9b59b6' 
                      : '#2ecc71', 
                  }}
                />
              </Grid>
            ))}
          </Grid>
          
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Comments
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Avatar</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Comment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scheduleDetail.comments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell>
                      <Avatar alt={comment.userName} src={comment.userAvatar} />
                    </TableCell>
                    <TableCell>{comment.userName}</TableCell>
                    <TableCell>
                      <Chip
                        label={`${comment.ratingValue} ★`}
                        color={comment.ratingValue >= 4 ? 'success' : 'warning'}
                      />
                    </TableCell>
                    <TableCell>{comment.ratingComment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Typography variant="h6">No schedule details found.</Typography>
      )}
    </Box>
  );
};

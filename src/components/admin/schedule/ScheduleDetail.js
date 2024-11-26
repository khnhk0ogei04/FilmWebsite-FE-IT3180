import React, { useEffect, useState } from 'react';
import {
    Box,
    CircularProgress,
    Typography,
    Grid,
    Chip,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import ChairIcon from '@mui/icons-material/Chair'; 
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
    const groupedSeats = scheduleDetail.seats.reduce((rows, seat) => {
        rows[seat.seatRow] = rows[seat.seatRow] || [];
        rows[seat.seatRow].push(seat);
        return rows;
    }, {});

    return (
        <Box sx={{ p: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            {scheduleDetail ? (
                <>
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Typography variant="h3" gutterBottom fontWeight="bold" color="#007BFF">
                            {scheduleDetail.movieName}
                        </Typography>
                        <img
                            src={scheduleDetail.movieAvatar || 'https://via.placeholder.com/200'}
                            alt={scheduleDetail.movieName}
                            style={{ width: '200px', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                        />
                    </Box>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom fontWeight="bold" color="#007BFF">
                            Schedule Details
                        </Typography>
                        <Typography variant="body1">
                            <strong>Cinema:</strong> {scheduleDetail.schedule.cinemaName}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Date:</strong> {scheduleDetail.schedule.scheduleDate}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Shift:</strong> {scheduleDetail.schedule.shiftName}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Total Seats:</strong> {scheduleDetail.schedule.totalSeats}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Booked Seats:</strong> {scheduleDetail.schedule.bookedSeats}
                        </Typography>
                    </Box>

                    {/* Seat Map */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom fontWeight="bold" color="#007BFF">
                            Seat Map
                        </Typography>
                        {Object.keys(groupedSeats).map((row) => (
                            <Box key={row} sx={{ mb: 2 }}>
                                <Grid container spacing={1} justifyContent="center">
                                    {groupedSeats[row].map((seat) => (
                                        <Grid item key={seat.id} xs={1}>
                                            <ChairIcon
                                                sx={{
                                                    fontSize: 30,
                                                    color: scheduleDetail.seatStatus[seat.id]
                                                        ? "#E57373" 
                                                        : seat.seatType === 'VIP'
                                                        ? "#FFD700" 
                                                        : "#90CAF9", 
                                                }}
                                            />
                                            <Typography variant="caption" display="block" textAlign="center">
                                                {seat.seatRow}
                                                {seat.seatNumber}
                                            </Typography>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        ))}
                        <Box sx={{mt: 2, textAlign: 'center', justifyContent: 'center', p: 3, flexDirection: 'column'}}>
                            <Chip
                                icon = {<ChairIcon sx={{fontSize: '24px', color: '#E57373 !important'}} />} 
                                label = "Booked Seat"
                                sx = {{
                                    mx: 2, px: 2, py: 1, fontSize: '16px', fontWeight: 'body1', color: '#E57373'
                                }}
                                variant='outlined'
                            />
                            <Chip 
                                icon = {<ChairIcon sx={{fontSize: '24px', color: '#FFD700 !important'}} />}
                                label = "VIP Seat"
                                sx = {{
                                    mx: 2, px: 2, py: 1, fontSize: '16px', textAlign: 'center', fontWeight: 'body1', color: '#FFD700'
                                }}
                                variant='outlined'
                            />
                            <Chip 
                                icon = {<ChairIcon sx={{fontSize: '24px', color: '#90CAF9 !important'}} />}
                                label = "Regular Seat"
                                sx = {{
                                    mx: 2, px: 2, py: 1, fontSize: '16px', textAlign: 'center', fontWeight: 'body1', color: '#90CAF9'
                                }}
                                variant='outlined'
                            />
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h5" gutterBottom fontWeight="bold" color="#007BFF">
                            Comments
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: '#f1f1f1' }}>
                                        <TableCell><strong>Avatar</strong></TableCell>
                                        <TableCell><strong>Name</strong></TableCell>
                                        <TableCell><strong>Rating</strong></TableCell>
                                        <TableCell><strong>Comment</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {scheduleDetail.comments.length > 0 ? (
                                        scheduleDetail.comments.map((comment) => (
                                            <TableRow key={comment.id}>
                                                <TableCell>
                                                    <Avatar alt={comment.userName} src={comment.userAvatar} />
                                                </TableCell>
                                                <TableCell>{comment.userName}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={`${comment.ratingValue} ★`}
                                                        color={comment.ratingValue >= 4 ? 'success' : 'warning'}
                                                        sx={{ fontWeight: 'bold' }}
                                                    />
                                                </TableCell>
                                                <TableCell>{comment.ratingComment}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">
                                                <Typography variant="body1">No comments yet.</Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </>
            ) : (
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                    No schedule details found.
                </Typography>
            )}
        </Box>
    );
};

import { Box, CircularProgress, Typography, Table, Paper, TableCell, TableBody, TableHead, TableRow, TableContainer, Button } from "@mui/material"; 
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const MovieStatisticsDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate(); 

    const [movieDetail, setMovieDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetail = async (movieId) => {
            try {
                const response = await axios.get(`http://localhost:8080/api/movies/statistics/${movieId}`);
                setMovieDetail(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchMovieDetail(id);
    }, [id]);

    const handleViewDetail = (scheduleId) => {
        navigate(`/admin/schedules/${scheduleId}`);
    };

    if (loading) {
        return (
            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    zIndex: 1000,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)' 
                }}
            >
                <CircularProgress />
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Loading Statistics
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4 }}>
        {movieDetail ? (
            <>
                <Typography variant="h4" gutterBottom>
                    Statistics for {movieDetail.movieName}
                </Typography>
                <Typography variant="h6">Average Rating: {movieDetail.averageRating.toFixed(1)}</Typography>
                <Typography variant="h6">Tickets Sold: {movieDetail.ticketsSold}</Typography>
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table aria-label="schedule table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Cinema</TableCell>
                                <TableCell>Schedule Date</TableCell>
                                <TableCell>Shift</TableCell>
                                <TableCell>Start Time</TableCell>
                                <TableCell>End Time</TableCell>
                                <TableCell>Total Seats</TableCell>
                                <TableCell>Booked Seats</TableCell>
                                <TableCell>Actions</TableCell> 
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {movieDetail.schedules.map((schedule) => (
                                <TableRow key={schedule.scheduleId}>
                                    <TableCell>{schedule.cinemaName}</TableCell>
                                    <TableCell>{schedule.scheduleDate}</TableCell>
                                    <TableCell>{schedule.shiftName}</TableCell>
                                    <TableCell>{schedule.shiftStart}</TableCell>
                                    <TableCell>{schedule.shiftEnd}</TableCell>
                                    <TableCell>{schedule.totalSeats}</TableCell>
                                    <TableCell>{schedule.bookedSeats}</TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            onClick={() => handleViewDetail(schedule.scheduleId)}
                                        >
                                            View Details
                                        </Button>
                                    </TableCell> 
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        ) : (
            <Typography variant="h6">No data available for this movie.</Typography>
        )}
        </Box>
    );
};

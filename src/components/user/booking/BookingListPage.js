import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const BookingListPage = () => {
    const [bookings, setBookings] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        fetchBookings(page);
    }, [page]);

    const fetchBookings = (page) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        axios.get(`http://localhost:8080/api/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            const userId = response.data.id;

            axios.get(`http://localhost:8080/api/bookings?userId=${userId}&page=${page - 1}&size=10`)
                .then(async response => {
                    const bookingsWithDetails = await Promise.all(
                        response.data.content.map(async booking => {
                            const scheduleResponse = await axios.get(`http://localhost:8080/api/schedules/${booking.scheduleId}`);
                            const schedule = scheduleResponse.data.schedule;
                            const seat = scheduleResponse.data.seats.find(seat => seat.id === booking.seatId);
                            return {
                                ...booking,
                                movieName: schedule.movieName,
                                movieImage: schedule.movieImage,
                                cinemaName: schedule.cinemaName,
                                scheduleDate: schedule.scheduleDate,
                                shiftStart: schedule.shiftStart,
                                shiftEnd: schedule.shiftEnd,
                                seatRow: seat.seatRow,
                                seatNumber: seat.seatNumber,
                                seatType: seat.seatType,
                            };
                        })
                    );
                    setBookings(bookingsWithDetails);
                    setTotalPages(response.data.totalPages);
                })
                .catch(error => {
                    console.log('Error', error);
                });
        });
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box sx={{ py: 6, px: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <Typography 
                variant="h3" 
                align="center" 
                gutterBottom 
                sx={{ fontWeight: 'bold', color: '#007BFF', mb: 4 }}
            >
                BOOKING HISTORY
            </Typography>

            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 4 }}>
                <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#007BFF' }}>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Movie</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Cinema</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Date</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Showtime</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Seat</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>QR Code</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.map((booking) => (
                            <TableRow 
                                key={booking.id} 
                                sx={{ '&:nth-of-type(even)': { backgroundColor: '#f4f4f4' } }}
                            >

                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar
                                            src={booking.movieImage || 'https://via.placeholder.com/150'}
                                            alt={booking.movieName}
                                            variant="rounded"
                                            sx={{ width: 80, height: 120, border: '1px solid #ddd' }}
                                        />
                                        <Typography 
                                            variant="h6" 
                                            sx={{ fontWeight: 'bold', color: '#007BFF', fontSize: '18px' }}
                                        >
                                            {booking.movieName}
                                        </Typography>
                                    </Box>
                                </TableCell>

                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                                        {booking.cinemaName}
                                    </Typography>
                                </TableCell>

                                <TableCell sx={{ textAlign: 'center', fontSize: '14px', color: '#555' }}>
                                    {booking.scheduleDate}
                                </TableCell>

                                <TableCell sx={{ textAlign: 'center', fontSize: '14px', color: '#555' }}>
                                    {booking.shiftStart} - {booking.shiftEnd}
                                </TableCell>

                                <TableCell sx={{ textAlign: 'center', fontSize: '14px', color: '#555' }}>
                                    {booking.seatRow}{booking.seatNumber} ({booking.seatType})
                                </TableCell>
                                <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Avatar
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=BookingID:${booking.id}`}
                                        alt="QR Code"
                                        variant="square"
                                        sx={{ width: 100, height: 100 }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination 
                    count={totalPages} 
                    page={page} 
                    onChange={handlePageChange} 
                    color="primary" 
                    size="large" 
                    shape="rounded" 
                />
            </Box>
        </Box>
    );
};

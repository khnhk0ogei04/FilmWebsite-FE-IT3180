import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from "@mui/material";
import { useState, useEffect } from "react";
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
        <>
            <Box sx={{ p: 4 }} alignItems={'center'}>
                <Typography variant="h4" gutterBottom textAlign={"center"} style={{ fontWeight: 'bold', color: "red" }}>
                    Bookings History
                </Typography>

                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table aria-label="booking history table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ảnh</TableCell>
                                <TableCell>Tên Phim</TableCell>
                                <TableCell>Rạp</TableCell>
                                <TableCell>Ngày Chiếu</TableCell>
                                <TableCell>Suất Chiếu</TableCell>
                                <TableCell>Ghế</TableCell>
                                <TableCell>Mã QR</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell>
                                        <img
                                            src={booking.movieImage || 'https://via.placeholder.com/150'}
                                            alt={booking.movieName}
                                            style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                                        />
                                    </TableCell>
                                    <TableCell>{booking.movieName}</TableCell>
                                    <TableCell>{booking.cinemaName}</TableCell>
                                    <TableCell>{booking.scheduleDate}</TableCell>
                                    <TableCell>{booking.shiftStart} - {booking.shiftEnd}</TableCell>
                                    <TableCell>{booking.seatRow}{booking.seatNumber} ({booking.seatType})</TableCell>
                                    <TableCell>
                                        <img
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=BookingID:${booking.id}`}
                                            alt="QR Code"
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
                    />
                </Box>
            </Box>
        </>
    );
};

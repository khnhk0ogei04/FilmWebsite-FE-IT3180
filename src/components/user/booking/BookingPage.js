import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

export const BookingPage = () => {
    const { scheduleId } = useParams(); 
    const [scheduleDetails, setScheduleDetails] = useState(null);
    const [seats, setSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/schedules/${scheduleId}`)
            .then(response => setScheduleDetails(response.data))
            .catch(error => console.log('Error fetching schedule details:', error));

        axios.get(`http://localhost:8080/api/seats?scheduleId=${scheduleId}`)
            .then(response => setSeats(response.data))
            .catch(error => console.log('Error fetching seats:', error));

        axios.get(`http://localhost:8080/api/seats/booked?scheduleId=${scheduleId}`)
            .then(response => setBookedSeats(response.data.map(seat => seat.seatId))) 
            .catch(error => console.log('Error fetching booked seats:', error));
    }, [scheduleId]);
    
    const handleSeatClick = (seatId, seatType) => {
        if (bookedSeats.includes(seatId)) {
            Swal.fire('Error', 'Ghế đã được đặt, vui lòng chọn ghế khác', 'error');
        } else {
            Swal.fire({
                title: 'Xác nhận thanh toán',
                text: 'Bạn có chắc chắn muốn đặt ghế này không?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Thanh toán',
            }).then((result) => {
                if (result.isConfirmed) {
                    handlePayment(seatId, seatType);
                }
            });
        }
    };

    const handlePayment = (seatId, seatType) => {
        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire('Error', 'Bạn cần đăng nhập để đặt vé', 'error');
            return;
        }
    
        axios.get('http://localhost:8080/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => {
            const userId = response.data.id;
    
            // lấy thông tin tiền và giá vé theo loại ghế
            axios.get(`http://localhost:8080/api/users/${userId}`)
                .then(userResponse => {
                    const accountBalance = userResponse.data.accountBalance;
                    console.log(accountBalance);
                    // lấy giá vé có cả giảm rồi
                    axios.get(`http://localhost:8080/api/discounts/calculate?movieId=${scheduleDetails.schedule.movieId}&seatType=${seatType}`)
                        .then(priceResponse => {
                            const originalPrice = priceResponse.data.originalPrice;
                            const discountedPrice = priceResponse.data.discountedPrice;
                            if (accountBalance >= discountedPrice) {
                                // tính tiền và save 
                                axios.post(`http://localhost:8080/api/bookings`, {
                                    userId: userId,
                                    seatId: seatId,
                                    scheduleId: scheduleId,
                                    originalPrice: originalPrice, // chưa giảm
                                    discountedPrice: discountedPrice // giá nè đã giảm
                                }, {
                                    headers: {
                                        'Authorization': `Bearer ${token}`
                                    }
                                }).then(() => {
                                    Swal.fire('Success', 'Đặt vé thành công', 'success');
                                    setBookedSeats([...bookedSeats, seatId]);
                                    window.location.reload()
                                });
                            } else {
                                Swal.fire('Error', 'Số dư tài khoản không đủ', 'error');
                            }
                        });
                });
        });
    };
    

    if (!scheduleDetails) {
        return <Typography variant="h5" align="center">Loading...</Typography>;
    }

    console.log(scheduleDetails);
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>Đặt vé - {scheduleDetails.movieName}</Typography>
            <Typography variant="h6">Rạp: {scheduleDetails.schedule.cinemaName}</Typography>
            <Typography variant="h6">Suất chiếu: {scheduleDetails.schedule.shiftName} ({scheduleDetails.schedule.shiftStart} - {scheduleDetails.schedule.shiftEnd})</Typography>
            <Typography variant="h6">Ngày chiếu: {scheduleDetails.schedule.scheduleDate}</Typography>

            {/* bản đồ ghế map */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>Sơ đồ ghế</Typography>
                <Grid container spacing={2}>
                    {seats.map((seat) => (
                        <Grid item xs={2} key={seat.id}>
                            <Button
                                variant="contained"
                                color={bookedSeats.includes(seat.id) ? "secondary" : "primary"}
                                onClick={() => handleSeatClick(seat.id, seat.seatType)}
                                disabled={bookedSeats.includes(seat.id)}
                            >
                                {seat.seatRow}{seat.seatNumber} ({seat.seatType})
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

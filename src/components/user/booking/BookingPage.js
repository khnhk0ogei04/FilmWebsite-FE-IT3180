import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, IconButton, Container } from "@mui/material";
import ChairIcon from "@mui/icons-material/Chair";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export const BookingPage = () => {
    const { scheduleId } = useParams();
    const [scheduleDetails, setScheduleDetails] = useState(null);
    const [seats, setSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [regularPrice, setRegularPrice] = useState(0);
    const [vipPrice, setVipPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/schedules/${scheduleId}`)
            .then((response) => {
                setScheduleDetails(response.data);
                console.log("Schedule details:", response.data);
            })
            .catch((error) => console.error("Error fetching schedule details:", error));

        axios
            .get(`http://localhost:8080/api/seats?scheduleId=${scheduleId}`)
            .then((response) => setSeats(response.data))
            .catch((error) => console.error("Error fetching seats:", error));

        axios
            .get(`http://localhost:8080/api/seats/booked?scheduleId=${scheduleId}`)
            .then((response) => setBookedSeats(response.data.map((seat) => seat.seatId)))
            .catch((error) => console.error("Error fetching booked seats:", error));
    }, [scheduleId]);

    useEffect(() => {
        if (scheduleDetails && scheduleDetails.schedule) {
            axios
                .get(
                    `http://localhost:8080/api/discounts/calculate?movieId=${scheduleDetails.schedule.movieId}&seatType=VIP`
                )
                .then((response) => {
                    setVipPrice(response.data.discountedPrice || 0);
                    console.log("VIP price details:", response.data);
                })
                .catch((error) =>
                    console.error("Error fetching VIP seat prices:", error)
                );

            axios
                .get(
                    `http://localhost:8080/api/discounts/calculate?movieId=${scheduleDetails.schedule.movieId}&seatType=Regular`
                )
                .then((response) => {
                    setRegularPrice(response.data.discountedPrice || 0);
                    console.log("Regular price details:", response.data);
                })
                .catch((error) =>
                    console.error("Error fetching Regular seat prices:", error)
                );
        }
    }, [scheduleDetails]);

    const handleSeatClick = (seatId, seatType) => {
        if (bookedSeats.includes(seatId)) {
            Swal.fire("Error", "Seat has been booked", "error");
        } else {
            Swal.fire({
                title: "Confirm payment?",
                text: "Okay confirm payment?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Pay",
            }).then((result) => {
                if (result.isConfirmed) {
                    handlePayment(seatId, seatType);
                }
            });
        }
    };

    const handlePayment = (seatId, seatType) => {
        const token = localStorage.getItem("token");
        if (!token) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "You must sign in to book ticket",
            });
            navigate("/login");
            return;
        }

        axios
            .get("http://localhost:8080/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const userId = response.data.id;

                axios
                    .get(`http://localhost:8080/api/users/${userId}`)
                    .then((userResponse) => {
                        const accountBalance = userResponse.data.accountBalance;

                        axios
                            .get(`http://localhost:8080/api/discounts/calculate?movieId=${scheduleDetails.schedule.movieId}&seatType=${seatType}`)
                            .then((priceResponse) => {
                                console.log(seatType);
                                const originalPrice = priceResponse.data.originalPrice;
                                const discountedPrice = priceResponse.data.discountedPrice;

                                if (accountBalance >= discountedPrice) {
                                    axios
                                        .post(
                                            `http://localhost:8080/api/bookings`,
                                            {
                                                userId: userId,
                                                seatId: seatId,
                                                scheduleId: scheduleId,
                                                originalPrice: originalPrice,
                                                discountedPrice: discountedPrice,
                                            },
                                            {
                                                headers: {
                                                    Authorization: `Bearer ${token}`,
                                                },
                                            }
                                        )
                                        .then(() => {
                                            Swal.fire("Thành công", "Đặt vé thành công!", "success");
                                            setBookedSeats([...bookedSeats, seatId]);
                                            window.location.reload();
                                        });
                                } else {
                                    Swal.fire("Lỗi", "Số dư tài khoản không đủ.", "error");
                                }
                            });
                    });
            });
    };

    const groupedSeats = seats.reduce((acc, seat) => {
        if (!acc[seat.seatRow]) {
            acc[seat.seatRow] = [];
        }
        acc[seat.seatRow].push(seat);
        return acc;
    }, {});

    if (!scheduleDetails) {
        return (
            <Typography variant="h5" align="center" sx={{ mt: 4, fontWeight: "bold", color: "gray" }}>
                Loading...
            </Typography>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" textAlign="center" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
                Seat Map
            </Typography>
            <Box
                sx={{
                    mt: 3,
                    p: 3,
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                }}
            >
                {Object.entries(groupedSeats).map(([row, rowSeats]) => (
                    <Box key={row} sx={{ mb: 3 }}>
                        <Grid container spacing={2} justifyContent="center">
                            {rowSeats.map((seat) => (
                                <Grid item key={seat.id} xs={1.5} sm={1} md={0.8}>
                                    <IconButton
                                        onClick={() => handleSeatClick(seat.id, seat.seatType)}
                                        disabled={bookedSeats.includes(seat.id)}
                                        sx={{
                                            backgroundColor: bookedSeats.includes(seat.id)
                                                ? "#E57373"
                                                : seat.seatType === "VIP"
                                                ? "#FFD700"
                                                : "#90CAF9",
                                            borderRadius: "8px",
                                            "&:hover": {
                                                backgroundColor: bookedSeats.includes(seat.id)
                                                    ? "#E57373"
                                                    : seat.seatType === "VIP"
                                                    ? "#FFC107"
                                                    : "#64B5F6",
                                            },
                                        }}
                                    >
                                        <ChairIcon
                                            sx={{
                                                fontSize: 30,
                                                color: bookedSeats.includes(seat.id) ? "#E57373" : "#FFFFFF",
                                            }}
                                        />
                                    </IconButton>
                                    <Typography
                                        variant="caption"
                                        textAlign="center"
                                        sx={{
                                            display: "block",
                                            mt: 0.5,
                                            fontWeight: "bold",
                                            textAlign: 'center',
                                            color: bookedSeats.includes(seat.id) ? "#E57373" : "#333",
                                        }}
                                    >
                                        {seat.seatRow}
                                        {seat.seatNumber}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ))}
                <Box sx={{ mt: 4, textAlign: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Legend
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 3,
                            mt: 2,
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <ChairIcon sx={{ fontSize: 30, color: "#FFD700" }} />
                            <Typography variant="body2">VIP Seat (Price: {vipPrice} VND)</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <ChairIcon sx={{ fontSize: 30, color: "#90CAF9" }} />
                            <Typography variant="body2">Regular Seat (Price: {regularPrice} VND)</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <ChairIcon sx={{ fontSize: 30, color: "#E57373" }} />
                            <Typography variant="body2">Booked Seat</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

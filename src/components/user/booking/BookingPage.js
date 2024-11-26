import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, IconButton, Container } from "@mui/material";
import ChairIcon from "@mui/icons-material/Chair";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export const BookingPage = () => {
    const { scheduleId } = useParams();
    const [scheduleDetails, setScheduleDetails] = useState(null);
    const [seats, setSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/schedules/${scheduleId}`)
            .then((response) => setScheduleDetails(response.data))
            .catch((error) => console.log("Error fetching schedule details:", error));

        axios
            .get(`http://localhost:8080/api/seats?scheduleId=${scheduleId}`)
            .then((response) => setSeats(response.data))
            .catch((error) => console.log("Error fetching seats:", error));

        axios
            .get(`http://localhost:8080/api/seats/booked?scheduleId=${scheduleId}`)
            .then((response) => setBookedSeats(response.data.map((seat) => seat.seatId)))
            .catch((error) => console.log("Error fetching booked seats:", error));
    }, [scheduleId]);

    const handleSeatClick = (seatId, seatType) => {
        if (bookedSeats.includes(seatId)) {
            Swal.fire("Error", "Ghế đã được đặt, vui lòng chọn ghế khác", "error");
        } else {
            Swal.fire({
                title: "Xác nhận thanh toán",
                text: "Bạn có chắc chắn muốn đặt ghế này không?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Thanh toán",
            }).then((result) => {
                if (result.isConfirmed) {
                    handlePayment(seatId, seatType);
                }
            });
        }
    };

    const handlePayment = (seatId, seatType) => {
        Swal.fire("Success", "Đặt ghế thành công!", "success");
        setBookedSeats([...bookedSeats, seatId]);
    };

    if (!scheduleDetails) {
        return (
            <Typography
                variant="h5"
                align="center"
                sx={{ mt: 4, fontWeight: "bold", color: "gray" }}
            >
                Loading...
            </Typography>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography
                variant="h4"
                textAlign="center"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#1976d2" }}
            >
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
                <Grid container spacing={2} justifyContent="center">
                    {seats.map((seat) => (
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
                                    color: bookedSeats.includes(seat.id) ? "#E57373" : "#333",
                                }}
                            >
                                {seat.seatRow}
                                {seat.seatNumber}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
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
                            <Typography variant="body2">VIP Seat</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <ChairIcon sx={{ fontSize: 30, color: "#90CAF9" }} />
                            <Typography variant="body2">Regular Seat</Typography>
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

import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Grid, Box } from "@mui/material";
import Swal from "sweetalert2";

export const AddSchedule = () => {
    const [movies, setMovies] = useState([]);
    const [cinemas, setCinemas] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("");
    const [selectedCinema, setSelectedCinema] = useState("");
    const [selectedShift, setSelectedShift] = useState("");
    const [scheduleDate, setScheduleDate] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const newSchedule = {
            movieId: selectedMovie,
            cinemaId: selectedCinema,
            shiftId: selectedShift,
            scheduleDate: scheduleDate
        };

        try {
            const response = await axios.post("http://localhost:8080/api/schedules", newSchedule, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: "Schedule created successfully",
                timer: 1500,
                showConfirmButton: false
            });
            navigate("/admin/schedules");
        } catch (error) {
            if (error.response){
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response.data.message,
                    timer: 1500,
                    showConfirmButton: false
                })
            }
        }
    }
    useEffect (() => {
        const fetchData = async () => {
            try {
                 const moviesResponse = await axios.get("http://localhost:8080/api/movies/all");
                 setMovies(moviesResponse.data);

                 const cinemasResponse = await axios.get("http://localhost:8080/api/cinemas");
                 setCinemas(cinemasResponse.data);

                 const shiftResponse = await axios.get("http://localhost:8080/api/shifts")
                 setShifts(shiftResponse.data);
            } catch (error) {
                console.log("Error: ", error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <Box sx={{p: 4}}>
                <Typography variant="h4" gutterBottom>
                    Add New Schedule
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel>Movie</InputLabel>
                                <Select
                                    value={selectedMovie}
                                    onChange = {(event) => setSelectedMovie(event.target.value)}
                                    required
                                >
                                    {movies.map((movie) => (
                                        <MenuItem key={movie.id} value={movie.id}>
                                            {movie.movieName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel>Cinema</InputLabel>
                                <Select
                                    value={selectedCinema}
                                    onChange = {(event) => setSelectedCinema(event.target.value)}
                                    required
                                >
                                    {cinemas.map((cinema) => (
                                        <MenuItem key={cinema.id} value={cinema.id}>
                                            {cinema.cinemaName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel>Shift</InputLabel>
                                <Select
                                    value={selectedShift}
                                    onChange = {(event) => setSelectedShift(event.target.value)}
                                    required
                                >
                                    {shifts.map((shift) => (
                                        <MenuItem key={shift.id} value={shift.id}>
                                            {shift.name } + {shift.shiftStart } + {"-"} + {shift.shiftEnd}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                label = "Schedule Date"
                                type="date"
                                InputLabelProps={{shrink: true}}
                                fullWidth
                                value={scheduleDate}
                                onChange={(event) => setScheduleDate(event.target.value)}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Create Schedule
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </>
    )
}
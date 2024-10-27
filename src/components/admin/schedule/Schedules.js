import { Box, CircularProgress, Pagination, Paper, TableContainer, TableCell, Button, TableRow, TableBody, Grid, TextField, Table, TableHead, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Schedules = () => {

    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/schedules", {
                    params: {
                        search: searchQuery,
                        page: page - 1,
                        size: itemsPerPage
                    }
                });
                setSchedules(response.data.content);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching schedules: ', error);
                setLoading(false);
            }
        };
        fetchSchedules();
    }, [searchQuery, page]);

    const handleAddSchedule = (event) => {
        navigate("/admin/schedules/add");
    }
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setPage(1);
    }

    const handlePageChange = (event, value) => {
        setPage(value);
    }

    const handleViewDetails = (scheduleId) => {
        navigate(`/admin/schedules/${scheduleId}`);
    }

    if (loading) {
        return (
            <>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <CircularProgress />
                </Box>
            </>
        )
    }

    return (
        <>
            <Box sx={{p: 4}}>
                <Typography variant="h4" gutterBottom>
                    Movie Schedules
                </Typography>
                <Grid container sx={{ mb: 2 }} justifyContent="space-between">
                    <TextField
                        label="Search by Movie Name"
                        variant="outlined"
                        fullWidth
                        value={searchQuery}
                        onChange={handleSearchChange}
                        sx={{ minWidth: 300 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddSchedule}
                        style={{marginTop: "20px"}}
                    >
                        Add new schedule
                    </Button>
                </Grid>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Cinema</TableCell>
                                <TableCell>Movie</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>ScheduleDate</TableCell>
                                <TableCell>Shift</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {schedules.map((schedule) => (
                            <TableRow key={schedule.scheduleId}>
                                <TableCell>{schedule.cinemaName}</TableCell>
                                <TableCell>{schedule.movieName}</TableCell>
                                <TableCell>
                                <img src={schedule.movieImage} alt={schedule.movieName} style={{ width: '100px' }} />
                                </TableCell>
                                <TableCell>{schedule.scheduleDate}</TableCell>
                                <TableCell>{schedule.shiftName}</TableCell>
                                <TableCell>
                                <Button variant="contained" color="primary" onClick={() => handleViewDetails(schedule.scheduleId)}>
                                    View Details
                                </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>
            </Box>
        </>
    )
}
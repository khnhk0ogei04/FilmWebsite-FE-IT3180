import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, TableCell, TableRow, TableContainer, TableHead, Switch, FormControlLabel, TableBody, Pagination, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
    const [movies, setMovies] = useState([]);
    const [showActive, setShowActive] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); 

    const itemsPerPage = 5; 

    useEffect(() => {
        const fetchMovies = async () => {
            const token = localStorage.getItem('token'); 

            if (!token) {
                setErrorMessage('Missing token. Please log in.');
                navigate('/login'); 
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/api/movies?status=${showActive}&page=${currentPage - 1}&limit=${itemsPerPage}`, {
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                });
                setMovies(response.data.content);
                setTotalPages(Math.ceil(response.data.totalElements / itemsPerPage));
            } catch (error) {
                console.error('Error fetching movies:', error);
                if (error.response && error.response.status === 403) {
                    setErrorMessage('You are not authorized to view this resource.');
                } else {
                    setErrorMessage('Error fetching movies.');
                }
            }
        };

        fetchMovies();
    }, [showActive, currentPage, navigate]);

    const handleToggle = (event) => {
        setShowActive(event.target.checked);
    };

    const handleAddNewMovie = () => {
        navigate(`/admin/movies/add`);
    };

    const handleEditMovie = (movieId) => {
        navigate(`/admin/movies/${movieId}`); 
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <>
            <h1 className='text-center'>Film List</h1>
            <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <FormControlLabel
                    control={<Switch checked={showActive} onChange={handleToggle} />}
                    label={showActive ? 'Phim đang hoạt động' : 'Dừng hoạt động'}
                    labelPlacement="end"
                />
                <Button variant='contained' color='primary' onClick={handleAddNewMovie}>Add new film</Button>
            </div>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movies.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell 
                                    className="movie-name-cell"
                                    onClick={() => handleEditMovie(item.id)}>
                                    {item.movieName}
                                </TableCell>
                                <TableCell>
                                    <img src={item.image} alt={item.movie_name} width="90px" />
                                </TableCell>
                                <TableCell>
                                    <div dangerouslySetInnerHTML={{ __html: item.description }} />
                                </TableCell>
                                <TableCell>{item.runningTime}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleEditMovie(item.id)}>
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box display="flex" justifyContent="center" mt={4}>
                <Pagination 
                    count={totalPages} 
                    page={currentPage} 
                    onChange={handlePageChange} 
                    color="primary" 
                    variant="outlined" 
                    shape="rounded" 
                />
            </Box>
        </>
    );
};

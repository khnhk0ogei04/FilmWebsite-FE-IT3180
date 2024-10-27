import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Box, Grid, FormControlLabel, Switch } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export const MovieDetail = () => {
    const navigate = useNavigate();
    const { movieId } = useParams();
    const token = localStorage.getItem('token');
    const [movie, setMovie] = useState({
        movieName: '',
        description: '',
        image: '',
        runningTime: '',
        trailerUrl: '',
        directors: '',
        cast: '',
        vipPrice: '',
        regularPrice: '',
        status: 1
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/movies/${movieId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie:', error);
                setErrorMessage('Error fetching movie.');
            }
        };

        fetchMovie();
    }, [movieId, navigate, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie((prevMovie) => ({
            ...prevMovie,
            [name]: value,
        }));
    };

    const handleStatusToggle = (event) => {
        setMovie((prevMovie) => ({
            ...prevMovie,
            status: event.target.checked ? 1 : 0
        }));
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8080/api/movies/${movieId}`, movie, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate('/admin');
        } catch (error) {
            console.error('Error updating movie:', error);
            setErrorMessage('Error updating movie.');
        }
    };

    if (errorMessage) {
        return <Typography color="error">{errorMessage}</Typography>;
    }

    return (
        <Box sx={{ maxWidth: '900px', margin: 'auto', p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Edit Movie: {movie.movieName}
            </Typography>
            <Grid container spacing={4} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>Movie Image</Typography>
                    <img
                        src={movie.image}
                        alt={movie.movieName}
                        style={{ width: '100%', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>Trailer</Typography>
                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%', background: '#000' }}>
                        <iframe
                            src={movie.trailerUrl}
                            title="Movie Trailer"
                            frameBorder="0"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                            allowFullScreen
                        ></iframe>
                    </div>
                </Grid>
            </Grid>
            <TextField
                label="Movie Name"
                name="movieName"
                value={movie.movieName}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                name="description"
                value={movie.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
            />
            <TextField
                label="Directors"
                name="directors"
                value={movie.directors}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Cast"
                name="cast"
                value={movie.cast}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Running Time"
                name="runningTime"
                value={movie.runningTime}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Image URL"
                name="image"
                value={movie.image}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Trailer URL"
                name="trailerUrl"
                value={movie.trailerUrl}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="VIP Ticket Price"
                name="vipPrice"
                value={movie.vipPrice}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="number"
            />
            <TextField
                label="Regular Ticket Price"
                name="regularPrice"
                value={movie.regularPrice}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="number"
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={movie.status === 1}
                        onChange={handleStatusToggle}
                        name="statusToggle"
                        color="primary"
                    />
                }
                label="Active"
                sx={{ mt: 3 }}
            />
            <div>
                <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 3 }}>
                    Save
                </Button>
            </div>
        </Box>
    );
};

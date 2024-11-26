import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, CardMedia, CardContent, Card, Button, IconButton, Avatar, Rating, TextField, Chip } from '@mui/material';
import { Facebook, Twitter, Pinterest, LinkedIn, Email, LabelOutlined, Label } from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export const FilmDetailPage = () => {
    const [filmDetails, setFilmDetails] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [averageRatings, setAverageRatings] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [newRatingValue, setNewRatingValue] = useState(0);
    const navigate = useNavigate();
    const { movieId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/movies/${movieId}`)
            .then(response => setFilmDetails(response.data))
            .catch(error => console.log('Error fetching film details:', error));

        axios.get(`http://localhost:8080/api/schedules?movie=${movieId}`)
            .then(response => setSchedules(response.data))
            .catch(error => console.log('Error fetching schedules:', error));

        axios.get(`http://localhost:8080/api/ratings/movie/${movieId}`)
            .then(response => setRatings(response.data))
            .catch(error => console.log('Error', error));

        axios.get(`http://localhost:8080/api/ratings/movie/${movieId}/average`)
            .then(response => setAverageRatings(response.data))
            .catch(error => console.log('Error', error));
    }, [movieId]);

    const handleComment = () => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:8080/api/auth/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(response => {
                    const userId = response.data.id;
                    const newRating = {
                        userId,
                        movieId,
                        ratingValue: newRatingValue,
                        ratingComment: newComment,
                    };
                    return axios.post(`http://localhost:8080/api/ratings/movie/${movieId}`, newRating);
                })
                .then(() => {
                    axios.get(`http://localhost:8080/api/ratings/movie/${movieId}`)
                        .then(response => setRatings(response.data));
                    axios.get(`http://localhost:8080/api/ratings/movie/${movieId}/average`)
                        .then(response => setAverageRatings(response.data));
                    setNewComment('');
                    setNewRatingValue(0);
                })
                .catch(error => console.log('Error submitting rating:', error));
        } else {
            console.log('No token found. Please log in.');
        }
    };

    const handleNavigateBooking = (scheduleId) => {
        navigate(`/user/booking/${scheduleId}`);
    }

    if (!filmDetails) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h5">Loading...</Typography>
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ p: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ boxShadow: 3, overflow: 'hidden', borderRadius: 2 }}>
                            <CardMedia
                                component="img"
                                image={filmDetails.image || "https://via.placeholder.com/200x300"}
                                alt={filmDetails.title}
                                sx={{ width: '100%', height: 'auto' }}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" gutterBottom fontWeight="bold" color="#007BFF">
                            {filmDetails.movieName}
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={{fontSize: '18px', justifyContent: 'center', alignItems: 'center'}}>
                            Rating: {averageRatings} 
                            <StarIcon sx={{ color: '#FFD700', verticalAlign: 'middle', ml: 1 }} />
                        </Typography>
                        <Typography variant='h6' sx={{mb: 1, color: '#9c27b0', fontSize: '18px', fontWeight:'bold'}}>
                            Description:
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            <div dangerouslySetInnerHTML={{ __html: filmDetails.description }} />
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#555' }}>
                            <Chip label={`Category: ${filmDetails.categoryName}`} color="primary" sx={{ mr: 1 }} />
                            <Chip label={`Directors: ${filmDetails.directors}`} color="secondary" sx={{ mr: 1 }} />
                            <Chip label={`Cast: ${filmDetails.cast}`} color="success" />
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                            <strong>Release Date:</strong> 12/01/2024
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            <strong>Duration:</strong> {filmDetails.runningTime}
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <IconButton color="primary"><Facebook /></IconButton>
                            <IconButton color="primary"><Twitter /></IconButton>
                            <IconButton color="primary"><Pinterest /></IconButton>
                            <IconButton color="primary"><LinkedIn /></IconButton>
                            <IconButton color="primary"><Email /></IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{my: 2, p: 4, textAlign: 'center', justifyContent: 'center'}}>
                    <Typography variant = 'h4'
                        gutterBottom
                        fontWeight='bold'
                        my={2}
                        fontSize='32px'
                        fontFamily={'inherit'}
                        color='#007BFF'
                    >
                        TRAILER 
                    </Typography>
                <Grid item xs={12}>
                    <CardMedia
                        component="iframe"
                        height="600"
                        src={filmDetails.trailerUrl || "https://www.youtube.com/embed/defaultTrailer"}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        sx = {{marginLeft: 'auto', marginRight: 'auto', borderRadius: '20px'}}
                        title={filmDetails.title}
                    />
                </Grid>
            </Box>
            <Box sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>LỊCH CHIẾU</Typography>
                {schedules.length > 0 ? (
                    schedules.map(schedule => (
                        <Card key={schedule.scheduleId} sx={{ mb: 3, boxShadow: 3 }} onClick={() => handleNavigateBooking(schedule.scheduleId)}>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <CardMedia
                                            component="img"
                                            image={schedule.movieImage || 'https://via.placeholder.com/100'}
                                            alt={schedule.movieName}
                                            sx={{ borderRadius: 1, width: 120, height: 160 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <Typography variant="h6" fontWeight="bold" gutterBottom>{schedule.cinemaName}</Typography>
                                        <Typography variant="body2" color="textSecondary" gutterBottom>
                                            Showtime: {schedule.shiftStart} - {schedule.shiftEnd}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Date: {schedule.scheduleDate}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography variant="body1">No showtimes available for this movie.</Typography>
                )}
            </Box>

            <Box sx={{ p: 4, backgroundColor: '#fff', borderRadius: 2 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>Add Your Comment</Typography>
                <Rating
                    value={newRatingValue}
                    onChange={(event, newValue) => setNewRatingValue(newValue)}
                    precision={1}
                />
                <TextField
                    label="Your Comment"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleComment} sx={{ mt: 2 }}>
                    Submit
                </Button>
            </Box>

            <Box sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>User Reviews</Typography>
                {ratings.length > 0 ? (
                    ratings.map(rating => (
                        <Card key={rating.id} sx={{ mb: 2, p: 2, display: 'flex', alignItems: 'center' }}>
                            <Avatar src={rating.userAvatar || 'https://via.placeholder.com/50'} sx={{ width: 50, height: 50, mr: 2 }} />
                            <Box>
                                <Typography variant="h6" fontWeight="bold">{rating.userName}</Typography>
                                <Rating value={rating.ratingValue} readOnly sx={{ mb: 1 }} />
                                <Typography variant="body2">{rating.ratingComment}</Typography>
                            </Box>
                        </Card>
                    ))
                ) : (
                    <Typography variant="body1">No reviews yet for this movie.</Typography>
                )}
            </Box>
        </>
    );
};

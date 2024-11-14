import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, CardMedia, CardContent, Card , Button, IconButton, Avatar, Rating, TextField} from '@mui/material';
import { Facebook, Twitter, Pinterest, LinkedIn, Email} from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export const FilmDetailPage = () => {
    const [filmDetails, setFilmDetails] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [avarageRatings, setAvarageRatings] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [newRatingValue, setNewRatingValue] = useState(0);
    const navigate = useNavigate();
    const {movieId} = useParams();

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
            .then(response => setAvarageRatings(response.data))
            .catch(error => console.log('Error', error));

    }, [movieId]);

    const handleComment = () => {
        const token = localStorage.getItem('token');
        
        if (token) {
            axios.get('http://localhost:8080/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                const userId = response.data.id;
                const newRating = {
                    userId: userId,
                    movieId: movieId,
                    ratingValue: newRatingValue,
                    ratingComment: newComment
                };
                console.log(newRating);
                return axios.post(`http://localhost:8080/api/ratings/movie/${movieId}`, newRating);
            })
            .then(() => {
                axios.get(`http://localhost:8080/api/ratings/movie/${movieId}`)
                    .then(response => setRatings(response.data));
    
                axios.get(`http://localhost:8080/api/ratings/movie/${movieId}/average`)
                    .then(response => setAvarageRatings(response.data));
                setNewComment('');
                setNewRatingValue(0);
            })
            .catch(error => {
                console.log('Error submitting rating:', error);
            });
        } else {
            console.log('No token found. Error');
        }
    };
    


    if (!filmDetails) {
        return <Typography variant="h5" align="center">Loading...</Typography>;
    }

    console.log(filmDetails);
    return (
        <>        
            <Box sx={{ p: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                <CardMedia width={'300px'} height={'auto'}
                        component="img"
                        image={filmDetails.image|| "https://via.placeholder.com/200x300"}
                        alt={filmDetails.title}
                        sx={{ borderRadius: 2 }}
                    />
                    </Grid>
                    <Grid item xs={12} md={8}>
                    <Typography variant="h4" gutterBottom>{filmDetails.movieName}</Typography>
                    <Typography variant='h5' gutterBottom>Rating: {avarageRatings}<StarIcon sx={{color: 'yellow', alignItems: 'center'}}></StarIcon></Typography>
                    <Typography variant="body1" gutterBottom>
                        <div dangerouslySetInnerHTML={{ __html: filmDetails.description }} />
                    </Typography>
                    
                    <Typography variant="body2" color="textSecondary" gutterBottom mb={2}>
                        <strong>CategoryName:</strong> {filmDetails.categoryName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom mb={2}>
                        <strong>Directors:</strong> {filmDetails.directors}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom mb={2}>
                        <strong>Cast:</strong> {filmDetails.cast}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom mb={2}>
                        <strong>Release Date:</strong> 12/01/2024
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom mb={2}>
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
                    <Grid item xs={12}>
                    <CardMedia
                        component="iframe"
                        height="600"
                        src={filmDetails.trailerUrl || "https://www.youtube.com/embed/defaultTrailer"}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title={filmDetails.title}
                    />
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>LỊCH CHIẾU</Typography>
                {schedules.length > 0 ? schedules.map((schedule) => (
                    <Card key={schedule.scheduleId} sx={{ mb: 3 }} onClick={() => navigate(`/user/booking/${schedule.scheduleId}`)}>
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
                                    <Typography variant="h6" gutterBottom>{schedule.cinemaName}</Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        Suất chiếu: {schedule.shiftName} ({schedule.shiftStart} - {schedule.shiftEnd})
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Ngày chiếu: {schedule.scheduleDate}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                )) : (
                    <Typography variant="body1">Không có lịch chiếu cho phim này.</Typography>
                )}
            </Box>
                
                <Box sx={{p: 4}}>
                    <Typography variant='h5'>Add comment</Typography>
                    <Grid container spacing={2} sx={{mb: 2}}>
                        <Grid item xs={12}>
                            <Rating
                                value = {newRatingValue}
                                onChange={(event, newValue) => setNewRatingValue(newValue)}
                                precision={1}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label = "Your Comment"
                                variant='outlined'
                                fullWidth
                                multiline
                                rows={2}
                                value={newComment}
                                onChange={(event) => setNewComment(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant='contained' onClick={handleComment}>
                                SUBMIT
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>ĐÁNH GIÁ</Typography>
                {ratings.length > 0 ? ratings.map((rating) => (
                    <Card key={rating.id} sx={{ mb: 2, display: 'flex' }}>
                        <Avatar
                            src={rating.userAvatar || 'https://via.placeholder.com/50'}
                            sx={{ width: 50, height: 50, m: 2 }}
                        />
                        <Box sx={{ flexGrow: 1, p: 2 }}>
                            <Typography variant="h6">{rating.userName}</Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                {Array.from({ length: rating.ratingValue }).map((_, index) => (
                                    <StarIcon key={index} sx={{ color: '#FFD700' }} />
                                ))}
                            </Typography>
                            <Typography variant="body2">{rating.ratingComment}</Typography>
                        </Box>
                    </Card>
                )) : (
                    <Typography variant="body1">Chưa có đánh giá cho phim này.</Typography>
                )}
            </Box>
            </>
        );
};

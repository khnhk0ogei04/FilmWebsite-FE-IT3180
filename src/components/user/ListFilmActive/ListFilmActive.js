import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, IconButton, CircularProgress, Box, InputBase, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './FilmSlider.css';
import { useNavigate } from 'react-router-dom';
import { SliderBanner } from '../banner/Banner';

const FILMS_PER_VIEW = 6;

const FilmSlider = () => {
  const [films, setFilms] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async (term = '') => {
    try {
      const response = await axios.get('http://localhost:8080/api/movies', {
        params: {
          status: true,
          name: term,
        },
      });
      setFilms(response.data.content || []);
      setFilteredFilms(response.data.content || []);
      setCurrentIndex(0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching films:', error);
      setLoading(false);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + FILMS_PER_VIEW < films.length ? prevIndex + FILMS_PER_VIEW : 0
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - FILMS_PER_VIEW >= 0
        ? prevIndex - FILMS_PER_VIEW
        : Math.max(0, films.length - FILMS_PER_VIEW)
    );
  };

  const handleMovieClick = (movieId) => {
    navigate(`/user/movies/${movieId}`);
  };

  const handleSearch = () => {
    fetchFilms(searchTerm);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <CircularProgress />
      </Box>
    );
  }

  const currentFilms = films.slice(currentIndex, currentIndex + FILMS_PER_VIEW);

  return (
    <>
      <SliderBanner />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center" color="#1976d2">
          Now Showing / Sneak Show
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f0f0f0',
              borderRadius: '20px',
              px: 2,
              py: 1,
              width: '400px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            <InputBase
              placeholder="Search for films..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              sx={{ flex: 1, ml: 1 }}
            />
            <Tooltip title="Search">
              <IconButton onClick={handleSearch} sx={{ color: '#1976d2' }}>
                <SearchIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          <Grid item>
            <Tooltip title="Previous">
              <IconButton onClick={handlePrev} sx={{ color: '#1976d2', fontSize: 'large' }}>
                <ArrowBackIosNewIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={8} md={10}>
            <Grid container spacing={2}>
              {currentFilms.map((film) => (
                <Grid item xs={6} sm={4} md={2} key={film.id}>
                  <Box
                    onClick={() => handleMovieClick(film.id)}
                    sx={{
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <img
                      src={film.image || 'https://via.placeholder.com/200x300'}
                      alt={film.movieName}
                      style={{
                        width: '100%',
                        height: '250px',
                        borderRadius: '8px',
                        marginBottom: '8px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                      }}
                    />
                    <Typography variant="h6" fontWeight="bold" sx={{ color: '#1976d2', mb: 0.5 }}>
                      {film.movieName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {film.directors}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item>
            <Tooltip title="Next">
              <IconButton onClick={handleNext} sx={{ color: '#1976d2', fontSize: 'large' }}>
                <ArrowForwardIosIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default FilmSlider;

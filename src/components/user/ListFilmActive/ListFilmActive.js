import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography, Button, IconButton, CircularProgress, Box, TextField } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './FilmSlider.css'; 
import { useNavigate } from 'react-router-dom';
import { SliderBanner } from '../banner/Banner';

const FILMS_PER_VIEW = 6;

const FilmSlider = () => {
  const [films, setFilms] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async (term = "") => {
    try {
      const response = await axios.get('http://localhost:8080/api/movies', {
        params: {
          status: true,
          name: term
        }
      });
      console.log(response);
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
      prevIndex + 1 + FILMS_PER_VIEW <= films.length ? prevIndex + 1 : 0
    );
  };


  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 >= 0 ? prevIndex - 1 : Math.max(0, films.length - FILMS_PER_VIEW)
    );
  };

  const handleMovieClick = (movieId) => {
    console.log(movieId);
    navigate(`/user/movies/${movieId}`);
  }

  const handleSearch = () => {
    fetchFilms(searchTerm);
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <CircularProgress />
      </div>
    );
  }

  const currentFilms = films.slice(currentIndex, currentIndex + FILMS_PER_VIEW);

  return (
    <>
      <SliderBanner />
      <div className="film-slider-container">
        <Typography variant="h3" fontWeight={'bold'} gutterBottom align="center">
          Now Showing / Sneak Show
        </Typography>
        <Box style={{display: 'flex', justifyContent: "left", marginBottom: '20px', marginLeft: "130px"}}>
          <TextField
            variant='outlined'
            placeholder='Search Film Here...'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            style={{marginRight: '10px', width: '300px'}}
          />
          <Button variant='contained' color="info" onClick={handleSearch}>
            Search
          </Button>
        </Box>
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          <Grid item>
            <IconButton onClick={handlePrev}>
              <ArrowBackIosIcon fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item xs={8} md={10}>
            <Grid container spacing={2}>
              {currentFilms.map((film) => (
                <Grid item xs={12} sm={6} md={2} key={film.id}>
                  <div className="film-card" onClick={() => handleMovieClick(film.id)} style={{cursor: "pointer"}}>
                    <img
                      src={film.image}
                      alt={film.movieName}
                      className="film-image"
                    />
                    <Typography variant="caption" className="film-title" align="center">
                      {film.movieName}
                    </Typography>
                    <Typography variant="subtitle1" align="center" display="block">
                      {film.directors}
                    </Typography>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item>
            <IconButton onClick={handleNext}>
              <ArrowForwardIosIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default FilmSlider;

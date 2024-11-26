import React, { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const SliderBanner = () => {
  const sliderData = [
    {
      image: "https://www.bhdstar.vn/wp-content/uploads/2024/10/referenceSchemeHeadOfficeallowPlaceHoldertrueheight1069ldapp-15.jpg",
      title: "TEE YOD: QUỶ ĂN TẠNG 2",
    },
    {
      image: "https://www.bhdstar.vn/wp-content/uploads/2024/10/referenceSchemeHeadOfficeallowPlaceHoldertrueheight1069ldapp-17.jpg",
      title: "VENOM: THE LAST DANCE: KÈO CUỐI",
    },
    {
      image: "",
      title: ""
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? sliderData.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <Box sx={{ position: 'relative', maxWidth: '100vw', margin: 'auto', overflow: 'hidden', marginTop: "40px", borderRadius: 2 }}>
      <Box
        component="img"
        src={sliderData[currentIndex].image}
        alt={sliderData[currentIndex].title}
        sx={{
          width: '100%',
          height: '80vh',
          objectFit: 'cover',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 40,
          left: 40,
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: 3,
          borderRadius: 1,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: '#72be43' }}>
          {sliderData[currentIndex].title}
        </Typography>
      </Box>

      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 10,
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          top: '50%',
          right: 10,
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

import { Button, Typography, Box, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/user');
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            textAlign="center"
        >
            <Typography variant="h3" color="error">
                404 NOT FOUND
            </Typography>
            <Typography variant="h6">
                Oops! The page you're looking for doesn't exist.
            </Typography>
            <CardMedia
                component={"img"}
                image='https://th.bing.com/th/id/R.edac5fb6f6b928cd012f0e9666d17df3?rik=N9YMHU39ox3Jkg&riu=http%3a%2f%2fdev.b2c.tourvisio.com%2fcms%2fDefaultSanTSG%2fb2cImages%2fB2C_San_Default_images%2fError+Images%2f404.png&ehk=k5fPZXjFfi3UfzKil0fcVVM1gCGtSl7MIHWzugigUcY%3d&risl=&pid=ImgRaw&r=0'
                sx={{
                    width: '350px',
                    height: 'auto',
                    mb: 2
                }}
                alt='404 Not Found'
            />
            <Button variant="contained" color="primary" onClick={goToHome} sx={{ mt: 2 }}>
                Go to Home
            </Button>
        </Box>
    );
};

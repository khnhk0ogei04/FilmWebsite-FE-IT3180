import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { Box, Button, Typography, Avatar, Paper, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';

export const UserDetailInfo = () => {

    const {id} = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/${id}`);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch user details');
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    const handleBack = () => {
        console.log('Handle back');
        navigate('/admin/users');
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6" color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: '100%' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        User Information
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <Avatar
                            alt={user.fullname}
                            src={user.avatar || 'https://via.placeholder.com/150'} // Placeholder image if no avatar
                            sx={{ width: 150, height: 150 }}
                        />
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h6">Full Name:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" sx={{fontWeight: 'bold'}}>{user.fullname}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="h6">Username:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{user.username}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="h6">Email:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{user.email}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="h6">City:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{user.city}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="h6">Phone:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{user.phone}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='h6'>Role: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='body1'>{user.role.name}</Typography>
                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Button variant="contained" color="primary" onClick={handleBack}>
                            Back to User List
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </>
    )
}
import { TextField, Button, Box, Typography, Paper, Grid, Avatar } from '@mui/material';
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import {useParams, useHref} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export const UserEdit = () => {

    const {id} = useParams();
    const token = localStorage.getItem('token');
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        avatar: '',
        username: '',
        accountBalance: 0,
        orderCount: 0,
        role: {}
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/${id}`);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Địt mẹ mày ', error);
            }
        }

        fetchUser();
    }, [id]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUser((currentUser) => ({...currentUser, [name]: value}));
    };

    const handleSave = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8080/api/users/${id}`, user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'User updated successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/admin/users')
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                });
                // Debug here...
                console.error('Error updating user:', error);
            });
    };

    if (loading){
        return (
            <>
                <Typography variant = 'h3'>
                    LOADING...
                </Typography>
            </>
        )
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: '100%' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Edit User
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <Avatar
                            alt={user.fullname}
                            src={user.avatar || 'https://via.placeholder.com/150'}
                            sx={{ width: 100, height: 100 }}
                        />
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Full Name"
                                name="fullname"
                                value={user.fullname}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Phone"
                                name="phone"
                                value={user.phone}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="City"
                                name="city"
                                value={user.city}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Avatar URL"
                                name="avatar"
                                value={user.avatar}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Username"
                                value={user.username}
                                disabled
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Account Balance"
                                value={user.accountBalance}
                                disabled
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Order Count"
                                value={user.orderCount}
                                disabled
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Role"
                                value={user.role.name || 'N/A'}
                                disabled
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save Changes
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{ ml: 2 }}
                            onClick={() => navigate('/admin/users')}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </>
    )
}
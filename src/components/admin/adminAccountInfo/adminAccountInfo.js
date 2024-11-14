import { Avatar, Card, Typography, Grid, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

export default function AdminAccountInfo() {

    const [adminInfo, setAdminInfo] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            axios.get("http://localhost:8080/api/auth/me", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setAdminInfo(response.data); 
                setLoading(false); 
            })
            .catch(error => {
                console.log(error);
                setLoading(false); 
            });
        }
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4 }}>

            <Typography variant="h4" gutterBottom align="center">
                Admin Account Info
            </Typography>
            <Card sx={{ maxWidth: 600, margin: '0 auto', p: 2, borderRadius: 2, boxShadow: 3 }}>
                <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar
                        src={adminInfo.avatar} 
                        alt="Admin avatar"
                        sx={{ width: 120, height: 120, boxShadow: 2 }}
                    />
                </Grid>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12}>
                        <Typography variant="body1" color="text.primary" sx={{ fontSize: '18px', lineHeight: '1.8' }}>
                            <strong>Username:</strong> {adminInfo.username}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" color="text.primary" sx={{ fontSize: '18px', lineHeight: '1.8' }}>
                            <strong>Role:</strong> {adminInfo.role.name} 
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" color="text.primary" sx={{ fontSize: '18px', lineHeight: '1.8' }}>
                            <strong>Email:</strong> {adminInfo.email }
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" color="text.primary" sx={{ fontSize: '18px', lineHeight: '1.8' }}>
                            <strong>Phone:</strong> {adminInfo.phone }
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" color="text.primary" sx={{ fontSize: '18px', lineHeight: '1.8' }}>
                            <strong>City:</strong> {adminInfo.city }
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" color="text.primary" sx={{ fontSize: '18px', lineHeight: '1.8' }}>
                            <strong>Status:</strong> Active 
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
}

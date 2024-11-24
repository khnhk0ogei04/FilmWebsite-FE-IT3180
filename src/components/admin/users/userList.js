import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Modal,
    TextField,
    Box,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    TableContainer,
    Paper,
    Pagination,
    IconButton,
    Typography,
} from '@mui/material';
import { AddCircle, Edit } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

export const UserList = () => {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState(0);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUsername, setSelectedUsername] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    const itemsPerPage = 5; 

    const handleOpen = (userId, username) => {
        setSelectedUserId(userId);
        setSelectedUsername(username);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setSelectedUserId(null);
        setAmount(0);
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    const handleSubmitBalance = () => {
        if (amount > 0) {
            axios.post(
                `http://localhost:8080/api/users/${selectedUserId}/add-balance?amount=${amount}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
                .then((response) => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Balance added successfully!',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setOpen(false);
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('Error adding balance:', error);
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        timer: 1500,
                        showConfirmButton: false,
                    });
                });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid amount',
                text: 'Please enter a valid amount!',
                position: 'center',
                timer: 1500,
                showConfirmButton: false,
            });
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users?page=${currentPage - 1}&limit=${itemsPerPage}`);
                setUsers(response.data.content);
                setTotalPages(Math.ceil(response.data.totalElements / itemsPerPage));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [currentPage]);

    const handleEditUser = (userId) => {
        navigate(`/admin/users/edit/${userId}`);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{
                            backgroundColor: '#1976d2',
                        }}>
                            <TableCell sx={{color: 'white'}}><Typography variant="body">ID</Typography></TableCell>
                            <TableCell sx={{color: 'white'}}><Typography variant="body">Username</Typography></TableCell>
                            <TableCell sx={{color: 'white'}}><Typography variant="body">Account Balance</Typography></TableCell>
                            <TableCell sx={{color: 'white'}}><Typography variant="body">Actions</Typography></TableCell>
                            <TableCell sx={{color: 'white'}}><Typography variant="body">Number of Tickets</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} hover>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>
                                    <Link to={`/admin/users/${user.id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                                        {user.username}
                                    </Link>
                                </TableCell>
                                <TableCell>{formatCurrency(user.accountBalance)}</TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleOpen(user.id, user.username)}
                                    >
                                        <AddCircle />
                                    </IconButton>
                                    <IconButton
                                        color="secondary"
                                        onClick={() => handleEditUser(user.id)}
                                    >
                                        <Edit />
                                    </IconButton>
                                </TableCell>
                                <TableCell>{user.orderCount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                    sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'center' }}
                />
            </TableContainer>

            <Modal open={open} onClose={handleClose}>
                <Box sx={{ ...modalStyle }}>
                    <Typography variant="h6" gutterBottom>
                        Add Balance for {selectedUsername}
                    </Typography>
                    <TextField
                        type="number"
                        label="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmitBalance}
                            sx={{ mr: 1 }}
                        >
                            Submit
                        </Button>
                        <Button variant="outlined" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};

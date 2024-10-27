// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Modal, TextField, Box } from '@mui/material';
// import Swal from 'sweetalert2';
// import { Table, TableHead, TableRow, TableCell, TableBody, Button, TableContainer, Paper } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';

// export const UserList = () => {
//     const [users, setUsers] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [amount, setAmount] = useState(0);
//     const [selectedUserId, setSelectedUserId] = useState(null); 
//     const [selectedUsername, setSelectedUsername] = useState(""); 

//     const navigate = useNavigate();

//     const handleOpen = (userId, username) => {
//         setSelectedUserId(userId);
//         setSelectedUsername(username); 
//         setOpen(true);
//     };
//     const handleClose = () => {
//         setOpen(false);
//         setSelectedUserId(null); 
//         setAmount(0); 
//     };

//     const handleSubmitBalance = () => {
//         if (amount > 0) {
//             axios.post(`http://localhost:8080/api/users/${selectedUserId}/add-balance?amount=${amount}`)
//                 .then((response) => {
//                     Swal.fire({
//                         position: 'top',
//                         icon: 'success',
//                         title: 'Balance added successfully!',
//                         showConfirmButton: false,
//                         timer: 1500,
//                     });
//                     setOpen(false);
//                 })
//                 .catch((error) => {
//                     console.error('Error adding balance:', error);
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Oops...',
//                         text: 'Something went wrong!',
//                     });
//                 });
//                 window.location.reload()
//         } else {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Invalid amount',
//                 text: 'Please enter a valid amount!',
//             });
//         }
//     };

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/api/users');
//                 setUsers(response.data);
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };

//         fetchUsers();
//     }, []);

//     const handleEditUser = (userId) => {
//         navigate(`/admin/users/edit/${userId}`);
//     };

//     return (
//         <TableContainer component={Paper}>
//             <Table>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>ID</TableCell>
//                         <TableCell>Username</TableCell>
//                         <TableCell>Account Balance</TableCell>
//                         <TableCell>Actions</TableCell>
//                         <TableCell>Number of tickets</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {users.map((user) => (
//                         <TableRow key={user.id}>
//                             <TableCell>{user.id}</TableCell>
//                             <TableCell>
//                                 <Link to={`/admin/users/${user.id}`}>
//                                     {user.username}
//                                 </Link>
//                             </TableCell>
//                             <TableCell>{user.accountBalance}</TableCell>
//                             <TableCell>
//                                 <Button 
//                                     variant="contained" 
//                                     color="primary" 
//                                     onClick={() => handleOpen(user.id, user.username)} // Truyền userId và username khi mở modal
//                                 >
//                                     Add Balance
//                                 </Button>
//                                 <Button 
//                                     variant="contained" 
//                                     color="secondary" 
//                                     style={{ marginLeft: '10px' }}
//                                     onClick={() => handleEditUser(user.id)}
//                                 >
//                                     Edit
//                                 </Button>
//                             </TableCell>
//                             <TableCell>
//                                 {user.orderCount}
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>

//             <Modal open={open} onClose={handleClose}>
//                 <Box sx={{ ...modalStyle }}>
//                     <h2>Add Balance for {selectedUsername}</h2> {/* Hiển thị đúng username */}
//                     <TextField
//                         type="number"
//                         label="Amount"
//                         value={amount}
//                         onChange={(e) => setAmount(e.target.value)}
//                         fullWidth
//                     />
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={handleSubmitBalance}
//                         sx={{ mt: 2 }}
//                     >
//                         Submit
//                     </Button>
//                     <Button
//                         variant="outlined"
//                         onClick={handleClose}
//                         sx={{ mt: 2, ml: 2 }}
//                     >
//                         Cancel
//                     </Button>
//                 </Box>
//             </Modal>
//         </TableContainer>
//     );
// };

// const modalStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, TextField, Box } from '@mui/material';
import Swal from 'sweetalert2';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, TableContainer, Paper, Pagination } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export const UserList = () => {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState(0);
    const [selectedUserId, setSelectedUserId] = useState(null); 
    const [selectedUsername, setSelectedUsername] = useState(""); 
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const navigate = useNavigate();

    const itemsPerPage = 5; // Number of users per page

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

    const handleSubmitBalance = () => {
        if (amount > 0) {
            axios.post(`http://localhost:8080/api/users/${selectedUserId}/add-balance?amount=${amount}`)
                .then((response) => {
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Balance added successfully!',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setOpen(false);
                })
                .catch((error) => {
                    console.error('Error adding balance:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    });
                });
                window.location.reload()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid amount',
                text: 'Please enter a valid amount!',
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
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Account Balance</TableCell>
                            <TableCell>Actions</TableCell>
                            <TableCell>Number of tickets</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>
                                    <Link to={`/admin/users/${user.id}`}>
                                        {user.username}
                                    </Link>
                                </TableCell>
                                <TableCell>{user.accountBalance}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={() => handleOpen(user.id, user.username)} 
                                    >
                                        Add Balance
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color="secondary" 
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => handleEditUser(user.id)}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    {user.orderCount}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination Component */}
                <Pagination 
                    count={totalPages} 
                    page={currentPage} 
                    onChange={handlePageChange} 
                    color="primary" 
                    variant="outlined" 
                    shape="rounded" 
                    sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} // Centering pagination
                />
            </TableContainer>

            <Modal open={open} onClose={handleClose}>
                <Box sx={{ ...modalStyle }}>
                    <h2>Add Balance for {selectedUsername}</h2>
                    <TextField
                        type="number"
                        label="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmitBalance}
                        sx={{ mt: 2 }}
                    >
                        Submit
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleClose}
                        sx={{ mt: 2, ml: 2 }}
                    >
                        Cancel
                    </Button>
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
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

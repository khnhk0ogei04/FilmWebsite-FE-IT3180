import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [fullName, setFullName] = useState("");
    const [balance, setBalance] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (token) {
            setIsLoggedIn(true);
            axios.get('http://localhost:8080/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log(response);
                setFullName(response.data.fullname);
                setBalance(response.data.accountBalance);
            })
            .catch(error => {
                console.log(error);
                // localStorage.removeItem('token');
                // localStorage.removeItem('role');
                // setIsLoggedIn(false);
                // navigate('/login');
                console.log("WRONG");
            });
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        navigate('/login');
    }
  return (
    <>
    <div id="top-banner" style={{textAlign: "center"}}>
        <a href="/">
            <img src="https://bhdstar.vn/wp-content/uploads/2024/10/banner-top.jpg" alt="Top Banner" />
        </a>
    </div>
    <AppBar position="static" sx={{ backgroundColor: '#fff', color: '#333', boxShadow: 'none', borderBottom: '1px solid #eee' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/user" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img
              src="https://bhdstar.vn/wp-content/uploads/2024/09/logo2024.png"
              alt="Logo"
              style={{ height: '50px' }}
            />
          </Link>
        </Box>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Button color="inherit" component={Link} to="/user" sx={{ fontWeight: '500', color: '#333' }}>Trang chủ</Button>
          <Button color="inherit" component={Link} to="/user/categories" sx={{ fontWeight: '500', color: '#333' }}>Thể loại</Button>
          <Button color="inherit" component={Link} to="/user/cinemas" sx={{ fontWeight: '500', color: '#333' }}>Hệ thống rạp</Button>
          <Button color="inherit" component={Link} to="/user/discounts" sx={{ fontWeight: '500', color: '#333' }}>Khuyến mãi</Button>
          <Button color="inherit" component={Link} to="/user/bookings" sx={{ fontWeight: '500', color: '#333' }}>Lịch sử giao dịch</Button>
        </Box>
        <Box sx={{ display: 'flex', gap: '15px' }}>
            {isLoggedIn ? (
              <>
              <Box sx={{direction: "vertical", alignItems: 'center'}}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>
                    Xin chào, {fullName}
                </Typography>
                <Typography variant='body2' style={{fontWeight: 'bold'}}>
                    AccountBalance: ${balance}
                </Typography>
              </Box>
                <Button
                  variant='contained'
                  color='info'
                  sx = {{fontWeight: '500', textTransform: 'none', borderColor: '#FFC0CB'}}
                  onClick={() => navigate('/user/donate')}
                >
                  Cúng Dường
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ fontWeight: '500', textTransform: 'none', borderColor: '#00adef' }}
                  onClick={() => navigate('/change-password')}
                >
                  Đổi mật khẩu
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ fontWeight: '500', textTransform: 'none', backgroundColor: '#f44336', '&:hover': { backgroundColor: '#d32f2f' } }}
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ fontWeight: '500', textTransform: 'none', borderColor: '#00adef' }}
                  component={Link} to="/login"
                >
                  Đăng nhập
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ fontWeight: '500', textTransform: 'none', backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#388e3c' } }}
                  component={Link} to="/register"
                >
                  Đăng ký
                </Button>
              </>
            )}
          </Box>
      </Toolbar>
    </AppBar>
    </>
  );
};

export default Header;

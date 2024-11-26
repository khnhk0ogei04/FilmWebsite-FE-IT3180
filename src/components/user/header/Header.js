import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [balance, setBalance] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      axios
        .get("http://localhost:8080/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setFullName(response.data.fullname);
          setBalance(response.data.accountBalance);
          setAvatar(response.data.avatar);
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div id="top-banner" style={{ textAlign: "center" }}>
        <a href="/">
          <img
            src="https://bhdstar.vn/wp-content/uploads/2024/10/banner-top.jpg"
            alt="Top Banner"
          />
        </a>
      </div>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#ffffff",
          color: "#333",
          boxShadow: "none",
          borderBottom: "2px solid #eee",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to="/user" style={{ textDecoration: "none", color: "inherit" }}>
              <img
                src="https://bhdstar.vn/wp-content/uploads/2024/09/logo2024.png"
                alt="Logo"
                style={{ height: "50px" }}
              />
            </Link>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            <Button component={Link} to="/user" sx={{ color: "#555", fontWeight: "bold" }}>
              Trang chủ
            </Button>
            <Button component={Link} to="/user/categories" sx={{ color: "#555", fontWeight: "bold" }}>
              Thể loại
            </Button>
            <Button component={Link} to="/user/cinemas" sx={{ color: "#555", fontWeight: "bold" }}>
              Hệ thống rạp
            </Button>
            <Button component={Link} to="/user/discounts" sx={{ color: "#555", fontWeight: "bold" }}>
              Khuyến mãi
            </Button>
            <Button component={Link} to="/user/bookings" sx={{ color: "#555", fontWeight: "bold" }}>
              Lịch sử giao dịch
            </Button>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isLoggedIn ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderLeft: "1px solid #ddd",
                  pl: 2,
                }}
              >
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "#1976d2",
                    }}
                  >
                    {fullName}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#333",
                    }}
                  >
                    Số dư: {balance?.toLocaleString("vi-VN")}đ
                  </Typography>
                </Box>
                <Avatar src={avatar} sx={{ width: 40, height: 40 }} />
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "12px",
                    backgroundColor: "#4caf50",
                  }}
                  component={Link}
                  to="/user/donate"
                >
                  Donate
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "12px",
                    borderColor: "#1976d2",
                    color: "#1976d2",
                  }}
                  onClick={() => navigate("/change-password")}
                >
                  Đổi mật khẩu
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "12px",
                    borderColor: "#1976d2",
                    color: "#1976d2",
                  }}
                  component={Link}
                  to="/login"
                >
                  Đăng nhập
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "12px",
                    backgroundColor: "#4caf50",
                  }}
                  component={Link}
                  to="/register"
                >
                  Đăng ký
                </Button>
              </Box>
            )}
          </Box>
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose} component={Link} to="/user">
              Trang chủ
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/user/categories">
              Thể loại
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/user/cinemas">
              Hệ thống rạp
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/user/discounts">
              Khuyến mãi
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/user/bookings">
              Lịch sử giao dịch
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;

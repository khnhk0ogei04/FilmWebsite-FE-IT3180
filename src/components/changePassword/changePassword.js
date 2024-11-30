import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Card,
  Alert,
  FormControl,
  FormLabel,
  Grid,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FooterComponent1 } from "../footer1/FooterComponent1";

export const ChangePasswordComponent = () => {
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
    
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:8080/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUsername(response.data.username);
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
        });
    }
  }, []);

  const handleChangePassword = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("New password and confirmed password must match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/api/auth/change-password",
        {
          username,
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccessMessage("Password changed successfully!");
      setErrorMessage("");
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Password changed successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (error) {
      console.error("Change Password Error:", error);
      setErrorMessage("Failed to change password. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <Card
        sx={{
          maxWidth: "450px",
          width: "100%",
          padding: "30px",
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            color: "#1976d2",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Change Password
        </Typography>
        <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleChangePassword}>
          <FormControl sx={{ width: "100%", marginBottom: "16px" }}>
            <FormLabel
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "1rem",
                marginBottom: "8px",
                color: "#333",
              }}
            >
              Username{" "}
              <Box component="span" sx={{ color: "red", marginLeft: "4px" }}>
                *
              </Box>
            </FormLabel>
            <TextField
              type="text"
              variant="outlined"
              value={username}
              disabled
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </FormControl>
          <FormControl sx={{ width: "100%", marginBottom: "16px" }}>
            <FormLabel
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "1rem",
                marginBottom: "8px",
                color: "#333",
              }}
            >
              Current Password{" "}
              <Box component="span" sx={{ color: "red", marginLeft: "4px" }}>
                *
              </Box>
            </FormLabel>
            <TextField
              type="password"
              variant="outlined"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </FormControl>
          <FormControl sx={{ width: "100%", marginBottom: "16px" }}>
            <FormLabel
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "1rem",
                marginBottom: "8px",
                color: "#333",
              }}
            >
              New Password{" "}
              <Box component="span" sx={{ color: "red", marginLeft: "4px" }}>
                *
              </Box>
            </FormLabel>
            <TextField
              type="password"
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </FormControl>
          <FormControl sx={{ width: "100%", marginBottom: "16px" }}>
            <FormLabel
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "1rem",
                marginBottom: "8px",
                color: "#333",
              }}
            >
              Confirm New Password{" "}
              <Box component="span" sx={{ color: "red", marginLeft: "4px" }}>
                *
              </Box>
            </FormLabel>
            <TextField
              type="password"
              variant="outlined"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </FormControl>
          {errorMessage && (
            <Alert severity="error" sx={{ marginTop: "10px", textAlign: "center" }}>
              {errorMessage}
            </Alert>
          )}
          {successMessage && (
            <Alert severity="success" sx={{ marginTop: "10px", textAlign: "center" }}>
              {successMessage}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#1976d2",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#115293",
              },
            }}
          >
            Change Password
          </Button>
        </form>
      </Card>
    </Box>
    <Grid>
      <FooterComponent1 />
    </Grid>
    </>
  );
};

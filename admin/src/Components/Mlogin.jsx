import React, { useState } from "react";
import {
  TextField,
  IconButton,
  Card,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

const Mlogin = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!id || !email || !password) {
      setError("All fields are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulated authentication (Replace with actual API call)
    if (id === "user123" && email === "user@gmail.com" && password === "user@123") {
      navigate("/mhome");
    } else {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #2C3E50, #4CA1AF)", // Updated Background
      }}
    >
      <Card
        style={{
          padding: "30px",
          width: "350px",
          height: "420px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          borderRadius: "15px",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          style={{
            marginBottom: "20px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Medicine Login
        </Typography>

        <TextField
          label="User ID"
          variant="outlined"
          fullWidth
          value={id}
          onChange={(e) => setId(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "15px" }}
        />

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "15px" }}
        />

        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "15px" }}
        />

        {error && (
          <Typography
            color="error"
            style={{
              marginBottom: "15px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          style={{
            marginTop: "10px",
            backgroundColor: "#4CA1AF", // Button color adjusted to match theme
            color: "#fff",
            padding: "10px",
            fontSize: "16px",
          }}
        >
          Login
        </Button>
      </Card>
    </div>
  );
};

export default Mlogin;

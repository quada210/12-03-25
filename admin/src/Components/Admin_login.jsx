import React, { useState } from "react";
import {
  TextField,
  IconButton,
  Card,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin_Login = () => {
  const [identifier, setIdentifier] = useState(""); // Can be email or username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Built-in admin credentials
  const adminCredentials = {
    username: "admin",
    email: "admin@gmail.com",
    password: "admin@123",
  };

  const validateForm = () => {
    if (!identifier || password.length < 6) {
      setError("Invalid credentials. Please try again.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (
      (identifier === adminCredentials.username ||
        identifier === adminCredentials.email) &&
      password === adminCredentials.password
    ) {
      navigate("/home");
    } else {
      try {
        const response = await axios.post("http://localhost:4040/adminlogin", {
          identifier,
          password,
        });

        if (response.data === "successful") {
          navigate("/home");
        } else {
          setError("Invalid email or password.");
        }
      } catch (err) {
        console.error("Login error:", err);
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(to bottom right, #2C3E50, #4CA1AF)",
    }}>
      <Card
        style={{
          padding: "30px",
          width: "350px",
          height: "400px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography variant="h5" align="center" style={{ marginBottom: "20px", fontWeight: "bold", color: "#2C3E50" }}>
          Admin Login
        </Typography>

        <TextField
          label="Username or Email"
          variant="outlined"
          fullWidth
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {identifier.includes("@") ? <EmailIcon /> : <PersonIcon />}
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
          <Typography color="error" style={{ marginBottom: "15px", fontSize: "14px", textAlign: "center" }}>
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
            backgroundColor: "#4CA1AF",
            color: "#fff",
            padding: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "8px",
          }}
        >
          Login
        </Button>
      </Card>
    </div>
  );
};

export default Admin_Login;

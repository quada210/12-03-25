import React, { useState } from 'react';
import { TextField, IconButton, Card, Button, Typography, Container } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin_Signup = () => {

  var [inputs, setInputs] = useState({
    email: "",
    username:"",
    password: "",
})
const [emailError, setEmailError] = useState(false); // State to track email format error
 
  



const inputHandler = (e) => {
  const { name, value } = e.target
  setInputs((prevData) => ({ ...prevData, [name]: value }))
  console.log(inputs)
}
const navigate = useNavigate();

const addHandler = () => {
if (!/\S+@\S+\.\S+/.test(inputs.email)) {
  setEmailError(true);
  return;
}

  console.log(inputs.email)
  console.log("button clicked");
  axios.post("http://localhost:4040/addadmin", inputs)
      .then((result) => {
          console.log(result.data);
          alert(result.data);
          navigate('/sign');

      })
      .catch((error) => {
          console.error("Error adding user:", error);
          if (error.response && error.response.status === 400) {
              alert("Email already exists. Please choose another one.");
          }
      });
}
const isFormValid = () => {
  return inputs.email && inputs.username && inputs.password;
};

 
  return (
    <div>
      {/* Navbar is not included here, so it's hidden on this page */}

      <Container maxWidth="xs" className="flex justify-center items-center min-h-screen">
        <Card variant="outlined" className="p-6 shadow-lg rounded-lg bg-white text-center">
          <Typography variant="h5" gutterBottom>
            Admin Sign Up
          </Typography>

          <TextField
            label="Email"
            variant="filled"
            name='email'
            required
            value={inputs.email}
           error={emailError} // Apply red  line indication
       
            onChange={inputHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
         
            className="mb-4"
          />
          <TextField
             label="Username"
             variant="outlined"
             fullWidth
             name="username"
             value={inputs.username}
             onChange={inputHandler}
          
             required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
         
           
            className="mb-4"
          />
          <TextField
       id="standard-password-input"
       label="Password"
       type="password"
      name='password'
      required
      value={inputs.password} 
     onChange={inputHandler}

        sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
      
            variant="outlined"
            className="mb-4"
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={addHandler}
            disabled={!isFormValid()} // Disable button if fields are empty
          >
            Sign Up
          </Button>

          <Typography variant="body2" className="mt-4">
            Already have an account? <a href="/admin-login" className="text-blue-500">Login here</a>
          </Typography>
        </Card>
      </Container>
    </div>
  );
};

export default Admin_Signup;

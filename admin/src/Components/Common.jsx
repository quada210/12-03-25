import React, { useState } from 'react';
import { Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Common = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedRole === '') {
      alert('Please select a role!');
      return;
    }
    if (selectedRole === 'admin') {
      navigate('/admin-login');
    } else if (selectedRole === 'food') {
      navigate('/fhome');
    } else if (selectedRole === 'medicine') {
      navigate('/mhome');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <Typography variant="h4" gutterBottom style={styles.title}>
          Select Your Role
        </Typography>

        <FormControl component="fieldset">
          <FormLabel component="legend" style={styles.label}> </FormLabel>
          <RadioGroup name="role" value={selectedRole} onChange={handleRoleChange}>
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
            <FormControlLabel value="food" control={<Radio />} label="Food Section User" />
            <FormControlLabel value="medicine" control={<Radio />} label="Medicine Section User" />
          </RadioGroup>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleSubmit} style={styles.button}>
          Submit
        </Button>
      </div>
    </div>
  );
};

// 🌈 Styled with Background Color
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #2C3E50, #4CA1AF)', // Beautiful Gradient Background
  },
  box: {
    padding: '30px',
    background: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)', // Glassmorphism Effect
    textAlign: 'center',
    color: '#fff',
  },
  title: {
    marginBottom: '20px',
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    marginTop: '20px',
  },
};

export default Common;

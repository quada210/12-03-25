import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Orderfood = () => {
  const [user, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4040/get")
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ margin: '4%', textAlign: 'center' }}>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 'bold', color: '#333' }}>
        Food Orders
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {user.map((val, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card sx={{ minWidth: 275, boxShadow: 5, borderRadius: 2, p: 2, backgroundColor: '#f9f9f9' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  Order Details:
                </Typography>
                {val.foodItems
                  .filter((food) => food.includes("(food)")) 
                  .map((food, index) => (
                    <Typography variant="body1" key={index} sx={{ fontSize: '1rem', marginBottom: '0.3rem' }}>
                      🍽️ {food.replace("(food)", "")}
                    </Typography>
                  ))}
                <Typography variant="h6" sx={{ marginTop: 1, fontWeight: 'bold' }}>
                  💰 Price: {val.totalPrice}
                </Typography>
                <Typography variant="h6" sx={{ marginTop: 0.5 }}>
                  ✉️ Email: {val.email}
                </Typography>
                <Typography variant="h6" sx={{ marginTop: 0.5 }}>
                  📝 Name: {val.name}
                </Typography>
                <Typography variant="h6" sx={{ marginTop: 0.5 }}>
                  📞 Phone: {val.phone}
                </Typography>
                <Typography variant="h6" sx={{ marginTop: 0.5 }}>
                  🆔 ID: {val.id}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Orderfood;

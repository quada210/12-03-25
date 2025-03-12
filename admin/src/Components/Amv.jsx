import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CircularProgress, Box, Button, TextField } from '@mui/material';

const Amv = () => {
    const [user, setUsers] = useState([]);
    

    useEffect(() => {
        axios.get("http://localhost:4040/getmedi")
            .then(response => setUsers(response.data))
            .catch(err => console.log(err));
    }, []);

   

    return (
        <div style={{
            display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            minHeight: "100vh",
            background: "linear-gradient(to bottom right, #2C3E50, #4CA1AF)",
            width: "100%",
            padding: "20px 0",
        }}>
            <Box sx={{
                width: "100%",
                maxWidth: "1200px",
                padding: '20px',
            }}>
                <Typography
                    variant='h3'
                    align="center"
                    sx={{
                        fontWeight: 'bold',
                        marginBottom: '40px',
                        color: '#ffffff',
                        justifyContent: "center",
                    }}
                >
                    Medicine View
                </Typography>

                {user.length === 0 ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                        <CircularProgress color="primary" size={50} />
                    </Box>
                ) : (
                    <Grid container spacing={3} justifyContent="center">
                        {user.map((val, i) => (
                            <Grid item xs={12} sm={6} md={4} key={i}>
                                <Card
                                    sx={{
                                        maxWidth: 345,
                                        boxShadow: 5,
                                        borderRadius: '15px',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: 8,
                                        },
                                        backgroundColor: '#ffffff',
                                        padding: '15px',
                                    }}
                                >
                                    <img
                                        src={val.image}
                                        alt="Medicine"
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            objectFit: 'cover',
                                            borderRadius: '10px'
                                        }}
                                    />
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
                                            {val.name}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" sx={{ marginTop: '10px' }}>
                                            Price: <span style={{ fontWeight: 'bold' }}>${val.price}</span>
                                        </Typography>
                                     
                                        
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}

               
            </Box>
        </div>
    );
};

export default Amv;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CircularProgress, Box, Button, TextField } from '@mui/material';

const Viewfood = () => {
    const [user, setUsers] = useState([]);
    const [updateId, setUpdateId] = useState(null);
    const [updateData, setUpdateData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:4040/getfood")
            .then(response => setUsers(response.data))
            .catch(err => console.log(err));
    }, []);

    const deleteValue = (id) => {
        axios.delete("http://localhost:4040/removefood/" + id)
            .then((response) => {
                alert(response.data);
                window.location.reload(false);
            })
            .catch((err) => console.log(err));
    };

    const handleUpdate = () => {
        setLoading(true);
        axios.put(`http://localhost:4040/editfood/${updateId}`, updateData)
            .then((response) => {
                alert(response.data);
                window.location.reload(false);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateData({ ...updateData, [name]: value });
    };

    const updateValues = (val) => {
        setUpdateId(val._id);
        setUpdateData({ name: val.name, price: val.price, image: val.image });
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
                        color: '#ffffff'
                    }}
                >
                    Food View
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
                                        <Button
                                            onClick={() => deleteValue(val._id)}
                                            size="small"
                                            variant='contained'
                                            color='secondary'
                                            sx={{ marginTop: '15px' }}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            onClick={() => updateValues(val)}
                                            size="small"
                                            variant='contained'
                                            color='warning'
                                            sx={{ marginTop: '10px', marginLeft: '10px' }}
                                        >
                                            Update
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}

                {updateId && (
                    <div>
                        <Typography variant='h4' align="center" sx={{ marginTop: '40px', color: '#ffffff' }}>
                            Update Item
                        </Typography>
                        <Box
                            sx={{
                                backgroundColor: '#ffffff',
                                padding: '20px',
                                borderRadius: '10px',
                                maxWidth: '500px',
                                margin: 'auto',
                                marginTop: '20px',
                                boxShadow: 3,
                            }}
                        >
                            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={updateData.name}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Price"
                                    name="price"
                                    value={updateData.price}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Image URL"
                                    name="image"
                                    value={updateData.image}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <Button
                                    type="submit"
                                    variant='contained'
                                    color='primary'
                                    sx={{ marginTop: '20px', width: '100%' }}
                                    disabled={loading}
                                >
                                    {loading ? 'Updating...' : 'Update'}
                                </Button>
                            </form>
                        </Box>
                    </div>
                )}
            </Box>
        </div>
    );
};

export default Viewfood;

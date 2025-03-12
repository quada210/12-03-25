import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, Button, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import axios from 'axios';

const Viewmediuser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4040/viewmedi")
            .then(response => setUsers(response.data))
            .catch(err => console.log(err));
    }, []);

    const deleteValue = (id) => {
        axios.delete("http://localhost:4040/removemedi/" + id)
            .then((response) => {
                alert(response.data);
                window.location.reload(false);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            background: "linear-gradient(to bottom right, #2C3E50, #4CA1AF)",
            padding: "20px"
        }}>
            <Box sx={{
                width: "90%",
                maxWidth: "1100px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: 5
            }}>
                <Typography 
                    variant="h4" 
                    align="center" 
                    sx={{ fontWeight: 'bold', marginBottom: '20px', color: '#2C3E50' }}
                >
                    Med Employee Management
                </Typography>

                <TableContainer component={Paper} sx={{ borderRadius: "10px", overflow: "hidden" }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#4CA1AF" }}>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Sl. No</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Username</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>User ID</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Category</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Block</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f4f8fb' } }}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.userid}</TableCell>
                                    <TableCell>{user.category}</TableCell>
                                    <TableCell align="center">
                                        <Button 
                                            onClick={() => deleteValue(user._id)} 
                                            size="small" 
                                            variant='contained' 
                                            color='secondary'
                                            sx={{ fontWeight: 'bold', borderRadius: '8px' }}
                                        >
                                            Block
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
}

export default Viewmediuser;

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Button,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";

const Viewfooduser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4040/view")
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteValue = (id) => {
    axios
      .delete("http://localhost:4040/remove/" + id)
      .then((response) => {
        alert(response.data);
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #2C3E50, #4CA1AF)", // Updated Background
        padding: "20px",
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        style={{
          color: "#fff",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Food Employee Management
      </Typography>

      <TableContainer component={Paper} style={{ maxWidth: "90%", borderRadius: "10px", overflow: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#4CA1AF" }}>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Sl. No</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Username</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>User ID</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Category</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Block</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index} hover>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.userid}</TableCell>
                <TableCell>{user.category}</TableCell>
                <TableCell>
                  <Button onClick={() => deleteValue(user._id)} size="small" variant="contained" color="secondary">
                    Block
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Viewfooduser;

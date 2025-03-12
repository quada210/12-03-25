import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Paper,
  Card,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Fetch orders from the server
  useEffect(() => {
    axios
      .get("http://localhost:4040/get")
      .then((res) => {
        setContacts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Open the OTP dialog
  const handleOpenDialog = (orderId) => {
    setSelectedOrderId(orderId);
    setOpen(true);
  };

  // Close the OTP dialog
  const handleCloseDialog = () => {
    setOpen(false);
    setOtp('');
  };

  // Handle OTP submission
  const handleOtpSubmit = () => {
    axios.post("http://localhost:4040/otp", { id: selectedOrderId, otp: otp })
      .then((res) => {
        if (res.data === "successful") {
          alert("OTP Verified! Order marked as delivered.");
          // Remove the delivered order from the list
          setContacts(contacts.filter(contact => contact.id !== selectedOrderId));
        } else {
          alert(res.data);  // Show the server response (like "otp is incorrect")
        }
        handleCloseDialog();
      })
      .catch((err) => {
        console.error("Error verifying OTP:", err);
        alert("Error verifying OTP. Please try again.");
      });
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Typography variant="h5" style={styles.heading}>
          Order List
        </Typography>

        {loading ? (
          <div style={styles.centered}>
            <CircularProgress sx={{ color: "#BB86FC" }} />
          </div>
        ) : contacts.length === 0 ? (
          <Typography variant="body1" style={styles.emptyState}>
            No orders available.
          </Typography>
        ) : (
          <TableContainer component={Paper} elevation={3} style={styles.tableContainer}>
            <Table>
              <TableHead sx={{ backgroundColor: "#BB86FC" }}>
                <TableRow>
                  <TableCell style={styles.headerCell}>Order ID</TableCell>
                  <TableCell style={styles.headerCell}>Name</TableCell>
                  <TableCell style={styles.headerCell}>Email</TableCell>
                  <TableCell style={styles.headerCell}>Phone</TableCell>
                  <TableCell style={styles.headerCell}>Food Items</TableCell>
                  <TableCell style={styles.headerCell}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.map((contact, index) => (
                  <TableRow
                    key={index}
                    style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                  >
                    <TableCell style={styles.cell}>{contact.id}</TableCell>
                    <TableCell style={styles.cell}>{contact.name}</TableCell>
                    <TableCell style={styles.cell}>{contact.email}</TableCell>
                    <TableCell style={styles.cell}>{contact.phone}</TableCell>
                    <TableCell style={styles.cell}>
                      {Array.isArray(contact.foodItems) && contact.foodItems.length > 0 ? (
                        contact.foodItems.map((food, idx) => (
                          <Typography variant="body1" key={idx}>
                            🍽️ {food}
                          </Typography>
                        ))
                      ) : (
                        <Typography variant="body1">No food items</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={() => handleOpenDialog(contact.id)}
                      >
                        Delivered
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* OTP Dialog */}
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>Enter OTP for Order {selectedOrderId}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="OTP"
              type="text"
              fullWidth
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleOtpSubmit} color="primary" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to bottom right, #2C3E50, #4CA1AF)",
  },
  card: {
    padding: "25px",
    width: "90%",
    maxWidth: "900px",
    background: "rgba(255, 255, 255, 0.15)",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(10px)",
    color: "white",
  },
  heading: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#fff",
  },
  centered: {
    textAlign: "center",
  },
  emptyState: {
    textAlign: "center",
    color: "gray",
  },
  tableContainer: {
    background: "rgba(255, 255, 255, 0.1)",
  },
  headerCell: {
    color: "white",
    fontWeight: "bold",
  },
  cell: {
    color: "white",
  },
  evenRow: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  oddRow: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
};

export default Home;

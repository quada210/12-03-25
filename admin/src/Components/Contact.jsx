import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Card,
  CircularProgress,
} from "@mui/material";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4040/getcontact")
      .then((res) => {
        setContacts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Typography variant="h5" style={styles.heading}>
          Contact Messages
        </Typography>

        {loading ? (
          <div style={styles.centered}>
            <CircularProgress sx={{ color: "#BB86FC" }} />
          </div>
        ) : contacts.length === 0 ? (
          <Typography variant="body1" style={styles.emptyState}>
            No messages available.
          </Typography>
        ) : (
          <TableContainer component={Paper} elevation={3} style={styles.tableContainer}>
            <Table>
              <TableHead sx={{ backgroundColor: "#BB86FC" }}>
                <TableRow>
                  <TableCell style={styles.headerCell}>Name</TableCell>
                  <TableCell style={styles.headerCell}>Email</TableCell>
                  <TableCell style={styles.headerCell}>Message</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.map((contact, index) => (
                  <TableRow key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                    <TableCell style={styles.cell}>{contact.name}</TableCell>
                    <TableCell style={styles.cell}>{contact.email}</TableCell>
                    <TableCell style={styles.cell}>{contact.message}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>
    </div>
  );
};

// Define styles separately for Contact.jsx
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

export default Contact;

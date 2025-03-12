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
  Box,
  Button,
} from "@mui/material";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddButton, setShowAddButton] = useState(false);
  const [showRemoveButton, setShowRemoveButton] = useState(false);

  const isMobile = window.innerWidth < 600;

  useEffect(() => {
    fetchFeedback("getfeedback");
  }, []);

  const fetchFeedback = (endpoint, showAdd = false, showRemove = false) => {
    setLoading(true);
    setShowAddButton(showAdd);
    setShowRemoveButton(showRemove);

    axios
      .get(`http://localhost:4040/${endpoint}`)
      .then((response) => {
        setFeedbacks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const addHandler = (item) => {
    axios.post("http://localhost:4040/addfeedfive", item)
      .then((response) => {
        if (response.status === 200) {
          alert("Item added to main page");
        } else {
          alert(response.data);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert("This item is already in the main page.");
        } else {
          console.error(error);
          alert("Error: Unable to add item to main page. Please try again later.");
        }
      });
  };

  const deleteValue = (id) => {
    axios.delete("http://localhost:4040/removefeed/" + id)
      .then((response) => {
        alert(response.data);
        fetchFeedback("getfeedfive", false, true); // Refresh the "View Main Page Contents" list
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={styles.container}>
      <Box sx={{ p: isMobile ? 2 : 4 }}>
        {/* Filter Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3, flexWrap: "wrap" }}>
          <Button onClick={() => fetchFeedback("getfeedback", false, false)} size="small" variant="contained" color="primary">
            All
          </Button>
          <Button onClick={() => fetchFeedback("viewfivestar", true, false)} size="small" variant="contained" color="primary">
            5 Star Rating
          </Button>
          <Button onClick={() => fetchFeedback("getfeedfive", false, true)} size="small" variant="contained" color="primary">
            View Main Page Contents
          </Button>
        </Box>

        <Card style={styles.card}>
          <Typography variant="h5" style={styles.heading}>
            Feedback Reviews
          </Typography>
          {loading ? (
            <div style={styles.centered}>
              <CircularProgress sx={{ color: "#BB86FC" }} />
            </div>
          ) : feedbacks.length === 0 ? (
            <Typography variant="body1" style={styles.emptyState}>
              No feedback available.
            </Typography>
          ) : (
            <TableContainer component={Paper} elevation={3} style={styles.tableContainer}>
              <Table>
                <TableHead sx={{ backgroundColor: "#BB86FC" }}>
                  <TableRow>
                    <TableCell style={styles.headerCell}>Email</TableCell>
                    <TableCell style={styles.headerCell}>Review</TableCell>
                    {!showRemoveButton && <TableCell style={styles.headerCell}>Rating</TableCell>}
                    {showAddButton && <TableCell style={styles.headerCell}>Add to Main Page</TableCell>}
                    {showRemoveButton && <TableCell style={styles.headerCell}>Remove</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {feedbacks.map((feedback, index) => (
                    <TableRow key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                      <TableCell style={styles.cell}>{feedback.email}</TableCell>
                      <TableCell style={styles.cell}>{feedback.review}</TableCell>
                      {!showRemoveButton && <TableCell style={styles.cell}>{feedback.rating}</TableCell>}
                      {showAddButton && (
                        <TableCell>
                          <Button variant="contained" color="success" size="small" onClick={() => addHandler(feedback)}>
                            ADD TO MAIN PAGE
                          </Button>
                        </TableCell>
                      )}
                      {showRemoveButton && (
                        <TableCell>
                          <Button
                            onClick={() => deleteValue(feedback._id)}
                            size="small"
                            variant="contained"
                            color="secondary"
                          >
                            Remove
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Card>
      </Box>
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

export default Feedback;
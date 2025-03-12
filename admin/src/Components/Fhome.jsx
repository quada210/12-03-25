import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';

const Fhome = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #2C3E50, #4CA1AF)",
        padding: "20px",
      }}
    >
      <Typography variant="h4" style={{ color: "white", marginBottom: "30px", fontWeight: "bold" }}>
        Food Management
      </Typography>

      {/* Grid layout for proper alignment */}
      <Grid container spacing={4} justifyContent="center">
        {/* Add Food Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            className="cursor-pointer hover:shadow-2xl transition-all duration-300"
            style={{
              textAlign: "center",
              padding: "20px",
              background: "white",
              borderRadius: "12px",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CardContent>
              <Typography variant="h6" style={{ fontWeight: "bold", color: "#2C3E50" }}>
                Add Food
              </Typography>
              <Typography variant="body2" style={{ color: "#555" }}>
                Add new food items to the menu.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "15px" }}
                onClick={() => navigate('/addfood')}
              >
                Add Now
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* View Food Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            className="cursor-pointer hover:shadow-2xl transition-all duration-300"
            style={{
              textAlign: "center",
              padding: "20px",
              background: "white",
              borderRadius: "12px",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CardContent>
              <Typography variant="h6" style={{ fontWeight: "bold", color: "#2C3E50" }}>
                View Food
              </Typography>
              <Typography variant="body2" style={{ color: "#555" }}>
                View and manage available food items.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                style={{ marginTop: "15px" }}
                onClick={() => navigate('/viewfood')}
              >
                View Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Fhome;

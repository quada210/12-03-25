import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  const [viewUsersExpanded, setViewUsersExpanded] = useState(false);
  const [viewItemExpanded, setViewItemExpanded] = useState(false);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #2C3E50, #4CA1AF)",
    // paddingBottom: "0px",
  };

  const cardContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    justifyContent: "center",
    width: "80%",
    marginTop: "20px",
  };

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    backgroundColor: "#fff",
  };

  const headerStyle = {
    textAlign: "center",
    color: "#fff",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  const handleMouseOver = (e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)";
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1>Welcome, Admin!</h1>
      </header>

      {/* Card Section */}
      <div style={cardContainer}>
        {/* Add Official User */}
        <Link to="/add-users" style={linkStyle}>
          <div style={cardStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <h2>Add Official User</h2>
          </div>
        </Link>

        {/* View Users Section */}
        <div style={cardStyle} onClick={() => setViewUsersExpanded(!viewUsersExpanded)} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <h2>View Users</h2>
        </div>
        {viewUsersExpanded && (
          <div style={cardContainer}>
            <Link to="/foodmanage" style={linkStyle}>
              <div style={cardStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                Food Users
              </div>
            </Link>
            <Link to="/medimanage" style={linkStyle}>
              <div style={cardStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                Medicine Users
              </div>
            </Link>
          </div>
        )}

        {/* View Items Section */}
        <div style={cardStyle} onClick={() => setViewItemExpanded(!viewItemExpanded)} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <h2>View Items</h2>
        </div>
        {viewItemExpanded && (
          <div style={cardContainer}>
            <Link to="/viewfood" style={linkStyle}>
              <div style={cardStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                Food Items
              </div>
            </Link>
            <Link to="/amv" style={linkStyle}>
              <div style={cardStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                Medicine Items
              </div>
            </Link>
          </div>
        )}

        {/* Feedbacks */}
        <Link to="/feedbacks" style={linkStyle}>
          <div style={cardStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <h2>Feedbacks</h2>
          </div>
        </Link>

        {/* Contact Us */}
        <Link to="/contact" style={linkStyle}>
          <div style={cardStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <h2>Contact Us</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;

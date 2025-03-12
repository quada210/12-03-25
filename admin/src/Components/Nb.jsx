import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const Nb = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // Paths where navbar should be hidden
  const hiddenPaths = [
    '/admin-login', '/admin-signup', '/common', '/fhome', '/mhome',
    '/addmedi', '/viewmedi', '/medicine-section', '/mlogin',
    '/add-food', '/view-food','/viewfood','/addfood','/contact'
  ];

  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: 'black' }}>
        <Toolbar>
          {/* Home Icon on the Left */}
          <IconButton color="inherit">
            <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
              <HomeIcon sx={{ fontSize: 40 }} />
            </Link>
          </IconButton>

         
  

          {/* Title (Centered) */}
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            ADMIN 
          </Typography>

          {/* Logout Icon on the Right */}
          <IconButton color="inherit" onClick={() => navigate('/common')}>
            <LogoutIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nb;

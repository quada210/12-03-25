import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const Mnb = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const hiddenPaths = ['/admin-login', '/admin-signup', '/common', '/fhome', '/home','/add-users','/mlogin','/foodmanage','/add-food','/view-food','/medimanage','/feedbacks','/contact-us','/amv','/viewfood','/addfood','/contact'];

  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: 'black' }}>
      <Toolbar>
          {/* Home Icon on the Left */}
          <IconButton color="inherit">
            <Link to="/mhome" style={{ textDecoration: 'none', color: 'white' }}>
              <HomeIcon sx={{ fontSize: 40 }} />
            </Link>
          </IconButton>

         
  

          {/* Title (Centered) */}
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            MEDICINE SECTION
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

export default Mnb;
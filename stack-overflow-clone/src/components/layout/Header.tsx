import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
      <FontAwesomeIcon style={{margin: "-3px 10px 0 0", color:"#98fff1"}} icon={faBookOpenReader} />
      <Typography 
        variant="h6" 
        component={RouterLink} 
        to="/" 
        style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', cursor: 'pointer'}}
      >
        Stack Overfaux
      </Typography>
        <Button color="inherit" component={RouterLink} to="/">Questions</Button>
        <Button color="inherit" component={RouterLink} to="/users/16139854">Profile</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Typography variant="body2" color="text.secondary" align="center">
        Stack Overfaux | Matt Chinnock
      </Typography>
    </Box>
  );
};

export default Footer;
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Typography, Divider } from '@mui/material';

/**
 * Header component for the Reports section
 * Simplified to only show "Bill Pay Reports" with no subtitle
 */
const ReportsHeader: React.FC = () => {
  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" color="text.primary" sx={{ mb: 0.5 }}>
          Bill Pay Reports
        </Typography>
        <Divider />
      </Box>
      
      <Outlet />
    </Box>
  );
};

export default ReportsHeader;

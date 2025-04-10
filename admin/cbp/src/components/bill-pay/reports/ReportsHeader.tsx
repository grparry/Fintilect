import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, Typography, Divider } from '@mui/material';

/**
 * Header component for the Reports section
 * Displays a dynamic title based on the current route
 */
const ReportsHeader: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  
  // Determine the header text based on the current path
  let headerText = "Bill Pay Reports";
  
  if (path.includes('/payment-reports')) {
    headerText = "Payment Reports";
  } else if (path.includes('/recurring-payment-reports')) {
    headerText = "Recurring Payment Reports";
  } else if (path.includes('/user-payee-reports')) {
    headerText = "User & Payee Reports";
  } else if (path.includes('/system-compliance-reports')) {
    headerText = "System & Compliance Reports";
  }
  
  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" color="text.primary" sx={{ mb: 0.5 }}>
          {headerText}
        </Typography>
        <Divider />
      </Box>
      
      <Outlet />
    </Box>
  );
};

export default ReportsHeader;

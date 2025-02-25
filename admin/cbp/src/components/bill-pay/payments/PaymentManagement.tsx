import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const PaymentManagement: React.FC = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default PaymentManagement;

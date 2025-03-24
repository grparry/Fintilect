import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const BillPay: React.FC = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default BillPay;
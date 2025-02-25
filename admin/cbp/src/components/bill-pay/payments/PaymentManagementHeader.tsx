import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Grid, Paper, Link } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ErrorIcon from '@mui/icons-material/Error';
import BuildIcon from '@mui/icons-material/Build';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const PaymentManagementHeader: React.FC = () => {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom color="text.primary">
          Payment Management
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Manage payments, handle exceptions, and process transactions.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper 
            sx={{ 
              p: 3, 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
          >
            <Link
              component={RouterLink}
              to="/admin/bill-pay/payments/manage"
              color="inherit"
              underline="none"
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              <ScheduleIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />
              <Typography variant="h6" color="text.primary" gutterBottom>
                Manage Payments
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View and manage all payments
              </Typography>
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper 
            sx={{ 
              p: 3, 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
          >
            <Link
              component={RouterLink}
              to="/admin/bill-pay/payments/fis-exceptions"
              color="inherit"
              underline="none"
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              <ErrorIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />
              <Typography variant="h6" color="text.primary" gutterBottom>
                FIS Exception Handling
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Handle FIS payment exceptions
              </Typography>
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper 
            sx={{ 
              p: 3, 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
          >
            <Link
              component={RouterLink}
              to="/admin/bill-pay/payments/manual"
              color="inherit"
              underline="none"
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              <BuildIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />
              <Typography variant="h6" color="text.primary" gutterBottom>
                Manual Processing
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Process payments manually
              </Typography>
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper 
            sx={{ 
              p: 3, 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
          >
            <Link
              component={RouterLink}
              to="/admin/bill-pay/payments/fis-payee"
              color="inherit"
              underline="none"
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              <AccountBalanceIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />
              <Typography variant="h6" color="text.primary" gutterBottom>
                FIS Payee Check
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Verify FIS payee information
              </Typography>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentManagementHeader;

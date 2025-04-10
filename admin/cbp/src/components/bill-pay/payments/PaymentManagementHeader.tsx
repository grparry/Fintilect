import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Grid, Paper, Link } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ErrorIcon from '@mui/icons-material/Error';
import BuildIcon from '@mui/icons-material/Build';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TransformIcon from '@mui/icons-material/Transform';
import HistoryIcon from '@mui/icons-material/History';
import { usePermissions } from '../../../hooks/usePermissions';

const PaymentManagementHeader: React.FC = () => {
  const { checkPermission } = usePermissions();
  const [hasBillPayWritePermission, setHasBillPayWritePermission] = React.useState(false);
  
  React.useEffect(() => {
    const checkWritePermission = async () => {
      try {
        const result = await checkPermission('route:billPay.payments.copy-payees');
        setHasBillPayWritePermission(result.hasAccess);
      } catch (error) {
        console.error('Error checking permissions:', error);
        setHasBillPayWritePermission(false);
      }
    };
    
    checkWritePermission();
  }, [checkPermission]);
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
              to="/admin/bill-pay/payments/exceptions"
              color="inherit"
              underline="none"
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              <ErrorIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />
              <Typography variant="h6" color="text.primary" gutterBottom>
                Exception Handling
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Handle payment exceptions
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

        {hasBillPayWritePermission && (
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
                to="/admin/bill-pay/payments/copy-payees"
                color="inherit"
                underline="none"
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
              >
                <TransformIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Copy Member Payees
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Copy payees between members
                </Typography>
              </Link>
            </Paper>
          </Grid>
        )}

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
              to="/admin/bill-pay/payments/change-history"
              color="inherit"
              underline="none"
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              <HistoryIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />
              <Typography variant="h6" color="text.primary" gutterBottom>
                Change History
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View payee change history
              </Typography>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentManagementHeader;

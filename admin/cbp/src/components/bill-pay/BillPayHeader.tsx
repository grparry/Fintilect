import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Grid, Paper, Link } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TransformIcon from '@mui/icons-material/Transform';
import SettingsIcon from '@mui/icons-material/Settings';

const BillPayHeader: React.FC = () => {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom color="text.primary">
          Bill Pay
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Welcome to Bill Pay. Manage payments, view reports, and configure system settings.
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
              to="/admin/bill-pay/payments"
              color="inherit"
              underline="none"
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              <PaymentIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />
              <Typography variant="h6" color="text.primary" gutterBottom>
                Payment Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage payments and exceptions
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
              to="/admin/bill-pay/reports"
              color="inherit"
              underline="none"
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              <AssessmentIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />
              <Typography variant="h6" color="text.primary" gutterBottom>
                Reports
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View and export bill pay reports
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
              to="/admin/bill-pay/settings"
              color="inherit"
              underline="none"
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              <SettingsIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />
              <Typography variant="h6" color="text.primary" gutterBottom>
                Settings
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Configure system settings and permissions
              </Typography>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BillPayHeader;
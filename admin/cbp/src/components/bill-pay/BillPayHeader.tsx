import React from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Grid, Paper, Link } from '@mui/material';
import { getAllRoutes } from '../../routes';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentsIcon from '@mui/icons-material/Payments';
import AssessmentIcon from '@mui/icons-material/Assessment';
import StorageIcon from '@mui/icons-material/Storage';
import SettingsIcon from '@mui/icons-material/Settings';

const getRouteIcon = (title: string) => {
  switch (title) {
    case 'Dashboard':
      return <DashboardIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />;
    case 'Payment Management':
      return <PaymentsIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />;
    case 'Reports':
      return <AssessmentIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />;
    case 'Data Conversion':
      return <StorageIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />;
    case 'Settings':
      return <SettingsIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />;
    default:
      return null;
  }
};
const BillPayHeader: React.FC = () => {
  const allRoutes = getAllRoutes();
  const billPayRoutes = allRoutes.filter(route => 
    route.sectionId === 'billPay' && 
    !route.hideFromSidebar &&
    route.path !== '/admin/bill-pay' && 
    (!route.id || !route.id.endsWith('-header'))
  );
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom color="text.primary">
          Bill Pay
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Welcome to Bill Pay. Access bill payment features, transaction history, and payment settings.
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {billPayRoutes.map((route) => (
          <Grid item xs={12} sm={6} md={4} key={route.path}>
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
                to={route.path}
                color="inherit"
                underline="none"
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
              >
                {getRouteIcon(route.title)}
                <Typography variant="h6" gutterBottom>
                  {route.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Access and manage {route.title.toLowerCase()}
                </Typography>
              </Link>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Outlet />
    </Box>
  );
};
export default BillPayHeader;
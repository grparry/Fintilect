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



    !route.hideFromSidebar &&
    (!route.id || !route.id.endsWith('-header'))
  );

    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom color="text.primary">
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
        </Typography>
      </Box>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {billPayRoutes.map((route: Route) => (
          <Grid item xs={12} sm={6} md={4} key={route.path}>
            <Paper 
                '&:hover': {
            >
              <Link
              >
                {getRouteIcon(route.title)}
                <Typography variant="h6" gutterBottom>
                  {route.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                </Typography>
              </Link>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Outlet />
    </Box>
  );


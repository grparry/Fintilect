import React from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Grid, Paper, Link } from '@mui/material';
import { getAllRoutes } from '../../routes';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DashboardIcon from '@mui/icons-material/Dashboard';

const getRouteIcon = (title: string) => {
  switch (title) {
    case 'Member Center':
      return <AccountBalanceIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />;
    case 'Money Desktop':
      return <DashboardIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />;
    default:
      return null;
  }
};
const EmergeAdminHeader: React.FC = () => {
  const allRoutes = getAllRoutes();
  console.log('EmergeAdminHeader - Rendering with routes:', allRoutes);
  const emergeRoutes = allRoutes.filter(route => 
    route.sectionId === 'emergeAdmin' && 
    !route.hideFromSidebar &&
    route.path !== '/admin/emerge' && 
    (!route.id || !route.id.endsWith('-header')) 
  );
  console.log('EmergeAdminHeader - Filtered routes:', emergeRoutes);
  React.useEffect(() => {
    console.log('EmergeAdminHeader - Mounted');
    return () => {
      console.log('EmergeAdminHeader - Unmounted');
    };
  }, []);
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom color="text.primary">
          Emerge Admin
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Welcome to Emerge Admin. Manage Emerge configurations, settings, and administrative tasks.
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {emergeRoutes.map((route) => (
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
                  Access and manage {route.title.toLowerCase()} settings
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
export default EmergeAdminHeader;
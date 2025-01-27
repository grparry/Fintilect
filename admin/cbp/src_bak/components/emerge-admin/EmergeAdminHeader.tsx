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
        {emergeRoutes.map((route) => (
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


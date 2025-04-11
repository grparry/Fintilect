import React from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import logger from '../../utils/logger';
import { Box, Typography, Grid, Paper, Link } from '@mui/material';
import { getAllRoutes } from '../../routes';
import ApiIcon from '@mui/icons-material/Api';

const getRouteIcon = (title: string) => {
  switch (title) {
    case 'API Testing':
      return <ApiIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />;
    default:
      return null;
  }
};
const DevelopmentHeader: React.FC = () => {
  const allRoutes = getAllRoutes();
  logger.log("All routes:", allRoutes);
  const devRoutes = allRoutes.filter(route => {
    logger.log("Checking route:", route);
    return route.sectionId === 'development' && 
      !route.hideFromSidebar &&
      route.path !== 'development' &&
      (!route.id || !route.id.endsWith('-header'));
  });
  logger.log("Development routes:", devRoutes);
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom color="text.primary">
          Development
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Welcome to Development. Access development tools, API testing, and system configurations.
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {devRoutes.map((route) => (
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
                to={route.path.startsWith('/') ? route.path : `/${route.path}`}
                color="inherit"
                underline="none"
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
              >
                {getRouteIcon(route.title)}
                <Typography variant="h6" color="text.primary" gutterBottom>
                  {route.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {route.title === 'API Testing' && 'Test and debug API endpoints'}
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
export default DevelopmentHeader;
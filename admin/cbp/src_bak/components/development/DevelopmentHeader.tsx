import React from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
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
  const devRoutes = allRoutes.filter(route => 
    route.sectionId === 'development' && 
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
        {devRoutes.map((route) => (
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


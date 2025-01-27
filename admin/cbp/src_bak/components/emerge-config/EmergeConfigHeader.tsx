import React from 'react';
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { getAllRoutes } from '../../routes';

const EmergeConfigHeader: React.FC = () => {
  console.log('EmergeConfigHeader - Component called');
  const location = useLocation();
  const isRootPath = location.pathname === '/admin/emerge-config' || location.pathname === '/admin/emerge-config/';
  


  
  
  // Filter routes to only show direct children of emerge-config
    // Only show routes that:
    // 1. Are part of emergeConfig section
    // 2. Have a path that's a direct child of /admin/emerge-config
    // 3. Are not hidden from sidebar
    // 4. Are not special routes (header, landing, root)
    
    



    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom color="text.primary">
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
        </Typography>
      </Box>
      
      {/* Only show navigation grid on root path */}
      {isRootPath && (
        <Grid container spacing={3}>
          {emergeConfigRoutes.map((route) => (
            <Grid item xs={12} sm={6} md={4} key={route.path}>
              <Paper 
                  '&:hover': {
              >
                {route.icon && <route.icon sx={{ fontSize: 40, color: 'primary.main' }} />}
                <Typography variant="h6" component="h2">
                  {route.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Always render the Outlet for child routes */}
      <Box sx={{ mt: 4 }}>
        <Outlet />
      </Box>
    </Box>
  );


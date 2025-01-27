import React from 'react';
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { getAllRoutes } from '../../routes';

const EmergeConfigHeader: React.FC = () => {
  console.log('EmergeConfigHeader - Component called');
  const location = useLocation();
  const isRootPath = location.pathname === '/admin/emerge-config' || location.pathname === '/admin/emerge-config/';
  const allRoutes = getAllRoutes();
  console.log('EmergeConfigHeader - All routes:', allRoutes);
  // Filter routes to only show direct children of emerge-config
  const emergeConfigRoutes = allRoutes.filter(route => {
    // Only show routes that:
    // 1. Are part of emergeConfig section
    // 2. Have a path that's a direct child of /admin/emerge-config
    // 3. Are not hidden from sidebar
    // 4. Are not special routes (header, landing, root)
    const isEmergeConfigRoute = route.sectionId === 'emergeConfig';
    const hasValidPath = route.path && route.path !== '/admin/emerge-config' && route.path !== '/admin/emerge-config/';
    const isVisible = !route.hideFromSidebar;
    const isNotSpecial = !route.id?.includes('-root') && !route.id?.includes('-landing');
    console.log('Filtering route:', {
      path: route.path,
      isEmergeConfigRoute,
      hasValidPath,
      isVisible,
      isNotSpecial,
      included: isEmergeConfigRoute && hasValidPath && isVisible && isNotSpecial
    });
    return isEmergeConfigRoute && hasValidPath && isVisible && isNotSpecial;
  });
  console.log('EmergeConfigHeader - Filtered routes:', emergeConfigRoutes);
  React.useEffect(() => {
    console.log('EmergeConfigHeader - Mounted');
    return () => console.log('EmergeConfigHeader - Unmounted');
  }, []);
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom color="text.primary">
          Emerge Configuration
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Configure and manage all aspects of the Emerge platform, from settings to specific feature configurations.
        </Typography>
      </Box>
      {/* Only show navigation grid on root path */}
      {isRootPath && (
        <Grid container spacing={3}>
          {emergeConfigRoutes.map((route) => (
            <Grid item xs={12} sm={6} md={4} key={route.path}>
              <Paper 
                component={RouterLink}
                to={route.path}
                sx={{
                  p: 3,
                  textDecoration: 'none',
                  color: 'text.primary',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
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
};
export default EmergeConfigHeader;
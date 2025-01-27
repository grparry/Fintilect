import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { RouteConfig } from '../../types/route.types';

interface NavigationLandingProps {
  title: string;
  routes: RouteConfig[];
  basePath: string;
}
const NavigationLanding: React.FC<NavigationLandingProps> = ({ title, routes, basePath }) => {
  const location = useLocation();
  // Filter out routes that should be hidden from sidebar/navigation and the current path
  const visibleRoutes = routes.filter(route => 
    !route.hideFromSidebar && route.path !== basePath
  );
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <List>
        {visibleRoutes.map((route) => {
          const isSelected = location.pathname === route.path;
          const key = route.id || route.path; // Fallback to path if ID is missing
          return (
            <ListItem key={key} disablePadding>
              <ListItemButton
                component={Link}
                to={route.path}
                selected={isSelected}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  },
                }}
              >
                <ListItemText 
                  primary={route.title}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
export default NavigationLanding;
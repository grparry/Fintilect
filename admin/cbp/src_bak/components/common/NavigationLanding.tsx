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
    !route.hideFromSidebar && route.path !== basePath
  );

    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <List>
        {visibleRoutes.map((route) => {

            <ListItem key={key} disablePadding>
              <ListItemButton
                  '&.Mui-selected': {
                    '&:hover': {
              >
                <ListItemText 
                />
              </ListItemButton>
            </ListItem>
          );
      </List>
    </Box>
  );


import React from 'react';
import { Box, Card, CardContent, Grid, Typography, Button, Stack, useTheme, alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import { RouteSection } from '../../types/route.types';
import { useNavigation } from '../../context/NavigationContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentIcon from '@mui/icons-material/Payment';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';

interface AdminRoute {
  id: string;
  path: string;
  title: string;
  description: string;
}

const getIconForRoute = (routeId: string) => {
  switch (routeId) {
    case 'billPay':
      return <PaymentIcon fontSize="large" />;
    case 'clientManagement':
      return <GroupIcon fontSize="large" />;
    case 'emerge':
      return <AppsIcon fontSize="large" />;
    case 'development':
      return <SettingsIcon fontSize="large" />;
    default:
      return <DashboardIcon fontSize="large" />;
  }
};

const getRouteDescription = (route: RouteSection): string => {
  if (route.routes && route.routes.length > 0) {
    return `Access and manage ${route.title.toLowerCase()} features and settings.`;
  }
  return 'No description available.';
};

const AdminLanding: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { toggleSection } = useNavigation();
  





  
  // Get all main sections from routes object
    {
    {
    {
    {
    {
  ];

    // Update navigation state first
    // Then navigate

    <Box sx={{ 
      <Stack spacing={3} sx={{ p: 3 }}>
        <Box sx={{ 
          <Typography variant="h4" gutterBottom color="text.primary">
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {adminRoutes.map((route) => (
            <Grid item xs={12} sm={6} md={4} key={route.id}>
              <Card 
                  '&:hover': {
                      ? `0 4px 20px ${alpha(theme.palette.common.white, 0.1)}`
                      : 4,
                      ? alpha(theme.palette.primary.main, 0.1)
                      : theme.palette.grey[50],
              >
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ 
                    <Box sx={{ 
                      {getIconForRoute(route.id)}
                    </Box>
                    <Typography variant="h6" component="h2" color="text.primary">
                      {route.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {route.description}
                  </Typography>
                  <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                    >
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );


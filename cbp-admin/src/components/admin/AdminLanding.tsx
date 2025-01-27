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
  const adminRoutes: AdminRoute[] = [
    {
      id: 'clientManagement',
      path: routes.clientManagement.basePath,
      title: routes.clientManagement.title,
      description: getRouteDescription(routes.clientManagement),
    },
    {
      id: 'emergeAdmin',
      path: routes.emergeAdmin.basePath,
      title: routes.emergeAdmin.title,
      description: getRouteDescription(routes.emergeAdmin),
    },
    {
      id: 'emergeConfig',
      path: routes.emergeConfig.basePath,
      title: routes.emergeConfig.title,
      description: getRouteDescription(routes.emergeConfig),
    },
    {
      id: 'billPay',
      path: routes.billPay.basePath,
      title: routes.billPay.title,
      description: getRouteDescription(routes.billPay),
    },
    {
      id: 'development',
      path: routes.development.basePath,
      title: routes.development.title,
      description: getRouteDescription(routes.development),
    },
  ];

  const handleCardClick = (route: AdminRoute) => {
    // Update navigation state first
    toggleSection(route.id);
    // Then navigate
    navigate(route.path);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      bgcolor: theme.palette.background.default
    }}>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Box sx={{ 
          bgcolor: theme.palette.background.paper,
          borderRadius: 1,
          p: 2
        }}>
          <Typography variant="h4" gutterBottom color="text.primary">
            Admin Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Welcome to the CBP Admin Dashboard. Select a section below to manage different aspects of the system.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {adminRoutes.map((route) => (
            <Grid item xs={12} sm={6} md={4} key={route.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  bgcolor: theme.palette.background.paper,
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.palette.mode === 'dark' 
                      ? `0 4px 20px ${alpha(theme.palette.common.white, 0.1)}`
                      : 4,
                    cursor: 'pointer',
                    bgcolor: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.primary.main, 0.1)
                      : theme.palette.grey[50],
                  },
                }}
                onClick={() => handleCardClick(route)}
              >
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2,
                    bgcolor: theme.palette.background.paper,
                    p: 2,
                    borderRadius: 1
                  }}>
                    <Box sx={{ 
                      mr: 2,
                      color: 'primary.main',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
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
                      variant="text" 
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(route.path);
                      }}
                    >
                      Open
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
};

export default AdminLanding;

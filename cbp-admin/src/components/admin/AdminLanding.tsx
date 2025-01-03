import React from 'react';
import { Box, Card, CardContent, Grid, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import { RouteSection } from '../../types/route.types';
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

const getRouteDescription = (section: RouteSection): string => {
  switch (section.id) {
    case 'billPay':
      return 'Manage bill payments, process transactions, and handle payment exceptions';
    case 'clientManagement':
      return 'Manage client accounts, users, and access controls';
    case 'emerge':
      return 'Configure Emerge settings and manage member services';
    case 'development':
      return 'Access development tools and system configurations';
    default:
      return `Manage ${section.title} settings and configurations`;
  }
};

const AdminLanding: React.FC = () => {
  const navigate = useNavigate();
  
  // Get all main sections directly from routes object
  const adminRoutes: AdminRoute[] = [
    {
      id: routes.clientManagement.id,
      path: routes.clientManagement.basePath,
      title: routes.clientManagement.title,
      description: getRouteDescription(routes.clientManagement),
    },
    {
      id: routes.emerge.id,
      path: routes.emerge.basePath,
      title: routes.emerge.title,
      description: getRouteDescription(routes.emerge),
    },
    {
      id: routes.billPay.id,
      path: routes.billPay.basePath,
      title: routes.billPay.title,
      description: getRouteDescription(routes.billPay),
    },
    {
      id: routes.development.id,
      path: routes.development.basePath,
      title: routes.development.title,
      description: getRouteDescription(routes.development),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
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
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                    cursor: 'pointer',
                  },
                }}
                onClick={() => navigate(route.path)}
              >
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ 
                      mr: 2,
                      color: 'primary.main',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      {getIconForRoute(route.id)}
                    </Box>
                    <Typography variant="h6" component="h2">
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

import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChatIcon from '@mui/icons-material/Chat';
import PasswordIcon from '@mui/icons-material/Password';

interface NavigationCard {
  id: string;
  title: string;
  path: string;
  icon: React.ElementType;
  description: string;
}
const navigationCards: NavigationCard[] = [
  {
    id: 'address',
    title: 'Address Management',
    path: '/admin/emerge-config/user-services/address',
    icon: LocationOnIcon,
    description: 'Configure address management and validation settings'
  },
  {
    id: 'alerts',
    title: 'Alert Preferences',
    path: '/admin/emerge-config/user-services/alerts',
    icon: NotificationsIcon,
    description: 'Manage user notification and alert preferences'
  },
  {
    id: 'email',
    title: 'Email Settings',
    path: '/admin/emerge-config/user-services/email',
    icon: EmailIcon,
    description: 'Configure email communication settings and templates'
  },
  {
    id: 'beneficiary',
    title: 'Beneficiary Management',
    path: '/admin/emerge-config/user-services/beneficiary',
    icon: PersonAddIcon,
    description: 'Manage beneficiary settings and configurations'
  },
  {
    id: 'chat',
    title: 'Chat Service',
    path: '/admin/emerge-config/user-services/chat',
    icon: ChatIcon,
    description: 'Configure chat service settings and features'
  }
];
const UserServicesLanding: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
        User Services
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.primary' }}>
        Configure user-related services and features for the Emerge platform.
      </Typography>
      <Grid container spacing={3}>
        {navigationCards.map((card) => {
          const Icon = card.icon;
          return (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4]
                  }
                }}
              >
                <CardActionArea 
                  onClick={() => navigate(card.path)}
                  sx={{ height: '100%' }}
                >
                  <CardContent>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        mb: 2
                      }}
                    >
                      <Icon 
                        sx={{ 
                          fontSize: 32,
                          color: 'primary.main',
                          mr: 1
                        }} 
                      />
                      <Typography variant="h6" component="div">
                        {card.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
export default UserServicesLanding;
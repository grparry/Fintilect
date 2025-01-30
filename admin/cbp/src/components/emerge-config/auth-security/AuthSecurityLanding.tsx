import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
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
    id: 'authentication',
    title: 'Authentication',
    path: '/admin/emerge-config/auth-security/authentication',
    icon: FingerprintIcon,
    description: 'Configure authentication methods and security protocols'
  },
  {
    id: 'password',
    title: 'Password Settings',
    path: '/admin/emerge-config/auth-security/password',
    icon: PasswordIcon,
    description: 'Configure password policies and login settings'
  },
  {
    id: 'login',
    title: 'Login',
    path: '/admin/emerge-config/auth-security/login',
    icon: LoginIcon,
    description: 'Manage login settings and security policies'
  },
  {
    id: 'home-banking-login',
    title: 'Home Banking Login',
    path: '/admin/emerge-config/auth-security/home-banking-login',
    icon: HomeIcon,
    description: 'Configure home banking login settings and security'
  },
  {
    id: 'audit-logging',
    title: 'Audit Logging',
    path: '/admin/emerge-config/auth-security/audit-logging',
    icon: FactCheckIcon,
    description: 'Manage audit logging and security tracking'
  },
  {
    id: 'admin',
    title: 'Admin',
    path: '/admin/emerge-config/auth-security/admin',
    icon: AdminPanelSettingsIcon,
    description: 'Configure administrative security settings and permissions'
  },
  {
    id: 'password-verification',
    title: 'Password Verification',
    path: '/admin/emerge-config/auth-security/password-verification',
    icon: PasswordIcon,
    description: 'Configure password verification and validation rules'
  }
];
const AuthSecurityLanding: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
        Authentication & Security
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.primary' }}>
        Configure authentication and security settings for the Emerge platform.
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
export default AuthSecurityLanding;
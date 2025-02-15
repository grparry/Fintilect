import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import SecurityIcon from '@mui/icons-material/Security';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

interface NavigationCard {
  id: string;
  title: string;
  path: string;
  icon: React.ElementType;
  description: string;
}

const navigationCards: NavigationCard[] = [
  {
    id: 'login',
    title: 'Login Settings',
    path: '/admin/emerge-config/auth-security/login',
    icon: LoginIcon,
    description: 'Home banking login and password policies'
  },
  {
    id: 'security-verification',
    title: 'Security Verification',
    path: '/admin/emerge-config/auth-security/security-verification',
    icon: SecurityIcon,
    description: 'MFA and device verification settings'
  },
  {
    id: 'admin-security',
    title: 'Admin Security',
    path: '/admin/emerge-config/auth-security/admin-security',
    icon: AdminPanelSettingsIcon,
    description: 'Admin access and audit logs'
  }
];

const AuthSecurityLanding: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Authentication & Security
      </Typography>
      <Typography variant="body1" paragraph>
        Configure security settings, authentication methods, and access control policies
      </Typography>
      <Grid container spacing={3}>
        {navigationCards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <Card sx={{ height: 200 }}>
              <CardActionArea 
                onClick={() => navigate(card.path)} 
                sx={{ height: '100%' }}
              >
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <card.icon sx={{ mr: 1, color: theme.palette.primary.main, fontSize: 28 }} />
                    <Typography variant="h6" component="div">
                      {card.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
                    {card.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AuthSecurityLanding;

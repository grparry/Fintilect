import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BusinessIcon from '@mui/icons-material/Business';
import InfoIcon from '@mui/icons-material/Info';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface NavigationCard {
  id: string;
  title: string;
  path: string;
  icon: React.ElementType;
  description: string;
}
const navigationCards: NavigationCard[] = [
  {
    id: 'connect-native',
    title: 'Connect Native',
    path: '/admin/emerge-config/core/connect-native',
    icon: PhonelinkIcon,
    description: 'Configure native connection settings and parameters'
  },
  {
    id: 'features',
    title: 'Features',
    path: '/admin/emerge-config/core/features',
    icon: ToggleOnIcon,
    description: 'Manage feature flags and toggles'
  },
  {
    id: 'financial-cores',
    title: 'Financial Cores',
    path: '/admin/emerge-config/core/financial-cores',
    icon: AccountBalanceIcon,
    description: 'Configure financial core integrations'
  },
  {
    id: 'institution',
    title: 'Institution',
    path: '/admin/emerge-config/core/institution',
    icon: BusinessIcon,
    description: 'Manage institution settings and details'
  },
  {
    id: 'app-info-settings',
    title: 'App Info Settings',
    path: '/admin/emerge-config/core/app-info',
    icon: InfoIcon,
    description: 'Configure application information and settings'
  },
  {
    id: 'deployment',
    title: 'Deployment',
    path: '/admin/emerge-config/core/deployment',
    icon: CloudUploadIcon,
    description: 'Manage deployment configurations'
  }
];
const CoreSettingsLanding: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Core Settings
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Configure core system settings and parameters for the Emerge platform.
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
export default CoreSettingsLanding;
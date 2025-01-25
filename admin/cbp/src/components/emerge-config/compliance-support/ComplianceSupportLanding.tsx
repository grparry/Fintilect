import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import GroupWorkIcon from '@mui/icons-material/GroupWork';

interface NavigationCard {
  id: string;
  title: string;
  path: string;
  icon: React.ElementType;
  description: string;
}

const navigationCards: NavigationCard[] = [
  {
    id: 'ada-compliance',
    title: 'ADA Compliance',
    path: '/admin/emerge-config/compliance-support/ada-compliance',
    icon: AccessibilityNewIcon,
    description: 'Configure ADA compliance settings and accessibility features'
  },
  {
    id: 'error-messages',
    title: 'Error Messages',
    path: '/admin/emerge-config/compliance-support/error-messages',
    icon: ErrorOutlineIcon,
    description: 'Manage error message configurations and display settings'
  },
  {
    id: 'co-browse',
    title: 'Co Browse',
    path: '/admin/emerge-config/compliance-support/co-browse',
    icon: GroupWorkIcon,
    description: 'Configure co-browsing features and support settings'
  }
];

const ComplianceSupportLanding: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Compliance & Support
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Configure compliance requirements and support features for the Emerge platform.
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

export default ComplianceSupportLanding;

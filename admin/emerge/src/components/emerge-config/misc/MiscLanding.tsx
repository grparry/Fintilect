import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SmsIcon from '@mui/icons-material/Sms';

interface NavigationCard {
  id: string;
  title: string;
  path: string;
  icon: React.ElementType;
  description: string;
}

const navigationCards: NavigationCard[] = [
  {
    id: 'google',
    title: 'Google',
    path: '/admin/emerge-config/misc/google',
    icon: GTranslateIcon,
    description: 'Configure Google integration settings and features'
  },
  {
    id: 'better-lobby',
    title: 'Better Lobby',
    path: '/admin/emerge-config/misc/better-lobby',
    icon: MeetingRoomIcon,
    description: 'Manage BetterLobby configuration and settings'
  },
  {
    id: 'imi-mobile-text-banking',
    title: 'IMIMobile Text Banking',
    path: '/admin/emerge-config/misc/imi-mobile-text-banking',
    icon: SmsIcon,
    description: 'Configure IMI Mobile text banking services and features'
  }
];

const MiscLanding: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
        Miscellaneous Settings
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.primary' }}>
        Configure miscellaneous settings for the Emerge platform.
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

export default MiscLanding;

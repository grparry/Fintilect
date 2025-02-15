import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AnalyticsIcon from '@mui/icons-material/Analytics';

interface NavigationCard {
  id: string;
  title: string;
  path: string;
  icon: React.ElementType;
  description: string;
}

const navigationCards: NavigationCard[] = [
  {
    id: 'marketing',
    title: 'Marketing',
    path: '/admin/emerge-config/marketing-offers/marketing',
    icon: AdsClickIcon,
    description: 'Configure marketing campaigns and promotional settings'
  },
  {
    id: 'loan-offers-marketing',
    title: 'Loan Offers',
    path: '/admin/emerge-config/marketing-offers/loan-offers',
    icon: LocalOfferIcon,
    description: 'Manage loan offer marketing campaigns and settings'
  },
  {
    id: 'cardlytics',
    title: 'Cardlytics',
    path: '/admin/emerge-config/marketing-offers/cardlytics',
    icon: AnalyticsIcon,
    description: 'Configure Cardlytics integration and offer settings'
  }
];

const MarketingOffersLanding: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
        Marketing & Offers
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.primary' }}>
        Configure marketing campaigns, promotional offers, and related features for the Emerge platform.
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

export default MarketingOffersLanding;

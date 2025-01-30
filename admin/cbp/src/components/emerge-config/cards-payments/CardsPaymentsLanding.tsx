import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentsIcon from '@mui/icons-material/Payments';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

interface NavigationCard {
  id: string;
  title: string;
  path: string;
  icon: React.ElementType;
  description: string;
}
const navigationCards: NavigationCard[] = [
  {
    id: 'card-management',
    title: 'Card Management',
    path: '/admin/emerge-config/cards-payments/card-management',
    icon: CreditScoreIcon,
    description: 'Manage debit and credit card configurations'
  },
  {
    id: 'credit-cards',
    title: 'Credit Cards',
    path: '/admin/emerge-config/cards-payments/credit-cards',
    icon: CreditCardIcon,
    description: 'Configure credit card products and services'
  },
  {
    id: 'bill-pay',
    title: 'Bill Pay',
    path: '/admin/emerge-config/cards-payments/bill-pay',
    icon: PaymentsIcon,
    description: 'Manage bill payment settings and services'
  },
  {
    id: 'ach-service',
    title: 'ACH Service',
    path: '/admin/emerge-config/cards-payments/ach-service',
    icon: SwapHorizIcon,
    description: 'Configure ACH transfer services and settings'
  }
];
const CardsPaymentsLanding: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
        Cards & Payments
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.primary' }}>
        Configure card and payment settings for the Emerge platform.
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
export default CardsPaymentsLanding;
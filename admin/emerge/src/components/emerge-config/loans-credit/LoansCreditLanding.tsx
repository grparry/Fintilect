import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LinkIcon from '@mui/icons-material/Link';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface NavigationCard {
  id: string;
  title: string;
  path: string;
  icon: React.ElementType;
  description: string;
}
const navigationCards: NavigationCard[] = [
  {
    id: 'loans',
    title: 'Loans',
    path: '/admin/emerge-config/loans-credit/loans',
    icon: AccountBalanceIcon,
    description: 'Configure loan products and services'
  },
  {
    id: 'loan-offers',
    title: 'Loan Offers',
    path: '/admin/emerge-config/loans-credit/loan-offers',
    icon: LocalOfferIcon,
    description: 'Manage loan offers and promotional settings'
  },
  {
    id: 'loan-sso',
    title: 'Loan SSO',
    path: '/admin/emerge-config/loans-credit/loan-sso',
    icon: LinkIcon,
    description: 'Configure single sign-on settings for loan services'
  },
  {
    id: 'fico',
    title: 'FICO',
    path: '/admin/emerge-config/loans-credit/fico',
    icon: AnalyticsIcon,
    description: 'Manage FICO score integration and settings'
  },
  {
    id: 'credit-score-history',
    title: 'Credit Score History',
    path: '/admin/emerge-config/loans-credit/credit-score-history',
    icon: TrendingUpIcon,
    description: 'Configure credit score history tracking and reporting'
  }
];
const LoansCreditLanding: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
        Loans & Credit
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.primary' }}>
        Configure loan and credit settings for the Emerge platform.
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
export default LoansCreditLanding;
import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import StarsIcon from '@mui/icons-material/Stars';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DescriptionIcon from '@mui/icons-material/Description';
import HistoryIcon from '@mui/icons-material/History';

interface NavigationCard {
  id: string;
  title: string;
  path: string;
  icon: React.ElementType;
  description: string;
}
const navigationCards: NavigationCard[] = [
  {
    id: 'account',
    title: 'Account',
    path: '/admin/emerge-config/accounts/account',
    icon: AccountCircleIcon,
    description: 'Manage account settings and configurations'
  },
  {
    id: 'business-banking',
    title: 'Business Banking',
    path: '/admin/emerge-config/accounts/business-banking',
    icon: BusinessCenterIcon,
    description: 'Configure business banking features and settings'
  },
  {
    id: 'checking-rewards',
    title: 'Checking Rewards',
    path: '/admin/emerge-config/accounts/checking-rewards',
    icon: StarsIcon,
    description: 'Manage checking account rewards programs'
  },
  {
    id: 'direct-deposit',
    title: 'Direct Deposit',
    path: '/admin/emerge-config/accounts/direct-deposit',
    icon: AccountBalanceWalletIcon,
    description: 'Configure direct deposit settings and options'
  },
  {
    id: 'history',
    title: 'History',
    path: '/admin/emerge-config/accounts/history',
    icon: HistoryIcon,
    description: 'Configure account history and transaction settings'
  }
];
const AccountsLanding: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
        Accounts
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.primary' }}>
        Configure account-related settings and features for the Emerge platform.
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
export default AccountsLanding;
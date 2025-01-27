import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SecurityIcon from '@mui/icons-material/Security';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import CampaignIcon from '@mui/icons-material/Campaign';
import PolicyIcon from '@mui/icons-material/Policy';
import ExtensionIcon from '@mui/icons-material/Extension';

interface NavigationCard {
  id: string;
  title: string;
  path: string;
  icon: React.ElementType;
}
const navigationCards: NavigationCard[] = [
  {
    id: 'core-settings',
    title: 'Core Settings',
    path: '/admin/emerge-config/core',
    icon: SettingsApplicationsIcon
  },
  {
    id: 'accounts',
    title: 'Accounts',
    path: '/admin/emerge-config/accounts',
    icon: AccountBalanceIcon
  },
  {
    id: 'cards-payments',
    title: 'Cards & Payments',
    path: '/admin/emerge-config/cards-payments',
    icon: CreditCardIcon
  },
  {
    id: 'auth-security',
    title: 'Authentication & Security',
    path: '/admin/emerge-config/auth-security',
    icon: SecurityIcon
  },
  {
    id: 'loans-credit',
    title: 'Loans & Credit',
    path: '/admin/emerge-config/loans-credit',
    icon: RequestQuoteIcon
  },
  {
    id: 'user-services',
    title: 'User Services',
    path: '/admin/emerge-config/user-services',
    icon: ManageAccountsIcon
  },
  {
    id: 'document-services',
    title: 'Document Services',
    path: '/admin/emerge-config/document-services',
    icon: FolderSpecialIcon
  },
  {
    id: 'marketing-offers',
    title: 'Marketing & Offers',
    path: '/admin/emerge-config/marketing-offers',
    icon: CampaignIcon
  },
  {
    id: 'compliance-support',
    title: 'Compliance & Support',
    path: '/admin/emerge-config/compliance-support',
    icon: PolicyIcon
  },
  {
    id: 'misc',
    title: 'Miscellaneous',
    path: '/admin/emerge-config/misc',
    icon: ExtensionIcon
  }
];
const EmergeConfigLanding: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Emerge Configuration
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Configure and manage all aspects of the Emerge platform, from settings to specific feature configurations.
      </Typography>
      <Grid container spacing={2}>
        {navigationCards.map((card) => {
          const Icon = card.icon;
          return (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <Card 
                sx={{ 
                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.8)',
                  }
                }}
              >
                <CardActionArea 
                  onClick={() => navigate(card.path)}
                  sx={{ p: 1 }}
                >
                  <CardContent sx={{ display: 'flex', alignItems: 'center', p: '8px !important' }}>
                    <Icon sx={{ mr: 1, color: '#2196f3' }} />
                    <Typography variant="subtitle1" component="div" sx={{ color: 'white' }}>
                      {card.title}
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
export default EmergeConfigLanding;
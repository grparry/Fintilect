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



  {
  {
  {
  {
  {
  {
  {
  {
  {
  {
];


    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
      </Typography>

      <Grid container spacing={2}>
        {navigationCards.map((card) => {
          
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <Card 
                  '&:hover': {
              >
                <CardActionArea 
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
      </Grid>
    </Box>
  );


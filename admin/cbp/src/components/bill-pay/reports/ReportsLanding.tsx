import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Divider,
  Paper,
} from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PaymentIcon from '@mui/icons-material/Payment';
import RepeatIcon from '@mui/icons-material/Repeat';
import ContactsIcon from '@mui/icons-material/Contacts';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Define category card interface
interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  count: number;
}

// Category card component
const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, icon, to, count }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardActionArea 
      component={Link} 
      to={to} 
      sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start',
      }}
    >
      <CardContent sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ mr: 1, color: 'primary.main' }}>{icon}</Box>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Typography variant="subtitle2" color="primary">
            {count} Reports
          </Typography>
          <ArrowForwardIcon color="primary" fontSize="small" />
        </Box>
      </CardContent>
    </CardActionArea>
  </Card>
);

// Reports landing page component
const ReportsLanding: React.FC = () => {
  // Define report categories
  const categories: CategoryCardProps[] = [
    {
      title: 'Payment Reports',
      description: 'Access reports related to payment processing, status, and activity',
      icon: <PaymentIcon fontSize="large" />,
      to: '/admin/bill-pay/reports/payment-reports',
      count: 9
    },
    {
      title: 'Recurring Payment Reports',
      description: 'Access reports related to recurring payments and their change history',
      icon: <RepeatIcon fontSize="large" />,
      to: '/admin/bill-pay/reports/recurring-payment-reports',
      count: 3
    },
    {
      title: 'User & Payee Reports',
      description: 'Access reports related to users, payees, and their relationships',
      icon: <ContactsIcon fontSize="large" />,
      to: '/admin/bill-pay/reports/user-payee-reports',
      count: 5
    },
    {
      title: 'System & Compliance Reports',
      description: 'Access reports related to system operations, compliance, and regulatory requirements',
      icon: <SecurityIcon fontSize="large" />,
      to: '/admin/bill-pay/reports/system-compliance-reports',
      count: 5
    }
  ];

  return (
    <>
      <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundColor: 'primary.light', color: 'primary.contrastText' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          CBP Reports
        </Typography>
        <Typography variant="body1">
          Access all reports organized by category. Select a category below to view available reports.
        </Typography>
      </Paper>
      
      <Grid container spacing={4}>
        {categories.map((category) => (
          <Grid item xs={12} md={6} key={category.title}>
            <CategoryCard {...category} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ReportsLanding;

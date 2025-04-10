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
import PaymentIcon from '@mui/icons-material/Payment';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';

// Define report card interface
interface ReportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  implemented?: boolean;
}

// Report card component
const ReportCard: React.FC<ReportCardProps> = ({ title, description, icon, to, implemented = false }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardActionArea 
      component={Link} 
      to={to} 
      sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start',
        opacity: implemented ? 1 : 0.6
      }}
      disabled={!implemented}
    >
      <CardContent sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ mr: 1, color: 'primary.main' }}>{icon}</Box>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        {!implemented && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Coming soon
          </Typography>
        )}
      </CardContent>
    </CardActionArea>
  </Card>
);

// Payment Reports landing page component
const PaymentReportsLanding: React.FC = () => {
  // Define payment reports
  const reports: ReportCardProps[] = [
    {
      title: 'Failed On Us',
      description: 'View failed on-us payment information',
      icon: <ReportProblemIcon />,
      to: '/admin/bill-pay/reports/failed-on-us',
      implemented: true
    },
    {
      title: 'Large Payment',
      description: 'View large payment information',
      icon: <PaymentIcon />,
      to: '/admin/bill-pay/reports/large-payment',
      implemented: true
    },
    {
      title: 'On Us Postings',
      description: 'View on us postings information',
      icon: <AccountBalanceIcon />,
      to: '/admin/bill-pay/reports/on-us-postings',
      implemented: true
    },
    {
      title: 'Payment Activity',
      description: 'View payment activity within a date range',
      icon: <PaymentIcon />,
      to: '/admin/bill-pay/reports/payment-activity',
      implemented: true
    },
    {
      title: 'Payment Clear Report',
      description: 'View payment clear information',
      icon: <ConfirmationNumberIcon />,
      to: '/admin/bill-pay/reports/payment-clear',
      implemented: true
    },
    {
      title: 'Payment Report',
      description: 'View payment information',
      icon: <PaymentIcon />,
      to: '/admin/bill-pay/reports/payment',
      implemented: true
    },
    {
      title: 'Pending Payments',
      description: 'View pending payment information',
      icon: <PaymentIcon />,
      to: '/admin/bill-pay/reports/pending-payments',
      implemented: true
    },

    {
      title: 'Suspended Payment Report',
      description: 'View suspended payment information',
      icon: <PauseCircleOutlineIcon />,
      to: '/admin/bill-pay/reports/suspended-payment',
      implemented: true
    }
  ];

  return (
    <>
      <Paper elevation={0} sx={{ p: 2, mb: 3, backgroundColor: 'primary.light', color: 'primary.contrastText' }}>
        <Typography variant="body1">
          Access reports related to payment processing, status, and activity.
        </Typography>
      </Paper>
      <Grid container spacing={3}>
        {reports.map((report) => (
          <Grid item xs={12} sm={6} md={4} key={report.title}>
            <ReportCard {...report} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PaymentReportsLanding;

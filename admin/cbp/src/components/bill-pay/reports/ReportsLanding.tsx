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
} from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PaymentIcon from '@mui/icons-material/Payment';
import ErrorIcon from '@mui/icons-material/Error';
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import RepeatIcon from '@mui/icons-material/Repeat';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PeopleIcon from '@mui/icons-material/People';
import ContactsIcon from '@mui/icons-material/Contacts';

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

// Reports landing page component
const ReportsLanding: React.FC = () => {
  // Define available reports
  const reports: ReportCardProps[] = [
    {
      title: 'Active User Count',
      description: 'View active user count statistics',
      icon: <GroupIcon />,
      to: '/admin/bill-pay/reports/active-user-count',
      implemented: true
    },
    {
      title: 'Error Recap',
      description: 'View error recap information',
      icon: <ErrorIcon />,
      to: '/admin/bill-pay/reports/error-recap',
      implemented: true
    },
    {
      title: 'Failed On Us',
      description: 'View failed on-us payment information',
      icon: <ReportProblemIcon />,
      to: '/admin/bill-pay/reports/failed-on-us',
      implemented: true
    },
    {
      title: 'Global Holidays',
      description: 'View global holiday information',
      icon: <EventIcon />,
      to: '/admin/bill-pay/reports/global-holidays',
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
      title: 'Monthly Users',
      description: 'View monthly user statistics',
      icon: <PeopleIcon />,
      to: '/admin/bill-pay/reports/monthly-users',
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
      title: 'Payee Report',
      description: 'View payee information',
      icon: <SearchIcon />,
      to: '/admin/bill-pay/reports/payee',
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
      title: 'Payment Clear Report',
      description: 'View payment clear information',
      icon: <ConfirmationNumberIcon />,
      to: '/admin/bill-pay/reports/payment-clear',
      implemented: true
    },
    {
      title: 'Recurring Payment Report',
      description: 'View recurring payment information',
      icon: <RepeatIcon />,
      to: '/admin/bill-pay/reports/recurring-payment',
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
      title: 'Pending Payments',
      description: 'View pending payment information',
      icon: <PaymentIcon />,
      to: '/admin/bill-pay/reports/pending-payments',
      implemented: true
    },
    {
      title: 'Processing Confirmation',
      description: 'View processing confirmation information',
      icon: <ConfirmationNumberIcon />,
      to: '/admin/bill-pay/reports/processing-confirmation',
      implemented: true
    },
    {
      title: 'Recurring Payment Change History',
      description: 'View recurring payment change history',
      icon: <RepeatIcon />,
      to: '/admin/bill-pay/reports/recurring-payment-change-history',
      implemented: true
    },
    {
      title: 'Scheduled Payment Change History',
      description: 'View scheduled payment change history',
      icon: <HistoryIcon />,
      to: '/admin/bill-pay/reports/scheduled-payment-change-history',
      implemented: true
    },
    {
      title: 'Statuses with Notifications',
      description: 'View statuses with notifications information',
      icon: <NotificationsIcon />,
      to: '/admin/bill-pay/reports/statuses-with-notifications',
      implemented: true
    },
    {
      title: 'User Payee Change History',
      description: 'View user payee change history',
      icon: <HistoryIcon />,
      to: '/admin/bill-pay/reports/user-payee-change-history',
      implemented: true
    },
    {
      title: 'User Payee Report',
      description: 'View user payee information',
      icon: <ContactsIcon />,
      to: '/admin/bill-pay/reports/user-payee',
      implemented: true
    }
  ];

  return (
    <Grid container spacing={3}>
      {reports.map((report) => (
        <Grid item xs={12} sm={6} md={4} key={report.title}>
          <ReportCard {...report} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ReportsLanding;

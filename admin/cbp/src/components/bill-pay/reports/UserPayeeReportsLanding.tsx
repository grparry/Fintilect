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
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';
import GroupIcon from '@mui/icons-material/Group';
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

// User & Payee Reports landing page component
const UserPayeeReportsLanding: React.FC = () => {
  // Define user & payee reports
  const reports: ReportCardProps[] = [
    {
      title: 'Active User Count',
      description: 'View active user count statistics',
      icon: <GroupIcon />,
      to: '/admin/bill-pay/reports/active-user-count',
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
      title: 'Payee Report',
      description: 'View payee information',
      icon: <SearchIcon />,
      to: '/admin/bill-pay/reports/payee',
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
    <>
      <Paper elevation={0} sx={{ p: 2, mb: 3, backgroundColor: 'primary.light', color: 'primary.contrastText' }}>
        <Typography variant="body1">
          Access reports related to users, payees, and their relationships.
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

export default UserPayeeReportsLanding;

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
import ErrorIcon from '@mui/icons-material/Error';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BlockIcon from '@mui/icons-material/Block';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SecurityIcon from '@mui/icons-material/Security';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

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

// System & Compliance Reports landing page component
const SystemComplianceReportsLanding: React.FC = () => {
  // Define system & compliance reports
  const reports: ReportCardProps[] = [
    {
      title: 'Error Recap',
      description: 'View error recap information',
      icon: <ErrorIcon />,
      to: '/admin/bill-pay/reports/error-recap',
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
      title: 'OFAC Exceptions Report',
      description: 'View OFAC exceptions information',
      icon: <BlockIcon />,
      to: '/admin/bill-pay/reports/ofac-exceptions',
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
      title: 'Settlement Summary Report',
      description: 'View settlement summary with processing, settlement account, and remittance processor data',
      icon: <AccountBalanceIcon />,
      to: '/admin/bill-pay/reports/settlement-summary',
      implemented: true
    },
    {
      title: 'Statuses with Notifications',
      description: 'View statuses with notifications information',
      icon: <NotificationsIcon />,
      to: '/admin/bill-pay/reports/statuses-with-notifications',
      implemented: true
    }
  ];

  return (
    <>
      <Paper elevation={0} sx={{ p: 2, mb: 3, backgroundColor: 'primary.light', color: 'primary.contrastText' }}>
        <Typography variant="body1">
          Access reports related to system operations, compliance, and regulatory requirements.
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

export default SystemComplianceReportsLanding;

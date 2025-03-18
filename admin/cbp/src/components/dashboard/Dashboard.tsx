import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea, useTheme } from '@mui/material';
import { Person, Payment, Settings, Code } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}
const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, onClick }) => {
  const theme = useTheme();
  return (
    <Card 
      sx={{ 
        height: '100%',
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'background.paper',
        '&:hover': {
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
        }
      }}
    >
      <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            {icon}
            <Typography variant="h6" color="text.primary" component="div" ml={1}>
              {title}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
const Dashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const features = [
    {
      title: 'Client Management',
      description: 'Access and manage client management features and settings.',
      icon: <Person fontSize="large" />,
      path: '/admin/client-management'
    },
    {
      title: 'Bill Pay',
      description: 'Manage bill pay settings and configurations.',
      icon: <Payment fontSize="large" />,
      path: '/admin/bill-pay'
    },
    {
      title: 'Emerge Admin',
      description: 'Manage Emerge administrative settings.',
      icon: <Settings fontSize="large" />,
      path: '/admin/emerge'
    }
  ];
  return (
    <Box sx={{ 
      p: 3,
      backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : 'background.paper',
      minHeight: '100%'
    }}>
      <Typography variant="h4" color="text.primary" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Welcome to the CBP Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={3} key={feature.title}>
            <FeatureCard
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              onClick={() => navigate(feature.path)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default Dashboard;
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



    <Card 
        '&:hover': {
    >
      <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            {icon}
            <Typography variant="h6" component="div" ml={1}>
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

  
    {
    {
    {
    {
  ];

    <Box sx={{ 
      <Typography variant="h4" gutterBottom color="text.primary">
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
      </Typography>
      
      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={3} key={feature.title}>
            <FeatureCard
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );


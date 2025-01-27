import React, { useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';

const NavigationLanding: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { navigationConfig, state, setActiveSection } = useNavigation();
  useEffect(() => {
    if (!state.activeSection && navigationConfig.sections.length > 0) {
      setActiveSection(navigationConfig.sections[0].id);
    }
  }, [navigationConfig.sections, state.activeSection, setActiveSection]);
  const activeSection = navigationConfig.sections.find(
    section => section.id === state.activeSection
  );
  if (!activeSection) {
    return null;
  }
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {activeSection.title}
      </Typography>
      {activeSection.description && (
        <Typography variant="body1" color="text.secondary" paragraph>
          {activeSection.description}
        </Typography>
      )}
      <Grid container spacing={3}>
        {activeSection.items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4],
                },
              }}
              onClick={() => navigate(item.path)}
            >
              <CardContent>
                {item.icon && (
                  <Box sx={{ mb: 2 }}>
                    {React.createElement(item.icon)}
                  </Box>
                )}
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                {item.description && (
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default NavigationLanding;
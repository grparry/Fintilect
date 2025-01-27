import React, { useEffect } from 'react';
import { Typography, Button, Container, Paper, Stack } from '@mui/material';
import { useNavigate, useLocation, To } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import logger from '@/../utils/logger';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Log the 404 occurrence for diagnostics
    logger.warn({
      message: 'Navigation: Page not found',
      path: location.pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });
  }, [location.pathname]);

  const handleNavigateBack = () => {
    logger.info({
      message: 'Navigation: Redirect from 404',
      from: location.pathname,
      action: 'back',
      timestamp: new Date().toISOString()
    });
    navigate(-1);
  };

  const handleNavigateTo = (to: To) => {
    logger.info({
      message: 'Navigation: Redirect from 404',
      from: location.pathname,
      to,
      timestamp: new Date().toISOString()
    });
    navigate(to);
  };

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4,
          width: '100%',
          textAlign: 'center'
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          The page you're looking for doesn't exist or you don't have permission to access it.
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Attempted path: {location.pathname}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleNavigateTo('/admin/clients')}
          >
            Go to Clients
          </Button>
          <Button
            variant="outlined"
            onClick={handleNavigateBack}
          >
            Go Back
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default NotFound;

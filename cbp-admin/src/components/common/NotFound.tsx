import React from 'react';
import { Typography, Button, Container, Paper, Stack } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
            onClick={() => navigate('/admin/clients')}
          >
            Go to Clients
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default NotFound;

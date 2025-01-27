import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';

const ConfigPlaceholder: React.FC = () => {
  const location = useLocation();
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Configuration Page
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This is a placeholder for the configuration page at: {location.pathname}
        </Typography>
      </Paper>
    </Box>
  );
};
export default ConfigPlaceholder;
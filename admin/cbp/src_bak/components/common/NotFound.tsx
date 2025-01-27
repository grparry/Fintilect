import React, { useEffect } from 'react';
import { Typography, Button, Container, Paper, Stack } from '@mui/material';
import { useNavigate, useLocation, To } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import logger from '../../utils/logger';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Log the 404 occurrence for diagnostics



    // Log the 404 occurrence for diagnostics



    <Container 
    >
      <Paper 
      >
        <ErrorOutlineIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
          >
          </Button>
          <Button
          >
          </Button>
        </Stack>
      </Paper>
    </Container>
  );


import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import Form, { FormField } from './common/Form';
import { useAuth } from '../../context/AuthContext';
import { LoginFormData, LoginCredentials } from '../types/auth.types';
import { ApiError } from '../../types/index';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const formFields: FormField<LoginFormData>[] = [
    {



    {
    {
  ];



      
      // Get the return URL from location state or default to home

    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error.message}
            </Alert>
          )}
          <Form
          />
        </Paper>
      </Box>
    </Container>
  );


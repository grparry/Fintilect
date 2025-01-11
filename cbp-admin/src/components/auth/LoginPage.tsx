import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import Form, { FormField } from '../common/Form';
import { useAuth } from '../../contexts/AuthContext';
import { LoginFormData, LoginCredentials } from '../../types/auth.types';
import { ApiError } from '../../types/index';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const formFields: FormField<LoginFormData>[] = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      required: true,
      defaultValue: '',
      validation: {
        required: 'Username is required',
        minLength: {
          value: 3,
          message: 'Username must be at least 3 characters'
        }
      }
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      defaultValue: '',
      validation: {
        required: 'Password is required',
        minLength: {
          value: 8,
          message: 'Password must be at least 8 characters'
        }
      }
    },
    {
      name: 'rememberMe',
      label: 'Remember Me',
      type: 'checkbox',
      defaultValue: false
    }
  ];

  const handleSubmit = async (data: LoginFormData) => {
    console.log('LoginPage: Submitting form with data:', { ...data, password: '[REDACTED]' });
    setLoading(true);
    setError(null);

    try {
      const credentials: LoginCredentials = {
        username: data.username,
        password: data.password,
        rememberMe: data.rememberMe
      };

      console.log('LoginPage: Calling login with credentials:', { ...credentials, password: '[REDACTED]' });
      await login(credentials);
      console.log('LoginPage: Login successful');
      
      const from = (location.state as any)?.from?.pathname || '/';
      console.log('LoginPage: Navigating to:', from);
      navigate(from);
    } catch (err) {
      console.error('LoginPage: Login failed:', err);
      if (err instanceof Error) {
        setError({
          message: err.message,
          code: 'AUTH_ERROR',
          status: 401
        });
      } else {
        setError({
          message: 'An unexpected error occurred',
          code: 'UNKNOWN_ERROR',
          status: 500
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error.message}
            </Alert>
          )}
          <Form
            fields={formFields}
            onSubmit={handleSubmit}
            submitText="Login"
            loading={loading}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;

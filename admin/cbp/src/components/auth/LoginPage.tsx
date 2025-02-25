import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import Form, { FormField } from '../../components/common/Form';
import { useAuth } from '../../context/AuthContext';
import { LoginFormData, LoginCredentials } from '../../types/auth.types';
import { ApiError } from '../../types/exception.types';

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
        required: 'Username is required'
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
    }
  ];
  const handleSubmit = async (data: LoginFormData) => {
    console.log('LoginPage: Starting login process');
    console.log('LoginPage: Form data:', { ...data, password: '[REDACTED]' });
    setLoading(true);
    setError(null);
    try {
      const credentials: LoginCredentials = {
        username: data.username,
        password: data.password,
        clientId: '1' // Default clientId
      };
      console.log('LoginPage: Prepared credentials:', { ...credentials, password: '[REDACTED]' });
      console.log('LoginPage: Calling login function');
      await login(credentials);
      console.log('LoginPage: Login successful');
      console.log('LoginPage: Navigating to: /admin');
      navigate('/admin');
    } catch (err) {
      console.error('LoginPage: Login failed with error:', err);
      console.error('LoginPage: Error details:', {
        name: err.name,
        message: err.message,
        stack: err.stack
      });
      setError(err as ApiError);
    } finally {
      console.log('LoginPage: Login process complete');
      setLoading(false);
    }
  };
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" color="text.primary">
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
            loading={loading}
            submitText="Login"
          />
        </Paper>
      </Box>
    </Container>
  );
};
export default LoginPage;
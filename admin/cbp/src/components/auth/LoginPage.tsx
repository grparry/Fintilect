import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logger from '../../utils/logger';
import {
  Container,
  Paper,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import Form, { FormField } from '../../components/common/Form';
import { useAuth, PASSWORD_CHANGE_PATH } from '../../context/AuthContext';
import { LoginFormData, LoginCredentials } from '../../types/auth.types';
import { ApiError } from '../../types/exception.types';
import { getTenantFromHostname } from '../../config/host.config';

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
    logger.log('LoginPage: Starting login process');
    logger.log('LoginPage: Form data:', { ...data, password: '[REDACTED]' });
    setLoading(true);
    setError(null);
    try {
      logger.log('LoginPage: Getting tenant ID from hostname:', window.location.hostname);
      const tenantId = getTenantFromHostname();
      logger.log('LoginPage: Raw tenant ID from hostname:', tenantId);
      if (!tenantId) {
        throw new Error('Invalid tenant ID from hostname');
      }
      logger.log('LoginPage: Converting tenant ID to number:', { raw: tenantId, parsed: parseInt(tenantId) });
      const credentials: LoginCredentials = {
        username: data.username,
        password: data.password,
        tenantId: parseInt(tenantId)
      };
      logger.log('LoginPage: Prepared credentials:', { ...credentials, password: '[REDACTED]' });
      logger.log('LoginPage: Calling login function');
      const { forcePasswordChange } = await login(credentials);
      logger.log('LoginPage: Login successful, forcePasswordChange:', forcePasswordChange);
      
      // Check if user needs to change password
      if (forcePasswordChange) {
        logger.log('LoginPage: User must change password, redirecting to password change page');
        navigate(PASSWORD_CHANGE_PATH);
      } else {
        logger.log('LoginPage: Navigating to: /admin');
        navigate('/admin');
      }
    } catch (err) {
      logger.error('LoginPage: Login failed with error:', err);
      logger.error('LoginPage: Error details:', {
        name: err.name,
        message: err.message,
        stack: err.stack
      });
      setError(err as ApiError);
    } finally {
      logger.log('LoginPage: Login process complete');
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
              {error.details?.message || 'Authentication failed. Please check your credentials.'}
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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import Form, { FormField } from '../common/Form';
import { useAuth } from '../../context/AuthContext';
import { LoginFormData } from '../../types/auth.types';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formFields: FormField[] = [
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
        },
        maxLength: {
          value: 50,
          message: 'Username must be at most 50 characters'
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
        },
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
          message: 'Password must contain at least one letter and one number'
        }
      }
    },
    {
      name: 'rememberMe',
      label: 'Remember me',
      type: 'checkbox',
      defaultValue: false,
    },
  ];

  const handleSubmit = async (data: LoginFormData) => {
    setError(null);
    setLoading(true);
    try {
      await login(data.username, data.password, data.rememberMe);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5" gutterBottom>
            Sign In
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Form
            fields={formFields}
            onSubmit={handleSubmit}
            loading={loading}
            submitText="Sign In"
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;

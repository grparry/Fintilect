import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import PasswordChangeForm from './PasswordChangeForm';

const PasswordChangePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if no user or not forced to change password
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSuccess = () => {
    // Automatically redirect after successful password change
    setTimeout(() => {
      // Redirect directly to admin dashboard
      navigate('/admin');
    }, 2000);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" color="text.primary">
            Change Password
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Your account requires a password change. Please set a new password to continue.
          </Typography>
          
          <PasswordChangeForm 
            onSuccess={handleSuccess}
            successMessage="Password changed successfully! You will be redirected to the dashboard."
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default PasswordChangePage;

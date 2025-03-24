import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Typography
} from '@mui/material';
import { ServiceFactory } from '../../services/factory/ServiceFactory';
import { useAuth } from '../../context/AuthContext';

export interface PasswordChangeFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordChangeFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  showCancelButton?: boolean;
  submitButtonText?: string;
  successMessage?: string;
  isDialog?: boolean;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({
  onSuccess,
  onCancel,
  showCancelButton = false,
  submitButtonText = 'Change Password',
  successMessage = 'Password changed successfully!',
  isDialog = false
}) => {
  const { user, updateForcePasswordChange } = useAuth();
  const [formData, setFormData] = useState<PasswordChangeFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    // Password must be at least 8 characters
    if (formData.newPassword.length < 8) {
      setError('New password must be at least 8 characters long');
      return false;
    }

    // Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.newPassword)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
      return false;
    }

    // Passwords must match
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user?.id) {
      setError('User information not available');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const userService = ServiceFactory.getInstance().getUserService();
      await userService.changePassword({
        userId: user.id,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });

      setSuccess(true);
      
      // Update the auth context to ensure forcePasswordChange is false
      updateForcePasswordChange(false);
      console.log('PasswordChangeForm: Updated forcePasswordChange flag to false');
      
      // Reset form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Call success callback if provided
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (err) {
      console.error('Error changing password:', err);
      setError(err instanceof Error ? err.message : 'Failed to change password. Please check your current password and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          name="currentPassword"
          label="Current Password"
          type="password"
          value={formData.currentPassword}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          disabled={loading || success}
          autoComplete="current-password"
          inputProps={{
            paste: 'allow'
          }}
        />
        
        <TextField
          name="newPassword"
          label="New Password"
          type="password"
          value={formData.newPassword}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          disabled={loading || success}
          autoComplete="new-password"
          helperText="Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
          inputProps={{
            paste: 'allow'
          }}
        />
        
        <TextField
          name="confirmPassword"
          label="Confirm New Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          disabled={loading || success}
          autoComplete="new-password"
          inputProps={{
            paste: 'allow'
          }}
        />
        
        <Box sx={{ 
          mt: 3, 
          display: 'flex', 
          justifyContent: isDialog ? 'flex-end' : 'center',
          gap: 2
        }}>
          {showCancelButton && onCancel && (
            <Button
              onClick={onCancel}
              disabled={loading}
              variant={isDialog ? 'text' : 'outlined'}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading || success}
            sx={{ minWidth: 120 }}
          >
            {loading ? <CircularProgress size={24} /> : submitButtonText}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default PasswordChangeForm;

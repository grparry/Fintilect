import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Button,
  CircularProgress,
  SelectChangeEvent,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  Paper,
} from '@mui/material';
import { User, UserRole, UserStatus } from '../../../types/client.types';
import { clientService, userService } from '../../../services/factory/ServiceFactory';

export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  forcePasswordChange: boolean;
  isActive: boolean;
  isLocked: boolean;
  password?: string;
}
interface UserFormProps {
  user?: User;
  onSubmit: (user: Partial<User>) => void;
  onCancel: () => void;
  saving?: boolean;
  parentError?: string | null;
}
const UserForm: React.FC<UserFormProps> = ({
  user,
  onSubmit,
  onCancel,
  saving = false,
  parentError = null,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    forcePasswordChange: false,
    isActive: true,
    isLocked: false,
    password: '',
  });
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        department: user.department || '',
        forcePasswordChange: user.forcePasswordChange || false,
        isActive: user.isActive,
        isLocked: user.isLocked || false,
        password: '',
      });
    } else {
      // Reset form when adding new user
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        forcePasswordChange: false,
        isActive: true,
        isLocked: false,
        password: '',
      });
    }
  }, [user]);
  
  // Effect to handle parent error updates
  useEffect(() => {
    if (parentError) {
      setError(parentError);
    }
  }, [parentError]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'role' ? value as UserRole : 
              name === 'status' ? value as UserStatus : 
              value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    try {
      // Convert form data to user data
      // Prepare the base user data
      const userData: Partial<User> = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        department: formData.department,
        isLocked: formData.isLocked,
        isActive: formData.isActive,
      };
      
      // For new users, include password and force password change
      if (!user && formData.password) {
        userData.password = formData.password;
        userData.forcePasswordChange = true; // Force password change for new users
      } else if (user) {
        // For existing users, maintain the current forcePasswordChange setting
        userData.forcePasswordChange = formData.forcePasswordChange;
      }
      await onSubmit(userData);
    } catch (error: any) {
      console.error('Error saving user:', error);
      
      // Try to extract validation errors from the API response
      let errorMessage = 'An unexpected error occurred while saving the user';
      
      try {
        // Check if this is an axios error with a response
        if (error?.response?.data) {
          // Direct API error response
          if (error.response.data.errors) {
            // Format validation errors
            const validationErrors = error.response.data.errors;
            const errorMessages: string[] = [];
            
            // Collect all validation error messages
            Object.keys(validationErrors).forEach(field => {
              const fieldErrors = validationErrors[field];
              if (Array.isArray(fieldErrors)) {
                errorMessages.push(...fieldErrors);
              } else if (typeof fieldErrors === 'string') {
                errorMessages.push(fieldErrors);
              }
            });
            
            if (errorMessages.length > 0) {
              errorMessage = errorMessages.join('\n');
            }
          } else if (error.response.data.message) {
            errorMessage = error.response.data.message;
          }
        } 
        // Check for nested payload structure (as seen in your example)
        else if (error?.payload) {
          try {
            const payloadData = typeof error.payload === 'string' ? JSON.parse(error.payload) : error.payload;
            if (payloadData.response?.data?.errors) {
              // Format validation errors
              const validationErrors = payloadData.response.data.errors;
              const errorMessages: string[] = [];
              
              // Collect all validation error messages
              Object.keys(validationErrors).forEach(field => {
                const fieldErrors = validationErrors[field];
                if (Array.isArray(fieldErrors)) {
                  errorMessages.push(...fieldErrors);
                } else if (typeof fieldErrors === 'string') {
                  errorMessages.push(fieldErrors);
                }
              });
              
              if (errorMessages.length > 0) {
                errorMessage = errorMessages.join('\n');
              }
            }
          } catch (parseError) {
            console.error('Error parsing payload:', parseError);
          }
        }
        // Fallback to standard error message
        else if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
      } catch (parseError) {
        console.error('Error parsing error response:', parseError);
      }
      
      setError(errorMessage);
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2, whiteSpace: 'pre-line' }}>
          {error.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </Alert>
      )}
      <Paper sx={{ p: 3, mb: 3 }}>
        {/* Read-only information section */}
        {user && (
          <>
            <Typography variant="h6" gutterBottom>User Information</Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" color="text.secondary">Username</Typography>
                <Typography variant="body1">{user.username}</Typography>
              </Grid>
              {user.creationDate && (
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" color="text.secondary">Creation Date</Typography>
                  <Typography variant="body1">{new Date(user.creationDate).toLocaleDateString()}</Typography>
                </Grid>
              )}
              {user.lastLogin && (
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" color="text.secondary">Last Login</Typography>
                  <Typography variant="body1">{new Date(user.lastLogin).toLocaleDateString()}</Typography>
                </Grid>
              )}
            </Grid>
            <Divider sx={{ mb: 3 }} />
          </>
        )}
        
        {/* Editable fields */}
        <Typography variant="h6" gutterBottom>Personal Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="department"
              label="Department"
              value={formData.department}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Account Settings</Typography>
        <Grid container spacing={2}>
          {/* Only show temporary password field when creating a new user */}
          {!user && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="password"
                  label="Temporary Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  required
                  helperText="User will be required to change this password on first login"
                />
              </Grid>
              <Grid item xs={12}>
                <Alert severity="info" sx={{ mt: 1 }}>
                  New users will be required to change their password on first login.
                </Alert>
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isLocked"
                  checked={formData.isLocked}
                  onChange={handleCheckboxChange}
                />
              }
              label="Locked"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleCheckboxChange}
                />
              }
              label="Active"
            />
          </Grid>
        </Grid>
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={saving}
        >
          {saving ? 'Saving...' : user ? 'Update' : 'Create'}
        </Button>
      </Box>
    </Box>
  );
};
export default UserForm;
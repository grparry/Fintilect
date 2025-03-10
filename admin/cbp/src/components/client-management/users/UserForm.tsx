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
  mobilePhone: string;
  role: UserRole;
  department: string;
  forcePasswordChange: boolean;
  isActive: boolean;
  isLocked: boolean;
}
interface UserFormProps {
  user?: User;
  onSubmit: (user: Partial<User>) => void;
  onCancel: () => void;
  saving?: boolean;
}
const UserForm: React.FC<UserFormProps> = ({
  user,
  onSubmit,
  onCancel,
  saving = false,
}) => {
  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    mobilePhone: '',
    role: UserRole.User,
    department: '',
    forcePasswordChange: false,
    isActive: true,
    isLocked: false,
  });
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        mobilePhone: user.mobilePhone || '',
        role: UserRole.User,
        department: user.department || '',
        forcePasswordChange: user.forcePasswordChange || false,
        isActive: user.isActive,
        isLocked: user.isLocked || false,
      });
    } else {
      // Reset form when adding new user
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        mobilePhone: '',
        role: UserRole.User,
        department: '',
        forcePasswordChange: false,
        isActive: true,
        isLocked: false,
      });
    }
  }, [user]);
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
    try {
      // Convert form data to user data
      const userData: Partial<User> = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobilePhone: formData.mobilePhone,
        department: formData.department,
        isLocked: formData.isLocked,
        isActive: formData.isActive,
        // Don't include password or forcePasswordChange in edits
      };
      await onSubmit(userData);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="mobilePhone"
              label="Mobile Phone"
              value={formData.mobilePhone}
              onChange={handleChange}
              fullWidth
            />
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
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                label="Role"
                onChange={handleChange}
              >
                {Object.values(UserRole).map(role => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
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
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
} from '@mui/material';
import { User, UserRole, UserStatus } from '../../../types/client.types';
import { clientService, userService } from '../../../services/factory/ServiceFactory';

export interface UserFormData {
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  department: string;
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
    role: UserRole.User,
    status: UserStatus.ACTIVE,
    department: '',
  });
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        role: UserRole.User,
        status: user.isLocked ? UserStatus.LOCKED : UserStatus.ACTIVE,
        department: user.department || '',
      });
    } else {
      // Reset form when adding new user
      setFormData({
        firstName: '',
        lastName: '',
        role: UserRole.User,
        status: UserStatus.ACTIVE,
        department: '',
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Convert form data to user data
      const userData: Partial<User> = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        department: formData.department,
        isLocked: formData.status === UserStatus.LOCKED
      };
      await onSubmit(userData);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              label="Status"
              onChange={handleChange}
            >
              {Object.values(UserStatus).map(status => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
        <Grid item xs={12} sx={{ mt: 2 }}>
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
        </Grid>
      </Grid>
    </Box>
  );
};
export default UserForm;
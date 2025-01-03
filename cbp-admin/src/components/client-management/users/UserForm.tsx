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
} from '@mui/material';
import { User, UserRole, UserStatus, UserGroup } from '../../../types/client.types';

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: UserRole;
  status: UserStatus;
  department: string;
  password: string;
}

interface UserFormProps {
  user?: User;
  groups: UserGroup[];
  onSubmit: (user: Partial<User>) => void;
  onCancel: () => void;
  saving?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  user,
  groups,
  onSubmit,
  onCancel,
  saving = false,
}) => {
  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    role: UserRole.ReadOnly,
    status: UserStatus.Pending,
    department: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        password: '', // Clear password when editing
      });
    } else {
      // Reset form when adding new user
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        role: UserRole.ReadOnly,
        status: UserStatus.Pending,
        department: '',
        password: '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
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
      const userData: Partial<User> = {
        ...formData,
        role: formData.role,
        status: formData.status,
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
        <Grid item xs={12}>
          <TextField
            name="username"
            label="Username"
            value={formData.username}
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
              {(Object.keys(UserRole) as Array<keyof typeof UserRole>)
                .filter(key => isNaN(Number(key)))
                .map(role => (
                  <MenuItem key={role} value={UserRole[role]}>
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
              {(Object.keys(UserStatus) as Array<keyof typeof UserStatus>)
                .filter(key => isNaN(Number(key)))
                .map(status => (
                  <MenuItem key={status} value={UserStatus[status]}>
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
        {!user && (
          <Grid item xs={12}>
            <TextField
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required={!user}
            />
          </Grid>
        )}
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          disabled={saving}
        >
          {saving ? <CircularProgress size={24} /> : (user ? 'Save' : 'Create')}
        </Button>
      </Box>
    </Box>
  );
};

export default UserForm;

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
import { User, UserRole, UserStatus, UserGroup } from '../../types/client.types';

export interface UserFormData {
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
    status: UserStatus.PENDING,
    department: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        role: (user.roles?.[0] as UserRole) || UserRole.User,
        status: user.status,
        department: user.department,
        password: '', // Clear password when editing
      });
    } else {
      // Reset form when adding new user





      // Reset form when adding new user

  ) => {
      ...prev,
      [name]: name === 'role' ? value as UserRole : 

      // Convert form data to user data

    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
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
          />
        </Grid>
        {!user && (
          <Grid item xs={12}>
            <TextField
            />
          </Grid>
        )}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={onCancel}>Cancel</Button>
            <Button
            >
              {saving ? 'Saving...' : user ? 'Update' : 'Create'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );


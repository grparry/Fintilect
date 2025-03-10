import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
  User,
  UserGroup,
  UserRole,
  UserStatus
} from '../../types/client.types';
import { PaginatedResponse } from '../../types/common.types';
import { PaginationOptions, FilterOptions } from '../../types/common.types';
import { clientService, userService } from '../../services/factory/ServiceFactory';
import UserSearch from './users/UserSearch';
import UserTable from './users/UserTable';
import UserForm from './users/UserForm';
import { useNavigate } from 'react-router-dom';
import { encodeId } from '../../utils/idEncoder';
import logger from '../../utils/logger';
import { UserFormData } from './users/UserForm';

interface UsersState {
  users: User[];
  groups: UserGroup[];
  loading: boolean;
  error: string | null;
  success: string | null;
  saving: boolean;
  selectedUser: User | undefined;
  isFormOpen: boolean;
  isResetPasswordOpen: boolean;
  resetPasswordUser: User | undefined;
  newPassword: string;
  // forcePasswordChange is set automatically by the API
  totalUsers: number;
  page: number;
  limit: number;
  searchTerm: string;
  showInactive: boolean;
}
interface UsersProps {
  clientId: string;
  loading?: boolean;
}
const Users: React.FC<UsersProps> = ({ clientId, loading: parentLoading }) => {
  const navigate = useNavigate();
  const [state, setState] = useState<UsersState>({
    users: [],
    groups: [],
    loading: true,
    error: null,
    success: null,
    saving: false,
    selectedUser: undefined,
    isFormOpen: false,
    isResetPasswordOpen: false,
    resetPasswordUser: undefined,
    newPassword: '',
    // forcePasswordChange is set automatically by the API
    totalUsers: 0,
    page: 0,
    limit: 10,
    searchTerm: '',
    showInactive: false
  });
  const loadData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Log the filter parameters
      logger.info(`Loading users with filters: clientId=${Number(clientId)}, isActive=${state.showInactive ? 'undefined' : 'true'}, searchTerm=${state.searchTerm}`);
      
      // Create request parameters
      const params = {
        clientId: Number(clientId)
      };
      
      logger.info(`Request params: ${JSON.stringify(params)}`);
      
      const response = await userService.getUsers(params);
      
      // Log the response to debug
      logger.info(`API response received with ${response.users ? response.users.length : 0} users`);
      
      // Make sure we have users array
      if (!response.users || !Array.isArray(response.users)) {
        logger.error('Invalid response format: users array is missing or not an array');
        throw new Error('Invalid response format');
      }
      
      // Apply client-side filtering for inactive users
      let filteredByActiveUsers = response.users;
      if (!state.showInactive) {
        filteredByActiveUsers = response.users.filter(user => user.isActive);
        logger.info(`Filtered out inactive users. Remaining: ${filteredByActiveUsers.length}`);
      }
      
      // Apply client-side search filtering if needed
      let searchFilteredUsers = filteredByActiveUsers;
      if (state.searchTerm) {
        const searchLower = state.searchTerm.toLowerCase();
        searchFilteredUsers = filteredByActiveUsers.filter(user => 
          (user.firstName?.toLowerCase().includes(searchLower) || 
           user.lastName?.toLowerCase().includes(searchLower) || 
           user.email?.toLowerCase().includes(searchLower) || 
           user.username.toLowerCase().includes(searchLower))
        );
        logger.info(`Applied search filter. Remaining: ${searchFilteredUsers.length}`);
      }
      
      // Log active/inactive counts for debugging
      const activeCount = searchFilteredUsers.filter(user => user.isActive).length;
      const inactiveCount = searchFilteredUsers.filter(user => !user.isActive).length;
      logger.info(`Users breakdown after filtering: ${activeCount} active, ${inactiveCount} inactive`);
      
      // Apply pagination
      const start = state.page * state.limit;
      const end = start + state.limit;
      const paginatedUsers = searchFilteredUsers.slice(start, end);
      
      const groups = await Promise.all(paginatedUsers.map(user => userService.getUserGroups(user.id)));
      
      setState(prev => ({
        ...prev,
        loading: false,
        users: paginatedUsers,
        groups: groups.flat(),
        totalUsers: searchFilteredUsers.length // Use filtered count for pagination
      }));
      
      logger.info('Users and groups loaded successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load users and groups';
      logger.error('Error loading users and groups: ' + message);
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: message
      }));
    }
  }, [clientId, state.limit, state.searchTerm, state.page, state.showInactive]);
  useEffect(() => {
    loadData();
  }, [loadData]);
  const handleCreateUser = async (formData: Partial<UserFormData>) => {
    try {
      setState(prev => ({ ...prev, saving: true, error: null }));
      const newUser = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: `${formData.firstName.toLowerCase()}.${formData.lastName.toLowerCase()}`,
        clientId: Number(clientId),
        isActive: true,
        creationDate: new Date().toISOString(),
        tenantId: 1, // TODO: Get from context
        isLocked: false,
        department: formData.department || '',
      };
      await userService.createUser(newUser);
      setState(prev => ({
        ...prev,
        saving: false,
        isFormOpen: false,
        success: 'User created successfully'
      }));
      loadData();
      logger.info('User created successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create user';
      logger.error('Error creating user:' + message);
      setState(prev => ({ 
        ...prev, 
        saving: false, 
        error: message 
      }));
    }
  };
  const handleUpdateUser = useCallback(async (userData: Partial<User>) => {
    if (!state.selectedUser?.id) return;
    try {
      setState(prev => ({ ...prev, saving: true, error: null }));
      const updatedUser = await userService.updateUser(state.selectedUser.id, userData);
      setState(prev => ({
        ...prev,
        saving: false,
        success: 'User updated successfully',
        isFormOpen: false,
        selectedUser: undefined
      }));
      loadData();
      logger.info('User updated successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update user';
      logger.error('Error updating user:' + message);
      setState(prev => ({
        ...prev,
        saving: false,
        error: message
      }));
    }
  }, [state.selectedUser, loadData]);

  const handleSubmitForm = useCallback((userData: Partial<User>) => {
    if (!state.selectedUser?.id) return;
    handleUpdateUser(userData);
  }, [handleUpdateUser, state.selectedUser]);

  const handleDeleteUser = async (user: User) => {
    try {
      setState(prev => ({ ...prev, saving: true, error: null }));
      await userService.deleteUser(user.id);
      setState(prev => ({
        ...prev,
        saving: false,
        success: 'User deleted successfully'
      }));
      loadData();
      logger.info('User deleted successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete user';
      logger.error('Error deleting user: ' + message);
      setState(prev => ({ 
        ...prev, 
        saving: false, 
        error: message
      }));
    }
  };
  const handleSearch = (searchTerm: string) => {
    setState(prev => ({
      ...prev,
      searchTerm,
      page: 0
    }));
  };

  const handleShowInactiveToggle = (showInactive: boolean) => {
    setState(prev => ({
      ...prev,
      showInactive,
      page: 0
    }));
  };
  const handlePageChange = (_event: unknown, newPage: number) => {
    setState(prev => ({ ...prev, page: newPage }));
  };
  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({
      ...prev,
      limit: parseInt(event.target.value, 10),
      page: 0
    }));
  };
  const handleToggleLock = useCallback((user: User) => {
    if (!user.id) return;
    
    // Use the specific lock/unlock endpoints
    const action = user.isLocked ? userService.unlockUser(user.id) : userService.lockUser(user.id);
    
    action.then(() => {
      loadData();
    }).catch(err => {
      const message = err instanceof Error ? err.message : 'Failed to toggle user lock';
      logger.error('Error toggling user lock:' + message);
      setState(prev => ({
        ...prev,
        error: message
      }));
    });
  }, [loadData]);

  const handleResetPassword = useCallback((user: User) => {
    setState(prev => ({
      ...prev,
      isResetPasswordOpen: true,
      resetPasswordUser: user,
      newPassword: '',
      error: null
    }));
  }, []);

  const handleResetPasswordSubmit = useCallback(async () => {
    if (!state.resetPasswordUser?.id) return;
    
    try {
      setState(prev => ({ ...prev, saving: true, error: null }));
      
      await userService.resetPassword({
        userId: state.resetPasswordUser.id,
        newPassword: state.newPassword
        // forcePasswordChange is set automatically by the API
      });
      
      setState(prev => ({
        ...prev,
        saving: false,
        isResetPasswordOpen: false,
        resetPasswordUser: undefined,
        newPassword: '',
        success: 'Password reset successfully'
      }));
      
      logger.info('Password reset successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to reset password';
      logger.error('Error resetting password: ' + message);
      setState(prev => ({
        ...prev,
        saving: false,
        error: message
      }));
    }
  }, [state.resetPasswordUser, state.newPassword]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({
      ...prev,
      newPassword: e.target.value
    }));
  };

  // forcePasswordChange is set automatically by the API, so no toggle handler is needed
  if (state.loading || parentLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box sx={{ p: 3, pt: 1 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" component="h1" color="text.primary">
          Users
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setState(prev => ({ ...prev, isFormOpen: true }))}
          disabled={state.saving}
        >
          Add User
        </Button>
      </Box>
      {state.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {state.error}
        </Alert>
      )}
      {state.success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {state.success}
        </Alert>
      )}
      <UserSearch
        onSearch={handleSearch}
        onFilterChange={handleShowInactiveToggle}
        showInactive={state.showInactive}
        loading={state.loading}
      />
      <UserTable
        users={state.users}
        groups={state.groups}
        onEdit={() => {}} // No-op since navigation is handled in UserTable
        onDelete={handleDeleteUser}
        onToggleLock={handleToggleLock}
        onResetPassword={handleResetPassword}
        clientId={clientId}
      />
      <Dialog
        open={state.isFormOpen}
        onClose={() => setState(prev => ({ ...prev, isFormOpen: false, selectedUser: undefined }))}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {state.selectedUser ? 'Edit User' : 'Add User'}
        </DialogTitle>
        <DialogContent>
          <UserForm
            user={state.selectedUser}
            onSubmit={state.selectedUser ? handleSubmitForm : handleCreateUser}
            onCancel={() => setState(prev => ({ ...prev, isFormOpen: false, selectedUser: undefined }))}
            saving={state.saving}
          />
        </DialogContent>
      </Dialog>

      {/* Password Reset Dialog */}
      <Dialog
        open={state.isResetPasswordOpen}
        onClose={() => setState(prev => ({ ...prev, isResetPasswordOpen: false, resetPasswordUser: undefined }))}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          {state.resetPasswordUser && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="body1" gutterBottom>
                Reset password for user: <strong>{state.resetPasswordUser.firstName} {state.resetPasswordUser.lastName}</strong>
              </Typography>
              <TextField
                label="New Password"
                type="password"
                fullWidth
                value={state.newPassword}
                onChange={handlePasswordChange}
                margin="normal"
                required
                autoFocus
              />
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
                Note: The user will be required to change their password on next login
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setState(prev => ({ ...prev, isResetPasswordOpen: false, resetPasswordUser: undefined }))}
            disabled={state.saving}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleResetPasswordSubmit} 
            variant="contained" 
            color="primary"
            disabled={!state.newPassword || state.saving}
          >
            {state.saving ? 'Resetting...' : 'Reset Password'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default Users;
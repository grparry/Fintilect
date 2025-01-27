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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { 
  User,
  UserGroup,
  UserStatus,
  UserRole,
  PaginatedResponse,
  UserFilters
} from '@/../types/client.types';
import { PaginationOptions, FilterOptions } from '@/../types/common.types';
import { clientService, userService } from '@/../services/factory/ServiceFactory';
import UserSearch from '@/users/UserSearch';
import UserTable from '@/users/UserTable';
import UserForm from '@/users/UserForm';
import { useNavigate } from 'react-router-dom';
import { encodeId } from '@/../utils/idEncoder';
import logger from '@/../utils/logger';
import { UserFormData } from '@/users/UserForm';

interface UsersState {
  users: User[];
  groups: UserGroup[];
  loading: boolean;
  error: string | null;
  success: string | null;
  saving: boolean;
  selectedUser: User | undefined;
  isFormOpen: boolean;
  totalUsers: number;
  page: number;
  limit: number;
  searchTerm: string;
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
    totalUsers: 0,
    page: 0,
    limit: 10,
    searchTerm: ''
  });

  const loadData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const filters: FilterOptions = {
        clientId,
        ...(state.searchTerm && { searchTerm: state.searchTerm })
      };

      const [usersResponse, groupsResponse] = await Promise.all([
        userService.getUsers({
          pagination: {
            page: state.page + 1,
            limit: state.limit
          },
          filter: filters
        }),
        clientService.getClientUserGroups(clientId)
      ]);

      setState(prev => ({
        ...prev,
        loading: false,
        users: usersResponse.items,
        totalUsers: usersResponse.pagination.total,
        groups: groupsResponse
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
  }, [clientId, state.page, state.limit, state.searchTerm]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateUser = async (formData: Partial<UserFormData>) => {
    try {
      setState(prev => ({ ...prev, saving: true, error: null }));

      const newUser: Omit<User, 'id'> = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        username: formData.username,
        clientId,
        status: formData.status || UserStatus.ACTIVE,
        roles: [formData.role || UserRole.User]
      } as Omit<User, 'id'>;

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
      logger.error('Error creating user: ' + message);
      setState(prev => ({ 
        ...prev, 
        saving: false, 
        error: message
      }));
    }
  };

  const handleUpdateUser = async (userData: Partial<User>) => {
    if (!state.selectedUser) return;

    try {
      setState(prev => ({ ...prev, saving: true, error: null }));

      await userService.updateUser(userData.id || state.selectedUser.id, userData);

      setState(prev => ({
        ...prev,
        saving: false,
        selectedUser: undefined,
        isFormOpen: false,
        success: 'User updated successfully'
      }));

      loadData();
      logger.info('User updated successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update user';
      logger.error('Error updating user: ' + message);
      setState(prev => ({ 
        ...prev, 
        saving: false, 
        error: message
      }));
    }
  };

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

  const handleToggleLock = (user: User) => {
    handleUpdateUser({
      id: user.id,
      status: user.status === UserStatus.LOCKED ? UserStatus.ACTIVE : UserStatus.LOCKED
    });
  };

  if (state.loading || parentLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" component="h1">
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
        loading={state.loading}
      />

      <UserTable
        users={state.users}
        groups={state.groups}
        onEdit={() => {}} // No-op since navigation is handled in UserTable
        onDelete={handleDeleteUser}
        onToggleLock={handleToggleLock}
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
            groups={state.groups}
            onSubmit={state.selectedUser ? handleUpdateUser : handleCreateUser}
            onCancel={() => setState(prev => ({ ...prev, isFormOpen: false, selectedUser: undefined }))}
            saving={state.saving}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Users;

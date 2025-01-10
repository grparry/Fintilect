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
  SecurityRole,
  Permission,
} from '../../types/client.types';
import { clientService } from '../../services/clients.service';
import UserSearch from './users/UserSearch';
import UserTable from './users/UserTable';
import UserForm from './users/UserForm';
import { shouldUseMockData } from '../../config/api.config';
import { useNavigate } from 'react-router-dom';
import { encodeId } from '../../utils/idEncoder';

interface UsersState {
  users: User[];
  groups: UserGroup[];
  loading: boolean;
  error: string | null;
  success: string | null;
  saving: boolean;
  selectedUser: User | null;
  isFormOpen: boolean;
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
    selectedUser: null,
    isFormOpen: false
  });

  const isMockMode = shouldUseMockData();

  const loadData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const [usersResponse, groupsResponse] = await Promise.all([
        clientService.getUsers(clientId),
        clientService.getGroups(clientId)
      ]);

      if ('error' in usersResponse || 'error' in groupsResponse) {
        setState(prev => ({ 
          ...prev, 
          error: 'Failed to load user data',
          loading: false 
        }));
        return;
      }

      setState(prev => ({ 
        ...prev,
        users: usersResponse.data.items,
        groups: groupsResponse.data.items,
        loading: false 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev,
        error: 'An unexpected error occurred',
        loading: false 
      }));
    }
  }, [clientId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateUser = async (userData: Omit<User, 'id' | 'clientId' | 'createdAt' | 'updatedAt'>) => {
    try {
      setState(prev => ({ ...prev, saving: true, error: null }));
      
      const response = await clientService.createUser(clientId, userData);
      
      if ('error' in response) {
        setState(prev => ({ 
          ...prev,
          error: response.error.message,
          saving: false 
        }));
        return;
      }

      setState(prev => ({
        ...prev,
        users: [...prev.users, response.data],
        success: 'User created successfully',
        saving: false,
        isFormOpen: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to create user',
        saving: false
      }));
    }
  };

  const handleUpdateUser = async (userId: string, userData: Partial<Omit<User, 'id' | 'clientId' | 'createdAt' | 'updatedAt'>>) => {
    try {
      setState(prev => ({ ...prev, saving: true, error: null }));
      
      const response = await clientService.updateUser(clientId, userId, userData);
      
      if ('error' in response) {
        setState(prev => ({ 
          ...prev,
          error: response.error.message,
          saving: false 
        }));
        return;
      }

      setState(prev => ({
        ...prev,
        users: prev.users.map(user => 
          user.id === Number(userId) ? response.data : user
        ),
        success: 'User updated successfully',
        saving: false,
        selectedUser: null
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to update user',
        saving: false
      }));
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      setState(prev => ({ ...prev, saving: true, error: null }));
      
      const response = await clientService.deleteUser(clientId, userId);
      
      if ('error' in response) {
        setState(prev => ({ 
          ...prev,
          error: response.error.message,
          saving: false 
        }));
        return;
      }

      setState(prev => ({
        ...prev,
        users: prev.users.filter(user => user.id !== Number(userId)),
        success: 'User deleted successfully',
        saving: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to delete user',
        saving: false
      }));
    }
  };

  const handleSearch = async (searchTerm: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const filteredUsers = state.users.filter(user =>
        `${user.firstName} ${user.lastName} ${user.email} ${user.role}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      
      setState(prev => ({ 
        ...prev,
        users: filteredUsers,
        loading: false 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev,
        error: 'Failed to search users',
        loading: false 
      }));
    }
  };

  const handleEditUser = (user: User) => {
    navigate(`/admin/client-management/${encodeId(clientId)}/users/${encodeId(String(user.id))}`);
  };

  const handleCreateClick = () => {
    navigate(`/admin/client-management/${encodeId(clientId)}/users/new`);
  };

  const handleToggleLock = async (user: User) => {
    try {
      const newStatus = user.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE';
      
      const response = await clientService.updateUser(clientId, String(user.id), {
        status: newStatus,
      });
      
      if ('error' in response) {
        setState(prev => ({ 
          ...prev,
          error: response.error.message,
          saving: false 
        }));
        return;
      }

      setState(prev => ({
        ...prev,
        users: prev.users.map(u =>
          u.id === user.id ? { ...u, status: newStatus } : u
        ),
        success: 'User status updated successfully',
        saving: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to update user status',
        saving: false
      }));
    }
  };

  if (state.loading || parentLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {state.error && <Alert severity="error">{state.error}</Alert>}
      {state.success && <Alert severity="success">{state.success}</Alert>}
      {isMockMode && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Mock mode is enabled
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h1">
          Users
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateClick}
        >
          Add User
        </Button>
      </Box>

      <UserSearch onSearch={handleSearch} />

      <UserTable
        users={state.users}
        groups={state.groups}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onToggleLock={handleToggleLock}
      />
    </Box>
  );
};

export default Users;

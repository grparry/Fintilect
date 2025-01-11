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
  User as UIUser,
  UserGroup as UIUserGroup,
  SecurityRole,
  Permission,
  UserStatus,
  UserRole
} from '../../types/client.types';
import { UserGroup as ServiceUserGroup } from '../../services/clients.service';
import { clientService } from '../../services/clients.service';
import UserSearch from './users/UserSearch';
import UserTable from './users/UserTable';
import UserForm from './users/UserForm';
import { shouldUseMockData } from '../../config/api.config';
import { useNavigate } from 'react-router-dom';
import { encodeId, decodeId } from '../../utils/idEncoder';

interface UsersState {
  users: UIUser[];
  groups: UIUserGroup[];
  loading: boolean;
  error: string | null;
  success: string | null;
  saving: boolean;
  selectedUser: UIUser | null;
  isFormOpen: boolean;
}

interface UsersProps {
  clientId: string;
  loading?: boolean;
}

interface ServiceUser {
  id: string;
  clientId: string;
  email: string;
  firstName: string;
  lastName: string;
  status: 'ACTIVE' | 'INACTIVE' | 'LOCKED';
  role: string;
  department?: string;
  lastLogin?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

interface ServiceUserCreate {
  firstName: string;
  lastName: string;
  email: string;
  department?: string;
  role: string;
  status: 'ACTIVE' | 'INACTIVE' | 'LOCKED';
}

const serviceUserToUIUser = (serviceUser: ServiceUser): UIUser => ({
  id: serviceUser.id,
  clientId: serviceUser.clientId,
  username: serviceUser.email,
  firstName: serviceUser.firstName,
  lastName: serviceUser.lastName,
  email: serviceUser.email,
  department: serviceUser.department || '',
  role: serviceUser.role === 'ADMIN' ? UserRole.Admin :
        serviceUser.role === 'MANAGER' ? UserRole.Manager :
        serviceUser.role === 'SUPPORT' ? UserRole.Support :
        serviceUser.role === 'USER' ? UserRole.User :
        UserRole.ReadOnly,
  status: serviceUser.status === 'ACTIVE' ? UserStatus.ACTIVE :
          serviceUser.status === 'INACTIVE' ? UserStatus.INACTIVE :
          UserStatus.LOCKED,
  lastLogin: serviceUser.lastLogin || null,
  locked: serviceUser.status === 'LOCKED',
  createdAt: serviceUser.createdAt || new Date().toISOString(),
  updatedAt: serviceUser.updatedAt || new Date().toISOString()
});

const serviceGroupToUIGroup = (group: ServiceUserGroup): UIUserGroup => ({
  id: group.id,
  name: group.name,
  description: group.description || '',
  clientId: group.clientId,
  roles: [],
  permissions: group.permissions.map(id => ({ 
    id,
    name: '',
    description: '',
    category: 'user',
    actions: []
  })),
  members: group.members,
  createdAt: group.createdAt,
  updatedAt: group.updatedAt
});

const uiUserToServiceUser = (uiUser: Partial<UIUser>): Partial<ServiceUserCreate> => ({
  ...(uiUser.firstName && { firstName: uiUser.firstName }),
  ...(uiUser.lastName && { lastName: uiUser.lastName }),
  ...(uiUser.email && { email: uiUser.email }),
  ...(uiUser.department && { department: uiUser.department }),
  ...(uiUser.role && {
    role: uiUser.role === UserRole.Admin ? 'ADMIN' :
          uiUser.role === UserRole.Manager ? 'MANAGER' :
          uiUser.role === UserRole.Support ? 'SUPPORT' :
          uiUser.role === UserRole.User ? 'USER' :
          'READONLY'
  }),
  ...(uiUser.status && {
    status: uiUser.status === UserStatus.ACTIVE ? 'ACTIVE' :
            uiUser.status === UserStatus.INACTIVE ? 'INACTIVE' :
            'LOCKED'
  })
});

const Users: React.FC<UsersProps> = ({ clientId, loading: parentLoading }) => {
  const navigate = useNavigate();
  const decodedClientId = clientId ? decodeId(clientId) : '';

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
        clientService.getClientUsers(decodedClientId),
        clientService.getGroups(decodedClientId)
      ]);

      if (!usersResponse.success || !groupsResponse.success) {
        setState(prev => ({ 
          ...prev, 
          loading: false, 
          error: (!usersResponse.success ? usersResponse.error.message : undefined) || 
                (!groupsResponse.success ? groupsResponse.error.message : undefined) || 
                'Failed to load data'
        }));
        return;
      }

      setState(prev => ({
        ...prev,
        loading: false,
        users: usersResponse.data.items.map(serviceUserToUIUser),
        groups: groupsResponse.data.items.map(serviceGroupToUIGroup)
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      }));
    }
  }, [decodedClientId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateUser = async (userData: Partial<UIUser>) => {
    try {
      setState(prev => ({ ...prev, saving: true, error: null }));

      const serviceUserData = uiUserToServiceUser(userData);
      const response = await clientService.createClientUser(decodedClientId, serviceUserData);

      if (!response.success) {
        setState(prev => ({ 
          ...prev, 
          saving: false, 
          error: response.error.message || 'Failed to create user'
        }));
        return;
      }

      setState(prev => ({
        ...prev,
        saving: false,
        users: [...prev.users, serviceUserToUIUser(response.data)],
        success: 'User created successfully',
        isFormOpen: false
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        saving: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      }));
    }
  };

  const handleUpdateUser = async (userId: string, userData: Partial<UIUser>) => {
    try {
      setState(prev => ({ ...prev, saving: true, error: null }));

      const serviceUserData = uiUserToServiceUser(userData);
      const response = await clientService.updateClientUser(decodedClientId, userId, serviceUserData);

      if (!response.success) {
        setState(prev => ({ 
          ...prev, 
          saving: false, 
          error: response.error.message || 'Failed to update user'
        }));
        return;
      }

      setState(prev => ({
        ...prev,
        saving: false,
        users: prev.users.map(user => user.id === userId ? serviceUserToUIUser(response.data) : user),
        success: 'User updated successfully'
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        saving: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      }));
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      setState(prev => ({ ...prev, saving: true, error: null }));

      const response = await clientService.deleteClientUser(decodedClientId, userId);

      if (!response.success) {
        setState(prev => ({ 
          ...prev, 
          saving: false, 
          error: response.error.message || 'Failed to delete user'
        }));
        return;
      }

      setState(prev => ({
        ...prev,
        saving: false,
        users: prev.users.filter(user => user.id !== userId),
        success: 'User deleted successfully'
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        saving: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
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

  const handleEditUser = (user: UIUser) => {
    navigate(`/admin/client-management/${encodeId(decodedClientId)}/users/${encodeId(user.id)}`);
  };

  const handleCreateClick = () => {
    navigate(`/admin/client-management/${encodeId(decodedClientId)}/users/new`);
  };

  const handleToggleLock = async (user: UIUser) => {
    try {
      const newStatus = user.status === UserStatus.LOCKED ? 'ACTIVE' : 'LOCKED';
      
      const response = await clientService.updateClientUser(decodedClientId, user.id, {
        status: newStatus,
      });
      
      if (!response.success) {
        setState(prev => ({ 
          ...prev,
          error: response.error.message || 'Failed to update user status',
          saving: false 
        }));
        return;
      }

      setState(prev => ({
        ...prev,
        users: prev.users.map(u =>
          u.id === user.id ? serviceUserToUIUser(response.data) : u
        ),
        success: 'User status updated successfully',
        saving: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
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
        onDelete={(user: UIUser) => handleDeleteUser(user.id)}
        onToggleLock={handleToggleLock}
        clientId={decodedClientId}
      />
    </Box>
  );
};

export default Users;

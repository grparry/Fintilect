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
import { User, UserGroup, UserStatus } from '../../types/client.types';
import { clientService } from '../../services/clients.service';
import UserSearch from './users/UserSearch';
import UserTable from './users/UserTable';
import UserForm from './users/UserForm';
import { shouldUseMockData } from '../../config/api.config';
import { useNavigate } from 'react-router-dom';
import { encodeId } from '../../utils/idEncoder';

interface UsersProps {
  clientId: string;
  loading?: boolean;
}

const Users: React.FC<UsersProps> = ({ clientId, loading: parentLoading }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [groups, setGroups] = useState<UserGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  console.log('=== Users Component Debug Start ===');
  console.log('Props received:', {
    clientId,
    loading: parentLoading,
  });

  const isMockMode = shouldUseMockData();

  const loadData = useCallback(async () => {
    console.log('Loading users for client:', clientId);
    try {
      setLoading(true);
      setError(null);

      const [usersData, groupsData] = await Promise.all([
        clientService.getUsers(clientId),
        clientService.getGroups(clientId)
      ]);

      console.log('Data loaded:', { 
        userCount: usersData.length,
        groupCount: groupsData.length
      });
      setUsers(usersData);
      setGroups(groupsData);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load users and groups');
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    console.log('Users component useEffect triggered', { clientId });
    console.log('Users - Using mock data:', isMockMode);
    loadData();
  }, [clientId, isMockMode, loadData]);

  const handleSearch = async (searchTerm: string) => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement proper search endpoint
      const filteredUsers = users.filter(user =>
        `${user.firstName} ${user.lastName} ${user.email} ${user.role}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      console.log('Search results:', { 
        searchTerm,
        userCount: filteredUsers.length
      });
      setUsers(filteredUsers);
    } catch (err) {
      console.error('Error searching users:', err);
      setError('Failed to search users');
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: User) => {
    console.log('✏️ Users.handleEditUser - Navigating to edit user:', { 
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`
    });
    navigate(`/admin/client-management/${encodeId(clientId)}/users/${encodeId(user.id)}`);
  };

  const handleAddUser = () => {
    console.log('➕ Creating new user');
    navigate(`/admin/client-management/${encodeId(clientId)}/users/new`);
  };

  const handleDeleteUser = (user: User) => {
    console.log('Deleting user:', { 
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`
    });
    navigate(`/admin/client-management/${encodeId(clientId)}/users/${encodeId(user.id)}/delete`);
  };

  const handleToggleLock = async (user: User) => {
    try {
      console.log('Toggling user lock:', { 
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        currentStatus: user.status
      });

      const newStatus = user.status === UserStatus.Active ? UserStatus.Locked : UserStatus.Active;
      
      await clientService.updateUser(clientId, String(user.id), {
        ...user,
        status: newStatus,
      });
      console.log('User status updated:', { 
        userId: user.id,
        newStatus
      });
      
      setUsers(users.map(u =>
        u.id === user.id ? { ...u, status: newStatus } : u
      ));
      setSuccess('User status updated successfully');
    } catch (err) {
      console.error('Error updating user status:', err);
      setError('Failed to update user status');
    }
  };

  console.log('🔄 Users Render', {
    hasSelectedUser: false,
    userCount: users.length,
    groupCount: groups.length,
    isLoading: loading,
    isSaving: saving
  });

  if (loading || parentLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      {isMockMode && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Mock mode is enabled
        </Alert>
      )}

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" component="div">
          Users
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddUser}
          sx={{ mt: 1 }}
        >
          Add User
        </Button>
      </Box>

      <UserSearch onSearch={handleSearch} />

      <UserTable
        users={users}
        groups={groups}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onToggleLock={handleToggleLock}
        clientId={clientId}
      />
    </Box>
  );
};

export default Users;

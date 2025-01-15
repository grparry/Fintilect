import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, CircularProgress, Box, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { decodeId } from '../../../utils/idEncoder';
import { clientService } from '../../../services/factory/ServiceFactory';
import { User, UserGroup, UserStatus, UserRole } from '../../../types/client.types';
import UserForm from '../users/UserForm';

const serviceUserToUIUser = (user: any): User => ({
  id: user.id.toString(),
  clientId: user.clientId.toString(),
  username: user.username,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  role: user.role as UserRole,
  status: user.status === 'ACTIVE' ? UserStatus.ACTIVE :
         user.status === 'INACTIVE' ? UserStatus.INACTIVE :
         user.status === 'LOCKED' ? UserStatus.LOCKED :
         UserStatus.PENDING,
  department: user.department || '',
  lastLogin: user.lastLogin || null,
  locked: user.locked || false,
  createdAt: user.createdAt || new Date().toISOString(),
  updatedAt: user.updatedAt || new Date().toISOString()
});

const uiUserToServiceUser = (user: Partial<User>) => {
  const { id, clientId, status, lastLogin, ...rest } = user;
  
  // Convert status, excluding PENDING which is not supported by the service
  let serviceStatus: UserStatus | undefined;
  if (status && status !== UserStatus.PENDING) {
    serviceStatus = status;
  }

  // Convert lastLogin from string | null to string | undefined
  const serviceLastLogin = lastLogin === null ? undefined : lastLogin;

  return {
    ...rest,
    id: id?.toString(),
    clientId: clientId?.toString(),
    status: serviceStatus,
    lastLogin: serviceLastLogin
  };
};

const serviceGroupToUIGroup = (group: any): UserGroup => ({
  id: group.id,
  name: group.name,
  description: group.description || '',
  clientId: group.clientId,
  roles: [],
  permissions: group.permissions.map((id: string) => ({
    id,
    name: '',
    description: '',
    category: 'user',
    actions: []
  })),
  members: group.members || [],
  createdAt: group.createdAt,
  updatedAt: group.updatedAt
});

const UserEditWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { clientId, userId } = useParams<{ clientId: string; userId: string }>();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [groups, setGroups] = useState<UserGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Get the return URL from state or default to users list
  const getReturnUrl = () => {
    const state = window.history.state;
    return state?.returnUrl || `/admin/client-management/${clientId}/users`;
  };

  useEffect(() => {
    const loadData = async () => {
      if (!clientId || !userId) {
        setError('Missing client or user ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const decodedClientId = decodeId(clientId);
        const decodedUserId = decodeId(userId);

        // Load user and groups in parallel
        const [user, groups] = await Promise.all([
          clientService.getUser(decodedClientId, decodedUserId),
          clientService.getGroups(decodedClientId)
        ]);

        setUser(serviceUserToUIUser(user));
        setGroups(groups.map(serviceGroupToUIGroup));
      } catch (err) {
        console.error('Error loading user data:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [clientId, userId]);

  const handleSave = async (formUser: Partial<User>) => {
    if (!clientId || !userId) {
      setError('Missing client or user ID');
      return;
    }

    try {
      console.log('💾 UserEditWrapper.handleSave - Starting save');
      setSaving(true);
      setError(null);

      const decodedClientId = decodeId(clientId);
      const decodedUserId = decodeId(userId);

      const updatedUser = await clientService.updateUser(
        decodedClientId, 
        decodedUserId, 
        uiUserToServiceUser(formUser)
      );

      console.log('✅ UserEditWrapper.handleSave - Save successful, navigating back');
      navigate(`/admin/client-management/${clientId}/users`, { replace: true });
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user');
      setSaving(false);
    }
  };

  const handleClose = () => {
    console.log('🚪 UserEditWrapper.handleClose - Navigating back');
    navigate(`/admin/client-management/${clientId}/users`, { replace: true });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  console.log('🔄 UserEditWrapper Render', {
    hasUser: !!user,
    loading,
    saving,
    error: !!error
  });

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {user ? 'Edit User' : 'Add User'}
      </DialogTitle>
      <DialogContent>
        <UserForm
          user={user}
          groups={groups}
          onSubmit={handleSave}
          onCancel={handleClose}
          saving={saving}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserEditWrapper;

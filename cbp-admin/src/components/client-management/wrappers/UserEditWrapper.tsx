import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, CircularProgress, Box, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { decodeId } from '../../../utils/idEncoder';
import { clientService } from '../../../services/clients.service';
import { User, UserGroup } from '../../../types/client.types';
import UserForm from '../users/UserForm';

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
        const [userData, groupsData] = await Promise.all([
          clientService.getUser(decodedClientId, decodedUserId),
          clientService.getGroups(decodedClientId)
        ]);

        setUser(userData);
        setGroups(groupsData);
      } catch (err) {
        console.error('Error loading user data:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [clientId, userId]);

  const handleSave = async (updatedUser: Partial<User>) => {
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

      await clientService.updateUser(decodedClientId, decodedUserId, updatedUser);
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

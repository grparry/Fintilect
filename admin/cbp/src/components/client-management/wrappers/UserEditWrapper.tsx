import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Alert, Dialog, DialogTitle, DialogContent } from '@mui/material';
import UserForm from '../users/UserForm';
import { clientService, userService } from '../../../services/factory/ServiceFactory';
import { User, UserGroup } from '../../../types/client.types';
import { decodeId } from '../../../utils/idEncoder';
import logger from '../../../utils/logger';

const UserEditWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { clientId = '', userId = '' } = useParams<{ clientId: string; userId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [groups, setGroups] = useState<UserGroup[]>([]);
  const [saving, setSaving] = useState(false);
  logger.log('=== UserEditWrapper Debug Start ===');
  logger.log('Route params:', { clientId, userId });
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!clientId || !userId) {
          throw new Error('Missing required parameters');
        }
        const decodedClientId = decodeId(clientId);
        const decodedUserId = decodeId(userId);
        logger.log('Loading user data:', { decodedClientId, decodedUserId });
        // Load user and groups in parallel
        const [userData, groupsData] = await Promise.all([
          userService.getUser(Number(decodedUserId)),
          userService.getUserGroups(Number(decodedUserId))
        ]);
        if (!userData) {
          throw new Error('User not found');
        }
        setUser(userData);
        setGroups(groupsData);
        logger.info(`User data loaded successfully: ${decodedUserId}`);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        logger.error(`Failed to load user: ${errorMessage}`);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [clientId, userId]);
  const handleSave = async (formData: Partial<User>) => {
    try {
      setSaving(true);
      setError(null);
      if (!clientId || !userId || !user) {
        throw new Error('Missing required parameters');
      }
      const decodedUserId = decodeId(userId);
      
      // Create a complete user object by merging the existing user with the form data
      const completeUserData = {
        ...user,
        ...formData
      };
      
      await userService.updateUser(Number(decodedUserId), completeUserData);
      logger.info('User updated successfully');
      navigate(`/admin/client-management/edit/${clientId}/users`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      logger.error(`Failed to update user: ${errorMessage}`);
      setError(errorMessage);
      setSaving(false);
    }
  };
  const handleClose = useCallback(() => {
    logger.log('Navigating back to users list');
    navigate(`/admin/client-management/edit/${clientId}/users`);
  }, [navigate, clientId]);
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
  if (!user) {
    return <Alert severity="error">User not found</Alert>;
  }
  return (
    <Dialog
      open={true}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Edit User
      </DialogTitle>
      <DialogContent>
        <UserForm
          user={user}
          onSubmit={handleSave}
          onCancel={handleClose}
          saving={saving}
        />
      </DialogContent>
    </Dialog>
  );
};
export default UserEditWrapper;
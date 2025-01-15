import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Alert, CircularProgress, Box } from '@mui/material';
import Groups from '../Groups';
import GroupEdit from '../groups/GroupEdit';
import { clientService } from '../../../services/factory/ServiceFactory';
import { decodeId } from '../../../utils/idEncoder';
import { UserGroup } from '../../../types/client.types';

const GroupsWrapper: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clientId = '', groupId } = useParams<{ clientId: string; groupId?: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [group, setGroup] = useState<UserGroup | null>(null);

  useEffect(() => {
    const loadGroup = async () => {
      if (!clientId) {
        setError('Client ID is required');
        setLoading(false);
        return;
      }

      if (!groupId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const decodedGroupId = decodeId(groupId);
        const groupData = await clientService.getGroup(decodeId(clientId), decodedGroupId);
        setGroup(groupData);
      } catch (err) {
        console.error('Error loading group:', err);
        setError(err instanceof Error ? err.message : 'Failed to load group');
      } finally {
        setLoading(false);
      }
    };

    loadGroup();
  }, [clientId, groupId]);

  const handleClose = () => {
    navigate(`/admin/client-management/${clientId}/groups`, { 
      replace: true,
      state: { returnUrl: location.pathname }
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Allow the GroupEdit component to handle the actual save
      // We just manage navigation here
      navigate(`/admin/client-management/${clientId}/groups`, { 
        replace: true,
        state: { 
          returnUrl: location.pathname,
          message: 'Group saved successfully'
        }
      });
    } catch (err) {
      console.error('Error during save navigation:', err);
      setError(err instanceof Error ? err.message : 'Failed to save group');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  try {
    const decodedClientId = decodeId(clientId);

    // If groupId is present, show the edit view
    if (groupId) {
      return (
        <GroupEdit 
          clientId={decodedClientId}
          groupId={groupId}
          onSave={handleSave}
          onCancel={handleClose}
        />
      );
    }

    // Otherwise show the groups list
    return <Groups clientId={decodedClientId} />;
  } catch (err) {
    console.error('Error decoding IDs:', err);
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Invalid client or group ID format. Please try again.
      </Alert>
    );
  }
};

export default GroupsWrapper;

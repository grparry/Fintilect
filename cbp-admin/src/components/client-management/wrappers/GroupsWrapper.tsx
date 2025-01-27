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

  if (!clientId) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Client ID is required
      </Alert>
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
          onSave={() => {
            navigate(`/admin/client-management/${clientId}/groups`, { 
              replace: true,
              state: { 
                returnUrl: location.pathname,
                message: 'Group saved successfully'
              }
            });
          }}
          onCancel={() => {
            navigate(`/admin/client-management/${clientId}/groups`, { 
              replace: true,
              state: { returnUrl: location.pathname }
            });
          }}
        />
      );
    }

    // Otherwise show the groups list
    return <Groups clientId={decodedClientId} />;
  } catch (err) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Invalid client ID format. Please select a client from the list.
      </Alert>
    );
  }
};

export default GroupsWrapper;

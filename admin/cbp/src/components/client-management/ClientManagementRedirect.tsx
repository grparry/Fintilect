import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useClient } from '../../context/ClientContext';
import { useHost } from '../../context/HostContext';
import { CircularProgress, Box } from '@mui/material';
import { encodeId } from '../../utils/idEncoder';
import logger from '../../utils/logger';

/**
 * Component that redirects users based on their admin status:
 * - Admin users go to the client management list page
 * - Non-admin users go directly to their own client edit page
 */
const ClientManagementRedirect: React.FC = () => {
  const { isAdmin: hostIsAdmin } = useHost();
  const { selectedClient, isAdmin: clientIsAdmin } = useClient();

  useEffect(() => {
    logger.info({
      message: 'Client Management Redirect',
      hostIsAdmin,
      clientIsAdmin,
      clientId: selectedClient?.clientId
    });
  }, [hostIsAdmin, clientIsAdmin, selectedClient]);

  // Show loading while we determine where to redirect
  if (!selectedClient) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // If this is an admin host or the user has admin privileges, go to the client list
  if (hostIsAdmin) {
    return <Navigate to="/admin/client-management/list" replace />;
  }

  // For non-admin clients, redirect directly to their client edit page
  const encodedClientId = encodeId(selectedClient.clientId);
  return <Navigate to={`/admin/client-management/edit/${encodedClientId}/info`} replace />;
};

export default ClientManagementRedirect;

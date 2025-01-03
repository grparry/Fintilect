import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Alert } from '@mui/material';
import ClientManagement from '../ClientManagement';
import { decodeId } from '../../../utils/idEncoder';

const ClientManagementWrapper: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clientId } = useParams<{ clientId: string }>();

  console.log('ClientManagementWrapper - Current location:', location.pathname);
  console.log('ClientManagementWrapper - Encoded client ID:', clientId);

  if (!clientId) {
    console.log('ClientManagementWrapper - No client ID provided');
    return (
      <Alert severity="error">
        No client ID provided. Please select a client from the list.
      </Alert>
    );
  }

  try {
    const decodedClientId = decodeId(clientId);
    console.log('ClientManagementWrapper - Decoded client ID:', decodedClientId);
    return <ClientManagement clientId={decodedClientId} />;
  } catch (error) {
    console.error('ClientManagementWrapper - Error decoding client ID:', error);
    return (
      <Alert severity="error">
        Invalid client ID format. Please select a client from the list.
      </Alert>
    );
  }
};

export default ClientManagementWrapper;

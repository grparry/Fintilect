import React from 'react';
import { useParams } from 'react-router-dom';
import { Alert } from '@mui/material';
import AuditSearch from '../security/AuditSearch';
import { decodeId } from '../../../utils/idEncoder';

const AuditSearchWrapper: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();

  console.log('AuditSearchWrapper - encoded clientId:', clientId);

  if (!clientId) {
    return (
      <Alert severity="error">
        Client ID is required. Please select a client from the list.
      </Alert>
    );
  }

  try {
    const decodedClientId = decodeId(clientId);
    console.log('AuditSearchWrapper - decoded clientId:', decodedClientId);
    return <AuditSearch clientId={decodedClientId} />;
  } catch (error) {
    console.error('Error decoding client ID:', error);
    return (
      <Alert severity="error">
        Invalid client ID format. Please select a client from the list.
      </Alert>
    );
  }
};

export default AuditSearchWrapper;

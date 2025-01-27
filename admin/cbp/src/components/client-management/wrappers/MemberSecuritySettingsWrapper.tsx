import React from 'react';
import { useParams } from 'react-router-dom';
import { Alert } from '@mui/material';
import MemberSecuritySettings from '../security/MemberSecuritySettings';
import { decodeId } from '../../../utils/idEncoder';

const MemberSecuritySettingsWrapper: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  if (!clientId) {
    return (
      <Alert severity="error">
        Client ID is required. Please select a client from the list.
      </Alert>
    );
  }
  try {
    const decodedClientId = decodeId(clientId);
    return <MemberSecuritySettings clientId={decodedClientId} />;
  } catch (error) {
    return (
      <Alert severity="error">
        Invalid client ID format. Please select a client from the list.
      </Alert>
    );
  }
};
export default MemberSecuritySettingsWrapper;
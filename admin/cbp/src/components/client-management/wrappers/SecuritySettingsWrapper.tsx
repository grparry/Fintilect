import React from 'react';
import { useParams } from 'react-router-dom';
import SecuritySettings from '../security/SecuritySettings';

const SecuritySettingsWrapper: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();

  if (!clientId) {
    return <div>Client ID is required</div>;
  }

  return <SecuritySettings clientId={clientId} />;
};

export default SecuritySettingsWrapper;

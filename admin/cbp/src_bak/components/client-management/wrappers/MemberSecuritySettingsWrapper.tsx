import React from 'react';
import { useParams } from 'react-router-dom';
import { Alert } from '@mui/material';
import MemberSecuritySettings from './security/MemberSecuritySettings';
import { decodeId } from '../../../utils/idEncoder';

const MemberSecuritySettingsWrapper: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();

  if (!clientId) {
    return (
      <Alert severity="error">



      <Alert severity="error">
      </Alert>
    );

      <Alert severity="error">
      </Alert>
    );


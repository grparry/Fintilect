import React from 'react';
import { useParams } from 'react-router-dom';
import { Alert } from '@mui/material';
import AuditSearch from './security/AuditSearch';
import { decodeId } from '../../../utils/idEncoder';

const AuditSearchWrapper: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();

  console.log('AuditSearchWrapper - encoded clientId:', clientId);

  if (!clientId) {
    return (
      <Alert severity="error">




      <Alert severity="error">
      </Alert>
    );

      <Alert severity="error">
      </Alert>
    );


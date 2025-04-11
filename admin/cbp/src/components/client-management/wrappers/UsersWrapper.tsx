import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Users from '../Users';
import { Box, CircularProgress, Alert } from '@mui/material';
import { clientService } from '../../../services/factory/ServiceFactory';
import { User } from '../../../types/client.types';
import { decodeId } from '../../../utils/idEncoder';
import UserEditWrapper from './UserEditWrapper';
import logger from '../../../utils/logger';

const UsersWrapper: React.FC = () => {
  logger.log('🔄 UsersWrapper mounted');
  const navigate = useNavigate();
  const location = useLocation();
  const { clientId = '', userId } = useParams<{ clientId: string; userId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [decodedClientId, setDecodedClientId] = useState<string>('');
  logger.log('=== UsersWrapper Debug Start ===');
  logger.log('Current location:', location.pathname);
  logger.log('Route params:', { clientId, userId });
  useEffect(() => {
    logger.log('🔄 UsersWrapper location changed:', location.pathname);
  }, [location]);
  useEffect(() => {
    logger.log('🔄 UsersWrapper userId changed:', userId);
  }, [userId]);
  useEffect(() => {
    try {
      logger.log('🔄 UsersWrapper decoding clientId:', clientId);
      const decoded = decodeId(clientId);
      logger.log('Successfully decoded clientId:', { encoded: clientId, decoded });
      setDecodedClientId(decoded);
      setLoading(false);
    } catch (error) {
      logger.error('Failed to decode clientId:', error);
      setError('Invalid client ID');
      setLoading(false);
      navigate('/admin/client-management');
    }
  }, [clientId, navigate]);
  const handleClose = () => {
    logger.log('🔄 UsersWrapper.handleClose - About to navigate');
    logger.log('Current URL:', window.location.href);
    logger.log('Navigating to:', `/admin/client-management/edit/${clientId}/users`);
    navigate(`/admin/client-management/edit/${clientId}/users`, { replace: true });
  };
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
  // If we have a userId, show the edit form
  if (userId) {
    logger.log('📝 Rendering UserEditWrapper with userId:', userId);
    // Force the component to re-render when the userId changes
    return <UserEditWrapper key={userId} />;
  }
  // Otherwise show the users list
  logger.log('📋 Rendering Users list');
  return (
    <Users
      clientId={decodedClientId}
      loading={loading}
    />
  );
};
export default UsersWrapper;
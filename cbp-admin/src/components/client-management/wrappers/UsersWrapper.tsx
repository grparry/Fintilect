import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Users from '../Users';
import UserEditWrapper from './UserEditWrapper'; 
import { clientService } from '../../../services/clients.service';
import { User } from '../../../types/client.types';
import { decodeId } from '../../../utils/idEncoder';
import { Box, CircularProgress, Alert } from '@mui/material';

const UsersWrapper: React.FC = () => {
  console.log('🔄 UsersWrapper mounted');

  const navigate = useNavigate();
  const location = useLocation();
  const { clientId = '', userId } = useParams<{ clientId: string; userId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [decodedClientId, setDecodedClientId] = useState<string>('');

  console.log('=== UsersWrapper Debug Start ===');
  console.log('Current location:', location.pathname);
  console.log('Route params:', { clientId, userId });

  useEffect(() => {
    console.log('🔄 UsersWrapper location changed:', location.pathname);
  }, [location]);

  useEffect(() => {
    console.log('🔄 UsersWrapper userId changed:', userId);
  }, [userId]);

  useEffect(() => {
    try {
      console.log('🔄 UsersWrapper decoding clientId:', clientId);
      const decoded = decodeId(clientId);
      console.log('Successfully decoded clientId:', { encoded: clientId, decoded });
      setDecodedClientId(decoded);
      setLoading(false);
    } catch (error) {
      console.error('Failed to decode clientId:', error);
      setError('Invalid client ID');
      setLoading(false);
      navigate('/admin/client-management');
    }
  }, [clientId, navigate]);

  const handleClose = () => {
    console.log('🔄 UsersWrapper.handleClose - About to navigate');
    console.log('Current URL:', window.location.href);
    console.log('Navigating to:', `/admin/client-management/${clientId}/users`);
    navigate(`/admin/client-management/${clientId}/users`, { replace: true });
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

  if (userId) {
    console.log('📝 Rendering UserEditWrapper');
    return <UserEditWrapper />;
  }

  console.log('📋 Rendering Users list');
  return (
    <Users
      clientId={decodedClientId}
      loading={loading}
    />
  );
};

export default UsersWrapper;
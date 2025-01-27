import React, { Suspense } from 'react';
import { useParams, useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { Alert, CircularProgress } from '@mui/material';
import ClientManagement from './ClientManagement';
import ContactInformation from './ContactInformation';
import UsersWrapper from './UsersWrapper';
import GroupsWrapper from './GroupsWrapper';
import MemberSecuritySettingsWrapper from './MemberSecuritySettingsWrapper';
import AuditSearchWrapper from './AuditSearchWrapper';
import { decodeId } from '../../../utils/idEncoder';
import logger from '../../../utils/logger';

const ClientManagementWrapper: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clientId } = useParams<{ clientId: string }>();

  console.log('=== ClientManagementWrapper Debug Start ===');
  console.log('Current location:', location.pathname);
  console.log('URL params:', { clientId });
  console.log('Search params:', location.search);
  console.log('Route state:', location.state);

  if (!clientId) {
    logger.error('No client ID provided');
    return (
      <Alert severity="error">




      <Alert severity="error">
      </Alert>
    );

    
    // Get the path after /admin/client-management/edit/:clientId/

    // Only redirect if we're exactly at the client root
    
      <Suspense fallback={<CircularProgress />}>
        <ClientManagement clientId={decodedClientId}>
          <Routes>
            <Route path="contact" element={<ContactInformation clientId={decodedClientId} />} />
            <Route path="users">
              <Route index element={<UsersWrapper />} />
              <Route path=":userId" element={<UsersWrapper />} />
            </Route>
            <Route path="groups">
              <Route index element={<GroupsWrapper />} />
              <Route path=":groupId" element={<GroupsWrapper />} />
            </Route>
            <Route path="security" element={<MemberSecuritySettingsWrapper />} />
            <Route path="audit-log" element={<AuditSearchWrapper />} />
            <Route path="*" element={<Navigate to="contact" replace />} />
          </Routes>
        </ClientManagement>
      </Suspense>
    );
      <Alert severity="error">
      </Alert>
    );


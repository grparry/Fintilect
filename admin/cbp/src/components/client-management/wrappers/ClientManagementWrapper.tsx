import React, { Suspense } from 'react';
import { useParams, useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { Alert, CircularProgress } from '@mui/material';
import ClientManagement from '../ClientManagement';
import ContactInformation from '../ContactInformation';
import UsersWrapper from './UsersWrapper';
import GroupsWrapper from './GroupsWrapper';
import SecuritySettingsWrapper from './SecuritySettingsWrapper';
import MemberSecuritySettingsWrapper from './MemberSecuritySettingsWrapper';
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
        No client ID provided. Please select a client from the list.
      </Alert>
    );
  }
  try {
    const decodedClientId = decodeId(clientId);
    console.log('Decoded client ID:', decodedClientId);
    // Get the path after /admin/client-management/edit/:clientId/
    const basePath = `/admin/client-management/edit/${clientId}`;
    const currentPath = location.pathname;
    console.log('Path analysis:', { basePath, currentPath });
    // Only redirect if we're exactly at the client root
    if (currentPath === basePath) {
      console.log('At root path, redirecting to info');
      return <Navigate to={`${basePath}/info`} replace />;
    }
    return (
      <Suspense fallback={<CircularProgress />}>
        <ClientManagement clientId={decodedClientId}>
          <Routes>
            <Route path="info" element={<ContactInformation clientId={decodedClientId} mode="info" />} />
            <Route path="contacts" element={<ContactInformation clientId={decodedClientId} mode="contacts" />} />
            <Route path="users">
              <Route index element={<UsersWrapper />} />
              <Route path=":userId" element={<UsersWrapper />} />
            </Route>
            <Route path="groups">
              <Route index element={<GroupsWrapper />} />
              <Route path=":groupId" element={<GroupsWrapper />} />
            </Route>
            <Route path="security" element={<MemberSecuritySettingsWrapper />} />
            <Route path="*" element={<Navigate to="info" replace />} />
          </Routes>
        </ClientManagement>
      </Suspense>
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`Error decoding client ID: ${errorMessage}`);
    return (
      <Alert severity="error">
        Invalid client ID format. Please select a client from the list.
      </Alert>
    );
  }
};
export default ClientManagementWrapper;
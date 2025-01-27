import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Alert, CircularProgress, Box } from '@mui/material';
import Groups from './Groups';
import GroupEdit from './groups/GroupEdit';
import { clientService } from '../../../services/factory/ServiceFactory';
import { decodeId } from '../../../utils/idEncoder';
import { UserGroup } from '../../../types/client.types';

const GroupsWrapper: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clientId = '', groupId } = useParams<{ clientId: string; groupId?: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [group, setGroup] = useState<UserGroup | null>(null);

  if (!clientId) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>



      <Alert severity="error" sx={{ mt: 2 }}>
      </Alert>
    );


    // If groupId is present, show the edit view
        <GroupEdit 
        />
      );

    // Otherwise show the groups list
      <Alert severity="error" sx={{ mt: 2 }}>
      </Alert>
    );


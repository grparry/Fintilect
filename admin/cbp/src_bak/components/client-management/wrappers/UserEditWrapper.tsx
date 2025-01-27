import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Alert, Dialog, DialogTitle, DialogContent } from '@mui/material';
import UserForm from './users/UserForm';
import { clientService } from '../../../services/factory/ServiceFactory';
import { User, UserGroup } from '../../types/client.types';
import { decodeId } from '../../../utils/idEncoder';
import logger from '../../../utils/logger';

const UserEditWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { clientId = '', userId = '' } = useParams<{ clientId: string; userId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [groups, setGroups] = useState<UserGroup[]>([]);
  const [saving, setSaving] = useState(false);

  console.log('=== UserEditWrapper Debug Start ===');
  console.log('Route params:', { clientId, userId });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!clientId || !userId) {
          throw new Error('Missing required parameters');
        }

        const decodedClientId = decodeId(clientId);
        const decodedUserId = decodeId(userId);
        






        
        
        // Load user and groups in parallel
        ]);
        








      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );



    <Dialog
    >
      <DialogTitle>
      </DialogTitle>
      <DialogContent>
        <UserForm
        />
      </DialogContent>
    </Dialog>
  );


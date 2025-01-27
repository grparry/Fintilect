import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { 
  User,
  UserGroup,
  UserStatus,
  UserRole,
  PaginatedResponse,
  UserFilters
} from '../../types/client.types';
import { PaginationOptions, FilterOptions } from '../types/common.types';
import { clientService, userService } from '../services/factory/ServiceFactory';
import UserSearch from './users/UserSearch';
import UserTable from './users/UserTable';
import UserForm from './users/UserForm';
import { useNavigate } from 'react-router-dom';
import { encodeId } from '../../utils/idEncoder';
import logger from '../../utils/logger';
import { UserFormData } from './users/UserForm';

interface UsersState {
  users: User[];
  groups: UserGroup[];
  loading: boolean;
  error: string | null;
  success: string | null;
  saving: boolean;
  selectedUser: User | undefined;
  isFormOpen: boolean;
  totalUsers: number;
  page: number;
  limit: number;
  searchTerm: string;
}

interface UsersProps {
  clientId: string;
  loading?: boolean;
}

const Users: React.FC<UsersProps> = ({ clientId, loading: parentLoading }) => {
  const navigate = useNavigate();
  const [state, setState] = useState<UsersState>({
    users: [],
    groups: [],
    loading: true,
    error: null,
    success: null,
    saving: false,
    selectedUser: undefined,
    isFormOpen: false,
    totalUsers: 0,
    page: 0,
    limit: 10,
    searchTerm: ''
  });

  const loadData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const filters: FilterOptions = {
        clientId,
        ...(state.searchTerm && { searchTerm: state.searchTerm })






        ...(state.searchTerm && { searchTerm: state.searchTerm })

      ]);

        ...prev,

        ...prev, 





        ...prev,

        ...prev, 




        ...prev,

        ...prev, 



        ...prev,

        ...prev, 

      ...prev,


      ...prev,


      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );

    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" component="h1">
        </Typography>
        <Button
        >
        </Button>
      </Box>

      {state.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {state.error}
        </Alert>
      )}

      {state.success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {state.success}
        </Alert>
      )}

      <UserSearch
      />

      <UserTable
      />

      <Dialog
      >
        <DialogTitle>
          {state.selectedUser ? 'Edit User' : 'Add User'}
        </DialogTitle>
        <DialogContent>
          <UserForm
          />
        </DialogContent>
      </Dialog>
    </Box>
  );


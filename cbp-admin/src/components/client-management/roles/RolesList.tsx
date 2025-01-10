import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
  CircularProgress,
  Chip,
  TextField,
  InputAdornment,
  SvgIcon
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { SecurityRole } from '../../../types/client.types';
import { clientService } from '../../../services/clients.service';
import { shouldUseMockData } from '../../../config/api.config';
import { encodeId, decodeId } from '../../../utils/idEncoder';

interface RolesListProps {
  clientId: string;
}

interface RolesListState {
  roles: SecurityRole[];
  loading: boolean;
  error: string | null;
  deleteDialogOpen: boolean;
  roleToDelete: SecurityRole | null;
  sortBy: keyof SecurityRole;
  sortDirection: 'asc' | 'desc';
  filterText: string;
}

const RolesList: React.FC<RolesListProps> = ({ clientId }) => {
  const navigate = useNavigate();
  const [state, setState] = useState<RolesListState>({
    roles: [],
    loading: true,
    error: null,
    deleteDialogOpen: false,
    roleToDelete: null,
    sortBy: 'name',
    sortDirection: 'asc',
    filterText: ''
  });

  useEffect(() => {
    loadRoles();
  }, [clientId]);

  const loadRoles = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const decodedClientId = decodeId(clientId);
      const response = await clientService.getRoles(decodedClientId);

      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to load roles');
      }

      setState(prev => ({
        ...prev,
        roles: response.data,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to load roles',
        loading: false
      }));
      console.error('Error loading roles:', error);
    }
  };

  const handleDeleteClick = (role: SecurityRole) => {
    setState(prev => ({
      ...prev,
      deleteDialogOpen: true,
      roleToDelete: role
    }));
  };

  const handleDeleteConfirm = async () => {
    if (!state.roleToDelete) return;

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const decodedClientId = decodeId(clientId);
      const decodedRoleId = decodeId(state.roleToDelete.id);
      
      const response = await clientService.deleteRole(decodedClientId, decodedRoleId);
      
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to delete role');
      }

      setState(prev => ({
        ...prev,
        roles: prev.roles.filter(r => r.id !== state.roleToDelete?.id),
        deleteDialogOpen: false,
        roleToDelete: null,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to delete role',
        loading: false
      }));
      console.error('Error deleting role:', error);
    }
  };

  const handleDeleteCancel = () => {
    setState(prev => ({
      ...prev,
      deleteDialogOpen: false,
      roleToDelete: null
    }));
  };

  const handleSort = (field: keyof SecurityRole) => {
    setState(prev => ({
      ...prev,
      sortBy: field,
      sortDirection: prev.sortBy === field && prev.sortDirection === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (value: string) => {
    setState(prev => ({
      ...prev,
      filterText: value
    }));
  };

  const filteredAndSortedRoles = state.roles
    .filter(role => 
      role.name.toLowerCase().includes(state.filterText.toLowerCase()) ||
      role.description.toLowerCase().includes(state.filterText.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[state.sortBy];
      const bValue = b[state.sortBy];
      const direction = state.sortDirection === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction * aValue.localeCompare(bValue);
      }
      return 0;
    });

  if (state.loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="h6">Roles</Typography>
        <TextField
          label="Search"
          value={state.filterText}
          onChange={e => handleFilterChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon component={SearchIcon} />
              </InputAdornment>
            )
          }}
        />
      </Box>

      {state.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {state.error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort('name')}>Name</TableCell>
              <TableCell onClick={() => handleSort('description')}>Description</TableCell>
              <TableCell>System Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedRoles.map(role => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  {role.isSystem ? (
                    <Chip label="Yes" color="primary" size="small" />
                  ) : (
                    <Chip label="No" variant="outlined" size="small" />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => navigate(`/clients/${encodeId(clientId)}/roles/${encodeId(role.id)}`)}
                    size="small"
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  {!role.isSystem && (
                    <IconButton
                      onClick={() => handleDeleteClick(role)}
                      size="small"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={state.deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the role "{state.roleToDelete?.name}"?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RolesList;

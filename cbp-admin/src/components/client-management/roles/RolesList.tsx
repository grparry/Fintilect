import React, { useState, useEffect, useMemo } from 'react';
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
import { SecurityRole, Permission } from '@/../../types/client.types';
import { ClientService } from '@/../../services/implementations/real/ClientService';
import { PermissionService } from '@/../../services/implementations/real/PermissionService';
import { ServiceFactory } from '@/../../services/factory/ServiceFactory';
import { encodeId, decodeId } from '@/../../utils/idEncoder';
import { shouldUseMockData } from '@/../../config/api.config';

// Get service instances
const clientService = ServiceFactory.getInstance().getClientService();
const permissionService = ServiceFactory.getInstance().getPermissionService();

interface RolesListProps {
  clientId: string;
}

interface RolesListState {
  roles: SecurityRole[];
  loading: boolean;
  error: string | null;
  deleteDialogOpen: boolean;
  roleToDelete: SecurityRole | null;
  sortBy: 'name' | 'description' | 'permissions';
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
    fetchRoles();
  }, [clientId]);

  const fetchRoles = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const roles = await clientService.getClientRoles(clientId);
      setState(prev => ({ ...prev, roles, loading: false }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to load roles'
      }));
    }
  };

  const handleDeleteRole = async () => {
    if (!state.roleToDelete) return;

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await permissionService.deletePermissionGroup(Number(state.roleToDelete.id));
      setState(prev => ({
        ...prev,
        loading: false,
        deleteDialogOpen: false,
        roleToDelete: null,
        roles: prev.roles.filter(role => role.id !== state.roleToDelete?.id)
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to delete role'
      }));
    }
  };

  const handleSort = (field: RolesListState['sortBy']) => {
    setState(prev => ({
      ...prev,
      sortBy: field,
      sortDirection: prev.sortBy === field && prev.sortDirection === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, filterText: event.target.value }));
  };

  const filteredAndSortedRoles = useMemo(() => {
    let result = [...state.roles];

    // Filter
    if (state.filterText) {
      const searchText = state.filterText.toLowerCase();
      result = result.filter(role =>
        role.name.toLowerCase().includes(searchText) ||
        role.description?.toLowerCase().includes(searchText)
      );
    }

    // Sort
    result.sort((a, b) => {
      let compareResult = 0;
      switch (state.sortBy) {
        case 'name':
          compareResult = a.name.localeCompare(b.name);
          break;
        case 'description':
          compareResult = (a.description || '').localeCompare(b.description || '');
          break;
        case 'permissions':
          compareResult = (a.permissions?.length || 0) - (b.permissions?.length || 0);
          break;
      }
      return state.sortDirection === 'asc' ? compareResult : -compareResult;
    });

    return result;
  }, [state.roles, state.filterText, state.sortBy, state.sortDirection]);

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
          onChange={handleFilter}
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
                      onClick={() => setState(prev => ({ ...prev, deleteDialogOpen: true, roleToDelete: role }))}
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
        onClose={() => setState(prev => ({ ...prev, deleteDialogOpen: false, roleToDelete: null }))}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the role "{state.roleToDelete?.name}"?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setState(prev => ({ ...prev, deleteDialogOpen: false, roleToDelete: null }))}>Cancel</Button>
          <Button onClick={handleDeleteRole} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RolesList;

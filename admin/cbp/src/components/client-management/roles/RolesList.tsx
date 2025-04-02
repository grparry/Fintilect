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
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Role } from '../../../types/client.types';
import { permissionService } from '../../../services/factory/ServiceFactory';
import logger from '../../../utils/logger';

interface RolesListProps {
  clientId: string;
}

interface RolesListState {
  roles: Role[];
  loading: boolean;
  error: string | null;
  deleteDialogOpen: boolean;
  roleToDelete: Role | null;
  sortBy: 'name';
  sortDirection: 'ASC' | 'DESC';
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
    sortDirection: 'ASC',
    filterText: ''
  });

  const loadRoles = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await permissionService.getRoles();
      setState(prev => ({
        ...prev,
        roles: response.roles,
        loading: false
      }));
      logger.info('Roles loaded successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load roles';
      logger.error(`Error loading roles: ${message}`);
      setState(prev => ({
        ...prev,
        loading: false,
        error: message
      }));
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const handleDeleteClick = (role: Role) => {
    setState(prev => ({
      ...prev,
      deleteDialogOpen: true,
      roleToDelete: role
    }));
  };

  const handleDeleteConfirm = async () => {
    const { roleToDelete } = state;
    if (!roleToDelete) return;

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await permissionService.deleteRole(roleToDelete.id);
      logger.info('Role deleted successfully');
      await loadRoles();
      setState(prev => ({
        ...prev,
        deleteDialogOpen: false,
        roleToDelete: null
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete role';
      logger.error(`Error deleting role: ${message}`);
      setState(prev => ({
        ...prev,
        loading: false,
        error: message
      }));
    }
  };

  const handleDeleteCancel = () => {
    setState(prev => ({
      ...prev,
      deleteDialogOpen: false,
      roleToDelete: null
    }));
  };

  const handleSort = (field: 'name') => {
    setState(prev => ({
      ...prev,
      sortBy: field,
      sortDirection:
        prev.sortBy === field && prev.sortDirection === 'ASC' ? 'DESC' : 'ASC'
    }));
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({
      ...prev,
      filterText: event.target.value
    }));
  };

  const { roles, loading, error, deleteDialogOpen, sortBy, sortDirection, filterText } = state;

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const sortedRoles = [...filteredRoles].sort((a, b) => {
    const direction = sortDirection === 'ASC' ? 1 : -1;
    return a.name.localeCompare(b.name) * direction;
  });

  if (loading && roles.length === 0) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          placeholder="Search roles..."
          value={filterText}
          onChange={handleFilterChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/admin/client-management/edit/${clientId}/roles/new`)}
        >
          Add Role
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                onClick={() => handleSort('name')}
                style={{ cursor: 'pointer' }}
              >
                Name {sortBy === 'name' && (sortDirection === 'ASC' ? '↑' : '↓')}
              </TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRoles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => navigate(`/admin/client-management/edit/${clientId}/roles/${role.id}`)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(role)}
                    size="small"
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Role</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the role "{state.roleToDelete?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RolesList;
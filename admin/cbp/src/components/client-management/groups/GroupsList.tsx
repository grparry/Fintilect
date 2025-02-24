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
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Group } from '../../../types/client.types';
import { permissionService } from '../../../services/factory/ServiceFactory';
import logger from '../../../utils/logger';

interface GroupsListProps {
  clientId: string;
}

interface GroupsListState {
  groups: Group[];
  loading: boolean;
  error: string | null;
  deleteDialogOpen: boolean;
  groupToDelete: Group | null;
  sortBy: 'name';
  sortDirection: 'asc' | 'desc';
  filterText: string;
}

const GroupsList: React.FC<GroupsListProps> = ({ clientId }) => {
  const navigate = useNavigate();
  const [state, setState] = useState<GroupsListState>({
    groups: [],
    loading: true,
    error: null,
    deleteDialogOpen: false,
    groupToDelete: null,
    sortBy: 'name',
    sortDirection: 'asc',
    filterText: ''
  });

  const loadGroups = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await permissionService.getGroups({
        clientId: Number(clientId),
        searchTerm: state.filterText
      });
      setState(prev => ({
        ...prev,
        groups: response.items,
        loading: false
      }));
      logger.info('Groups loaded successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load groups';
      logger.error(`Error loading groups: ${message}`);
      setState(prev => ({
        ...prev,
        loading: false,
        error: message
      }));
    }
  };

  useEffect(() => {
    loadGroups();
  }, [clientId]);

  const handleDeleteClick = (group: Group) => {
    setState(prev => ({
      ...prev,
      deleteDialogOpen: true,
      groupToDelete: group
    }));
  };

  const handleDeleteConfirm = async () => {
    const { groupToDelete } = state;
    if (!groupToDelete) return;

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await permissionService.deleteGroup(groupToDelete.id);
      logger.info('Group deleted successfully');
      await loadGroups();
      setState(prev => ({
        ...prev,
        deleteDialogOpen: false,
        groupToDelete: null
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete group';
      logger.error(`Error deleting group: ${message}`);
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
      groupToDelete: null
    }));
  };

  const handleSort = (field: 'name') => {
    setState(prev => ({
      ...prev,
      sortBy: field,
      sortDirection:
        prev.sortBy === field && prev.sortDirection === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({
      ...prev,
      filterText: event.target.value
    }));
  };

  const { groups, loading, error, deleteDialogOpen, sortBy, sortDirection, filterText } = state;

  const sortedGroups = [...groups].sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1;
    return a.name.localeCompare(b.name) * direction;
  });

  if (loading && groups.length === 0) {
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
          placeholder="Search groups..."
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
          onClick={() => navigate(`/admin/client-management/edit/${clientId}/groups/new`)}
        >
          Add Group
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
                Name {sortBy === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedGroups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.name}</TableCell>
                <TableCell>{new Date(group.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(group.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => navigate(`/admin/client-management/edit/${clientId}/groups/${group.id}`)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(group)}
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
        <DialogTitle>Delete Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the group "{state.groupToDelete?.name}"? This action cannot be undone.
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

export default GroupsList;
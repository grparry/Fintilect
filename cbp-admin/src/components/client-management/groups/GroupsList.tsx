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
import { UserGroup } from '../../../types/client.types';
import { clientService } from '../../../services/clients.service';
import { shouldUseMockData } from '../../../config/api.config';

interface GroupsListProps {
  clientId: string;
}

interface GroupsListState {
  groups: UserGroup[];
  loading: boolean;
  error: string | null;
  deleteDialogOpen: boolean;
  groupToDelete: UserGroup | null;
  sortBy: keyof UserGroup;
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

  useEffect(() => {
    fetchGroups();
  }, [clientId]);

  const fetchGroups = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const decodedClientId = decodeId(clientId);
      const response = await clientService.getGroups(decodedClientId);

      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to load groups');
      }

      setState(prev => ({
        ...prev,
        groups: response.data,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to load groups',
        loading: false
      }));
      console.error('Error loading groups:', error);
    }
  };

  const handleDeleteClick = (group: UserGroup) => {
    setState(prev => ({
      ...prev,
      deleteDialogOpen: true,
      groupToDelete: group
    }));
  };

  const handleDeleteConfirm = async () => {
    if (!state.groupToDelete) return;

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const decodedClientId = decodeId(clientId);
      const decodedGroupId = decodeId(state.groupToDelete.id);
      
      const response = await clientService.deleteGroup(decodedClientId, decodedGroupId);
      
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to delete group');
      }

      setState(prev => ({
        ...prev,
        groups: prev.groups.filter(g => g.id !== state.groupToDelete?.id),
        deleteDialogOpen: false,
        groupToDelete: null,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to delete group',
        loading: false
      }));
      console.error('Error deleting group:', error);
    }
  };

  const handleDeleteCancel = () => {
    setState(prev => ({
      ...prev,
      deleteDialogOpen: false,
      groupToDelete: null
    }));
  };

  const handleSort = (field: keyof UserGroup) => {
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

  const filteredAndSortedGroups = state.groups
    .filter(group => 
      group.name.toLowerCase().includes(state.filterText.toLowerCase()) ||
      group.description.toLowerCase().includes(state.filterText.toLowerCase())
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
        <Typography variant="h6">Groups</Typography>
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
              <TableCell>Members</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedGroups.map(group => (
              <TableRow key={group.id}>
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.description}</TableCell>
                <TableCell>
                  <Chip 
                    label={`${group.members?.length || 0} members`}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => navigate(`/clients/${clientId}/groups/${group.id}`)}
                    size="small"
                    color="primary"
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

      <Dialog
        open={state.deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the group "{state.groupToDelete?.name}"?
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

export default GroupsList;

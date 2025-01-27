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
import { UserGroup as Group } from '../../../types/client.types';
import { clientService } from '../../../services/factory/ServiceFactory';
import { shouldUseMockData } from '../../../config/api.config';
import { decodeId } from '../../../utils/idEncoder';
import { PermissionAction } from '../../../types/permission.types';

interface GroupsListProps {
  clientId: string;
}
interface GroupsListState {
  groups: Group[];
  loading: boolean;
  error: string | null;
  deleteDialogOpen: boolean;
  groupToDelete: Group | null;
  sortBy: 'name' | 'description' | 'members';
  sortDirection: 'asc' | 'desc';
  filterText: string;
}
const serviceGroupToUIGroup = (group: any, clientId: string): Group => ({
  id: group.id,
  name: group.name,
  description: group.description || '',
  clientId,
  roles: [],
  permissions: group.permissions.map((permission: any) => ({
    id: permission.id,
    name: permission.name,
    description: permission.description,
    category: 'user',
    actions: [] as PermissionAction[]
  })),
  members: group.members || [],
  createdAt: group.createdAt,
  updatedAt: group.updatedAt
});
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
      const groups = await clientService.getGroups(decodedClientId);
      setState(prev => ({
        ...prev,
        groups: groups.map(group => serviceGroupToUIGroup(group, clientId)),
        loading: false
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err.message || 'Failed to load groups'
      }));
    }
  };
  const handleDeleteClick = (group: Group) => {
    setState(prev => ({
      ...prev,
      deleteDialogOpen: true,
      groupToDelete: group
    }));
  };
  const handleDeleteConfirm = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const decodedClientId = decodeId(clientId);
      const decodedGroupId = decodeId(state.groupToDelete!.id);
      await clientService.deleteGroup(decodedClientId, decodedGroupId);
      setState(prev => ({
        ...prev,
        loading: false,
        deleteDialogOpen: false,
        groupToDelete: null
      }));
      fetchGroups(); // Refresh the list after deletion
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err.message || 'Failed to delete group'
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
  const handleSort = (field: 'name' | 'description' | 'members') => {
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
      (group.description || '').toLowerCase().includes(state.filterText.toLowerCase())
    )
    .sort((a, b) => {
      const direction = state.sortDirection === 'asc' ? 1 : -1;
      if (state.sortBy === 'members') {
        return direction * ((a.members?.length || 0) - (b.members?.length || 0));
      }
      const aValue = a[state.sortBy] || '';
      const bValue = b[state.sortBy] || '';
      return direction * aValue.localeCompare(bValue);
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
              <TableCell onClick={() => handleSort('members')}>Members</TableCell>
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
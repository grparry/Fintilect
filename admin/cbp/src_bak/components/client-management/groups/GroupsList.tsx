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








        ...prev,
        ...prev,

      ...prev,

        ...prev,
        ...prev,

      ...prev,

      ...prev,

      ...prev,

    .filter(group => 
      (group.description || '').toLowerCase().includes(state.filterText.toLowerCase())
    )
    .sort((a, b) => {
      
      

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );

    <Box>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="h6">Groups</Typography>
        <TextField
              <InputAdornment position="start">
                <SvgIcon component={SearchIcon} />
              </InputAdornment>
            )
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
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
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
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );


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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import { 
  DataGrid, 
  GridColDef, 
  GridRenderCellParams,
  GridValueFormatter 
} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import {
  User,
  Group,
  UserGroup,
  Role,
  GroupRole,
  Permission
} from '../../types/client.types';
import { PaginatedResponse } from '../../types/common.types';
import { clientService, userService, permissionService } from '../../services/factory/ServiceFactory';
import { useNavigate } from 'react-router-dom';
import { encodeId } from '../../utils/idEncoder';
import dayjs from 'dayjs';

interface GroupsProps {
  clientId: string;
}

interface GroupFormData extends Omit<Group, 'id' | 'createdAt' | 'updatedAt'> {
  name: string;
  description?: string;
  customerId: number;
}

interface State {
  loading: boolean;
  saving: boolean;
  error: string | null;
  success: string | null;
  groups: Group[];
  users: User[];
  selectedGroup: Group | null;
  isFormOpen: boolean;
  page: number;
  limit: number;
  total: number;
}

const initialState: State = {
  loading: false,
  saving: false,
  error: null,
  success: null,
  groups: [],
  users: [],
  selectedGroup: null,
  isFormOpen: false,
  page: 1,
  limit: 10,
  total: 0
};

export default function Groups({ clientId }: GroupsProps) {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);

  const loadGroups = useCallback(async () => {
    if (!clientId) return;
    try {
      setState(prev => ({ ...prev, loading: true }));
      const response = await permissionService.getGroups({
        customerId: Number(clientId),
        page: state.page,
        limit: state.limit
      });
      setState(prev => ({
        ...prev,
        loading: false,
        groups: response.items,
        total: response.total
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load groups';
      setState(prev => ({
        ...prev,
        loading: false,
        error: message
      }));
    }
  }, [clientId, state.page, state.limit]);

  const loadUsers = useCallback(async () => {
    if (!clientId) return;
    try {
      const response = await userService.getUsers({
        customerId: Number(clientId),
        page: 1,
        limit: 100
      });
      setState(prev => ({ ...prev, users: response.items }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load users';
      setState(prev => ({ ...prev, error: message }));
    }
  }, [clientId]);

  const handleCreateGroup = async (formData: Partial<GroupFormData>) => {
    if (!clientId) return;
    try {
      setState(prev => ({ ...prev, saving: true, error: null }));
      const newGroup = {
        name: formData.name || 'New Group',
        customerId: Number(clientId),
      };
      await permissionService.createGroup(newGroup);
      setState(prev => ({
        ...prev,
        saving: false,
        isFormOpen: false,
        success: 'Group created successfully'
      }));
      loadGroups();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create group';
      setState(prev => ({
        ...prev,
        saving: false,
        error: message
      }));
    }
  };

  const handleUpdateGroup = async (groupId: number, formData: Partial<GroupFormData>) => {
    try {
      setState(prev => ({ ...prev, saving: true, error: null }));
      await permissionService.updateGroup(groupId, formData);
      setState(prev => ({
        ...prev,
        saving: false,
        isFormOpen: false,
        success: 'Group updated successfully'
      }));
      loadGroups();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update group';
      setState(prev => ({
        ...prev,
        saving: false,
        error: message
      }));
    }
  };

  const handleDeleteGroup = async (groupId: number) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await permissionService.deleteGroup(groupId);
      setState(prev => ({
        ...prev,
        loading: false,
        success: 'Group deleted successfully'
      }));
      loadGroups();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete group';
      setState(prev => ({
        ...prev,
        loading: false,
        error: message
      }));
    }
  };

  useEffect(() => {
    loadGroups();
    loadUsers();
  }, [loadGroups, loadUsers]);

  const handleAddGroup = useCallback(() => {
    setState(prev => ({ ...prev, isFormOpen: true, selectedGroup: null }));
  }, []);

  const handleEditGroup = useCallback((group: Group) => {
    setState(prev => ({ ...prev, isFormOpen: true, selectedGroup: group }));
  }, []);

  const handleOpenMembers = (group: Group) => {
    // TODO: Implement handleOpenMembers
  };

  const columns: GridColDef<Group>[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 200,
      valueFormatter: (params: { value: string }) => {
        return dayjs(params.value).format('MMM D, YYYY h:mm A');
      }
    },
    {
      field: 'updatedAt',
      headerName: 'Last Updated',
      width: 200,
      valueFormatter: (params: { value: string | undefined }) => {
        return params.value ? dayjs(params.value).format('MMM D, YYYY h:mm A') : '-';
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params: GridRenderCellParams<Group>) => (
        <Box>
          <IconButton
            onClick={() => handleEditGroup(params.row)}
            size="small"
            title="Edit Group"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleOpenMembers(params.row)}
            size="small"
            title="View Members"
          >
            <PeopleIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteGroup(params.row.id)}
            size="small"
            title="Delete Group"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (state.loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" color="text.primary">Groups</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddGroup}
        >
          Add Group
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
      <DataGrid
        rows={state.groups}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        autoHeight
      />
      {/* Group Form Dialog */}
      <Dialog
        open={state.isFormOpen}
        onClose={() => setState(prev => ({ ...prev, isFormOpen: false, selectedGroup: null }))}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {state.selectedGroup ? 'Edit Group' : 'Create Group'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              required
              defaultValue={state.selectedGroup?.name || ''}
              margin="normal"
              onChange={(e) => {
                const formData = {
                  name: e.target.value,
                  customerId: Number(clientId)
                };
                if (state.selectedGroup) {
                  handleUpdateGroup(state.selectedGroup.id, formData);
                } else {
                  handleCreateGroup(formData);
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setState(prev => ({ ...prev, isFormOpen: false, selectedGroup: null }))}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={state.saving}
          >
            {state.saving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={false}
        onClose={() => setState(prev => ({ ...prev, selectedGroup: undefined }))}
      >
        <DialogTitle>Delete Group</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this group? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setState(prev => ({ ...prev, selectedGroup: undefined }))}>
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteGroup(state.selectedGroup!.id)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Members Dialog */}
      <Dialog
        open={false}
        onClose={() => setState(prev => ({ ...prev, selectedGroup: undefined }))}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Manage Members</DialogTitle>
        <DialogContent>
          {/* TODO: Implement members dialog */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setState(prev => ({ ...prev, selectedGroup: undefined }))}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={state.saving}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
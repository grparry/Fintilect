import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  FormControlLabel,
  Checkbox,
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
  Paper,
  List,
  ListItem,
  ListItemText,
  Collapse
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
import SecurityIcon from '@mui/icons-material/Security';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
  clientId: number;
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
  const [membersDialogOpen, setMembersDialogOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [rolesDialogOpen, setRolesDialogOpen] = useState(false);
  const [roleSearchTerm, setRoleSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const loadGroups = useCallback(async () => {
    if (!clientId) return;
    try {
      setState(prev => ({ ...prev, loading: true }));
      const response = await permissionService.getGroups({
        clientId: Number(clientId),
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
        clientId: Number(clientId),
        page: 1,
        limit: 100
      });
      setState(prev => ({ ...prev, users: response.items }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load users';
      setState(prev => ({ ...prev, error: message }));
    }
  }, [clientId]);

  const loadRoles = useCallback(async () => {
    try {
      const roles = await permissionService.getRoles();
      setRoles(roles);
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to load roles'
      }));
    }
  }, []);

  const handleCreateGroup = async (formData: Partial<GroupFormData>) => {
    if (!clientId) return;
    try {
      setState(prev => ({ ...prev, saving: true, error: null }));
      const newGroup = {
        name: formData.name || 'New Group',
        clientId: Number(clientId),
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

  const handleOpenMembers = async (group: Group) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Get current group members
      const members = await permissionService.getGroupUsers(group.id);
      setSelectedUsers(members.map(m => m.userId));
      
      setState(prev => ({ 
        ...prev, 
        selectedGroup: group,
        loading: false 
      }));
      
      setMembersDialogOpen(true);
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to load group members',
        loading: false 
      }));
    }
  };

  const handleCloseMembersDialog = () => {
    setMembersDialogOpen(false);
    setSelectedUsers([]);
    setState(prev => ({ ...prev, selectedGroup: null }));
  };

  const handleUpdateMembers = async () => {
    if (!state.selectedGroup) return;
    
    try {
      setState(prev => ({ ...prev, saving: true, error: null }));
      
      await permissionService.assignUserGroups(state.selectedGroup.id, selectedUsers);
      
      setState(prev => ({ 
        ...prev, 
        saving: false,
        success: 'Group members updated successfully' 
      }));
      
      handleCloseMembersDialog();
      loadGroups();
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to update group members',
        saving: false 
      }));
    }
  };

  const handleUserToggle = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleOpenRoles = async (group: Group) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Get current group roles
      const groupRoles = await permissionService.getGroupRoles(group.id);
      setSelectedRoles(groupRoles.map(r => r.roleId));
      
      setState(prev => ({ 
        ...prev, 
        selectedGroup: group,
        loading: false 
      }));
      
      setRolesDialogOpen(true);
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to load group roles',
        loading: false 
      }));
    }
  };

  const handleCloseRolesDialog = () => {
    setRolesDialogOpen(false);
    setSelectedRoles([]);
    setState(prev => ({ ...prev, selectedGroup: null }));
  };

  const handleUpdateRoles = async () => {
    if (!state.selectedGroup) return;
    
    try {
      setState(prev => ({ ...prev, saving: true, error: null }));
      
      // Remove all existing roles and add selected ones
      await permissionService.removeGroupRoles(state.selectedGroup.id, roles.map(r => r.id));
      if (selectedRoles.length > 0) {
        await permissionService.addGroupRoles(state.selectedGroup.id, selectedRoles);
      }
      
      setState(prev => ({ 
        ...prev, 
        saving: false,
        success: 'Group roles updated successfully' 
      }));
      
      handleCloseRolesDialog();
      loadGroups();
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to update group roles',
        saving: false 
      }));
    }
  };

  const handleRoleToggle = (roleId: number) => {
    setSelectedRoles(prev => 
      prev.includes(roleId) 
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  const handleCategoryToggle = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  useEffect(() => {
    loadGroups();
    loadUsers();
    loadRoles();
  }, [loadGroups, loadUsers, loadRoles]);

  const handleAddGroup = useCallback(() => {
    setState(prev => ({ ...prev, isFormOpen: true, selectedGroup: null }));
  }, []);

  const handleEditGroup = useCallback((group: Group) => {
    setState(prev => ({ ...prev, isFormOpen: true, selectedGroup: group }));
  }, []);

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
            onClick={() => handleOpenRoles(params.row)}
            size="small"
            title="Edit Roles"
          >
            <SecurityIcon />
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

  const filteredRoles = useMemo(() => {
    if (!roleSearchTerm) return roles;
    const searchLower = roleSearchTerm.toLowerCase();
    return roles.filter(role => 
      role.name.toLowerCase().includes(searchLower)
    );
  }, [roles, roleSearchTerm]);

  const groupedRoles = useMemo(() => {
    const groups = new Map<string, Role[]>();
    
    filteredRoles.forEach(role => {
      // Handle special cases first
      if (role.name === 'Administrator' || role.name === 'Admin') {
        const list = groups.get('Admin') || [];
        list.push(role);
        groups.set('Admin', list);
        return;
      }

      // For other roles, try to find a meaningful category
      let category: string;
      if (role.name.includes('BillPay')) {
        category = 'BillPay';
      } else if (role.name.includes('Connect')) {
        category = 'Connect';
      } else if (role.name.includes('Security')) {
        category = 'Security';
      } else if (role.name.includes('User')) {
        category = 'User';
      } else if (role.name.includes('IdP')) {
        category = 'Identity';
      } else {
        // If no specific category found, use the first word or the whole name
        category = role.name.split(/[_\s]/)[0];
      }
      
      const list = groups.get(category) || [];
      list.push(role);
      groups.set(category, list);
    });
    
    // Sort roles within each category
    groups.forEach((roles, category) => {
      groups.set(category, roles.sort((a, b) => a.name.localeCompare(b.name)));
    });
    
    return Array.from(groups.entries()).sort((a, b) => {
      // Put Admin category first
      if (a[0] === 'Admin') return -1;
      if (b[0] === 'Admin') return 1;
      // Then sort other categories alphabetically
      return a[0].localeCompare(b[0]);
    });
  }, [filteredRoles]);

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
                  clientId: Number(clientId)
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
      {/* Group Members Dialog */}
      <Dialog 
        open={membersDialogOpen} 
        onClose={handleCloseMembersDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Edit Group Members - {state.selectedGroup?.name}
        </DialogTitle>
        <DialogContent>
          {state.users.length > 0 ? (
            <Box sx={{ mt: 2 }}>
              {state.users.map(user => (
                <FormControlLabel
                  key={user.id}
                  control={
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleUserToggle(user.id)}
                    />
                  }
                  label={`${user.firstName} ${user.lastName} (${user.email})`}
                />
              ))}
            </Box>
          ) : (
            <Typography>No users available</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMembersDialog}>Cancel</Button>
          <Button 
            onClick={handleUpdateMembers}
            variant="contained" 
            color="primary"
            disabled={state.saving}
          >
            {state.saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Roles Dialog */}
      <Dialog 
        open={rolesDialogOpen} 
        onClose={handleCloseRolesDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Edit Group Roles - {state.selectedGroup?.name}
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Select the roles to assign to this group. Users in this group will inherit all permissions from the selected roles.
          </Typography>
          <TextField
            fullWidth
            label="Search roles..."
            variant="outlined"
            value={roleSearchTerm}
            onChange={(e) => setRoleSearchTerm(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Box sx={{ maxHeight: '60vh', overflow: 'auto' }}>
            <List>
              {groupedRoles.map(([category, categoryRoles]) => (
                <Box key={category}>
                  <ListItem 
                    button 
                    onClick={() => handleCategoryToggle(category)}
                    sx={{
                      bgcolor: 'background.paper',
                      borderBottom: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <ListItemText 
                      primary={
                        <Typography variant="subtitle1" color="primary">
                          {category}
                        </Typography>
                      } 
                    />
                    {expandedCategories.has(category) ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                  </ListItem>
                  <Collapse in={expandedCategories.has(category)} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {categoryRoles.map(role => (
                        <ListItem 
                          key={role.id} 
                          sx={{ 
                            pl: 4,
                            '&:hover': {
                              bgcolor: 'action.hover'
                            }
                          }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedRoles.includes(role.id)}
                                onChange={() => handleRoleToggle(role.id)}
                              />
                            }
                            label={role.name}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              ))}
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRolesDialog}>Cancel</Button>
          <Button 
            onClick={handleUpdateRoles}
            variant="contained" 
            color="primary"
            disabled={state.saving}
          >
            {state.saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
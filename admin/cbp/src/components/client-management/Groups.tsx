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
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import {
  User,
  UserGroup,
  SecurityRole,
  Permission
} from '../../types/client.types';
import { PaginatedResponse } from '../../types/common.types';
import { clientService, userService } from '../../services/factory/ServiceFactory';
import { useNavigate } from 'react-router-dom';
import { encodeId } from '../../utils/idEncoder';

interface GroupsProps {
  clientId: string;
}
interface GroupFormData {
  name: string;
  description: string;
  permissionIds: string[];
  roleIds: string[];
  members?: string[];
}
interface ServiceGroup {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  roles: string[];
  members: string[];
}
export default function Groups({ clientId }: GroupsProps) {
  const navigate = useNavigate();
  // Data state
  const [groups, setGroups] = useState<UserGroup[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [roles, setRoles] = useState<SecurityRole[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [formData, setFormData] = useState<GroupFormData>({
    name: '',
    description: '',
    permissionIds: [],
    roleIds: [],
  });
  // UI state
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  // Dialog state
  const [openGroupForm, setOpenGroupForm] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<UserGroup | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<UserGroup | null>(null);
  const [openMembersDialog, setOpenMembersDialog] = useState(false);
  // Load initial data
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading groups data for client:', clientId);
      // Load groups first
      let groupsData: UserGroup[];
      try {
        groupsData = await clientService.getClientUserGroups(clientId);
        console.log('Loaded groups:', groupsData);
      } catch (err) {
        console.error('Error loading groups:', err);
        throw new Error('Failed to load groups');
      }
      // Load users
      let usersData: PaginatedResponse<User>;
      try {
        usersData = await userService.getUsers({ pagination: { page: 1, limit: 100 } });
        const users = usersData.items;
        const totalUsers = usersData.total;
        console.log('Loaded users:', { users, totalUsers });
      } catch (err) {
        console.error('Error loading users:', err);
        throw new Error('Failed to load users');
      }
      // Load permissions
      let permissionsData: Permission[];
      try {
        permissionsData = await clientService.getClientPermissions(clientId);
        console.log('Loaded permissions:', permissionsData);
      } catch (err) {
        console.error('Error loading permissions:', err);
        throw new Error('Failed to load permissions');
      }
      // Load roles
      let rolesData: SecurityRole[];
      try {
        rolesData = await clientService.getClientRoles(clientId);
        console.log('Loaded roles:', rolesData);
      } catch (err) {
        console.error('Error loading roles:', err);
        throw new Error('Failed to load roles');
      }
      setGroups(groupsData);
      setUsers(usersData.items);
      setPermissions(permissionsData);
      setRoles(rolesData);
      console.log('Successfully loaded all data');
    } catch (error) {
      console.error('Error in loadData:', error);
      setError(error instanceof Error ? error.message : 'Failed to load groups data');
    } finally {
      setLoading(false);
    }
  }, [clientId]);
  useEffect(() => {
    loadData();
  }, [loadData]);
  const handleAddGroup = useCallback(() => {
    setSelectedGroup(null);
    setFormData({
      name: '',
      description: '',
      permissionIds: [],
      roleIds: [],
    });
    setOpenGroupForm(true);
  }, []); // No dependencies needed
  const handleEditGroup = useCallback((group: UserGroup) => {
    const encodedClientId = encodeId(clientId);
    const encodedGroupId = encodeId(group.id);
    setSelectedGroup(group);
    setFormData({
      name: group.name,
      description: group.description || '',
      permissionIds: group.permissions.map(p => p.id),
      roleIds: group.roles.map(r => r.id),
    });
    setOpenGroupForm(true);
  }, [clientId]); // Depends on clientId for encoding
  const handleDeleteGroup = async (groupId: string) => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement proper group deletion endpoint
      // For now, we'll use a mock implementation
      await new Promise(resolve => setTimeout(resolve, 500));
      await loadData();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete group');
    } finally {
      setLoading(false);
    }
  };
  const handleConfirmDelete = async () => {
    if (!groupToDelete) return;
    try {
      setError(null);
      await handleDeleteGroup(groupToDelete.id);
      setSuccess('Group deleted successfully');
      setOpenDeleteDialog(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete group');
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      setSaving(true);
      if (selectedGroup) {
        await handleUpdateGroup(selectedGroup.id, formData);
      } else {
        await handleCreateGroup(formData);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save group');
    } finally {
      setSaving(false);
    }
  };
  const handleCreateGroup = async (data: GroupFormData) => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement proper group creation endpoint
      // For now, we'll use a mock implementation
      await new Promise(resolve => setTimeout(resolve, 500));
      await loadData();
      setOpenGroupForm(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create group');
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateGroup = async (groupId: string, data: GroupFormData) => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement proper group update endpoint
      // For now, we'll use a mock implementation
      await new Promise(resolve => setTimeout(resolve, 500));
      await loadData();
      setOpenGroupForm(false);
      setSelectedGroup(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update group');
    } finally {
      setLoading(false);
    }
  };
  const handleOpenMembers = (group: UserGroup) => {
    setSelectedGroup(group);
    setSelectedMembers(group.members);
    setOpenMembersDialog(true);
  };
  const handleUpdateMembers = async () => {
    try {
      setError(null);
      setSaving(true);
      if (selectedGroup) {
        // TODO: Implement proper member update endpoint
        // For now, we'll use a mock implementation
        await new Promise(resolve => setTimeout(resolve, 500));
        await loadData();
        setSuccess('Group members updated successfully');
        setOpenMembersDialog(false);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update group members');
    } finally {
      setSaving(false);
    }
  };
  if (loading) {
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
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      <Grid container spacing={2}>
        {groups.map((group) => (
          <Grid item xs={12} sm={6} md={4} key={group.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  {group.name}
                </Typography>
                {group.description && (
                  <Typography color="textSecondary" gutterBottom>
                    {group.description}
                  </Typography>
                )}
                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                  Permissions:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {group.permissions.map((permission) => (
                    <Chip
                      key={permission.id}
                      label={permission.name}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                  Roles:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {group.roles.map((role) => (
                    <Chip
                      key={role.id}
                      label={role.name}
                      size="small"
                      color="secondary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <IconButton
                  size="small"
                  onClick={() => handleEditGroup(group)}
                  aria-label="edit group"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteGroup(group.id)}
                  aria-label="delete group"
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleOpenMembers(group)}
                  aria-label="manage members"
                >
                  <PeopleIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Group Form Dialog */}
      <Dialog
        open={openGroupForm}
        onClose={() => setOpenGroupForm(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedGroup ? 'Edit Group' : 'Create Group'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Group Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Permissions</InputLabel>
              <Select
                multiple
                value={formData.permissionIds}
                onChange={(e) => setFormData({ ...formData, permissionIds: e.target.value as string[] })}
                renderValue={(selected: string[]) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={permissions.find(p => p.id === value)?.name}
                        size="small"
                      />
                    ))}
                  </Box>
                )}
              >
                {permissions.map((permission) => (
                  <MenuItem key={permission.id} value={permission.id}>
                    {permission.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Roles</InputLabel>
              <Select
                multiple
                value={formData.roleIds}
                onChange={(e) => setFormData({ ...formData, roleIds: e.target.value as string[] })}
                renderValue={(selected: string[]) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={roles.find(r => r.id === value)?.name}
                        size="small"
                      />
                    ))}
                  </Box>
                )}
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenGroupForm(false)}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Group</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this group? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Members Dialog */}
      <Dialog
        open={openMembersDialog}
        onClose={() => setOpenMembersDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Manage Members</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Members</InputLabel>
            <Select
              multiple
              value={selectedMembers}
              onChange={(e) => setSelectedMembers(e.target.value as string[])}
              renderValue={(selected: string[]) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const user = users.find(u => u.id.toString() === value);
                    return (
                      <Chip
                        key={value}
                        label={user ? `${user.firstName} ${user.lastName}` : value}
                        size="small"
                      />
                    );
                  })}
                </Box>
              )}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id.toString()}>
                  {user.firstName} {user.lastName} ({user.email})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMembersDialog(false)}>Cancel</Button>
          <Button
            onClick={handleUpdateMembers}
            variant="contained"
            color="primary"
            disabled={saving}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
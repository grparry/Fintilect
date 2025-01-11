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
  UserGroup as UIUserGroup,
  Permission as UIPermission,
  PermissionCategoryType,
  PERMISSION_CATEGORIES,
  User as UIUser,
  SecurityRole as UISecurityRole,
  ApiResponse,
  UserStatus,
} from '../../types/client.types';
import { clientService } from '../../services/clients.service';
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

const Groups: React.FC<GroupsProps> = ({ clientId }) => {
  const navigate = useNavigate();

  // State
  const [groups, setGroups] = useState<UIUserGroup[]>([]);
  const [users, setUsers] = useState<UIUser[]>([]);
  const [permissions, setPermissions] = useState<UIPermission[]>([]);
  const [roles, setRoles] = useState<UISecurityRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Dialog state
  const [openGroupForm, setOpenGroupForm] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<UIUserGroup | undefined>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<UIUserGroup | null>(null);
  const [openMembersDialog, setOpenMembersDialog] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState<GroupFormData>({
    name: '',
    description: '',
    permissionIds: [],
    roleIds: [],
  });

  // Load initial data
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [groupsResponse, usersResponse, permissionsResponse, rolesResponse] = await Promise.all([
        clientService.getGroups(clientId) as Promise<ApiResponse<{ items: ServiceGroup[] }>>,
        clientService.getClientUsers(clientId) as Promise<ApiResponse<{ items: UIUser[] }>>,
        clientService.getPermissions() as Promise<ApiResponse<UIPermission[]>>,
        clientService.getRoles() as Promise<ApiResponse<{ items: UISecurityRole[] }>>,
      ]);

      if (groupsResponse.success && usersResponse.success && permissionsResponse.success && rolesResponse.success) {
        // Transform service types to UI types
        const transformedGroups: UIUserGroup[] = groupsResponse.data.items.map((group: ServiceGroup) => ({
          id: group.id,
          clientId: clientId,
          name: group.name,
          description: group.description || '',
          roles: group.roles.map((roleId: string) => ({
            id: roleId,
            name: rolesResponse.data.items.find((r: UISecurityRole) => r.id === roleId)?.name || '',
            description: rolesResponse.data.items.find((r: UISecurityRole) => r.id === roleId)?.description || '',
            permissions: [],
            createdAt: '',
            updatedAt: '',
          })),
          permissions: group.permissions.map((permId: string) => ({
            id: permId,
            name: permissionsResponse.data.find((p: UIPermission) => p.id === permId)?.name || '',
            description: permissionsResponse.data.find((p: UIPermission) => p.id === permId)?.description || '',
            category: (permissionsResponse.data.find((p: UIPermission) => p.id === permId)?.category || 'system') as PermissionCategoryType,
            actions: [],
          })),
          members: group.members || [],
          createdAt: '',
          updatedAt: '',
        }));

        const transformedUsers: UIUser[] = usersResponse.data.items.map((user: UIUser) => ({
          ...user,
          username: user.email,
          department: '',
          locked: user.status === UserStatus.LOCKED,
        }));

        const transformedPermissions: UIPermission[] = permissionsResponse.data.map((perm: UIPermission) => ({
          ...perm,
          category: perm.category as PermissionCategoryType,
          actions: [],
        }));

        const transformedRoles: UISecurityRole[] = rolesResponse.data.items.map((role: UISecurityRole) => ({
          ...role,
          description: role.description || '',
          permissions: role.permissions.map((permId: UIPermission) => ({
            ...permId,
            actions: [],
          })),
        }));

        setGroups(transformedGroups);
        setUsers(transformedUsers);
        setPermissions(transformedPermissions);
        setRoles(transformedRoles);
      } else {
        const errorMessages = [
          groupsResponse.success ? null : groupsResponse.error.message,
          usersResponse.success ? null : usersResponse.error.message,
          permissionsResponse.success ? null : permissionsResponse.error.message,
          rolesResponse.success ? null : rolesResponse.error.message,
        ].filter(Boolean).join(', ');
        setError(`Failed to load data: ${errorMessages}`);
      }
    } catch (err) {
      setError('Failed to load groups');
      console.error('Error loading groups:', err);
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddGroup = useCallback(() => {
    setSelectedGroup(undefined);
    setFormData({
      name: '',
      description: '',
      permissionIds: [],
      roleIds: [],
    });
    setOpenGroupForm(true);
  }, []); // No dependencies needed

  const handleEditGroup = useCallback((group: UIUserGroup) => {
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

  const handleDeleteGroup = (group: UIUserGroup) => {
    setGroupToDelete(group);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!groupToDelete) return;

    try {
      setError(null);
      const response = await clientService.deleteGroup(clientId, groupToDelete.id) as ApiResponse<{}>;
      
      if (response.success) {
        setGroups(groups.filter(g => g.id !== groupToDelete.id));
        setSuccess('Group deleted successfully');
        setOpenDeleteDialog(false);
      } else {
        setError(response.error.message);
      }
    } catch (err) {
      setError('Failed to delete group');
      console.error('Error deleting group:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      setSaving(true);

      const groupData = {
        name: formData.name,
        description: formData.description,
        permissions: formData.permissionIds,
        roles: formData.roleIds,
        members: selectedMembers,
      } as const;

      const response = await (selectedGroup
        ? clientService.updateGroup(clientId, selectedGroup.id, groupData)
        : clientService.createGroup(clientId, groupData)) as ApiResponse<ServiceGroup>;

      if (response.success) {
        setSuccess('Group saved successfully');
        setOpenGroupForm(false);
        loadData(); // Reload data to get updated list
      } else {
        setError(response.error.message);
      }
    } catch (err) {
      setError('Failed to save group');
      console.error('Error saving group:', err);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (selectedGroup) {
      setFormData({
        name: selectedGroup.name,
        description: selectedGroup.description,
        permissionIds: selectedGroup.permissions.map(p => p.id),
        roleIds: selectedGroup.roles.map(r => r.id),
      });
    } else {
      setFormData({
        name: '',
        description: '',
        permissionIds: [],
        roleIds: [],
      });
    }
  }, [selectedGroup]);

  const handlePermissionToggle = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissionIds: prev.permissionIds.includes(permissionId)
        ? prev.permissionIds.filter(id => id !== permissionId)
        : [...prev.permissionIds, permissionId],
    }));
  };

  const handleRoleToggle = (roleId: string) => {
    setFormData(prev => ({
      ...prev,
      roleIds: prev.roleIds.includes(roleId)
        ? prev.roleIds.filter(id => id !== roleId)
        : [...prev.roleIds, roleId],
    }));
  };

  const handleOpenMembers = (group: UIUserGroup) => {
    setSelectedGroup(group);
    setSelectedMembers(group.members);
    setOpenMembersDialog(true);
  };

  const handleUpdateMembers = async () => {
    if (!selectedGroup) return;

    try {
      setError(null);
      setSaving(true);
      const response = await clientService.updateGroup(clientId, selectedGroup.id, { members: selectedMembers }) as ApiResponse<ServiceGroup>;
      
      if (response.success) {
        setGroups(prevGroups =>
          prevGroups.map(g =>
            g.id === selectedGroup.id
              ? { ...g, members: selectedMembers }
              : g
          )
        );
        setSuccess('Group members updated successfully');
        setOpenMembersDialog(false);
      } else {
        setError(response.error.message);
      }
    } catch (err) {
      setError('Failed to update group members');
      console.error('Error updating group members:', err);
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
        <Typography variant="h6">Groups</Typography>
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
                <Typography variant="h6" gutterBottom>
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
                  onClick={() => handleDeleteGroup(group)}
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

export default Groups;

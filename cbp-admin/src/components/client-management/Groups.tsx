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
  UserGroup,
  Permission,
  PermissionCategoryType,
  PERMISSION_CATEGORIES,
  User,
  SecurityRole,
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
}

const Groups: React.FC<GroupsProps> = ({ clientId }) => {
  const navigate = useNavigate();

  // State
  const [groups, setGroups] = useState<UserGroup[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [roles, setRoles] = useState<SecurityRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Dialog state
  const [openGroupForm, setOpenGroupForm] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<UserGroup | undefined>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<UserGroup | null>(null);
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
      const [groupsData, usersData, permissionsData, rolesData] = await Promise.all([
        clientService.getGroups(clientId),
        clientService.getUsers(clientId),
        clientService.getPermissions(),
        clientService.getRoles(),
      ]);
      setGroups(groupsData);
      setUsers(usersData);
      setPermissions(permissionsData);
      setRoles(rolesData);
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

  const handleDeleteGroup = (group: UserGroup) => {
    setGroupToDelete(group);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!groupToDelete) return;

    try {
      setError(null);
      await clientService.deleteGroup(clientId, groupToDelete.id);
      setGroups(groups.filter(g => g.id !== groupToDelete.id));
      setSuccess('Group deleted successfully');
      setOpenDeleteDialog(false);
    } catch (err) {
      setError('Failed to delete group');
      console.error('Error deleting group:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);

      // Convert permission IDs to Permission objects
      const selectedPermissions = permissions.filter(p =>
        formData.permissionIds.includes(p.id)
      );

      // Convert role IDs to Role objects
      const selectedRoles = roles.filter(r =>
        formData.roleIds.includes(r.id)
      );

      const selectedUsers = users.filter(u =>
        selectedMembers.includes(u.id.toString())
      );

      const groupData: Partial<UserGroup> = {
        name: formData.name,
        description: formData.description,
        roles: selectedRoles,
        permissions: selectedPermissions,
        members: selectedMembers
      };

      if (selectedGroup) {
        await clientService.updateGroup(clientId, { ...selectedGroup, ...groupData });
      } else {
        await clientService.createGroup(clientId, groupData);
      }

      setSuccess('Group saved successfully');
      setOpenGroupForm(false);
    } catch (err) {
      setError('Failed to save group');
      console.error('Error saving group:', err);
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

  const handleOpenMembers = (group: UserGroup) => {
    setSelectedGroup(group);
    setSelectedMembers(group.members);
    setOpenMembersDialog(true);
  };

  const handleUpdateMembers = async () => {
    if (!selectedGroup) return;

    try {
      setError(null);
      await clientService.updateGroup(clientId, { ...selectedGroup, members: selectedMembers });
      setGroups(prevGroups =>
        prevGroups.map(g =>
          g.id === selectedGroup.id
            ? { ...g, members: selectedMembers }
            : g
        )
      );
      setSuccess('Group members updated successfully');
      setOpenMembersDialog(false);
    } catch (err) {
      setError('Failed to update group members');
      console.error('Error updating group members:', err);
    }
  };

  if (loading && groups.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Groups</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddGroup}
        >
          Add Group
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      <Grid container spacing={3}>
        {groups.map((group) => (
          <Grid item xs={12} md={6} lg={4} key={group.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {group.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {group.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
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
                </Box>
                <Typography variant="subtitle2">
                  Roles: {group.roles.length}
                </Typography>
                <Typography variant="subtitle2">
                  Members: {group.members.length}
                </Typography>
              </CardContent>
              <CardActions>
                <Tooltip title="Edit Group">
                  <IconButton size="small" onClick={() => handleEditGroup(group)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Manage Members">
                  <IconButton size="small" onClick={() => handleOpenMembers(group)}>
                    <PeopleIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Group">
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteGroup(group)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Group Form Dialog */}
      <Dialog open={openGroupForm} onClose={() => setOpenGroupForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedGroup ? 'Edit Group' : 'Add New Group'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={3}
            />
            <FormControl fullWidth>
              <InputLabel>Permissions</InputLabel>
              <Select
                multiple
                value={formData.permissionIds}
                onChange={(e) => setFormData({ ...formData, permissionIds: e.target.value as string[] })}
                label="Permissions"
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(selected as string[]).map((permissionId) => {
                      const permission = permissions.find(p => p.id === permissionId);
                      return permission ? (
                        <Chip key={permissionId} label={permission.name} />
                      ) : null;
                    })}
                  </Box>
                )}
              >
                {Object.values(PERMISSION_CATEGORIES).map((category) => [
                  <MenuItem key={category} disabled divider>
                    {category}
                  </MenuItem>,
                  ...permissions
                    .filter(p => p.category === category)
                    .map((permission) => (
                      <MenuItem key={permission.id} value={permission.id}>
                        {permission.name}
                      </MenuItem>
                    )),
                ])}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Roles</InputLabel>
              <Select
                multiple
                value={formData.roleIds}
                onChange={(e) => setFormData({ ...formData, roleIds: e.target.value as string[] })}
                label="Roles"
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(selected as string[]).map((roleId) => {
                      const role = roles.find(r => r.id === roleId);
                      return role ? (
                        <Chip key={roleId} label={role.name} />
                      ) : null;
                    })}
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
            <FormControl fullWidth>
              <InputLabel>Members</InputLabel>
              <Select
                multiple
                value={selectedMembers}
                onChange={(e) => setSelectedMembers(e.target.value as string[])}
                label="Members"
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(selected as string[]).map((userId) => {
                      const user = users.find(u => u.id === Number(userId));
                      return user ? (
                        <Chip
                          key={userId}
                          label={`${user.firstName} ${user.lastName}`}
                          size="small"
                        />
                      ) : null;
                    })}
                  </Box>
                )}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.firstName} {user.lastName} ({user.email})
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
            disabled={saving || !formData.name}
          >
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Group</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {groupToDelete?.name}?
          This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Members Dialog */}
      <Dialog open={openMembersDialog} onClose={() => setOpenMembersDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Manage Group Members</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Members</InputLabel>
            <Select
              multiple
              value={selectedMembers}
              onChange={(e) => setSelectedMembers(e.target.value as string[])}
              label="Members"
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as string[]).map((userId) => {
                    const user = users.find(u => u.id === Number(userId));
                    return user ? (
                      <Chip
                        key={userId}
                        label={`${user.firstName} ${user.lastName}`}
                        size="small"
                      />
                    ) : null;
                  })}
                </Box>
              )}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.firstName} {user.lastName} ({user.email})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMembersDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateMembers} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Groups;

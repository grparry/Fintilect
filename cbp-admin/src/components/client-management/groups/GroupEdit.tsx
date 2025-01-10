import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { clientService } from '../../../services/clients.service';
import { UserGroup, SecurityRole, Permission, PermissionCategoryType } from '../../../types/client.types';

interface GroupEditProps {
  clientId: string;
  groupId?: string;
  onSave: () => void;
  onCancel: () => void;
}

interface ServicePermission {
  id: string;
  name: string;
  description: string;
  category: string;
  scope: 'READ' | 'WRITE' | 'ADMIN';
}

const serviceGroupToUIGroup = (serviceGroup: any, clientId: string): UserGroup => ({
  id: serviceGroup.id,
  name: serviceGroup.name,
  description: serviceGroup.description || '',
  clientId,
  roles: [],
  permissions: serviceGroup.permissions.map((p: string) => ({
    id: p,
    name: '',
    description: '',
    category: 'user' as PermissionCategoryType,
    actions: [],
  })),
  members: serviceGroup.members || [],
  createdAt: serviceGroup.createdAt,
  updatedAt: serviceGroup.updatedAt,
});

const servicePermissionToUIPermission = (servicePermission: ServicePermission): Permission => ({
  id: servicePermission.id,
  name: servicePermission.name,
  description: servicePermission.description,
  category: 'user' as PermissionCategoryType,
  actions: [servicePermission.scope],
});

const GroupEdit: React.FC<GroupEditProps> = ({
  clientId,
  groupId,
  onSave,
  onCancel,
}) => {
  const [group, setGroup] = useState<UserGroup | null>(null);
  const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [clientId, groupId]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load permissions
      const permissionsResponse = await clientService.getPermissions();
      if (permissionsResponse.success) {
        const uiPermissions = permissionsResponse.data.map(servicePermissionToUIPermission);
        setAllPermissions(uiPermissions);
      }

      // Load group if editing
      if (groupId) {
        const groupResponse = await clientService.getGroup(clientId, groupId);
        if (groupResponse.success) {
          const uiGroup = serviceGroupToUIGroup(groupResponse.data, clientId);
          setGroup(uiGroup);
          setSelectedPermissions(uiGroup.permissions.map(p => p.id));
        }
      } else {
        // Initialize empty group for creation
        setGroup({
          id: '',
          name: '',
          description: '',
          clientId,
          roles: [],
          permissions: [],
          members: [],
          createdAt: '',
          updatedAt: '',
        });
      }
    } catch (err) {
      setError('Failed to load group data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!group) return;

    try {
      setSaving(true);
      setError(null);

      const groupData = {
        name: group.name,
        description: group.description,
        permissions: selectedPermissions,
        members: group.members,
      };

      const response = groupId
        ? await clientService.updateGroup(clientId, groupId, groupData)
        : await clientService.createGroup(clientId, groupData);

      if (response.success) {
        onSave();
      } else {
        setError(response.error?.message || 'Failed to save group');
      }
    } catch (err) {
      setError('An error occurred while saving the group');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">
              {groupId ? 'Edit Group' : 'Create New Group'}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Group Name"
              value={group?.name || ''}
              onChange={(e) =>
                setGroup((prev) =>
                  prev ? { ...prev, name: e.target.value } : null
                )
              }
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={group?.description || ''}
              onChange={(e) =>
                setGroup((prev) =>
                  prev ? { ...prev, description: e.target.value } : null
                )
              }
              multiline
              rows={3}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Permissions
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {allPermissions.map((permission) => (
                <Chip
                  key={permission.id}
                  label={permission.name}
                  onClick={() => handlePermissionToggle(permission.id)}
                  color={
                    selectedPermissions.includes(permission.id)
                      ? 'primary'
                      : 'default'
                  }
                  variant={
                    selectedPermissions.includes(permission.id)
                      ? 'filled'
                      : 'outlined'
                  }
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button onClick={onCancel}>Cancel</Button>
              <Button
                type="submit"
                variant="contained"
                disabled={saving || !group?.name}
              >
                {saving ? <CircularProgress size={24} /> : 'Save'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default GroupEdit;

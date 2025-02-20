import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { UserGroup, SecurityRole, Permission, PermissionCategoryType } from '../../../types/client.types';
import { clientService } from '../../../services/factory/ServiceFactory';

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
const decodeId = (id: string): string => {
  try {
    return atob(id);
  } catch {
    return id;
  }
};
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
  const navigate = useNavigate();
  useEffect(() => {
    const loadPermissions = async () => {
      try {
        setLoading(true);
        const permissions = await clientService.getPermissions();
        setAllPermissions(permissions);
        setLoading(false);
      } catch (err: any) {
        setError('Failed to load permissions');
        setLoading(false);
      }
    };
    const loadGroup = async () => {
      if (!groupId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const decodedClientId = decodeId(clientId);
        const decodedGroupId = decodeId(groupId);
        const group = await clientService.getGroup(decodedClientId, decodedGroupId);
        setGroup(group);
        setSelectedPermissions(group.permissions.map(p => p.id));
        setLoading(false);
      } catch (err: any) {
        setError('Failed to load group');
        setLoading(false);
      }
    };
    Promise.all([loadPermissions(), loadGroup()]).catch(err => {
      setError(err.message || 'Failed to load data');
      setLoading(false);
    });
  }, [clientId, groupId]);
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
      const decodedClientId = decodeId(clientId);
      const permissions = allPermissions.filter(p => selectedPermissions.includes(p.id));
      const groupData = {
        ...group,
        permissions
      };
      if (groupId) {
        const decodedGroupId = decodeId(groupId);
        await clientService.updateGroup(decodedClientId, decodedGroupId, groupData);
      } else {
        await clientService.createGroup(decodedClientId, groupData);
      }
      onSave();
    } catch (err: any) {
      setError(err.message || 'Failed to save group');
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async () => {
    if (!groupId || !group) return;
    try {
      setSaving(true);
      const decodedClientId = decodeId(clientId);
      const decodedGroupId = decodeId(groupId);
      await clientService.deleteGroup(decodedClientId, decodedGroupId);
      onSave();
    } catch (err: any) {
      setError(err.message || 'Failed to delete group');
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
            <Typography variant="h6" color="text.primary">
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
            <Typography variant="subtitle1" color="text.primary" sx={{ mb: 2 }}>
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
              {groupId && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                  disabled={saving}
                >
                  Delete
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
export default GroupEdit;
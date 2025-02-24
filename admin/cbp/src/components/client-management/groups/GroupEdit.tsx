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
import { Group, Role, GroupRole, Permission } from '../../../types/client.types';
import { clientService, permissionService } from '../../../services/factory/ServiceFactory';
import logger from '../../../utils/logger';

interface GroupEditProps {
  clientId: string;
  groupId?: string;
  onSave: () => void;
  onCancel: () => void;
}

const GroupEdit: React.FC<GroupEditProps> = ({
  clientId,
  groupId,
  onSave,
  onCancel,
}) => {
  const [group, setGroup] = useState<Group | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [rolePermissions, setRolePermissions] = useState<Map<number, Permission[]>>(new Map());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load group and roles data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load roles
        const rolesData = await permissionService.getRoles();
        setRoles(rolesData);

        // Load group if editing
        if (groupId) {
          const groupData = await permissionService.getGroup(Number(groupId));
          setGroup(groupData);

          // Load group roles
          const groupRoles = await permissionService.getGroupRoles(Number(groupId));
          setSelectedRoles(groupRoles.map(r => r.roleId));
        }

        logger.info('Group edit data loaded successfully');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load group data';
        logger.error('Error loading group data: ' + message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [groupId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!group) return;

    try {
      setSaving(true);
      setError(null);

      if (groupId) {
        // Update existing group
        await permissionService.updateGroup(Number(groupId), {
          name: group.name,
          clientId: Number(clientId)
        });
        await permissionService.addGroupRoles(Number(groupId), selectedRoles);
      } else {
        // Create new group
        const newGroup = await permissionService.createGroup({
          name: group.name,
          clientId: Number(clientId)
        });
        await permissionService.addGroupRoles(newGroup.id, selectedRoles);
      }

      logger.info(`Group ${groupId ? 'updated' : 'created'} successfully`);
      onSave();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save group';
      logger.error('Error saving group: ' + message);
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!groupId) return;

    try {
      setSaving(true);
      setError(null);
      await permissionService.deleteGroup(Number(groupId));
      logger.info('Group deleted successfully');
      onSave();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete group';
      logger.error('Error deleting group: ' + message);
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper>
      <Box p={3}>
        <form onSubmit={handleSubmit}>
          {error && (
            <Box mb={2}>
              <Alert severity="error">{error}</Alert>
            </Box>
          )}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                required
                value={group?.name || ''}
                onChange={(e) => setGroup(prev => ({ ...prev, name: e.target.value } as Group))}
                disabled={saving}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Roles</InputLabel>
                <Select
                  multiple
                  value={selectedRoles}
                  onChange={(e) => setSelectedRoles(e.target.value as number[])}
                  disabled={saving}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((roleId) => {
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
                      <Box>
                        <Typography variant="subtitle1">{role.name}</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                          {rolePermissions.get(role.id)?.map((permission) => (
                            <Chip
                              key={permission.id}
                              label={permission.name}
                              size="small"
                              sx={{ backgroundColor: 'action.selected' }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Button onClick={onCancel} disabled={saving}>
                  Cancel
                </Button>
                {groupId && (
                  <Button
                    onClick={handleDelete}
                    color="error"
                    disabled={saving}
                  >
                    Delete
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Paper>
  );
};

export default GroupEdit;
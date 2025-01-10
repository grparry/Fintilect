import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
  TextField,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  Stack,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { encodeId, decodeId } from '../../../utils/idEncoder';
import { UserGroup, Permission, SecurityRole, PERMISSION_CATEGORIES } from '../../../types/client.types';
import { clientService } from '../../../services/clients.service';
import PermissionTreeView from './PermissionTreeView';

interface GroupEditProps {
  clientId: string;
  groupId: string;
  onSave?: () => void;
  onCancel?: () => void;
}

interface GroupFormData {
  name: string;
  description: string;
  permissions: string[];
}

export const GroupEdit: React.FC<GroupEditProps> = ({ clientId, groupId, onSave, onCancel }) => {
  const navigate = useNavigate();
  
  // State
  const [group, setGroup] = useState<UserGroup | null>(null);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);
  const [roles, setRoles] = useState<SecurityRole[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<SecurityRole[]>([]);
  const [members, setMembers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const decodedClientId = decodeId(clientId);
        const decodedGroupId = decodeId(groupId);

        const [groupResponse, permissionsResponse, rolesResponse] = await Promise.all([
          clientService.getGroup(decodedClientId, decodedGroupId),
          clientService.getPermissions(),
          clientService.getRoles()
        ]);

        if (!groupResponse.success) {
          throw new Error(groupResponse.error?.message || 'Failed to load group');
        }
        if (!permissionsResponse.success) {
          throw new Error(permissionsResponse.error?.message || 'Failed to load permissions');
        }
        if (!rolesResponse.success) {
          throw new Error(rolesResponse.error?.message || 'Failed to load roles');
        }

        setGroup(groupResponse.data);
        setPermissions(permissionsResponse.data);
        setRoles(rolesResponse.data);
        setSelectedRoles(groupResponse.data.roles || []);
        setSelectedPermissions(groupResponse.data.permissions || []);
        setMembers(groupResponse.data.members || []);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load group data');
        console.error('Error loading group data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [clientId, groupId]);

  const handleRoleToggle = (role: SecurityRole) => {
    setSelectedRoles(prev => {
      const isSelected = prev.some(r => r.id === role.id);
      if (isSelected) {
        return prev.filter(r => r.id !== role.id);
      } else {
        return [...prev, role];
      }
    });
  };

  const handlePermissionToggle = (permission: Permission) => {
    // Don't toggle if permission is inherited from a role
    if (selectedRoles.some(role => 
      role.permissions.some(p => p.id === permission.id)
    )) {
      return;
    }

    setSelectedPermissions(prev => {
      const isSelected = prev.some(p => p.id === permission.id);
      if (isSelected) {
        return prev.filter(p => p.id !== permission.id);
      } else {
        return [...prev, permission];
      }
    });
  };

  const handleSave = async () => {
    if (!group) return;

    try {
      setSaving(true);
      setError(null);

      const decodedClientId = decodeId(clientId);
      const decodedGroupId = decodeId(groupId);

      const updatedGroup: Partial<UserGroup> = {
        name: group.name,
        description: group.description,
        roles: selectedRoles,
        permissions: selectedPermissions,
        members
      };

      const response = await clientService.updateGroup(decodedClientId, decodedGroupId, updatedGroup);
      
      if (response.success) {
        setSuccess('Group updated successfully');
        onSave?.();
      } else {
        setError(response.error?.message || 'Failed to update group');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update group');
      console.error('Error updating group:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
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
      <Typography variant="h4" gutterBottom>
        Edit Group
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Group Name"
          value={group?.name || ''}
          onChange={(e) => setGroup(group ? { ...group, name: e.target.value } : null)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          value={group?.description || ''}
          onChange={(e) => setGroup(group ? { ...group, description: e.target.value } : null)}
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />
      </Paper>

      <Paper sx={{ p: 2 }}>
        <PermissionTreeView
          permissions={permissions}
          selectedPermissions={selectedPermissions}
          roles={roles}
          selectedRoles={selectedRoles}
          onPermissionToggle={handlePermissionToggle}
          onRoleToggle={handleRoleToggle}
        />
      </Paper>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save'}
        </Button>
        <Button
          variant="outlined"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default GroupEdit;

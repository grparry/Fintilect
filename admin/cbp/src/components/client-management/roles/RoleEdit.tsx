import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SecurityRole, Permission } from '../../../types/client.types';
import { ClientService } from '../../../services/implementations/real/ClientService';
import { PermissionService } from '../../../services/implementations/real/PermissionService';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import { PermissionCategory, PermissionAction } from '../../../types/permission.types';
import { encodeId, decodeId } from '../../../utils/idEncoder';
import PermissionTreeView from '../groups/PermissionTreeView';

interface RoleEditProps {
  clientId: string;
  roleId?: string;
}
// Get service instances
const clientService = ServiceFactory.getInstance().getClientService();
const permissionService = ServiceFactory.getInstance().getPermissionService();
// Convert permissions array to PermissionCategory format
const convertToPermissionCategory = (permissions: Permission[]): PermissionCategory => {
  const category: PermissionCategory = {};
  permissions.forEach(permission => {
    // Ensure actions are of type PermissionAction
    const validActions = permission.actions.filter((action): action is PermissionAction => {
      return ['view', 'edit', 'delete', 'process', 'approve', 'export', 'create'].includes(action);
    });
    category[permission.id] = validActions;
  });
  return category;
};
export const RoleEdit: React.FC<RoleEditProps> = ({ clientId, roleId }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState<SecurityRole | null>(null);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch all available permissions
        const permissions = await clientService.getPermissions();
        setPermissions(permissions);
        // If editing existing role, fetch its data
        if (roleId) {
          const roles = await clientService.getClientRoles(clientId);
          const role = roles.find((r: SecurityRole) => r.id === roleId);
          if (!role) {
            throw new Error('Role not found');
          }
          setRole(role);
          setSelectedPermissions(role.permissions);
        }
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load data');
        setLoading(false);
      }
    };
    fetchData();
  }, [clientId, roleId]);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!role?.name) return;
    try {
      setSaving(true);
      setError(null);
      const roleData = {
        name: role.name,
        description: role.description || '',
        permissions: convertToPermissionCategory(selectedPermissions),
        clientId
      };
      if (roleId) {
        // Update existing role
        await permissionService.updatePermissionGroup(Number(roleId), roleData);
      } else {
        // Create new role
        await permissionService.createPermissionGroup(roleData);
      }
      setSuccess('Role saved successfully');
      setSaving(false);
      setTimeout(() => navigate(`/clients/${encodeId(clientId)}/roles`), 1500);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save role');
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
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        {roleId ? 'Edit Role' : 'Create New Role'}
      </Typography>
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
      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Role Name"
          value={role?.name || ''}
          onChange={e => setRole(prev => prev ? { ...prev, name: e.target.value } : null)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          value={role?.description || ''}
          onChange={e => setRole(prev => prev ? { ...prev, description: e.target.value } : null)}
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
        <Typography variant="subtitle1" gutterBottom>
          Permissions
        </Typography>
        <PermissionTreeView
          permissions={permissions}
          selectedPermissions={selectedPermissions}
          roles={[]}
          selectedRoles={[]}
          onPermissionToggle={(permission: Permission) => {
            const isSelected = selectedPermissions.some(p => p.id === permission.id);
            const newSelectedPermissions = isSelected
              ? selectedPermissions.filter(p => p.id !== permission.id)
              : [...selectedPermissions, permission];
            setSelectedPermissions(newSelectedPermissions);
            setRole(prev => prev ? { ...prev, permissions: newSelectedPermissions } : null);
          }}
          onRoleToggle={() => {}}  // No-op since we don't handle roles here
        />
      </Paper>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          onClick={() => navigate(`/clients/${encodeId(clientId)}/roles`)}
          disabled={saving}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={saving || !role?.name}
          startIcon={saving ? <CircularProgress size={20} /> : undefined}
        >
          {saving ? 'Saving...' : 'Save Role'}
        </Button>
      </Box>
    </Box>
  );
};
export default RoleEdit;
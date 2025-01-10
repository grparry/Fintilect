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
import { clientService, Permission as ServicePermission } from '../../../services/clients.service';
import { encodeId, decodeId } from '../../../utils/idEncoder';
import PermissionTreeView from '../groups/PermissionTreeView';

interface RoleEditProps {
  clientId: string;
  roleId?: string;
}

// Convert service permission to client permission type
const mapServicePermissionToClientPermission = (p: ServicePermission): Permission => ({
  id: p.id,
  name: p.name,
  description: p.description,
  category: p.category as Permission['category'],
  actions: [p.scope]
});

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

        const permissionsResponse = await clientService.getPermissions();
        
        if (!permissionsResponse.success) {
          throw new Error(permissionsResponse.error?.message || 'Failed to load permissions');
        }
        
        // Convert service permissions to client permissions
        const clientPermissions = permissionsResponse.data.map(mapServicePermissionToClientPermission);
        setPermissions(clientPermissions);

        if (roleId) {
          const decodedRoleId = decodeId(roleId);
          const roleResponse = await clientService.getRole(decodedRoleId);
          
          if (!roleResponse.success) {
            throw new Error(roleResponse.error?.message || 'Failed to load role');
          }
          
          // Convert service role to client role type
          const clientRole: SecurityRole = {
            ...roleResponse.data,
            description: roleResponse.data.description || '', // Ensure description is not undefined
            permissions: roleResponse.data.permissions
              .map(permId => clientPermissions.find(p => p.id === permId))
              .filter((p): p is Permission => p !== undefined)
          };
          
          setRole(clientRole);
          setSelectedPermissions(clientRole.permissions);
        } else {
          setRole({
            id: '',
            name: '',
            description: '',
            permissions: [],
            isSystem: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }

        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load role data');
        console.error('Error loading role data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [clientId, roleId]);

  const handlePermissionToggle = (permission: Permission) => {
    setSelectedPermissions(prev => {
      const isSelected = prev.some(p => p.id === permission.id);
      if (isSelected) {
        return prev.filter(p => p.id !== permission.id);
      } else {
        return [...prev, permission];
      }
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!role) return;

    try {
      setSaving(true);
      setError(null);

      // Convert client role type to service role type
      const roleData = {
        name: role.name,
        description: role.description || '',
        permissions: selectedPermissions.map(p => p.id),
        isSystem: role.isSystem
      };

      let response;
      if (roleId) {
        const decodedRoleId = decodeId(roleId);
        response = await clientService.updateRole(decodedRoleId, roleData);
      } else {
        response = await clientService.createRole(roleData);
      }

      if (response.success) {
        setSuccess('Role saved successfully');
        const encodedClientId = encodeId(clientId);
        navigate(`/clients/${encodedClientId}/roles`);
      } else {
        setError(response.error?.message || 'Failed to save role');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save role');
      console.error('Error saving role:', error);
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

  if (!role) {
    return <div>Role not found</div>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {roleId ? 'Edit Role' : 'Create Role'}
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
          value={role.name}
          onChange={(e) => setRole({ ...role, name: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          value={role.description}
          onChange={(e) => setRole({ ...role, description: e.target.value })}
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            System Role
          </Typography>
          <input
            type="checkbox"
            checked={role.isSystem || false}
            onChange={(e) => setRole({ ...role, isSystem: e.target.checked })}
          />
        </Box>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Permissions
        </Typography>
        <PermissionTreeView
          permissions={permissions}
          selectedPermissions={selectedPermissions}
          roles={[]}  // No roles in role editor
          selectedRoles={[]}
          onPermissionToggle={handlePermissionToggle}
          onRoleToggle={() => {}}  // No-op since we don't handle roles here
        />
      </Paper>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ mr: 1 }}
          disabled={saving || !role.name}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            const encodedClientId = encodeId(clientId);
            navigate(`/clients/${encodedClientId}/roles`);
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default RoleEdit;

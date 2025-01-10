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
import { SecurityRole, Permission, ApiResponse } from '../../../types/client.types';
import { clientService } from '../../../services/clients.service';
import { encodeId, decodeId } from '../../../utils/idEncoder';
import PermissionTreeView from '../groups/PermissionTreeView';

interface RoleEditProps {
  clientId: string;
  roleId?: string;
}

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

        const permissionsResponse: ApiResponse<Permission[]> = await clientService.getPermissions();
        
        if (!permissionsResponse.success) {
          throw new Error(permissionsResponse.error?.message || 'Failed to load permissions');
        }
        setPermissions(permissionsResponse.data);

        if (roleId) {
          const decodedRoleId = decodeId(roleId);
          const roleResponse: ApiResponse<SecurityRole> = await clientService.getRole(decodedRoleId);
          
          if (!roleResponse.success) {
            throw new Error(roleResponse.error?.message || 'Failed to load role');
          }
          
          setRole(roleResponse.data);
          setSelectedPermissions(roleResponse.data.permissions || []);
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

      const roleData: Partial<SecurityRole> = {
        name: role.name,
        description: role.description,
        permissions: selectedPermissions,
        isSystem: role.isSystem
      };

      let response: ApiResponse<SecurityRole>;
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
        <TextField
          fullWidth
          label="Is System"
          value={role.isSystem}
          onChange={(e) => setRole({ ...role, isSystem: e.target.value === 'true' })}
          type="checkbox"
          sx={{ mb: 2 }}
        />
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

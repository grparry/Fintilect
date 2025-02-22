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
import { Role } from '../../../types/client.types';
import { permissionService } from '../../../services/factory/ServiceFactory';
import logger from '../../../utils/logger';

interface RoleEditProps {
  clientId: string;
  roleId?: string;
}

const RoleEdit: React.FC<RoleEditProps> = ({ clientId, roleId }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRole = async () => {
      try {
        setLoading(true);
        setError(null);

        if (roleId) {
          const roleData = await permissionService.getRole(Number(roleId));
          setRole(roleData);
          logger.info('Role loaded successfully');
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load role';
        logger.error(`Error loading role: ${message}`);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadRole();
  }, [roleId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!role?.name) return;

    try {
      setSaving(true);
      setError(null);

      if (roleId) {
        await permissionService.updateRole(Number(roleId), {
          name: role.name
        });
        logger.info('Role updated successfully');
      } else {
        await permissionService.createRole({
          name: role.name
        });
        logger.info('Role created successfully');
      }

      navigate(`/admin/client-management/edit/${clientId}/roles`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save role';
      logger.error(`Error saving role: ${message}`);
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!roleId) return;

    try {
      setSaving(true);
      setError(null);
      await permissionService.deleteRole(Number(roleId));
      logger.info('Role deleted successfully');
      navigate(`/admin/client-management/edit/${clientId}/roles`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete role';
      logger.error(`Error deleting role: ${message}`);
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
          <Box mb={3}>
            <Typography variant="h6">
              {roleId ? 'Edit Role' : 'Create Role'}
            </Typography>
          </Box>
          <Box mb={3}>
            <TextField
              label="Name"
              fullWidth
              required
              value={role?.name || ''}
              onChange={(e) => setRole(prev => ({ ...prev, name: e.target.value } as Role))}
              disabled={saving}
            />
          </Box>
          <Box display="flex" gap={2} justifyContent="flex-end">
            <Button
              onClick={() => navigate(`/admin/client-management/edit/${clientId}/roles`)}
              disabled={saving}
            >
              Cancel
            </Button>
            {roleId && (
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
        </form>
      </Box>
    </Paper>
  );
};

export default RoleEdit;
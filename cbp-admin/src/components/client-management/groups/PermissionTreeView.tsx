import React, { useMemo } from 'react';
import {
  Box,
  Checkbox,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  Tooltip,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { Permission, SecurityRole, PermissionCategoryType } from '@/../../types/client.types';

interface PermissionTreeViewProps {
  permissions: Permission[];
  selectedPermissions: Permission[];
  roles: SecurityRole[];
  selectedRoles: SecurityRole[];
  onPermissionToggle: (permission: Permission) => void;
  onRoleToggle: (role: SecurityRole) => void;
}

interface PermissionNode {
  category: PermissionCategoryType;
  permissions: Permission[];
  expanded: boolean;
}

export const PermissionTreeView: React.FC<PermissionTreeViewProps> = ({
  permissions,
  selectedPermissions,
  roles,
  selectedRoles,
  onPermissionToggle,
  onRoleToggle,
}) => {
  const [expandedNodes, setExpandedNodes] = React.useState<Record<string, boolean>>({});

  const permissionTree = useMemo(() => {
    const tree: Record<PermissionCategoryType, Permission[]> = {
      user: [],
      client: [],
      system: [],
      security: [],
      settings: [],
      reports: [],
      billpay: [],
      moneydesktop: []
    };
    
    permissions.forEach((permission) => {
      tree[permission.category].push(permission);
    });
    
    return tree;
  }, [permissions]);

  const handleNodeToggle = (category: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const isPermissionSelected = (permission: Permission) => {
    return (
      selectedPermissions.some((p) => p.id === permission.id) ||
      selectedRoles.some((role) =>
        role.permissions.some((p) => p.id === permission.id)
      )
    );
  };

  const isPermissionInherited = (permission: Permission) => {
    return selectedRoles.some((role) =>
      role.permissions.some((p) => p.id === permission.id)
    );
  };

  return (
    <Box>
      {/* Roles Section */}
      <Box mb={3}>
        <Typography variant="h6" gutterBottom>
          Roles
        </Typography>
        {roles.map((role) => (
          <Box key={role.id} display="flex" alignItems="center" ml={2} mb={1}>
            <Checkbox
              checked={selectedRoles.some((r) => r.id === role.id)}
              onChange={() => onRoleToggle(role)}
            />
            <Typography>{role.name}</Typography>
            <Tooltip title={role.description}>
              <IconButton size="small">
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        ))}
      </Box>

      {/* Permissions Tree */}
      <Typography variant="h6" gutterBottom>
        Additional Permissions
      </Typography>
      {Object.entries(permissionTree).map(([category, categoryPermissions]) => (
        <Box key={category} mb={1}>
          <Box display="flex" alignItems="center">
            <IconButton
              size="small"
              onClick={() => handleNodeToggle(category)}
            >
              {expandedNodes[category] ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </IconButton>
            <Typography variant="subtitle1">{category}</Typography>
          </Box>
          <Collapse in={expandedNodes[category]}>
            <Box ml={4}>
              {categoryPermissions.map((permission) => (
                <Box
                  key={permission.id}
                  display="flex"
                  alignItems="center"
                  mb={0.5}
                >
                  <Checkbox
                    checked={isPermissionSelected(permission)}
                    onChange={() => onPermissionToggle(permission)}
                    disabled={isPermissionInherited(permission)}
                  />
                  <Typography
                    style={{
                      color: isPermissionInherited(permission)
                        ? 'text.disabled'
                        : 'inherit',
                    }}
                  >
                    {permission.name}
                  </Typography>
                  <Tooltip title={permission.description}>
                    <IconButton size="small">
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  {isPermissionInherited(permission) && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      ml={1}
                    >
                      (Inherited from roles)
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
};

export default PermissionTreeView;

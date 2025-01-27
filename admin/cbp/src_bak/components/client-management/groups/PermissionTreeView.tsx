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
import { Permission, SecurityRole, PermissionCategoryType } from '../../types/client.types';

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
    





    
    

      ...prev,
      [category]: !prev[category],

      )
    );

    );

    <Box>
      {/* Roles Section */}
      <Box mb={3}>
        <Typography variant="h6" gutterBottom>
        </Typography>
        {roles.map((role) => (
          <Box key={role.id} display="flex" alignItems="center" ml={2} mb={1}>
            <Checkbox
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
      </Typography>
      {Object.entries(permissionTree).map(([category, categoryPermissions]) => (
        <Box key={category} mb={1}>
          <Box display="flex" alignItems="center">
            <IconButton
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
                >
                  <Checkbox
                  />
                  <Typography
                        ? 'text.disabled'
                        : 'inherit',
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


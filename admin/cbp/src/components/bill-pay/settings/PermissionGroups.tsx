import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { 
  Permission,
  PermissionGroup, 
  PermissionGroupInput,
  PermissionAction,
  PermissionGroupFilters,
  PermissionCategory,
  PermissionCategoryType
} from '../../../types/permission.types';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';

const initialCategories: Record<PermissionCategoryType, Permission[]> = {
  System: [],
  BillPay: [],
  Client: [],
  MoneyDesktop: [],
  Users: [],
  Security: [],
  Settings: [],
  Reports: []
};

const PermissionGroups: React.FC = () => {
  // State
  const [groups, setGroups] = useState<PermissionGroup[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<PermissionGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [permissionCategories, setPermissionCategories] = useState<Record<PermissionCategoryType, Permission[]>>(initialCategories);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<PermissionGroupInput>({
    name: '',
    description: '',
    permissions: {},
  });

  const permissionService = ServiceFactory.getInstance().getPermissionService();

  // Load permission groups and available permissions
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [groupsResponse, permissionsResponse] = await Promise.all([
          permissionService.getPermissionGroups(),
          permissionService.getPermissions()
        ]);

        setGroups(groupsResponse.items);
        setPermissions(permissionsResponse);

        // Organize permissions by category
        const categories = permissionsResponse.reduce((acc, permission) => {
          if (!acc[permission.category]) {
            acc[permission.category] = [];
          }
          acc[permission.category].push(permission);
          return acc;
        }, { ...initialCategories });

        setPermissionCategories(categories);
        setError(null);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load permission data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle form submission
  const handleSubmit = async (formData: PermissionGroupInput) => {
    try {
      setValidationErrors({});

      if (selectedGroup) {
        await permissionService.updatePermissionGroup(selectedGroup.id, formData);
      } else {
        await permissionService.createPermissionGroup(formData);
      }

      // Refresh groups list
      const response = await permissionService.getPermissionGroups();
      setGroups(response.items);
      
      handleCloseDialog();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to save permission group');
      }
    }
  };

  // Handle group deletion
  const handleDelete = async (groupId: number) => {
    try {
      await permissionService.deletePermissionGroup(groupId);
      
      // Refresh groups list
      const response = await permissionService.getPermissionGroups();
      setGroups(response.items);
      
      setDeleteDialogOpen(false);
      setSelectedGroup(null);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete permission group');
    }
  };

  // Handle search
  const handleSearch = async () => {
    try {
      const filters: PermissionGroupFilters = {
        searchTerm: searchTerm || undefined
      };
      
      const response = await permissionService.getPermissionGroups(filters);
      setGroups(response.items);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to search permission groups');
    }
  };

  // Handle permission change
  const handlePermissionChange = (category: PermissionCategoryType, action: PermissionAction) => {
    setFormData(prev => {
      const updatedPermissions = { ...prev.permissions };
      if (!updatedPermissions[category]) {
        updatedPermissions[category] = [];
      }
      
      const index = updatedPermissions[category].indexOf(action);
      if (index === -1) {
        updatedPermissions[category].push(action);
      } else {
        updatedPermissions[category].splice(index, 1);
      }
      
      return {
        ...prev,
        permissions: updatedPermissions,
      };
    });
  };

  // Dialog handlers
  const handleOpenDialog = (group?: PermissionGroup) => {
    if (group) {
      setFormData({
        name: group.name,
        description: group.description,
        permissions: group.permissions,
      });
      setSelectedGroup(group);
    } else {
      setFormData({
        name: '',
        description: '',
        permissions: {},
      });
      setSelectedGroup(null);
    }
    setValidationErrors({});
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedGroup(null);
    setValidationErrors({});
    setFormData({
      name: '',
      description: '',
      permissions: {},
    });
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Permission Groups</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Group
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.description}</TableCell>
                <TableCell>
                  {Object.keys(group.permissions).length} categories
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleOpenDialog(group)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setSelectedGroup(group);
                      setDeleteDialogOpen(true);
                    }}
                    size="small"
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedGroup ? 'Edit Permission Group' : 'Add Permission Group'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              error={!!validationErrors.name}
              helperText={validationErrors.name}
              fullWidth
            />

            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              error={!!validationErrors.description}
              helperText={validationErrors.description}
              fullWidth
              multiline
              rows={2}
            />

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Permissions
            </Typography>

            <Grid container spacing={2}>
              {Object.entries(permissionCategories).map(([category, permissions]) => (
                <Grid item xs={12} key={category}>
                  <Card>
                    <CardContent>
                      <Typography variant="subtitle2" gutterBottom>
                        {category}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        {permissions.map((permission) => (
                          <FormControlLabel
                            key={`${category}-${permission.name}`}
                            control={
                              <Checkbox
                                checked={formData.permissions[category as PermissionCategoryType]?.includes(permission.actions[0] as PermissionAction) || false}
                                onChange={() => handlePermissionChange(
                                  category as PermissionCategoryType,
                                  permission.actions[0] as PermissionAction
                                )}
                              />
                            }
                            label={permission.name}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => handleSubmit(formData)} variant="contained">
            {selectedGroup ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Permission Group</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the permission group "{selectedGroup?.name}"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => handleDelete(selectedGroup?.id || 0)} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PermissionGroups;

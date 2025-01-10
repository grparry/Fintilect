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
  PermissionGroup, 
  PermissionGroupInput,
  PermissionCategoryDefinition,
  PermissionAction,
  PermissionGroupFilters,
  PermissionCategory
} from '../../../types/permission.types';
import { permissionService } from '../../../services/permission.service';

const PermissionGroups: React.FC = () => {
  // State
  const [groups, setGroups] = useState<PermissionGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<PermissionGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [permissionCategories, setPermissionCategories] = useState<PermissionCategoryDefinition>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<PermissionGroupInput>({
    name: '',
    description: '',
    permissions: {},
  });

  // Load permission groups and categories
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const filters: PermissionGroupFilters = {
          searchTerm: searchTerm || undefined,
        };
        
        const [groupsResponse, categoriesResponse] = await Promise.all([
          permissionService.getGroups(filters),
          permissionService.getPermissionCategories(),
        ]);

        setGroups(groupsResponse.groups);
        setPermissionCategories(categoriesResponse);
        setError(null);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load permission groups');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [searchTerm]);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setValidationErrors({});

      if (selectedGroup) {
        await permissionService.updateGroup(selectedGroup.id, formData);
      } else {
        await permissionService.createGroup(formData);
      }

      // Refresh groups list
      const response = await permissionService.getGroups({ searchTerm: searchTerm || undefined });
      setGroups(response.groups);
      
      handleCloseDialog();
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes('validation failed')) {
          // Handle validation errors
          const validationMessage = err.message.replace('validation failed: ', '');
          const errors: Record<string, string> = {};
          validationMessage.split(', ').forEach(errorStr => {
            const [field, message] = errorStr.split(': ');
            if (field && message) {
              errors[field] = message;
            }
          });
          setValidationErrors(errors);
        } else {
          setError(err.message);
        }
      } else {
        setError('Failed to save permission group');
      }
    }
  };

  // Handle permission changes
  const handlePermissionChange = (category: string, action: PermissionAction) => {
    setFormData(prev => {
      const newPermissions: PermissionCategory = { ...prev.permissions };
      
      if (!newPermissions[category]) {
        newPermissions[category] = [];
      }

      const actionIndex = newPermissions[category].indexOf(action);
      if (actionIndex === -1) {
        newPermissions[category] = [...newPermissions[category], action];
      } else {
        newPermissions[category] = newPermissions[category].filter(a => a !== action);
        if (newPermissions[category].length === 0) {
          delete newPermissions[category];
        }
      }

      return {
        ...prev,
        permissions: newPermissions,
      };
    });
  };

  // Handle group deletion
  const handleDelete = async () => {
    if (!selectedGroup) return;

    try {
      await permissionService.deleteGroup(selectedGroup.id);
      
      // Refresh groups list
      const response = await permissionService.getGroups({ searchTerm: searchTerm || undefined });
      setGroups(response.groups);
      
      setDeleteDialogOpen(false);
      setSelectedGroup(null);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete permission group');
    }
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
    setFormData({
      name: '',
      description: '',
      permissions: {},
    });
    setValidationErrors({});
    setSelectedGroup(null);
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
              {Object.entries(permissionCategories).map(([category, actions]) => (
                <Grid item xs={12} key={category}>
                  <Card>
                    <CardContent>
                      <Typography variant="subtitle2" gutterBottom>
                        {category}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        {actions.map((action) => (
                          <FormControlLabel
                            key={`${category}-${action}`}
                            control={
                              <Checkbox
                                checked={formData.permissions[category]?.includes(action as PermissionAction) || false}
                                onChange={() => handlePermissionChange(category, action as PermissionAction)}
                              />
                            }
                            label={action}
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
          <Button onClick={handleSubmit} variant="contained">
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
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PermissionGroups;

import React, { useState, useEffect, useCallback } from 'react';
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
  PermissionAction 
} from '../../../types/permission.types';
import { permissionService } from '../../../services/permission.service';

const PermissionGroups: React.FC = () => {
  const [groups, setGroups] = useState<PermissionGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<PermissionGroup | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [permissionCategories, setPermissionCategories] = useState<PermissionCategoryDefinition>({});
  const [editForm, setEditForm] = useState<PermissionGroupInput>({
    name: '',
    description: '',
    permissions: {},
  });

  const loadGroups = useCallback(async () => {
    try {
      setLoading(true);
      const { groups: loadedGroups } = await permissionService.getGroups({ searchTerm });
      setGroups(loadedGroups);
      setError(null);
    } catch (err) {
      setError('Failed to load permission groups');
      console.error('Error loading groups:', err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  const loadPermissionCategories = useCallback(async () => {
    try {
      const categories = await permissionService.getPermissionCategories();
      setPermissionCategories(categories);
    } catch (err) {
      setError('Failed to load permission categories');
      console.error('Error loading categories:', err);
    }
  }, []);

  useEffect(() => {
    loadGroups();
    loadPermissionCategories();
  }, [loadGroups, loadPermissionCategories]);

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []); // No dependencies needed as it only uses setState

  const handleOpenDialog = useCallback((group: PermissionGroup | null) => {
    if (group) {
      setEditForm({
        name: group.name,
        description: group.description,
        permissions: { ...group.permissions },
      });
    } else {
      setEditForm({
        name: '',
        description: '',
        permissions: {},
      });
    }
    setSelectedGroup(group);
    setOpenDialog(true);
    setError(null); // Clear any previous errors
  }, []); // No dependencies needed

  const handleCloseDialog = useCallback(() => {
    setSelectedGroup(null);
    setEditForm({
      name: '',
      description: '',
      permissions: {},
    });
    setOpenDialog(false);
    setError(null);
  }, []); // No dependencies needed

  const handleOpenDeleteDialog = useCallback((group: PermissionGroup) => {
    setSelectedGroup(group);
    setOpenDeleteDialog(true);
  }, []); // No dependencies needed

  const handleCloseDeleteDialog = useCallback(() => {
    setSelectedGroup(null);
    setOpenDeleteDialog(false);
  }, []); // No dependencies needed

  const handleDeleteGroup = useCallback(async () => {
    if (!selectedGroup) return;

    try {
      await permissionService.deleteGroup(selectedGroup.id);
      setSuccess('Permission group deleted successfully');
      loadGroups();
      handleCloseDeleteDialog();
    } catch (err) {
      setError('Failed to delete permission group');
      console.error('Error deleting group:', err);
    }
  }, [selectedGroup, loadGroups, handleCloseDeleteDialog]);

  const handleInputChange = useCallback((field: keyof PermissionGroupInput, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []); // No dependencies needed

  const handlePermissionChange = useCallback((category: string, action: PermissionAction, checked: boolean) => {
    setEditForm(prev => {
      const updatedPermissions = { ...prev.permissions };
      
      if (!updatedPermissions[category]) {
        updatedPermissions[category] = [];
      }

      if (checked) {
        updatedPermissions[category] = [...updatedPermissions[category], action];
      } else {
        updatedPermissions[category] = updatedPermissions[category].filter(p => p !== action);
      }

      return {
        ...prev,
        permissions: updatedPermissions,
      };
    });
  }, []); // No dependencies needed

  const handleSave = useCallback(async () => {
    try {
      const validation = await permissionService.validateGroup(editForm);
      if (!validation.isValid) {
        setError('Invalid form: ' + Object.values(validation.errors).join(', '));
        return;
      }

      if (selectedGroup) {
        await permissionService.updateGroup(selectedGroup.id, editForm);
        setSuccess('Permission group updated successfully');
      } else {
        await permissionService.createGroup(editForm);
        setSuccess('Permission group created successfully');
      }

      loadGroups();
      handleCloseDialog();
    } catch (err) {
      setError('Failed to save permission group');
      console.error('Error saving group:', err);
    }
  }, [selectedGroup, editForm, loadGroups, handleCloseDialog]);

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        Loading permission groups...
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" component="h1">
              Permission Groups
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog(null)}
              type="button"
            >
              Add Group
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box display="flex" alignItems="center">
              <SearchIcon sx={{ mr: 1 }} />
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search permission groups..."
                value={searchTerm}
                onChange={handleSearch}
                size="small"
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Group Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groups.map((group) => (
                  <TableRow key={group.id}>
                    <TableCell>{group.name}</TableCell>
                    <TableCell>{group.description}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenDialog(group)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleOpenDeleteDialog(group)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Add/Edit Group Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedGroup ? 'Edit Permission Group' : 'Add Permission Group'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Group Name"
                value={editForm.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                value={editForm.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Permissions
              </Typography>
              {Object.entries(permissionCategories).map(([category, actions]) => (
                <Card key={category} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom sx={{ textTransform: 'capitalize' }}>
                      {category}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Grid container spacing={2}>
                      {actions.map((action) => (
                        <Grid item xs={12} sm={6} md={4} key={action}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={editForm.permissions[category]?.includes(action as PermissionAction) || false}
                                onChange={(e) => handlePermissionChange(category, action as PermissionAction, e.target.checked)}
                              />
                            }
                            label={action}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            {selectedGroup ? 'Save Changes' : 'Create Group'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Delete Permission Group</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the permission group "{selectedGroup?.name}"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteGroup}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PermissionGroups;

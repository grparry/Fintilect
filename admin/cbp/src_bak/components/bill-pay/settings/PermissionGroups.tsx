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



  // State


  // Load permission groups and available permissions
        ]);


        // Organize permissions by category



  // Handle form submission


      // Refresh groups list
      

  // Handle group deletion
      
      // Refresh groups list
      

  // Handle search
      

  // Handle permission change
      
      
        ...prev,

  // Dialog handlers


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
          />
          <Button
          >
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
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
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
            />

            <TextField
            />

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
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
                              <Checkbox
                                )}
                              />
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
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => handleDelete(selectedGroup?.id || 0)} color="error" variant="contained">
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );


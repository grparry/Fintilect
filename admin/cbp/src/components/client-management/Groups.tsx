import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  Tooltip,
  Paper,
  List,
  ListItem,
  ListItemText,
  Collapse
} from '@mui/material';
// Removed DataGrid imports
// Removed Pagination import
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  User,
  Group,
  UserGroup,
  Role,
  GroupRole,
  Permission
} from '../../types/client.types';
// Removed PaginatedResponse import as it's not used with the service layer
import { clientService, userService, permissionService } from '../../services/factory/ServiceFactory';
import { useNavigate } from 'react-router-dom';
import { encodeId } from '../../utils/idEncoder';
import dayjs from 'dayjs';
import GroupTable from './groups/GroupTable';

interface GroupsProps {
  clientId: string;
}

interface GroupFormData extends Omit<Group, 'id' | 'createdAt' | 'updatedAt'> {
  name: string;
  description?: string;
  clientId: number;
}

interface State {
  loading: boolean;
  saving: boolean;
  error: string | null;
  success: string | null;
  groups: Group[];
  users: User[];
  selectedGroup: Group | null;
  isFormOpen: boolean;
}

const initialState: State = {
  loading: false,
  saving: false,
  error: null,
  success: null,
  groups: [],
  users: [],
  selectedGroup: null,
  isFormOpen: false
};

export default function Groups({ clientId }: GroupsProps) {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const [membersDialogOpen, setMembersDialogOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [rolesDialogOpen, setRolesDialogOpen] = useState(false);
  const [roleSearchTerm, setRoleSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const loadGroups = useCallback(async () => {
    console.log('loadGroups called with clientId: %d', clientId);
    if (!clientId) return;
    try {
      console.log('Setting loading state to true');
      setState(prev => ({ ...prev, loading: true }));
      console.log('About to call permissionService.getGroups');
      console.log('permissionService object:', permissionService);
      const response = await permissionService.getGroups({
        clientId: Number(clientId)
      });
      console.log('Response from getGroups:', response);
      console.log('Groups data type:', Array.isArray(response.groups) ? 'array' : typeof response.groups);
      
      // Ensure we have an array of groups
      let groupsArray: Group[] = [];
      
      // Define the possible response structure types
      interface NestedGroupsResponse {
        groups?: {
          groups?: Group[];
          [key: string]: any;
        };
      }
      
      // Special handling for the nested structure we've discovered
      const typedResponse = response as NestedGroupsResponse;
      if (typedResponse.groups && 
          'groups' in typedResponse.groups && 
          Array.isArray(typedResponse.groups.groups)) {
        // Direct access to the nested groups array
        groupsArray = typedResponse.groups.groups;
        console.log('Extracted nested groups array with length:', groupsArray.length);
      } else if (Array.isArray(typedResponse.groups)) {
        // Standard array handling
        groupsArray = typedResponse.groups as unknown as Group[];
        console.log('Response groups is an array with length:', groupsArray.length);
      } else if (typedResponse.groups && typeof typedResponse.groups === 'object') {
        console.log('Response groups is an object with keys:', Object.keys(typedResponse.groups));
        
        // Check if the first item is an array (as we discovered in the logs)
        const firstValue = Object.values(typedResponse.groups)[0];
        if (Array.isArray(firstValue)) {
          groupsArray = firstValue as Group[];
          console.log('Extracted array from first value with length:', groupsArray.length);
        } else {
          // Standard object to array conversion
          groupsArray = Object.values(typedResponse.groups) as unknown as Group[];
          console.log('Converted object to array with length:', groupsArray.length);
        }
      } else {
        console.log('Could not process response.groups, defaulting to empty array');
      }
      
      // Check for duplicate IDs
      const idMap = new Map<number, Group>();
      interface DuplicateIdInfo {
        id: number;
        firstGroup: Group;
        duplicateGroup: Group;
      }
      const duplicateIds: DuplicateIdInfo[] = [];
      
      groupsArray.forEach(group => {
        if (group && group.id !== undefined) {
          if (idMap.has(group.id)) {
            duplicateIds.push({
              id: group.id,
              firstGroup: idMap.get(group.id),
              duplicateGroup: group
            });
          } else {
            idMap.set(group.id, group);
          }
        }
      });
      
      // Check for missing or invalid IDs
      const groupsWithoutIds = groupsArray.filter(group => group.id === undefined || group.id === null);
      const groupsWithZeroIds = groupsArray.filter(group => group.id === 0);
      
      if (groupsWithoutIds.length > 0) {
        console.error('Found groups without IDs:', groupsWithoutIds);
      }
      
      if (groupsWithZeroIds.length > 0) {
        console.warn('Found groups with ID=0:', groupsWithZeroIds);
      }
      
      // Log the first few items to inspect their structure
      console.log('First 3 items in groupsArray:');
      for (let i = 0; i < Math.min(3, groupsArray.length); i++) {
        console.log(`Item ${i}:`, groupsArray[i]);
        if (Array.isArray(groupsArray[i])) {
          console.warn(`Item ${i} is itself an array!`);
        }
      }
      
      if (duplicateIds.length > 0) {
        console.error('Found duplicate IDs in groups array:', duplicateIds);
      } else {
        console.log('No duplicate IDs found in groups array');
      }
      
      console.log('Processed groups array:', groupsArray);
      
      setState(prev => ({
        ...prev,
        loading: false,
        groups: groupsArray
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load groups';
      setState(prev => ({
        ...prev,
        loading: false,
        error: message
      }));
    }
  }, [clientId]);

  const loadUsers = useCallback(async () => {
    if (!clientId) return;
    try {
      const response = await userService.getUsers({
        clientId: Number(clientId),
        page: 1,
        limit: 100
      });
      setState(prev => ({ ...prev, users: response.users }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load users';
      setState(prev => ({ ...prev, error: message }));
    }
  }, [clientId]);

  const loadRoles = useCallback(async () => {
    try {
      const response = await permissionService.getRoles();
      setRoles(response.roles);
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to load roles'
      }));
    }
  }, []);

  const handleCreateGroup = async (formData: Partial<GroupFormData>) => {
    if (!clientId) return;
    try {
      setState(prev => ({ ...prev, saving: true, error: null }));
      const newGroup = {
        name: formData.name || 'New Group',
        description: formData.description || '',
        clientId: Number(clientId),
      };
      await permissionService.createGroup(newGroup);
      setState(prev => ({
        ...prev,
        saving: false,
        isFormOpen: false,
        success: 'Group created successfully'
      }));
      loadGroups();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create group';
      setState(prev => ({
        ...prev,
        saving: false,
        error: message
      }));
    }
  };

  const handleUpdateGroup = async (groupId: number, formData: Partial<GroupFormData>) => {
    try {
      setState(prev => ({ ...prev, saving: true, error: null }));
      
      // Get the current group data first
      const currentGroup = await permissionService.getGroup(groupId);
      
      // Merge the current data with the form data to create a complete update
      const completeGroupData = {
        id: groupId,
        name: formData.name || currentGroup.name || '',
        description: formData.description !== undefined ? formData.description : (currentGroup.description || ''),
        clientId: currentGroup.clientId,
        createdAt: currentGroup.createdAt,
        updatedAt: currentGroup.updatedAt
      };
      
      await permissionService.updateGroup(groupId, completeGroupData);
      setState(prev => ({
        ...prev,
        saving: false,
        isFormOpen: false,
        success: 'Group updated successfully'
      }));
      loadGroups();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update group';
      setState(prev => ({
        ...prev,
        saving: false,
        error: message
      }));
    }
  };

  const handleDeleteGroup = async (groupId: number) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await permissionService.deleteGroup(groupId);
      setState(prev => ({
        ...prev,
        loading: false,
        success: 'Group deleted successfully'
      }));
      loadGroups();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete group';
      setState(prev => ({
        ...prev,
        loading: false,
        error: message
      }));
    }
  };

  const handleOpenMembers = async (group: Group) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Get current group members
      const response = await permissionService.getGroupUsers(group.id);
      setSelectedUsers(response.userGroups.map((userGroup: UserGroup) => userGroup.userId));
      
      setState(prev => ({ 
        ...prev, 
        selectedGroup: group,
        loading: false 
      }));
      
      setMembersDialogOpen(true);
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to load group members',
        loading: false 
      }));
    }
  };

  const handleCloseMembersDialog = () => {
    setMembersDialogOpen(false);
    setSelectedUsers([]);
    setUserSearchTerm('');
    setState(prev => ({ ...prev, selectedGroup: null }));
  };

  const handleUpdateMembers = async () => {
    if (!state.selectedGroup) return;
    
    try {
      setState(prev => ({ ...prev, saving: true, error: null }));
      
      // Get the current users in the group
      const response = await permissionService.getGroupUsers(state.selectedGroup.id);
      const currentUserIds = response.userGroups.map((userGroup: UserGroup) => userGroup.userId);
      
      // Determine which users to add and which to remove
      const usersToAdd = selectedUsers.filter(userId => !currentUserIds.includes(userId));
      const usersToRemove = currentUserIds.filter(userId => !selectedUsers.includes(userId));
      
      // Process removals first, then additions (sequentially)
      // Remove users first
      for (const userId of usersToRemove) {
        await permissionService.removeUserGroups(userId, [state.selectedGroup!.id]);
      }
      
      // Then add users
      for (const userId of usersToAdd) {
        await permissionService.assignUserGroups(userId, [state.selectedGroup!.id]);
      }
      
      setState(prev => ({ 
        ...prev, 
        saving: false,
        success: 'Group members updated successfully' 
      }));
      
      handleCloseMembersDialog();
      loadGroups();
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to update group members',
        saving: false 
      }));
    }
  };

  const handleAddUser = (userId: number) => {
    if (!selectedUsers.includes(userId)) {
      setSelectedUsers(prev => [...prev, userId]);
    }
  };

  const handleRemoveUser = (userId: number) => {
    setSelectedUsers(prev => prev.filter(id => id !== userId));
  };
  
  // Filter users based on search term and active status
  const filteredUsers = useMemo(() => {
    return state.users.filter(user => {
      // Only include active users
      if (!user.isActive) return false;
      
      // Filter by search term
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const email = user.email.toLowerCase();
      const searchTerm = userSearchTerm.toLowerCase();
      return fullName.includes(searchTerm) || email.includes(searchTerm);
    });
  }, [state.users, userSearchTerm]);

  const handleOpenRoles = async (group: Group) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Get current group roles
      const response = await permissionService.getGroupRoles(group.id);
      setSelectedRoles(response.groupRoles.map((groupRole: GroupRole) => groupRole.roleId));
      
      setState(prev => ({ 
        ...prev, 
        selectedGroup: group,
        loading: false 
      }));
      
      setRolesDialogOpen(true);
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to load group roles',
        loading: false 
      }));
    }
  };

  const handleCloseRolesDialog = () => {
    setRolesDialogOpen(false);
    setSelectedRoles([]);
    setState(prev => ({ ...prev, selectedGroup: null }));
  };

  const handleUpdateRoles = async () => {
    if (!state.selectedGroup) return;
    
    try {
      setState(prev => ({ ...prev, saving: true, error: null }));
      
      // Get current group roles
      const response = await permissionService.getGroupRoles(state.selectedGroup.id);
      const currentRoleIds = response.groupRoles.map((groupRole: GroupRole) => groupRole.roleId);
      
      // Determine which roles to add and which to remove
      const rolesToAdd = selectedRoles.filter(roleId => !currentRoleIds.includes(roleId));
      const rolesToRemove = currentRoleIds.filter(roleId => !selectedRoles.includes(roleId));
      
      // Only remove roles that need to be removed
      if (rolesToRemove.length > 0) {
        await permissionService.removeGroupRoles(state.selectedGroup.id, rolesToRemove);
      }
      
      // Only add roles that need to be added
      if (rolesToAdd.length > 0) {
        await permissionService.addGroupRoles(state.selectedGroup.id, rolesToAdd);
      }
      
      setState(prev => ({ 
        ...prev, 
        saving: false,
        success: 'Group roles updated successfully' 
      }));
      
      handleCloseRolesDialog();
      loadGroups();
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to update group roles',
        saving: false 
      }));
    }
  };

  const handleRoleToggle = (roleId: number) => {
    setSelectedRoles(prev => 
      prev.includes(roleId) 
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  const handleCategoryToggle = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  useEffect(() => {
    console.log('useEffect called to load Groups, Users, and Roles');
    
    const loadData = async () => {
      try {
        console.log('Loading users');
        await loadUsers();
        console.log('Users loaded, now loading roles');
        await loadRoles();
        console.log('Roles loaded, now loading groups');
        await loadGroups();
        console.log('All data loaded successfully');
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    loadData();
  }, [loadGroups, loadUsers, loadRoles]);

  const handleAddGroup = useCallback(() => {
    setState(prev => ({ ...prev, isFormOpen: true, selectedGroup: null }));
  }, []);

  const handleEditGroup = useCallback((group: Group) => {
    setState(prev => ({ ...prev, isFormOpen: true, selectedGroup: group }));
  }, []);

  // Removed DataGrid columns definition

  const filteredRoles = useMemo(() => {
    if (!roleSearchTerm) return roles;
    const searchLower = roleSearchTerm.toLowerCase();
    return roles.filter(role => 
      role.name.toLowerCase().includes(searchLower)
    );
  }, [roles, roleSearchTerm]);

  const groupedRoles = useMemo(() => {
    const groups = new Map<string, Role[]>();
    
    filteredRoles.forEach(role => {
      // Handle special cases first
      if (role.name === 'Administrator' || role.name === 'Admin') {
        const list = groups.get('Admin') || [];
        list.push(role);
        groups.set('Admin', list);
        return;
      }

      // For other roles, try to find a meaningful category
      let category: string;
      if (role.name.includes('BillPay')) {
        category = 'BillPay';
      } else if (role.name.includes('Connect')) {
        category = 'Connect';
      } else if (role.name.includes('Security')) {
        category = 'Security';
      } else if (role.name.includes('User')) {
        category = 'User';
      } else if (role.name.includes('IdP')) {
        category = 'Identity';
      } else {
        // If no specific category found, use the first word or the whole name
        category = role.name.split(/[_\s]/)[0];
      }
      
      const list = groups.get(category) || [];
      list.push(role);
      groups.set(category, list);
    });
    
    // Sort roles within each category
    groups.forEach((roles, category) => {
      groups.set(category, roles.sort((a, b) => a.name.localeCompare(b.name)));
    });
    
    return Array.from(groups.entries()).sort((a, b) => {
      // Put Admin category first
      if (a[0] === 'Admin') return -1;
      if (b[0] === 'Admin') return 1;
      // Then sort other categories alphabetically
      return a[0].localeCompare(b[0]);
    });
  }, [filteredRoles]);

  if (state.loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" color="text.primary">Groups</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddGroup}
        >
          Add Group
        </Button>
      </Box>
      {state.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {state.error}
        </Alert>
      )}
      {state.success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {state.success}
        </Alert>
      )}
      {/* Using the new GroupTable component */}
      <Box sx={{ mt: 2 }}>
        {state.groups.length > 0 ? (
          <GroupTable
            groups={state.groups.filter(group => group && group.id !== undefined && group.id !== null)}
            onEdit={handleEditGroup}
            onDelete={(group) => handleDeleteGroup(group.id)}
            onManageMembers={handleOpenMembers}
            onManageRoles={handleOpenRoles}
          />
        ) : (
          <Typography sx={{ p: 2 }}>No groups available</Typography>
        )}
      </Box>
      {/* Group Form Dialog */}
      <Dialog
        open={state.isFormOpen}
        onClose={() => setState(prev => ({ ...prev, isFormOpen: false, selectedGroup: null }))}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {state.selectedGroup ? 'Edit Group' : 'Create Group'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              required
              defaultValue={state.selectedGroup?.name || ''}
              margin="normal"
              inputProps={{
                id: 'group-name-input'
              }}
            />
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={3}
              defaultValue={state.selectedGroup?.description || ''}
              margin="normal"
              inputProps={{
                id: 'group-description-input'
              }}
            />

          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setState(prev => ({ ...prev, isFormOpen: false, selectedGroup: null }))}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              const nameInput = document.getElementById('group-name-input') as HTMLInputElement;
              const descriptionInput = document.getElementById('group-description-input') as HTMLInputElement;
              const formData = {
                name: nameInput?.value || '',
                description: descriptionInput?.value || '',
                clientId: Number(clientId)
              };
              if (state.selectedGroup) {
                handleUpdateGroup(state.selectedGroup.id, formData);
              } else {
                handleCreateGroup(formData);
              }
            }}
            disabled={state.saving}
          >
            {state.saving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={false}
        onClose={() => setState(prev => ({ ...prev, selectedGroup: undefined }))}
      >
        <DialogTitle>Delete Group</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this group? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setState(prev => ({ ...prev, selectedGroup: undefined }))}>
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteGroup(state.selectedGroup!.id)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Group Members Dialog */}
      <Dialog 
        open={membersDialogOpen} 
        onClose={handleCloseMembersDialog}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          Edit Group Members - {state.selectedGroup?.name}
        </DialogTitle>
        <DialogContent>
          {state.users.length > 0 ? (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                {/* Left side - Available Users */}
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" gutterBottom>Available Users</Typography>
                    <TextField
                      label="Search Users"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={userSearchTerm}
                      onChange={(e) => setUserSearchTerm(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <Box sx={{ flexGrow: 1, overflow: 'auto', maxHeight: '400px' }}>
                      <List dense>
                        {filteredUsers
                          .filter(user => !selectedUsers.includes(user.id))
                          .map(user => (
                            <ListItem 
                              key={user.id}
                              secondaryAction={
                                <IconButton 
                                  edge="end" 
                                  aria-label="add"
                                  onClick={() => handleAddUser(user.id)}
                                  color="primary"
                                >
                                  <AddIcon />
                                </IconButton>
                              }
                            >
                              <ListItemText 
                                primary={`${user.firstName} ${user.lastName}`}
                                secondary={user.email}
                              />
                            </ListItem>
                          ))}
                        {filteredUsers.filter(user => !selectedUsers.includes(user.id)).length === 0 && (
                          <Typography variant="body2" sx={{ p: 2, color: 'text.secondary' }}>
                            No available users found
                          </Typography>
                        )}
                      </List>
                    </Box>
                  </Paper>
                </Grid>
                
                {/* Right side - Assigned Users */}
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" gutterBottom>Assigned Users</Typography>
                    <Box sx={{ flexGrow: 1, overflow: 'auto', maxHeight: '400px' }}>
                      <List dense>
                        {state.users
                          .filter(user => selectedUsers.includes(user.id) && user.isActive)
                          .map(user => (
                            <ListItem 
                              key={user.id}
                              secondaryAction={
                                <IconButton 
                                  edge="end" 
                                  aria-label="remove"
                                  onClick={() => handleRemoveUser(user.id)}
                                  color="error"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              }
                            >
                              <ListItemText 
                                primary={`${user.firstName} ${user.lastName}`}
                                secondary={user.email}
                              />
                            </ListItem>
                          ))}
                        {selectedUsers.length === 0 && (
                          <Typography variant="body2" sx={{ p: 2, color: 'text.secondary' }}>
                            No users assigned to this group
                          </Typography>
                        )}
                      </List>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Typography>No users available</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMembersDialog}>Cancel</Button>
          <Button 
            onClick={handleUpdateMembers}
            variant="contained" 
            color="primary"
            disabled={state.saving}
          >
            {state.saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Roles Dialog */}
      <Dialog 
        open={rolesDialogOpen} 
        onClose={handleCloseRolesDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Edit Group Roles - {state.selectedGroup?.name}
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Select the roles to assign to this group. Users in this group will inherit all permissions from the selected roles.
          </Typography>
          
          <Grid container spacing={2}>
            {/* Available Roles Column */}
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ height: '100%' }}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Available Roles
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    label="Search available roles..."
                    variant="outlined"
                    value={roleSearchTerm}
                    onChange={(e) => setRoleSearchTerm(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Box sx={{ maxHeight: '50vh', overflow: 'auto' }}>
                    <List dense disablePadding>
                      {groupedRoles.map(([category, categoryRoles]) => {
                        // Filter out roles that are already selected
                        const availableRoles = categoryRoles.filter(role => !selectedRoles.includes(role.id));
                        
                        // Skip categories with no available roles
                        if (availableRoles.length === 0) return null;
                        
                        return (
                          <Box key={`available-${category}`}>
                            <ListItem 
                              button 
                              onClick={() => handleCategoryToggle(`available-${category}`)}
                              sx={{
                                bgcolor: 'background.paper',
                                borderBottom: '1px solid',
                                borderColor: 'divider'
                              }}
                            >
                              <ListItemText 
                                primary={
                                  <Typography variant="subtitle2" color="primary">
                                    {category}
                                  </Typography>
                                } 
                              />
                              {expandedCategories.has(`available-${category}`) ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                            </ListItem>
                            <Collapse in={expandedCategories.has(`available-${category}`)} timeout="auto" unmountOnExit>
                              <List component="div" disablePadding>
                                {availableRoles.map(role => (
                                  <ListItem 
                                    key={role.id} 
                                    button
                                    onClick={() => handleRoleToggle(role.id)}
                                    sx={{ 
                                      pl: 4,
                                      '&:hover': {
                                        bgcolor: 'action.hover'
                                      }
                                    }}
                                  >
                                    <ListItemText 
                                      primary={role.name}
                                      primaryTypographyProps={{ variant: 'body2' }}
                                    />
                                    <Button 
                                      size="small" 
                                      color="primary" 
                                      variant="outlined"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleRoleToggle(role.id);
                                      }}
                                    >
                                      Add
                                    </Button>
                                  </ListItem>
                                ))}
                              </List>
                            </Collapse>
                          </Box>
                        );
                      })}
                    </List>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            
            {/* Assigned Roles Column */}
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ height: '100%' }}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="primary">
                    Assigned Roles
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    label="Search assigned roles..."
                    variant="outlined"
                    value={roleSearchTerm}
                    onChange={(e) => setRoleSearchTerm(e.target.value)}
                    sx={{ mb: 2, bgcolor: 'background.paper', borderRadius: 1 }}
                  />
                  <Box sx={{ maxHeight: '50vh', overflow: 'auto' }}>
                    <List dense disablePadding>
                      {groupedRoles.map(([category, categoryRoles]) => {
                        // Filter to only show selected roles
                        const assignedRoles = categoryRoles.filter(role => selectedRoles.includes(role.id));
                        
                        // Skip categories with no assigned roles
                        if (assignedRoles.length === 0) return null;
                        
                        return (
                          <Box key={`assigned-${category}`}>
                            <ListItem 
                              button 
                              onClick={() => handleCategoryToggle(`assigned-${category}`)}
                              sx={{
                                bgcolor: 'background.paper',
                                borderBottom: '1px solid',
                                borderColor: 'divider'
                              }}
                            >
                              <ListItemText 
                                primary={
                                  <Typography variant="subtitle2" color="primary">
                                    {category}
                                  </Typography>
                                } 
                              />
                              {expandedCategories.has(`assigned-${category}`) ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                            </ListItem>
                            <Collapse in={expandedCategories.has(`assigned-${category}`)} timeout="auto" unmountOnExit>
                              <List component="div" disablePadding>
                                {assignedRoles.map(role => (
                                  <ListItem 
                                    key={role.id} 
                                    button
                                    onClick={() => handleRoleToggle(role.id)}
                                    sx={{ 
                                      pl: 4,
                                      '&:hover': {
                                        bgcolor: 'action.hover'
                                      }
                                    }}
                                  >
                                    <ListItemText 
                                      primary={role.name}
                                      primaryTypographyProps={{ variant: 'body2' }}
                                    />
                                    <Button 
                                      size="small" 
                                      color="error" 
                                      variant="outlined"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleRoleToggle(role.id);
                                      }}
                                    >
                                      Remove
                                    </Button>
                                  </ListItem>
                                ))}
                              </List>
                            </Collapse>
                          </Box>
                        );
                      })}
                    </List>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRolesDialog}>Cancel</Button>
          <Button 
            onClick={handleUpdateRoles}
            variant="contained" 
            color="primary"
            disabled={state.saving}
          >
            {state.saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
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
import { SecurityRole, Permission } from '../../types/client.types';
import { ClientService } from '../../../services/implementations/real/ClientService';
import { PermissionService } from '../../../services/implementations/real/PermissionService';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import { PermissionCategory, PermissionAction } from '../../types/permission.types';
import { encodeId, decodeId } from '../../utils/idEncoder';
import PermissionTreeView from './groups/PermissionTreeView';

interface RoleEditProps {
  clientId: string;
  roleId?: string;
}

// Get service instances



// Get service instances

// Convert permissions array to PermissionCategory format
    // Ensure actions are of type PermissionAction



        // Fetch all available permissions

        // If editing existing role, fetch its data






        // Update existing role
        // Create new role


      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );

    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        {roleId ? 'Edit Role' : 'Create New Role'}
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
        />

        <TextField
        />

        <Typography variant="subtitle1" gutterBottom>
        </Typography>

        <PermissionTreeView
              ? selectedPermissions.filter(p => p.id !== permission.id)
              : [...selectedPermissions, permission];
        />
      </Paper>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
        >
        </Button>
        <Button
        >
          {saving ? 'Saving...' : 'Save Role'}
        </Button>
      </Box>
    </Box>
  );


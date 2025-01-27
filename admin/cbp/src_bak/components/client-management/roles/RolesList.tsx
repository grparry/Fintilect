import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
  CircularProgress,
  Chip,
  TextField,
  InputAdornment,
  SvgIcon
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { SecurityRole, Permission } from '../../types/client.types';
import { ClientService } from '../../../services/implementations/real/ClientService';
import { PermissionService } from '../../../services/implementations/real/PermissionService';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import { encodeId, decodeId } from '../../utils/idEncoder';
import { shouldUseMockData } from '../../../config/api.config';

// Get service instances


// Get service instances





        ...prev, 


        ...prev,
        ...prev,

      ...prev,



    // Filter
      );

    // Sort


      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );

    <Box>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="h6">Roles</Typography>
        <TextField
              <InputAdornment position="start">
                <SvgIcon component={SearchIcon} />
              </InputAdornment>
            )
        />
      </Box>

      {state.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {state.error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort('name')}>Name</TableCell>
              <TableCell onClick={() => handleSort('description')}>Description</TableCell>
              <TableCell>System Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedRoles.map(role => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  {role.isSystem ? (
                    <Chip label="Yes" color="primary" size="small" />
                  ) : (
                    <Chip label="No" variant="outlined" size="small" />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                  >
                    <EditIcon />
                  </IconButton>
                  {!role.isSystem && (
                    <IconButton
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setState(prev => ({ ...prev, deleteDialogOpen: false, roleToDelete: null }))}>Cancel</Button>
          <Button onClick={handleDeleteRole} color="error" autoFocus>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );


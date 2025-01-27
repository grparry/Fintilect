import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Stack,
  Chip,
  Alert,
} from '@mui/material';
import { Connection, SyncDialogProps } from '../../types/money-desktop.types';

const statusColors = {
  Connected: 'success',
  Error: 'error',
  Pending: 'warning'
} as const;

const SyncDialog: React.FC<SyncDialogProps> = ({
  open,
  onClose,
  connection,
  onSync,
}) => {
  if (!connection) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose}>




    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Sync Connection</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography gutterBottom>
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Institution</Typography>
            <Typography>{connection.institutionName}</Typography>
            <Typography variant="subtitle2">Status</Typography>
            <Chip
            />
            <Typography variant="subtitle2">Last Sync</Typography>
            <Typography>{connection.lastSync ? new Date(connection.lastSync).toLocaleString() : 'Never'}</Typography>
            <Typography variant="subtitle2">Account Information</Typography>
            <Typography>
              {connection.accountCount} Account{connection.accountCount !== 1 ? 's' : ''} |{' '}
            </Typography>
            {connection.lastError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {connection.lastError}
              </Alert>
            )}
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
        >
        </Button>
      </DialogActions>
    </Dialog>
  );


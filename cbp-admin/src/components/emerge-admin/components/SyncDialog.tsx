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
import { Connection, SyncDialogProps } from '@/../../types/money-desktop.types';

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
      <DialogTitle>Sync Connection</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography gutterBottom>
            Are you sure you want to sync this connection?
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Institution</Typography>
            <Typography>{connection.institutionName}</Typography>
            <Typography variant="subtitle2">Status</Typography>
            <Chip
              label={connection.status}
              color={statusColors[connection.status]}
              size="small"
              sx={{ width: 'fit-content' }}
            />
            <Typography variant="subtitle2">Last Sync</Typography>
            <Typography>{connection.lastSync ? new Date(connection.lastSync).toLocaleString() : 'Never'}</Typography>
            <Typography variant="subtitle2">Account Information</Typography>
            <Typography>
              {connection.accountCount} Account{connection.accountCount !== 1 ? 's' : ''} |{' '}
              Total Balance: ${connection.totalBalance.toLocaleString()}
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
          variant="contained"
          color="primary"
          onClick={() => {
            onSync(connection);
            onClose();
          }}
        >
          Sync Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SyncDialog;

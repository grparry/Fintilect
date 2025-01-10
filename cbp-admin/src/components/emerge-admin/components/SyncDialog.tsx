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
} from '@mui/material';
import { Connection, SyncDialogProps } from '../../../types/money-desktop.types';

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
            <Typography variant="subtitle2">Client</Typography>
            <Typography>{connection.clientName}</Typography>
            <Typography variant="subtitle2">Institution</Typography>
            <Typography>{connection.institutionName}</Typography>
            <Typography variant="subtitle2">Last Sync</Typography>
            <Typography>{connection.lastSync || 'Never'}</Typography>
            {connection.error && (
              <Typography color="error">
                Last Error: {connection.error}
              </Typography>
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

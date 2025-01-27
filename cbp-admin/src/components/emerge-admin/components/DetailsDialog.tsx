import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Grid,
  Typography,
  Chip,
  Alert,
} from '@mui/material';
import { Connection, Account, DetailsDialogProps } from '../../../types/money-desktop.types';
import { statusColors } from '../MoneyDesktop';

const DetailsDialog: React.FC<DetailsDialogProps> = ({
  open,
  onClose,
  item,
  type,
  onSync,
}) => {
  const isConnection = type === 'connection';

  if (!item) {
    return null;
  }

  const connectionItem = item as Connection;
  const accountItem = item as Account;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {isConnection ? 'Connection Details' : 'Account Details'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          {isConnection ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Institution</Typography>
                  <Typography>{connectionItem.institutionName}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Status</Typography>
                  <Chip
                    label={connectionItem.status}
                    color={statusColors[connectionItem.status]}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Last Sync</Typography>
                  <Typography>{new Date(connectionItem.lastSync).toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Created At</Typography>
                  <Typography>{new Date(connectionItem.createdAt).toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Number of Accounts</Typography>
                  <Typography>{connectionItem.accountCount}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Total Balance</Typography>
                  <Typography>${connectionItem.totalBalance.toLocaleString()}</Typography>
                </Grid>
                {connectionItem.lastError && (
                  <Grid item xs={12}>
                    <Alert severity="error">{connectionItem.lastError}</Alert>
                  </Grid>
                )}
              </Grid>
            </>
          ) : (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Institution</Typography>
                  <Typography>{accountItem.institutionName}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Account Name</Typography>
                  <Typography>{accountItem.accountName}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Account Number</Typography>
                  <Typography>{accountItem.accountNumber}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Type</Typography>
                  <Typography>{accountItem.type}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Status</Typography>
                  <Chip
                    label={accountItem.status}
                    color={statusColors[accountItem.status]}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Balance</Typography>
                  <Typography>${accountItem.balance.toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Last Updated</Typography>
                  <Typography>{new Date(accountItem.lastUpdated).toLocaleString()}</Typography>
                </Grid>
              </Grid>
            </>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {isConnection && onSync && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onSync(connectionItem);
              onClose();
            }}
          >
            Sync Now
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DetailsDialog;

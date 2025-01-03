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
import { DetailsDialogProps } from '../../../types/money-desktop.types';
import { statusColors } from '../MoneyDesktop';

const DetailsDialog: React.FC<DetailsDialogProps> = ({
  open,
  onClose,
  item,
  type,
  onSync,
}) => {
  const isConnection = type === 'connection';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {isConnection ? 'Connection Details' : 'Account Details'}
      </DialogTitle>
      <DialogContent>
        {item && (
          <Stack spacing={3} sx={{ mt: 2 }}>
            {isConnection ? (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">Client Name</Typography>
                    <Typography>{item.clientName}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">Institution</Typography>
                    <Typography>{item.institutionName}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">Status</Typography>
                    <Chip
                      label={item.status}
                      color={statusColors[item.status]}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">Last {isConnection ? 'Sync' : 'Updated'}</Typography>
                    <Typography>{isConnection ? (item as any).lastSync : (item as any).lastUpdated}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">Number of Accounts</Typography>
                    <Typography>{(item as any).accounts}</Typography>
                  </Grid>
                </Grid>
                {(item as any).error && (
                  <Alert severity="error">
                    Error: {(item as any).error}
                  </Alert>
                )}
              </>
            ) : (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">Client Name</Typography>
                    <Typography>{item.clientName}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">Institution</Typography>
                    <Typography>{item.institutionName}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">Account Name</Typography>
                    <Typography>{(item as any).accountName}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">Account Number</Typography>
                    <Typography>{(item as any).accountNumber}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">Type</Typography>
                    <Typography>{(item as any).type}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">Balance</Typography>
                    <Typography>${(item as any).balance.toLocaleString()}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">Status</Typography>
                    <Chip
                      label={item.status}
                      color={statusColors[item.status]}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">Last {isConnection ? 'Sync' : 'Updated'}</Typography>
                    <Typography>{isConnection ? (item as any).lastSync : (item as any).lastUpdated}</Typography>
                  </Grid>
                </Grid>
              </>
            )}
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {isConnection && onSync && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onClose();
              onSync(item as any);
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

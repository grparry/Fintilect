import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  Divider,
  Box,
  IconButton,
  Button,
  DialogActions,
  TextField,
  InputAdornment,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import { Payment } from '../../../types/payment.types';
import dayjs from 'dayjs';

interface PaymentDetailsProps {
  open: boolean;
  onClose: () => void;
  payment: Payment;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ open, onClose, payment }) => {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleCancelPayment = () => {
    // TODO: Implement cancel payment API call
    setCancelDialogOpen(false);
    onClose();
  };

  const handleEditPayment = (updatedPayment: Partial<Payment>) => {
    // TODO: Implement edit payment API call
    setEditDialogOpen(false);
    onClose();
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="sm" 
        fullWidth
        hideBackdrop
        sx={{ 
          '& .MuiDialog-paper': {
            position: 'relative',
            zIndex: 1400,
            backgroundColor: '#424242'
          }
        }}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" color="text.primary">Payment Details</Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {/* Payment Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">Payment Information</Typography>
              <Divider sx={{ my: 1 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Payment ID</Typography>
                  <Typography variant="body1" color="text.primary">{payment.Id}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Status</Typography>
                  <Typography variant="body1" color="text.primary">{payment.Status}</Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Client Details */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">Client Details</Typography>
              <Divider sx={{ my: 1 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Member ID</Typography>
                  <Typography variant="body1" color="text.primary">{payment.MemberId}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Source Application</Typography>
                  <Typography variant="body1" color="text.primary">{payment.SourceApplication || 'N/A'}</Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Payee Details */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">Payee Details</Typography>
              <Divider sx={{ my: 1 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Payee List ID</Typography>
                  <Typography variant="body1" color="text.primary">{payment.UserPayeeListId}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Bill Reference</Typography>
                  <Typography variant="body1" color="text.primary">{payment.BillReference}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Funding Account</Typography>
                  <Typography variant="body1" color="text.primary">{payment.FundingAccount}</Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Payment Details */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">Payment Details</Typography>
              <Divider sx={{ my: 1 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Process Date</Typography>
                  <Typography variant="body1" color="text.primary">
                    {payment.ProcessDate ? new Date(payment.ProcessDate).toLocaleDateString() : 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Will Process Date</Typography>
                  <Typography variant="body1" color="text.primary">
                    {new Date(payment.WillProcessDate).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Amount</Typography>
                  <Typography variant="body1" color="text.primary">
                    ${Number(payment.Amount).toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Memo</Typography>
                  <Typography variant="body1" color="text.primary">{payment.Memo}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        {payment.Status === 'PENDING' && (
          <DialogActions>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => setEditDialogOpen(true)}
            >
              Edit Payment
            </Button>
            <Button 
              variant="contained" 
              color="error"
              onClick={() => setCancelDialogOpen(true)}
            >
              Cancel Payment
            </Button>
          </DialogActions>
        )}
      </Dialog>

      {/* Cancel Payment Confirmation Dialog */}
      <Dialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Cancel Payment</Typography>
            <IconButton onClick={() => setCancelDialogOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Payment will be cancelled. Are you sure you want to cancel the payment?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleCancelPayment}
          >
            Cancel Payment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Payment Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Edit Pending Payment</Typography>
            <IconButton onClick={() => setEditDialogOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Will Process Date"
                    defaultValue={dayjs(payment.WillProcessDate)}
                    slotProps={{
                      textField: {
                        required: true,
                        fullWidth: true,
                        error: false
                      }
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Amount"
                  type="number"
                  defaultValue={payment.Amount}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setEditDialogOpen(false)}
          >
            Cancel Changes
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEditPayment({
              // Add updated payment details here
            })}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PaymentDetails;

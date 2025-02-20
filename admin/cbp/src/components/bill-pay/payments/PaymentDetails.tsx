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
import { Payment } from '../../../types/bill-pay.types';
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
                  <Typography variant="body1" color="text.primary">{payment.id}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Status</Typography>
                  <Typography variant="body1" color="text.primary">{payment.status}</Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Client Details */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">Client Details</Typography>
              <Divider sx={{ my: 1 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Client ID</Typography>
                  <Typography variant="body1" color="text.primary">{payment.clientId}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Client Name</Typography>
                  <Typography variant="body1" color="text.primary">{payment.clientName}</Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Payee Details */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">Payee Details</Typography>
              <Divider sx={{ my: 1 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Payee ID</Typography>
                  <Typography variant="body1" color="text.primary">{payment.payeeId}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Payee Name</Typography>
                  <Typography variant="body1" color="text.primary">{payment.payeeName}</Typography>
                </Grid>
                {payment.recipient && (
                  <>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Account Number</Typography>
                      <Typography variant="body1" color="text.primary">{payment.recipient.accountNumber}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Routing Number</Typography>
                      <Typography variant="body1" color="text.primary">{payment.recipient.routingNumber}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">Bank Name</Typography>
                      <Typography variant="body1" color="text.primary">{payment.recipient.bankName}</Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>

            {/* Payment Details */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">Payment Details</Typography>
              <Divider sx={{ my: 1 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Will Process Date</Typography>
                  <Typography variant="body1" color="text.primary">
                    {new Date(payment.effectiveDate).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Payment Type</Typography>
                  <Typography variant="body1" color="text.primary">
                    {payment.method === 'ach' ? 'Electronic' : 'Check'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Amount</Typography>
                  <Typography variant="body1" color="text.primary">
                    ${payment.amount.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Currency</Typography>
                  <Typography variant="body1" color="text.primary">{payment.currency}</Typography>
                </Grid>
                {payment.description && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">Description</Typography>
                    <Typography variant="body1" color="text.primary">{payment.description}</Typography>
                  </Grid>
                )}
                {payment.reference && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">Reference</Typography>
                    <Typography variant="body1" color="text.primary">{payment.reference}</Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        {payment.status === 'PENDING' && (
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
                    defaultValue={dayjs(payment.effectiveDate)}
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
                  defaultValue={payment.amount}
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

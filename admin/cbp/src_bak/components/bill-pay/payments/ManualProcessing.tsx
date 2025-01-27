import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Divider,
  Alert,
  Stack,
  InputAdornment,
  FormHelperText,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  SelectChangeEvent,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import dayjs, { Dayjs } from 'dayjs';
import {
  Client as BillPayClient,
  Payee,
  ManualPayment,
  ManualPaymentFormData,
  ManualPaymentValidation,
  PaymentMethod as BillPayPaymentMethod,
  PendingPayment,
  Payment,
  Priority
} from '../../../types/bill-pay.types';
import {
  PaymentTransaction,
  PaymentType,
  PaymentStatus,
  PaymentPriority,
  PaymentValidation,
  ProcessorConfig,
  PaymentMethod,
  PaymentSchedule
} from '../../../types/payment.types';
import { Client, ClientStatus } from '../../types/client.types';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import { useAuth } from '../../../hooks/useAuth';
import { AuthContextType } from '../../../types/auth.types';

interface PaymentForm {
  clientId: string;
  payeeId: string;
  amount: string;
  paymentType: PaymentMethod;
  effectiveDate: Dayjs;
  memo?: string;
  accountNumber: string;
  routingNumber: string;
  bankName: string;
}

interface PaymentLimits {
  min: number;
  max: number;
  currency: string;
  dailyLimit: number;
  monthlyLimit: number;
}

interface ValidationState {
  errors: Record<string, string>;
  warnings: Record<string, string>;
}

const initialPaymentForm: PaymentForm = {
  clientId: '',
  payeeId: '',
  amount: '',
  paymentType: PaymentMethod.ACH,
  effectiveDate: dayjs(),
  memo: '',
  accountNumber: '',
  routingNumber: '',
  bankName: '',
};

const paymentTypes = [
  { value: PaymentMethod.ACH, label: 'ACH' },






  { value: PaymentMethod.ACH, label: 'ACH' },
  { value: PaymentMethod.WIRE, label: 'Wire' },
  { value: PaymentMethod.CHECK, label: 'Check' },
  { value: PaymentMethod.CARD, label: 'Card' }
];


  // State
    [PaymentMethod.ACH]: 0,
    [PaymentMethod.WIRE]: 0,
    [PaymentMethod.CHECK]: 0,
    [PaymentMethod.CARD]: 0

  // Fetch initial data
        .filter((client) => client.status === ClientStatus.Active)
        .map(client => ({

  // Fetch payees when client changes
        .filter(contact => contact.isPrimary)
        .map(contact => ({

  // Fetch payment limits when client or payment type changes
        [PaymentMethod.ACH]: config.validationRules.maxAmount || 0,
        [PaymentMethod.WIRE]: config.validationRules.maxAmount || 0,
        [PaymentMethod.CHECK]: config.validationRules.maxAmount || 0,
        [PaymentMethod.CARD]: config.validationRules.maxAmount || 0




  // Form handlers
    _: React.SyntheticEvent,
  ) => {
      ...prev,

    _: React.SyntheticEvent,
  ) => {
      ...prev,


      ...prev,

      ...prev,

  ) => {

  // Validation


      ...prev,


    // Required field validation

    // Convert validation errors to state format







            ...acc,
            [err.code]: err.message,


      
      // Show success message or redirect





        // Show success message

  // Render functions
    <Autocomplete
        <TextField
          {...params}
        />
      )}
    />
  );

    <Autocomplete
        <TextField
          {...params}
        />
      )}
    />
  );

    <TextField
        (paymentLimits &&
          `Limit: ${paymentLimits[form.paymentType]}`)
    />
  );

    <FormControl
    >
      <InputLabel>Payment Type</InputLabel>
      <Select
      >
        {paymentTypes.map((type) => (
          <MenuItem key={type.value} value={type.value}>
            {type.label}
          </MenuItem>
        ))}
      </Select>
      {validation.errors.paymentType && (
        <FormHelperText>{validation.errors.paymentType}</FormHelperText>
      )}
    </FormControl>
  );

    <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
      <DialogTitle>Confirm Payment</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Client</Typography>
            <Typography>{selectedClient?.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Payee</Typography>
            <Typography>{selectedPayee?.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Amount</Typography>
            <Typography>
              ${parseFloat(form.amount).toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Payment Type</Typography>
            <Typography>{form.paymentType}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Effective Date</Typography>
            <Typography>{form.effectiveDate.format('YYYY-MM-DD')}</Typography>
          </Grid>
          {form.memo && (
            <Grid item xs={12}>
              <Typography variant="subtitle2">Memo</Typography>
              <Typography>{form.memo}</Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
        <Button
        >
        </Button>
      </DialogActions>
    </Dialog>
  );

    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {renderClientField()}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderPayeeField()}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderAmountField()}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderPaymentTypeField()}
          </Grid>
          <Grid item xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
            />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
              >
              </Button>
              <Button
                  !form.clientId ||
                  !form.payeeId ||
                  !form.amount ||
              >
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {renderConfirmDialog()}
    </Box>
  );


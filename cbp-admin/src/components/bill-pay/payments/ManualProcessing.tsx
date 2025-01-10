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
  Client,
  Payee,
  ManualPayment,
  ManualPaymentFormData,
  ManualPaymentValidation,
  PaymentMethod,
  PendingPayment,
  Payment,
  Priority
} from '../../../types/bill-pay.types';
import { paymentApi } from '../../../services/api/payment.api';
import { useAuth } from '../../../hooks/useAuth';

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
  bankName: ''
};

const paymentTypes = [
  { value: PaymentMethod.ACH, label: 'ACH' },
  { value: PaymentMethod.WIRE, label: 'Wire' },
  { value: PaymentMethod.CHECK, label: 'Check' },
  { value: PaymentMethod.RTP, label: 'RTP' }
];

const ManualProcessing: React.FC = () => {
  const { user } = useAuth();

  // State
  const [clients, setClients] = useState<Client[]>([]);
  const [payees, setPayees] = useState<Payee[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedPayee, setSelectedPayee] = useState<Payee | null>(null);
  const [form, setForm] = useState<PaymentForm>(initialPaymentForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validation, setValidation] = useState<ValidationState>({
    errors: {},
    warnings: {},
  });
  const [paymentLimits, setPaymentLimits] = useState<Record<PaymentMethod, number>>({
    [PaymentMethod.ACH]: 0,
    [PaymentMethod.WIRE]: 0,
    [PaymentMethod.CHECK]: 0,
    [PaymentMethod.RTP]: 0,
    [PaymentMethod.CARD]: 0
  });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // Fetch initial data
  const fetchInitialData = useCallback(async () => {
    try {
      setError(null);
      const clients = await paymentApi.getClients();
      setClients(clients.data.filter((client) => client.status === 'active'));
    } catch (err) {
      setError('Failed to load clients');
      console.error('Error loading clients:', err);
    }
  }, []); // No dependencies needed

  // Fetch payees when client changes
  const fetchPayees = useCallback(async () => {
    if (!selectedClient) return;
    try {
      setError(null);
      const payees = await paymentApi.getPayees();
      setPayees(
        payees.data.filter(
          (payee) => payee.clientId === selectedClient.id && payee.status === 'active'
        )
      );
    } catch (err) {
      setError('Failed to load payees');
      console.error('Error loading payees:', err);
    }
  }, [selectedClient]); // Depends on selectedClient

  // Fetch payment limits when client or payment type changes
  const fetchPaymentLimits = useCallback(async () => {
    if (!selectedClient) return;
    try {
      setError(null);
      const limits = await paymentApi.getPaymentLimits();
      setPaymentLimits({
        [PaymentMethod.ACH]: limits.data[PaymentMethod.ACH] || 0,
        [PaymentMethod.WIRE]: limits.data[PaymentMethod.WIRE] || 0,
        [PaymentMethod.CHECK]: limits.data[PaymentMethod.CHECK] || 0,
        [PaymentMethod.RTP]: limits.data[PaymentMethod.RTP] || 0,
        [PaymentMethod.CARD]: limits.data[PaymentMethod.CARD] || 0
      });
    } catch (err) {
      setError('Failed to load payment limits');
      console.error('Error loading payment limits:', err);
    }
  }, [selectedClient, form.paymentType]); // Depends on selectedClient and payment type

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    fetchPayees();
  }, [fetchPayees]);

  useEffect(() => {
    fetchPaymentLimits();
  }, [fetchPaymentLimits]);

  // Form handlers
  const handleClientChange = (
    _: React.SyntheticEvent,
    client: Client | null
  ) => {
    setSelectedClient(client);
    setSelectedPayee(null);
    setForm((prev) => ({
      ...prev,
      clientId: client?.id.toString() || '',
      payeeId: '',
    }));
    setValidation({ errors: {}, warnings: {} });
  };

  const handlePayeeChange = (
    _: React.SyntheticEvent,
    payee: Payee | null
  ) => {
    setSelectedPayee(payee);
    setForm((prev) => ({
      ...prev,
      payeeId: payee?.id.toString() || '',
    }));
    setValidation({ errors: {}, warnings: {} });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setForm((prev) => ({ ...prev, amount: value }));
      validateAmount(value);
    }
  };

  const handlePaymentTypeChange = (event: SelectChangeEvent<PaymentMethod>) => {
    setForm((prev) => ({
      ...prev,
      paymentType: event.target.value as PaymentMethod,
    }));
  };

  const handleDateChange = (date: Dayjs | null) => {
    setForm((prev) => ({
      ...prev,
      effectiveDate: date || dayjs(),
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Validation
  const validateAmount = (amount: string) => {
    const errors: Record<string, string> = {};
    const warnings: Record<string, string> = {};

    if (!amount) {
      errors.amount = 'Amount is required';
    } else {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount)) {
        errors.amount = 'Invalid amount';
      } else if (paymentLimits) {
        if (numAmount < paymentLimits[form.paymentType]) {
          errors.amount = `Amount must be at least ${paymentLimits[form.paymentType]}`;
        } else if (numAmount > paymentLimits[form.paymentType]) {
          errors.amount = `Amount cannot exceed ${paymentLimits[form.paymentType]}`;
        } else if (numAmount > paymentLimits[form.paymentType] * 0.8) {
          warnings.amount = 'Amount is close to daily limit';
        }
      }
    }

    setValidation((prev) => ({
      ...prev,
      errors: { ...prev.errors, ...errors },
      warnings: { ...prev.warnings, ...warnings },
    }));
  };

  const validateForm = async (): Promise<ManualPaymentValidation> => {
    const errors: Array<{ field: keyof ManualPaymentFormData; message: string }> = [];

    // Required field validation
    if (!form.clientId) {
      errors.push({ field: 'clientId', message: 'Client is required' });
    }
    if (!form.payeeId) {
      errors.push({ field: 'payeeId', message: 'Payee is required' });
    }
    if (!form.amount || parseFloat(form.amount) <= 0) {
      errors.push({ field: 'amount', message: 'Valid amount is required' });
    }
    if (!form.paymentType) {
      errors.push({ field: 'paymentType', message: 'Payment type is required' });
    }
    if (!form.effectiveDate) {
      errors.push({ field: 'effectiveDate', message: 'Effective date is required' });
    }
    if (!form.accountNumber) {
      errors.push({ field: 'accountNumber', message: 'Account number is required' });
    }
    if (!form.routingNumber) {
      errors.push({ field: 'routingNumber', message: 'Routing number is required' });
    }
    if (!form.bankName) {
      errors.push({ field: 'bankName', message: 'Bank name is required' });
    }

    // Convert validation errors to state format
    const validationState: ValidationState = {
      errors: {},
      warnings: {}
    };

    errors.forEach(({ field, message }) => {
      validationState.errors[field] = message;
    });

    setValidation(validationState);

    return {
      valid: errors.length === 0,
      errors
    };
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validation = await validateForm();
    if (!validation.valid) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const payment: Omit<PendingPayment, 'id' | 'createdAt' | 'updatedAt' | 'status'> = {
        clientId: selectedClient?.id || '',
        clientName: selectedClient?.name || '',
        payeeId: selectedPayee?.id || '',
        payeeName: selectedPayee?.name || '',
        amount: parseFloat(form.amount),
        currency: 'USD',
        method: form.paymentType,
        effectiveDate: form.effectiveDate.format('YYYY-MM-DD'),
        description: form.memo,
        recipient: {
          name: selectedPayee?.name || '',
          accountNumber: form.accountNumber,
          routingNumber: form.routingNumber,
          bankName: form.bankName
        },
        priority: Priority.MEDIUM
      };

      const response = await paymentApi.createPendingPayment(payment);

      if (response.success) {
        setForm(initialPaymentForm);
        setSelectedClient(null);
        setSelectedPayee(null);
        setValidation({ errors: {}, warnings: {} });
        // Show success message
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError('Failed to submit payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!form.clientId) {
      setValidation({ errors: { clientId: 'Client is required' }, warnings: {} });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const draft: Partial<Payment> = {
        clientId: form.clientId,
        payeeId: form.payeeId,
        amount: parseFloat(form.amount || '0'),
        method: form.paymentType,
        effectiveDate: form.effectiveDate.format('YYYY-MM-DD'),
        description: form.memo,
        metadata: {
          accountNumber: form.accountNumber,
          routingNumber: form.routingNumber,
          bankName: form.bankName
        }
      };

      const response = await paymentApi.saveDraft(draft);
      if (response.success) {
        // Show success message
        console.log('Draft saved:', response.data);
      }
    } catch (err) {
      console.error('Error saving draft:', err);
      setError('Failed to save draft. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Render functions
  const renderClientField = () => (
    <Autocomplete
      id="client-select"
      value={selectedClient}
      onChange={handleClientChange}
      options={clients}
      getOptionLabel={(client) => `${client.name} (${client.status})`}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Client"
          required
          error={!!validation.errors.clientId}
          helperText={validation.errors.clientId}
        />
      )}
      disabled={loading}
    />
  );

  const renderPayeeField = () => (
    <Autocomplete
      id="payee-select"
      value={selectedPayee}
      onChange={handlePayeeChange}
      options={payees}
      getOptionLabel={(payee) => `${payee.name} (${payee.bankName})`}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Payee"
          required
          error={!!validation.errors.payeeId}
          helperText={validation.errors.payeeId}
        />
      )}
      disabled={!selectedClient || loading}
    />
  );

  const renderAmountField = () => (
    <TextField
      label="Amount"
      value={form.amount}
      onChange={handleAmountChange}
      required
      error={!!validation.errors.amount}
      helperText={
        validation.errors.amount ||
        validation.warnings.amount ||
        (paymentLimits &&
          `Limit: ${paymentLimits[form.paymentType]}`)
      }
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
      disabled={loading}
    />
  );

  const renderPaymentTypeField = () => (
    <FormControl
      fullWidth
      error={!!validation.errors.paymentType}
      disabled={!selectedClient || loading}
    >
      <InputLabel>Payment Type</InputLabel>
      <Select
        value={form.paymentType}
        onChange={handlePaymentTypeChange}
        label="Payment Type"
        required
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

  const renderConfirmDialog = () => (
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
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
        >
          Confirm Payment
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Manual Payment Processing
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
                label="Effective Date"
                value={form.effectiveDate}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    error: !!validation.errors.effectiveDate,
                    helperText: validation.errors.effectiveDate,
                  },
                }}
                disabled={loading}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Memo"
              name="memo"
              value={form.memo}
              onChange={handleInputChange}
              multiline
              rows={2}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Account Number"
              name="accountNumber"
              value={form.accountNumber}
              onChange={handleInputChange}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Routing Number"
              name="routingNumber"
              value={form.routingNumber}
              onChange={handleInputChange}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Bank Name"
              name="bankName"
              value={form.bankName}
              onChange={handleInputChange}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                startIcon={<SaveIcon />}
                onClick={() => handleSaveDraft()}
                disabled={loading || !form.clientId}
              >
                Save Draft
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SendIcon />}
                onClick={() => setConfirmDialogOpen(true)}
                disabled={
                  loading ||
                  !form.clientId ||
                  !form.payeeId ||
                  !form.amount ||
                  Object.keys(validation.errors).length > 0
                }
              >
                Submit Payment
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {renderConfirmDialog()}
    </Box>
  );
};

export default ManualProcessing;

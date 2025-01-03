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
  ManualPaymentValidation,
  PaymentType,
  PaymentMethod,
  Priority,
  PaymentStatus,
} from '../../../types/bill-pay.types';
import { paymentApi } from '../../../services/api/payment.api';
import { useAuth } from '../../../hooks/useAuth';

interface PaymentForm {
  clientId: string;
  payeeId: string;
  amount: string;
  currency: string;
  paymentType: PaymentMethod;
  effectiveDate: Dayjs;
  description?: string;
  reference?: string;
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

const ManualProcessing: React.FC = () => {
  const { user } = useAuth();

  // State
  const [clients, setClients] = useState<Client[]>([]);
  const [payees, setPayees] = useState<Payee[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedPayee, setSelectedPayee] = useState<Payee | null>(null);
  const paymentMethods = [PaymentMethod.ACH, PaymentMethod.WIRE, PaymentMethod.RTP];
  const [form, setForm] = useState<PaymentForm>({
    clientId: '',
    payeeId: '',
    amount: '',
    currency: 'USD',
    paymentType: PaymentMethod.ACH,
    effectiveDate: dayjs(),
    description: '',
    reference: '',
    accountNumber: '',
    routingNumber: '',
    bankName: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validation, setValidation] = useState<ValidationState>({
    errors: {},
    warnings: {},
  });
  const [paymentLimits, setPaymentLimits] = useState<PaymentLimits | null>(null);
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
        min: 0, // Default min value
        max: limits.data[form.paymentType] || 0,
        currency: 'USD', // Default currency
        dailyLimit: 0, // Default daily limit
        monthlyLimit: 0 // Default monthly limit
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
        if (numAmount < paymentLimits.min) {
          errors.amount = `Amount must be at least ${paymentLimits.min}`;
        } else if (numAmount > paymentLimits.max) {
          errors.amount = `Amount cannot exceed ${paymentLimits.max}`;
        } else if (numAmount > paymentLimits.dailyLimit * 0.8) {
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

  const validateForm = async (formData: PaymentForm): Promise<boolean> => {
    try {
      const validation = await paymentApi.validatePayment({
        clientId: formData.clientId,
        payeeId: formData.payeeId,
        amount: parseFloat(formData.amount),
        method: formData.paymentType,
        effectiveDate: formData.effectiveDate.toISOString(),
      });

      if (!validation.data) {
        setValidation({ errors: { general: 'Validation failed' }, warnings: {} });
        return false;
      }

      if (!validation.data) {
        setValidation({ errors: {}, warnings: {} });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Validation error:', error);
      setValidation({ errors: { general: 'Failed to validate payment' }, warnings: {} });
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedClient || !selectedPayee) {
      setValidation({ errors: { general: 'Please select client and payee' }, warnings: {} });
      return;
    }

    const isValid = await validateForm(form);
    if (!isValid) return;

    try {
      setLoading(true);
      const payment = {
        clientId: selectedClient.id,
        clientName: selectedClient.name,
        payeeId: selectedPayee.id,
        payeeName: selectedPayee.name,
        amount: parseFloat(form.amount),
        currency: form.currency,
        method: form.paymentType,
        date: form.effectiveDate.toISOString(),
        effectiveDate: form.effectiveDate.toISOString(),
        description: form.description,
        reference: form.reference,
        metadata: {
          submittedBy: user?.id,
          submittedAt: new Date().toISOString(),
        },
        recipient: {
          name: selectedPayee.name,
          accountNumber: selectedPayee.accountNumber,
          routingNumber: selectedPayee.routingNumber,
          bankName: selectedPayee.bankName
        },
        userId: user?.id || '',
        priority: Priority.MEDIUM,
      };

      const response = await paymentApi.createPendingPayment(payment);
      if (response.success) {
        setForm({
          clientId: '',
          payeeId: '',
          amount: '',
          currency: 'USD',
          paymentType: PaymentMethod.ACH,
          effectiveDate: dayjs(),
          description: '',
          reference: '',
          accountNumber: '',
          routingNumber: '',
          bankName: '',
        });
        setSelectedClient(null);
        setSelectedPayee(null);
        setValidation({ errors: {}, warnings: {} });
      }
    } catch (error) {
      console.error('Submit error:', error);
      setValidation({ errors: { general: 'Failed to submit payment' }, warnings: {} });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    setError('');

    try {
      const draft = await paymentApi.saveDraft({
        clientId: form.clientId,
        payeeId: form.payeeId,
        amount: parseFloat(form.amount || '0'),
        method: form.paymentType,
        effectiveDate: form.effectiveDate.format('YYYY-MM-DD'),
        description: form.description,
        status: PaymentStatus.PENDING,
        metadata: {
          accountNumber: form.accountNumber,
          routingNumber: form.routingNumber,
          bankName: form.bankName
        }
      });

      // TODO: Show success message and/or redirect to drafts
      console.log('Draft saved:', draft);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to save draft'
      );
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
          `Limit: ${paymentLimits.min} - ${paymentLimits.max} ${paymentLimits.currency}`)
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
        {paymentMethods.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
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
              ${parseFloat(form.amount).toFixed(2)} {form.currency}
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
          {form.description && (
            <Grid item xs={12}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography>{form.description}</Typography>
            </Grid>
          )}
          {form.reference && (
            <Grid item xs={12}>
              <Typography variant="subtitle2">Reference</Typography>
              <Typography>{form.reference}</Typography>
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
              label="Description"
              name="description"
              value={form.description}
              onChange={handleInputChange}
              multiline
              rows={2}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Reference"
              name="reference"
              value={form.reference}
              onChange={handleInputChange}
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
                onClick={handleSaveDraft}
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

import React, { useState, useEffect, useCallback } from 'react';
import logger from '../../../utils/logger';
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
  Payee,
  ManualPayment,
  ManualPaymentFormData,
  ManualPaymentValidation,
  PaymentMethodType,
  Priority
} from '../../../types/bill-pay.types';
import {
  PaymentTransaction,
  PaymentValidation,
  PaymentSchedule,
  Payment,
  PendingPayment,
  PaymentMethod,
  PaymentType,
  PaymentStatus,
  PaymentPriority
} from '../../../types/payment.types';
import { Client, ClientStatus } from '../../../types/client.types';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import { useAuth } from '../../../hooks/useAuth';
import { AuthContextType } from '../../../types/auth.types';
import PaymentDetails from './PaymentDetails';

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
  { value: PaymentMethod.CHECK, label: 'Check' },
  { value: PaymentMethod.CARD, label: 'Card' }
];
const ManualProcessing: React.FC = () => {
  const auth = useAuth();
  const paymentProcessorService = ServiceFactory.getInstance().getPaymentProcessorService();
  const clientService = ServiceFactory.getInstance().getClientService();
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
  // Define type for payment limits to include only valid methods
  type ValidPaymentMethods = {
    [PaymentMethod.ACH]: number;
    [PaymentMethod.CHECK]: number;
    [PaymentMethod.CARD]: number;
  };

  const [paymentLimits, setPaymentLimits] = useState<ValidPaymentMethods>({
    [PaymentMethod.ACH]: 0,
    [PaymentMethod.CHECK]: 0,
    [PaymentMethod.CARD]: 0
  });
  const [methodCounts, setMethodCounts] = useState<ValidPaymentMethods>({
    [PaymentMethod.ACH]: 0,
    [PaymentMethod.CHECK]: 0,
    [PaymentMethod.CARD]: 0
  });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [paymentDetailsOpen, setPaymentDetailsOpen] = useState(false);

  const handleViewPaymentDetails = (payment: Payment) => {
    setSelectedPayment(payment);
    setPaymentDetailsOpen(true);
  };

  const handleClosePaymentDetails = () => {
    setPaymentDetailsOpen(false);
    setSelectedPayment(null);
  };
  // Fetch initial data
  const fetchInitialData = useCallback(async () => {
    try {
      setError(null);
      const clientsResponse = await clientService.getClients();
      const filteredClients = clientsResponse.clients
        .filter((client: Client) => client.status === 'ACTIVE')
        .map((client: Client) => ({
          id: client.id,
          name: client.name,
          status: client.status === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE',
          tenantId: client.tenantId,
          isActive: client.status === 'ACTIVE',
          createdOn: client.createdOn,
          updatedOn: client.updatedOn,
          type: client.type,
          environment: client.environment
        } as Client));
      setClients(filteredClients);
    } catch (err) {
      setError('Failed to load clients');
      logger.error('Error loading clients:', err);
    }
  }, [clientService]);
  // Fetch payees when client changes
  const fetchPayees = useCallback(async () => {
    if (!selectedClient) return;
    try {
      setError(null);
      const payeesResponse = await clientService.getClientContacts(Number(selectedClient.id));
      const filteredPayees = payeesResponse
        .filter(contact => contact.isPrimary)
        .map(contact => ({
          id: contact.id.toString(), // Convert number to string
          clientId: selectedClient.id.toString(), // Convert clientId to string
          name: contact.name,
          accountNumber: '', // These will need to be populated from somewhere
          routingNumber: '',
          bankName: '',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        } as Payee));
      setPayees(filteredPayees);
    } catch (err) {
      setError('Failed to load payees');
      logger.error('Error loading payees:', err);
    }
  }, [selectedClient, clientService]);
  // Fetch payment limits when client or payment type changes
  const fetchPaymentLimits = useCallback(async () => {
    if (!selectedClient) return;
    try {
      setError(null);
      const config = await paymentProcessorService.getProcessorConfig();
      const validationConfig = {
        maxAmounts: {
          [PaymentMethod.ACH]: config.validationRules.maxAmount || 0,
          [PaymentMethod.CHECK]: config.validationRules.maxAmount || 0,
          [PaymentMethod.CARD]: config.validationRules.maxAmount || 0
        } as ValidPaymentMethods
      };
      setPaymentLimits(validationConfig.maxAmounts);
    } catch (err) {
      setError('Failed to load payment limits');
      logger.error('Error loading payment limits:', err);
    }
  }, [selectedClient, form.paymentType, paymentProcessorService]);
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
        const limit = paymentLimits[form.paymentType as keyof ValidPaymentMethods];
        if (numAmount < limit) {
          errors.amount = `Amount must be at least ${limit}`;
        } else if (numAmount > limit) {
          errors.amount = `Amount cannot exceed ${limit}`;
        } else if (numAmount > limit * 0.8) {
          warnings.amount = 'Amount is approaching the limit';
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
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      const transaction: PaymentTransaction = {
        id: '', // Will be assigned by service
        clientId: form.clientId,
        amount: parseFloat(form.amount),
        currency: 'USD',
        method: form.paymentType as PaymentMethod,
        type: PaymentType.DEBIT,
        status: PaymentStatus.PENDING,
        scheduledAt: form.effectiveDate.toDate(),
        priority: PaymentPriority.NORMAL,
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {
          accountNumber: form.accountNumber,
          routingNumber: form.routingNumber,
          bankName: form.bankName,
          memo: form.memo
        }
      };
      const validationResult = await paymentProcessorService.validatePayment(transaction);
      if (!validationResult.isValid) {
        setValidation({
          errors: validationResult.errors.reduce((acc: Record<string, string>, err: { code: string; message: string }) => ({
            ...acc,
            [err.code]: err.message,
          }), {}),
          warnings: {},
        });
        return;
      }
      const processedPayment = await paymentProcessorService.processPayment(transaction);
      setForm(initialPaymentForm);
      setSelectedClient(null);
      setSelectedPayee(null);
      setConfirmDialogOpen(false);
      // Show success message or redirect
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create payment');
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
      const transaction: PaymentTransaction = {
        id: '', // Will be assigned by service
        clientId: form.clientId,
        amount: parseFloat(form.amount || '0'),
        currency: 'USD',
        method: form.paymentType as PaymentMethod,
        type: PaymentType.DEBIT,
        status: PaymentStatus.PENDING,
        scheduledAt: form.effectiveDate.toDate(),
        priority: PaymentPriority.NORMAL,
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {
          accountNumber: form.accountNumber,
          routingNumber: form.routingNumber,
          bankName: form.bankName,
          memo: form.memo
        }
      };
      const schedule: PaymentSchedule = {
        willProcessDate: form.effectiveDate.toISOString(),
        frequency: 'once'
      };
      const response = await paymentProcessorService.schedulePayment(transaction, schedule);
      if (response) {
        // Show success message
        logger.log('Payment scheduled:', response);
        setForm(initialPaymentForm);
        setSelectedClient(null);
        setSelectedPayee(null);
      }
    } catch (err) {
      logger.error('Error scheduling payment:', err);
      setError('Failed to schedule payment. Please try again.');
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
          `Limit: ${paymentLimits[form.paymentType as keyof ValidPaymentMethods]}`)
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
            <Typography variant="subtitle2" color="text.primary">Client</Typography>
            <Typography color="text.primary">{selectedClient?.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.primary">Payee</Typography>
            <Typography color="text.primary">{selectedPayee?.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.primary">Amount</Typography>
            <Typography color="text.primary">
              ${parseFloat(form.amount).toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.primary">Payment Type</Typography>
            <Typography color="text.primary">{form.paymentType}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.primary">Effective Date</Typography>
            <Typography color="text.primary">{form.effectiveDate.format('YYYY-MM-DD')}</Typography>
          </Grid>
          {form.memo && (
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.primary">Memo</Typography>
              <Typography color="text.primary">{form.memo}</Typography>
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
  // Payment Details Dialog
  const renderPaymentDetails = () => (
    <PaymentDetails
      open={paymentDetailsOpen}
      onClose={handleClosePaymentDetails}
      payment={selectedPayment}
    />
  );
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }} color="text.primary">
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
                Schedule Payment
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
      {selectedPayment && renderPaymentDetails()}
    </Box>
  );
};
export default ManualProcessing;
import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Alert,
  Stack,
  CircularProgress,
  InputAdornment,
  Tooltip,
  IconButton,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import SendIcon from '@mui/icons-material/Send';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import InfoIcon from '@mui/icons-material/Info';
import {
  BillPayConfig as IBillPayConfig,
  BillPayConfigUpdate,
  BillPayConfigValidation
} from '../../../types/bill-pay.types';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';

type ValidationErrors = Partial<Record<keyof BillPayConfigUpdate, string>>;
const BillPayConfig: React.FC = () => {
  // State
  const [config, setConfig] = useState<BillPayConfigUpdate>({
    cutoffTime: dayjs().set('hour', 14).set('minute', 0).format('HH:mm'), // Default 2:00 PM
    maxDailyLimit: 10000,
    maxTransactionLimit: 2000,
    allowWeekendProcessing: false,
    requireDualApproval: true,
    retryAttempts: 3,
    notificationEmail: '',
    enableEmailNotifications: true,
  });
  const [originalConfig, setOriginalConfig] = useState<IBillPayConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testingEmail, setTestingEmail] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const billPayService = ServiceFactory.getInstance().getBillPayService();
  // Load initial config
  useEffect(() => {
    const loadConfig = async () => {
      try {
        setLoading(true);
        const data = await billPayService.getConfiguration();
        setOriginalConfig(data);
        setConfig({
          cutoffTime: data.cutoffTime,
          maxDailyLimit: data.maxDailyLimit,
          maxTransactionLimit: data.maxTransactionLimit,
          allowWeekendProcessing: data.allowWeekendProcessing,
          requireDualApproval: data.requireDualApproval,
          retryAttempts: data.retryAttempts,
          notificationEmail: data.notificationEmail,
          enableEmailNotifications: data.enableEmailNotifications,
        });
        setError(null);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load configuration');
      } finally {
        setLoading(false);
      }
    };
    loadConfig();
  }, []);
  // Handle form submission
  const handleSubmit = async () => {
    try {
      setSaving(true);
      setError(null);
      setValidationErrors({});
      const validation = await billPayService.updateConfiguration(config);
      if (!validation.valid) {
        const errors: ValidationErrors = {};
        validation.errors.forEach(({ field, message }) => {
          errors[field] = message;
        });
        setValidationErrors(errors);
        throw new Error('Validation failed');
      }
      const updatedConfig = await billPayService.getConfiguration();
      setOriginalConfig(updatedConfig);
      setConfig({
        cutoffTime: updatedConfig.cutoffTime,
        maxDailyLimit: updatedConfig.maxDailyLimit,
        maxTransactionLimit: updatedConfig.maxTransactionLimit,
        allowWeekendProcessing: updatedConfig.allowWeekendProcessing,
        requireDualApproval: updatedConfig.requireDualApproval,
        retryAttempts: updatedConfig.retryAttempts,
        notificationEmail: updatedConfig.notificationEmail,
        enableEmailNotifications: updatedConfig.enableEmailNotifications,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update configuration');
    } finally {
      setSaving(false);
    }
  };
  // Handle test email
  const handleTestEmail = async () => {
    try {
      setTestingEmail(true);
      setError(null);
      // TODO: Implement test email functionality once service method is available
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send test email');
    } finally {
      setTestingEmail(false);
    }
  };
  // Handle reset
  const handleReset = () => {
    if (originalConfig) {
      setConfig({
        cutoffTime: originalConfig.cutoffTime,
        maxDailyLimit: originalConfig.maxDailyLimit,
        maxTransactionLimit: originalConfig.maxTransactionLimit,
        allowWeekendProcessing: originalConfig.allowWeekendProcessing,
        requireDualApproval: originalConfig.requireDualApproval,
        retryAttempts: originalConfig.retryAttempts,
        notificationEmail: originalConfig.notificationEmail,
        enableEmailNotifications: originalConfig.enableEmailNotifications,
      });
      setValidationErrors({});
      setError(null);
    }
  };
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Bill Pay Configuration
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Cutoff Time"
                  value={dayjs(config.cutoffTime, 'HH:mm')}
                  onChange={(newValue: Dayjs | null) => {
                    if (newValue) {
                      setConfig(prev => ({
                        ...prev,
                        cutoffTime: newValue.format('HH:mm')
                      }));
                    }
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!validationErrors.cutoffTime,
                      helperText: validationErrors.cutoffTime
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Maximum Daily Limit"
                type="number"
                value={config.maxDailyLimit}
                onChange={(e) => setConfig(prev => ({ ...prev, maxDailyLimit: Number(e.target.value) }))}
                error={!!validationErrors.maxDailyLimit}
                helperText={validationErrors.maxDailyLimit}
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Maximum Transaction Limit"
                type="number"
                value={config.maxTransactionLimit}
                onChange={(e) => setConfig(prev => ({ ...prev, maxTransactionLimit: Number(e.target.value) }))}
                error={!!validationErrors.maxTransactionLimit}
                helperText={validationErrors.maxTransactionLimit}
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Retry Attempts"
                type="number"
                value={config.retryAttempts}
                onChange={(e) => setConfig(prev => ({ ...prev, retryAttempts: Number(e.target.value) }))}
                error={!!validationErrors.retryAttempts}
                helperText={validationErrors.retryAttempts}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                Processing Options
              </Typography>
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.allowWeekendProcessing}
                      onChange={(e) => setConfig(prev => ({ ...prev, allowWeekendProcessing: e.target.checked }))}
                    />
                  }
                  label={
                    <Box display="flex" alignItems="center">
                      Allow Weekend Processing
                      <Tooltip title="Enable processing of payments during weekends">
                        <IconButton size="small">
                          <InfoIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.requireDualApproval}
                      onChange={(e) => setConfig(prev => ({ ...prev, requireDualApproval: e.target.checked }))}
                    />
                  }
                  label={
                    <Box display="flex" alignItems="center">
                      Require Dual Approval
                      <Tooltip title="Require two approvers for payments above certain thresholds">
                        <IconButton size="small">
                          <InfoIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  }
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                Notification Settings
              </Typography>
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.enableEmailNotifications}
                      onChange={(e) => setConfig(prev => ({ ...prev, enableEmailNotifications: e.target.checked }))}
                    />
                  }
                  label="Enable Email Notifications"
                />
                <TextField
                  label="Notification Email"
                  value={config.notificationEmail}
                  onChange={(e) => setConfig(prev => ({ ...prev, notificationEmail: e.target.value }))}
                  error={!!validationErrors.notificationEmail}
                  helperText={validationErrors.notificationEmail}
                  disabled={!config.enableEmailNotifications}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          size="small"
                          onClick={handleTestEmail}
                          disabled={!config.enableEmailNotifications || !config.notificationEmail || testingEmail}
                          startIcon={testingEmail ? <CircularProgress size={20} /> : <SendIcon />}
                        >
                          Test
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
            <Button
              variant="outlined"
              onClick={handleReset}
              startIcon={<RestartAltIcon />}
              disabled={saving}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={saving}
              startIcon={saving && <CircularProgress size={20} />}
            >
              Save Changes
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default BillPayConfig;
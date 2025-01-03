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
} from '../../../types/bill-pay.types';
import { billPayConfigService } from '../../../services/bill-pay-config.service';

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
  const [originalConfig, setOriginalConfig] = useState<IBillPayConfig | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testingEmail, setTestingEmail] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Array<{ field: keyof BillPayConfigUpdate; message: string }>
  >([]);

  const fetchConfig = useCallback(async () => {
    try {
      setLoading(true);
      const data = await billPayConfigService.getConfig();
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
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load configuration'
      );
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies needed as it only uses service methods and setState

  // Load config
  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  // Handlers
  const handleChange = (field: keyof BillPayConfigUpdate) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value =
      event.target.type === 'number'
        ? Number(event.target.value)
        : event.target.value;
    setConfig((prev) => ({ ...prev, [field]: value }));
    setValidationErrors((prev) =>
      prev.filter((error) => error.field !== field)
    );
    setSuccess(null);
  };

  const handleSwitchChange = (field: keyof BillPayConfigUpdate) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfig((prev) => ({ ...prev, [field]: event.target.checked }));
    setValidationErrors((prev) =>
      prev.filter((error) => error.field !== field)
    );
    setSuccess(null);
  };

  const handleTimeChange = (value: Dayjs | null) => {
    if (value) {
      setConfig((prev) => ({
        ...prev,
        cutoffTime: value.format('HH:mm'),
      }));
      setValidationErrors((prev) =>
        prev.filter((error) => error.field !== 'cutoffTime')
      );
      setSuccess(null);
    }
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(null);
    setSaving(true);
    try {
      const validation = await billPayConfigService.validateConfig(config);
      if (!validation.valid) {
        setValidationErrors(validation.errors);
        return;
      }

      await billPayConfigService.updateConfig(config);
      setSuccess('Configuration saved successfully');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to save configuration'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const data = await billPayConfigService.resetConfig();
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
      setSuccess('Configuration reset to defaults');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to reset configuration'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTestEmail = async () => {
    setError(null);
    setSuccess(null);
    setTestingEmail(true);
    try {
      const result = await billPayConfigService.testEmailNotification(
        config.notificationEmail
      );
      if (result.success) {
        setSuccess('Test email sent successfully');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to send test email'
      );
    } finally {
      setTestingEmail(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 400,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Bill Pay Configuration
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert
          severity="success"
          sx={{ mb: 3 }}
          onClose={() => setSuccess(null)}
        >
          {success}
        </Alert>
      )}

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Daily Cutoff Time"
                  value={dayjs(config.cutoffTime, 'HH:mm')}
                  onChange={handleTimeChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: validationErrors.some(
                        (e) => e.field === 'cutoffTime'
                      ),
                      helperText: validationErrors.find(
                        (e) => e.field === 'cutoffTime'
                      )?.message,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Maximum Daily Limit"
                value={config.maxDailyLimit}
                onChange={handleChange('maxDailyLimit')}
                error={validationErrors.some(
                  (e) => e.field === 'maxDailyLimit'
                )}
                helperText={
                  validationErrors.find((e) => e.field === 'maxDailyLimit')
                    ?.message ||
                  `Min: $${originalConfig?.validationRules.minDailyLimit.toLocaleString()}, Max: $${originalConfig?.validationRules.maxDailyLimit.toLocaleString()}`
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Maximum Transaction Limit"
                value={config.maxTransactionLimit}
                onChange={handleChange('maxTransactionLimit')}
                error={validationErrors.some(
                  (e) => e.field === 'maxTransactionLimit'
                )}
                helperText={
                  validationErrors.find(
                    (e) => e.field === 'maxTransactionLimit'
                  )?.message ||
                  `Min: $${originalConfig?.validationRules.minTransactionAmount.toLocaleString()}, Max: $${originalConfig?.validationRules.maxTransactionAmount.toLocaleString()}`
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Retry Attempts"
                value={config.retryAttempts}
                onChange={handleChange('retryAttempts')}
                error={validationErrors.some(
                  (e) => e.field === 'retryAttempts'
                )}
                helperText={
                  validationErrors.find((e) => e.field === 'retryAttempts')
                    ?.message ||
                  `Min: ${originalConfig?.validationRules.minRetryAttempts}, Max: ${originalConfig?.validationRules.maxRetryAttempts}`
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={config.allowWeekendProcessing}
                    onChange={handleSwitchChange('allowWeekendProcessing')}
                  />
                }
                label={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <span>Allow Weekend Processing</span>
                    <Tooltip title="Enable processing of payments during weekends">
                      <InfoIcon color="action" fontSize="small" />
                    </Tooltip>
                  </Stack>
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={config.requireDualApproval}
                    onChange={handleSwitchChange('requireDualApproval')}
                  />
                }
                label={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <span>Require Dual Approval</span>
                    <Tooltip title="Require two approvers for payments above certain thresholds">
                      <InfoIcon color="action" fontSize="small" />
                    </Tooltip>
                  </Stack>
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={config.enableEmailNotifications}
                    onChange={handleSwitchChange('enableEmailNotifications')}
                  />
                }
                label="Enable Email Notifications"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Notification Email"
                value={config.notificationEmail}
                onChange={handleChange('notificationEmail')}
                disabled={!config.enableEmailNotifications}
                error={validationErrors.some(
                  (e) => e.field === 'notificationEmail'
                )}
                helperText={
                  validationErrors.find((e) => e.field === 'notificationEmail')
                    ?.message
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTestEmail}
                        disabled={
                          !config.enableEmailNotifications ||
                          !config.notificationEmail ||
                          testingEmail
                        }
                      >
                        {testingEmail ? (
                          <CircularProgress size={20} />
                        ) : (
                          <SendIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                onClick={handleReset}
                disabled={loading}
                startIcon={<RestartAltIcon />}
              >
                Reset to Defaults
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={saving}
                startIcon={
                  saving ? <CircularProgress size={20} /> : undefined
                }
              >
                Save Changes
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {originalConfig && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 2, display: 'block' }}
        >
          Last updated by {originalConfig.lastUpdatedBy} at{' '}
          {dayjs(originalConfig.lastUpdatedAt).format(
            'MM/DD/YYYY HH:mm:ss'
          )}
        </Typography>
      )}
    </Box>
  );
};

export default BillPayConfig;

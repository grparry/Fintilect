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
import { billPayConfigService } from '../../../services/bill-pay-config.service';

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

  // Load initial config
  useEffect(() => {
    const loadConfig = async () => {
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
      
      await billPayConfigService.updateConfig(config);
      const updatedConfig = await billPayConfigService.getConfig();
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
      if (err instanceof Error) {
        // Check if it's a validation error
        if (err.message.startsWith('Invalid configuration:')) {
          const validationMessage = err.message.replace('Invalid configuration: ', '');
          const errors: ValidationErrors = {};
          validationMessage.split(', ').forEach(errorStr => {
            const [field, message] = errorStr.split(': ');
            if (field && message && field in config) {
              errors[field as keyof BillPayConfigUpdate] = message;
            }
          });
          setValidationErrors(errors);
        } else {
          setError(err.message);
        }
      } else {
        setError('Failed to update configuration');
      }
    } finally {
      setSaving(false);
    }
  };

  // Test email notification
  const handleTestEmail = async () => {
    try {
      setTestingEmail(true);
      setError(null);
      await billPayConfigService.testEmailNotification(config.notificationEmail);
      // Show success message
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send test email');
    } finally {
      setTestingEmail(false);
    }
  };

  // Reset form to original values
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

  // Handle field changes
  const handleFieldChange = (field: keyof BillPayConfigUpdate, value: string | number | boolean) => {
    setConfig(prev => ({ ...prev, [field]: value }));
    setValidationErrors(prev => {
      const { [field]: _, ...rest } = prev;
      return rest;
    });
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

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Daily Cutoff Time"
                  value={dayjs(config.cutoffTime, 'HH:mm')}
                  onChange={(value) => {
                    if (value) {
                      handleFieldChange('cutoffTime', value.format('HH:mm'));
                    }
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: validationErrors.cutoffTime !== undefined,
                      helperText: validationErrors.cutoffTime,
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
                onChange={(event) => {
                  const value = Number(event.target.value);
                  handleFieldChange('maxDailyLimit', value);
                }}
                error={validationErrors.maxDailyLimit !== undefined}
                helperText={
                  validationErrors.maxDailyLimit ||
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
                onChange={(event) => {
                  const value = Number(event.target.value);
                  handleFieldChange('maxTransactionLimit', value);
                }}
                error={validationErrors.maxTransactionLimit !== undefined}
                helperText={
                  validationErrors.maxTransactionLimit ||
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
                onChange={(event) => {
                  const value = Number(event.target.value);
                  handleFieldChange('retryAttempts', value);
                }}
                error={validationErrors.retryAttempts !== undefined}
                helperText={
                  validationErrors.retryAttempts ||
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
                    onChange={(event) => {
                      handleFieldChange('allowWeekendProcessing', event.target.checked);
                    }}
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
                    onChange={(event) => {
                      handleFieldChange('requireDualApproval', event.target.checked);
                    }}
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
                    onChange={(event) => {
                      handleFieldChange('enableEmailNotifications', event.target.checked);
                    }}
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
                onChange={(event) => {
                  handleFieldChange('notificationEmail', event.target.value);
                }}
                disabled={!config.enableEmailNotifications}
                error={validationErrors.notificationEmail !== undefined}
                helperText={validationErrors.notificationEmail}
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
                onClick={handleSubmit}
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

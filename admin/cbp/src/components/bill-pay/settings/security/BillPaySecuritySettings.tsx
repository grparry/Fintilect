import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
  RadioGroup,
  Radio,
  Alert,
  SelectChangeEvent,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import { BillPaySecuritySettings as BillPaySecuritySettingsType, BillPayOTPMethod } from '../../../../types/security.types';
import { ServiceFactory } from '../../../../services/factory/ServiceFactory';

const BillPaySecuritySettings: React.FC = () => {
  const billPayService = ServiceFactory.getInstance().getBillPayService();
  const [settings, setSettings] = useState<BillPaySecuritySettingsType>({
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      expiryDays: 90,
      preventReuse: 5,
    },
    loginPolicy: {
      maxAttempts: 3,
      lockoutDuration: 30,
      sessionTimeout: 15,
      requireMFA: true,
      allowRememberMe: false,
    },
    ipWhitelist: {
      enabled: false,
      addresses: '',
    },
    otpSettings: {
      method: BillPayOTPMethod.EMAIL,
      email: '',
      phone: '',
    },
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await billPayService.getSecuritySettings();
      setSettings(data);
      setError(null);
    } catch (err) {
      setError('Failed to load security settings');
      console.error('Error loading settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    loadSettings();
  }, [loadSettings]);
  const handlePasswordPolicyChange = (field: keyof BillPaySecuritySettingsType['passwordPolicy'], value: number | boolean) => {
    setSettings(prev => ({
      ...prev,
      passwordPolicy: {
        ...prev.passwordPolicy,
        [field]: value,
      },
    }));
  };
  const handleLoginPolicyChange = (field: keyof BillPaySecuritySettingsType['loginPolicy'], value: number | boolean) => {
    setSettings(prev => ({
      ...prev,
      loginPolicy: {
        ...prev.loginPolicy,
        [field]: value,
      },
    }));
  };
  const handleIPWhitelistChange = (field: keyof BillPaySecuritySettingsType['ipWhitelist'], value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      ipWhitelist: {
        ...prev.ipWhitelist,
        [field]: value,
      },
    }));
  };
  const handleOTPSettingsChange = (field: keyof BillPaySecuritySettingsType['otpSettings'], value: BillPayOTPMethod | string) => {
    setSettings(prev => ({
      ...prev,
      otpSettings: {
        ...prev.otpSettings,
        [field]: value,
      },
    }));
  };
  const handleSendOTP = async () => {
    try {
      const destination = settings.otpSettings.method === BillPayOTPMethod.EMAIL 
        ? settings.otpSettings.email 
        : settings.otpSettings.phone;
      await billPayService.sendOTP(settings.otpSettings.method, destination);
      setSuccess('OTP sent successfully');
      setOtpSent(true);
      setTimeout(() => {
        setOtpSent(false);
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError('Failed to send OTP');
      console.error('Error sending OTP:', err);
    }
  };
  const handleSave = async () => {
    try {
      const validation = await billPayService.validateSecuritySettings(settings);
      if (!validation.isValid) {
        setError('Invalid settings: ' + Object.values(validation.errors).join(', '));
        return;
      }
      await billPayService.updateSecuritySettings(settings);
      setSuccess('Settings saved successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to save settings');
      console.error('Error saving settings:', err);
    }
  };
  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        Loading security settings...
      </Box>
    );
  }
  return (
    <Box sx={{ p: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" component="h1" color="text.primary">
              Security Settings
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </Box>
        </Grid>
        {/* Password Policy Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom color="text.primary">
              Password Policy
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Minimum Password Length"
                  value={settings.passwordPolicy.minLength}
                  onChange={(e) => handlePasswordPolicyChange('minLength', parseInt(e.target.value))}
                  InputProps={{ inputProps: { min: 6 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.passwordPolicy.requireUppercase}
                        onChange={(e) => handlePasswordPolicyChange('requireUppercase', e.target.checked)}
                      />
                    }
                    label="Require Uppercase Letters"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.passwordPolicy.requireLowercase}
                        onChange={(e) => handlePasswordPolicyChange('requireLowercase', e.target.checked)}
                      />
                    }
                    label="Require Lowercase Letters"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.passwordPolicy.requireNumbers}
                        onChange={(e) => handlePasswordPolicyChange('requireNumbers', e.target.checked)}
                      />
                    }
                    label="Require Numbers"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.passwordPolicy.requireSpecialChars}
                        onChange={(e) => handlePasswordPolicyChange('requireSpecialChars', e.target.checked)}
                      />
                    }
                    label="Require Special Characters"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Password Expiry (Days)"
                  value={settings.passwordPolicy.expiryDays}
                  onChange={(e) => handlePasswordPolicyChange('expiryDays', parseInt(e.target.value))}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Password History"
                  helperText="Number of previous passwords to prevent reuse"
                  value={settings.passwordPolicy.preventReuse}
                  onChange={(e) => handlePasswordPolicyChange('preventReuse', parseInt(e.target.value))}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {/* Login Policy Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom color="text.primary">
              Login Policy
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Maximum Login Attempts"
                  value={settings.loginPolicy.maxAttempts}
                  onChange={(e) => handleLoginPolicyChange('maxAttempts', parseInt(e.target.value))}
                  InputProps={{ inputProps: { min: 1 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Account Lockout Duration"
                  helperText="Duration in minutes"
                  value={settings.loginPolicy.lockoutDuration}
                  onChange={(e) => handleLoginPolicyChange('lockoutDuration', parseInt(e.target.value))}
                  InputProps={{ inputProps: { min: 1 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Session Timeout</InputLabel>
                  <Select<number>
                    value={settings.loginPolicy.sessionTimeout}
                    label="Session Timeout"
                    onChange={(e: SelectChangeEvent<number>) => 
                      handleLoginPolicyChange('sessionTimeout', Number(e.target.value))
                    }
                  >
                    <MenuItem value={5}>5 minutes</MenuItem>
                    <MenuItem value={15}>15 minutes</MenuItem>
                    <MenuItem value={30}>30 minutes</MenuItem>
                    <MenuItem value={60}>1 hour</MenuItem>
                  </Select>
                  <FormHelperText>Inactive session timeout duration</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.loginPolicy.requireMFA}
                        onChange={(e) => handleLoginPolicyChange('requireMFA', e.target.checked)}
                      />
                    }
                    label="Require Multi-Factor Authentication"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.loginPolicy.allowRememberMe}
                        onChange={(e) => handleLoginPolicyChange('allowRememberMe', e.target.checked)}
                      />
                    }
                    label="Allow Remember Me Option"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {/* One-Time Passcode Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="text.primary">
                One-Time Passcode
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <FormControl component="fieldset" sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom color="text.primary">
                  Send verification code via:
                </Typography>
                <RadioGroup
                  value={settings.otpSettings.method}
                  onChange={(e) => handleOTPSettingsChange('method', e.target.value as BillPayOTPMethod)}
                >
                  <FormControlLabel 
                    value={BillPayOTPMethod.EMAIL}
                    control={<Radio />} 
                    label="Email"
                  />
                  <FormControlLabel 
                    value={BillPayOTPMethod.SMS}
                    control={<Radio />} 
                    label="Text Message (SMS)"
                  />
                </RadioGroup>
              </FormControl>
              {settings.otpSettings.method === BillPayOTPMethod.EMAIL && (
                <TextField
                  fullWidth
                  label="Email Address"
                  value={settings.otpSettings.email}
                  onChange={(e) => handleOTPSettingsChange('email', e.target.value)}
                  sx={{ mb: 2 }}
                />
              )}
              {settings.otpSettings.method === BillPayOTPMethod.SMS && (
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={settings.otpSettings.phone}
                  onChange={(e) => handleOTPSettingsChange('phone', e.target.value)}
                  sx={{ mb: 2 }}
                />
              )}
              <Button
                variant="contained"
                color="primary"
                startIcon={<SendIcon />}
                onClick={handleSendOTP}
                disabled={otpSent}
                fullWidth
              >
                {otpSent ? 'Code Sent!' : 'Send Verification Code'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
        {/* IP Whitelist Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom color="text.primary">
              IP Whitelist
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.ipWhitelist.enabled}
                      onChange={(e) => handleIPWhitelistChange('enabled', e.target.checked)}
                    />
                  }
                  label="Enable IP Whitelisting"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Allowed IP Addresses"
                  disabled={!settings.ipWhitelist.enabled}
                  value={settings.ipWhitelist.addresses}
                  onChange={(e) => handleIPWhitelistChange('addresses', e.target.value)}
                  helperText="Enter one IP address per line. Use CIDR notation for IP ranges (e.g., 192.168.1.0/24)"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
export default BillPaySecuritySettings;
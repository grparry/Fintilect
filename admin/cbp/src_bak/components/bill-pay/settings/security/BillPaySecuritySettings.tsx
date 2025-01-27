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
import { BillPaySecuritySettings as BillPaySecuritySettingsType, BillPayOTPMethod } from '../../../types/security.types';
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







      ...prev,
        ...prev.passwordPolicy,
        [field]: value,

      ...prev,
        ...prev.loginPolicy,
        [field]: value,

      ...prev,
        ...prev.ipWhitelist,
        [field]: value,

      ...prev,
        ...prev.otpSettings,
        [field]: value,

        ? settings.otpSettings.email 
        : settings.otpSettings.phone;
      



      <Box sx={{ p: 3, textAlign: 'center' }}>
      </Box>
    );

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
            <Typography variant="h5" component="h1">
            </Typography>
            <Button
            >
            </Button>
          </Box>
        </Grid>

        {/* Password Policy Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                />
              </Grid>
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                      <Switch
                      />
                  />
                  <FormControlLabel
                      <Switch
                      />
                  />
                  <FormControlLabel
                      <Switch
                      />
                  />
                  <FormControlLabel
                      <Switch
                      />
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Login Policy Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Session Timeout</InputLabel>
                  <Select<number>
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
                      <Switch
                      />
                  />
                  <FormControlLabel
                      <Switch
                      />
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
              <Typography variant="h6" gutterBottom>
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <FormControl component="fieldset" sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                </Typography>
                <RadioGroup
                >
                  <FormControlLabel 
                  />
                  <FormControlLabel 
                  />
                </RadioGroup>
              </FormControl>

              {settings.otpSettings.method === BillPayOTPMethod.EMAIL && (
                <TextField
                />
              )}

              {settings.otpSettings.method === BillPayOTPMethod.SMS && (
                <TextField
                />
              )}

              <Button
              >
                {otpSent ? 'Code Sent!' : 'Send Verification Code'}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* IP Whitelist Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControlLabel
                    <Switch
                    />
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );


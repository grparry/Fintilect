import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Divider,
  Alert,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
} from '@mui/material';
import {
  Send as SendIcon,
  Security as SecurityIcon,
  PhoneAndroid as PhoneIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  QuestionAnswer as QuestionIcon,
} from '@mui/icons-material';
import { SecurityQuestion } from '../../../types/member-center.types';

interface MemberSecuritySettingsProps {
  open: boolean;
  onClose: () => void;
  memberId: string;
}

interface OTPSettings {
  method: 'email' | 'sms';
  email: string;
  phone: string;
}

const MemberSecuritySettings: React.FC<MemberSecuritySettingsProps> = ({
  open,
  onClose,
  memberId,
}) => {
  const [otpSettings, setOtpSettings] = useState<OTPSettings>({
    method: 'email',
    email: '',
    phone: '',
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleOTPSettingsChange = (field: keyof OTPSettings, value: string) => {
    setOtpSettings(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSendOTP = async () => {
    try {
      setError(null);
      // TODO: Implement API call to send OTP
      console.log('Sending OTP via:', otpSettings.method, 'for member:', memberId);
      setOtpSent(true);
      setTimeout(() => setOtpSent(false), 3000); // Reset after 3 seconds
    } catch (err) {
      setError('Failed to send verification code');
      console.error('Error sending OTP:', err);
    }
  };

  const handleToggle2FA = async () => {
    try {
      setError(null);
      // TODO: Implement API call to toggle 2FA
      console.log('Toggling 2FA for member:', memberId);
      setTwoFactorEnabled(!twoFactorEnabled);
    } catch (err) {
      setError('Failed to update 2FA settings');
      console.error('Error toggling 2FA:', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SecurityIcon />
          <Typography variant="h6">Security Settings</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <List>
          <ListItem>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText
              primary="Two-Factor Authentication"
              secondary={twoFactorEnabled ? 'Enabled' : 'Disabled'}
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={twoFactorEnabled}
                onChange={handleToggle2FA}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Verification Method
        </Typography>

        <FormControl component="fieldset" sx={{ mb: 2, width: '100%' }}>
          <RadioGroup
            value={otpSettings.method}
            onChange={(e) => handleOTPSettingsChange('method', e.target.value as 'email' | 'sms')}
          >
            <FormControlLabel
              value="email"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon />
                  <span>Email</span>
                </Box>
              }
            />
            <FormControlLabel
              value="sms"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon />
                  <span>Text Message (SMS)</span>
                </Box>
              }
            />
          </RadioGroup>
        </FormControl>

        {otpSettings.method === 'email' && (
          <TextField
            fullWidth
            label="Email Address"
            value={otpSettings.email}
            onChange={(e) => handleOTPSettingsChange('email', e.target.value)}
            sx={{ mb: 2 }}
          />
        )}

        {otpSettings.method === 'sms' && (
          <TextField
            fullWidth
            label="Phone Number"
            value={otpSettings.phone}
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
      </DialogContent>
    </Dialog>
  );
};

export default MemberSecuritySettings;

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





      ...prev,
      [field]: value,

      // TODO: Implement API call to send OTP

      // TODO: Implement API call to toggle 2FA

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
            />
            <ListItemSecondaryAction>
              <Switch
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
        </Typography>

        <FormControl component="fieldset" sx={{ mb: 2, width: '100%' }}>
          <RadioGroup
          >
            <FormControlLabel
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon />
                  <span>Email</span>
                </Box>
            />
            <FormControlLabel
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon />
                  <span>Text Message (SMS)</span>
                </Box>
            />
          </RadioGroup>
        </FormControl>

        {otpSettings.method === 'email' && (
          <TextField
          />
        )}

        {otpSettings.method === 'sms' && (
          <TextField
          />
        )}

        <Button
        >
          {otpSent ? 'Code Sent!' : 'Send Verification Code'}
        </Button>
      </DialogContent>
    </Dialog>
  );


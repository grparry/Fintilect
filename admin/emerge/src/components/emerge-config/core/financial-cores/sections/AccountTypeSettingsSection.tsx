import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
  Paper,
} from '@mui/material';
import { AccountTypeSettings } from '../../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/AccountTypeSettings';

interface AccountTypeSettingsSectionProps {
  settings: AccountTypeSettings;
  onChange: (settings: AccountTypeSettings) => void;
}

const AccountTypeSettingsSection: React.FC<AccountTypeSettingsSectionProps> = ({
  settings,
  onChange
}) => {
  const handleChange = (field: keyof AccountTypeSettings, value: string | boolean) => {
    const newSettings = new AccountTypeSettings();
    Object.assign(newSettings, settings);
    (newSettings[field] as any) = value;
    onChange(newSettings);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
          <Grid container spacing={2}>
            {/* Account Type Serial */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Account Type Serial"
                value={settings.accountTypeSerial}
                onChange={(e) => handleChange('accountTypeSerial', e.target.value)}
                helperText="Serial number for the account type"
                required
              />
            </Grid>

            {/* Account Relationship Serial */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Account Relationship Serial"
                value={settings.accountRelationshipSerial}
                onChange={(e) => handleChange('accountRelationshipSerial', e.target.value)}
                helperText="Serial number for the account relationship"
                required
              />
            </Grid>

            {/* Restrict Account On Create */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.restrictAccountOnCreate}
                    onChange={(e) => handleChange('restrictAccountOnCreate', e.target.checked)}
                  />
                }
                label="Restrict Account On Create"
              />
              <Typography variant="caption" display="block" color="textSecondary" sx={{ ml: 2 }}>
                Enable to restrict account creation
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AccountTypeSettingsSection;

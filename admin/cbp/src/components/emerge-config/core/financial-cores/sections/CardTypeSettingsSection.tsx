import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { CardTypeSettings } from '../../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/CardTypeSettings';

interface CardTypeSettingsSectionProps {
  settings: CardTypeSettings;
  onChange: (settings: CardTypeSettings) => void;
}

const CardTypeSettingsSection: React.FC<CardTypeSettingsSectionProps> = ({
  settings,
  onChange
}) => {
  const handleChange = (field: keyof CardTypeSettings, value: string) => {
    const newSettings = new CardTypeSettings();
    Object.assign(newSettings, settings);
    (newSettings[field] as any) = value;
    onChange(newSettings);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Card Type Settings
              </Typography>
            </Grid>

            {/* ATM Card Type */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="ATM Serial"
                value={settings.atmSerial}
                onChange={(e) => handleChange('atmSerial', e.target.value)}
                helperText="Serial number for ATM card type"
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="ATM Description"
                value={settings.atmDescription}
                onChange={(e) => handleChange('atmDescription', e.target.value)}
                helperText="Description for ATM card type"
                required
              />
            </Grid>

            {/* Credit Card Type */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Credit Serial"
                value={settings.creditSerial}
                onChange={(e) => handleChange('creditSerial', e.target.value)}
                helperText="Serial number for credit card type"
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Credit Description"
                value={settings.creditDescription}
                onChange={(e) => handleChange('creditDescription', e.target.value)}
                helperText="Description for credit card type"
                required
              />
            </Grid>

            {/* Debit Card Type */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Debit Serial"
                value={settings.debitSerial}
                onChange={(e) => handleChange('debitSerial', e.target.value)}
                helperText="Serial number for debit card type"
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Debit Description"
                value={settings.debitDescription}
                onChange={(e) => handleChange('debitDescription', e.target.value)}
                helperText="Description for debit card type"
                required
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CardTypeSettingsSection;

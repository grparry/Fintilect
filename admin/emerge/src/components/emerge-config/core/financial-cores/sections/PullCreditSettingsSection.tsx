import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { PullCreditSettings } from '../../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/PullCreditSettings';

interface PullCreditSettingsSectionProps {
  settings: PullCreditSettings;
  onChange: (settings: PullCreditSettings) => void;
}

const PullCreditSettingsSection: React.FC<PullCreditSettingsSectionProps> = ({
  settings,
  onChange
}) => {
  const handleChange = (field: keyof PullCreditSettings, value: string) => {
    const newSettings = new PullCreditSettings();
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
                Pull Credit Settings
              </Typography>
            </Grid>

            {/* Product Value */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product Value"
                value={settings.productValue}
                onChange={(e) => handleChange('productValue', e.target.value)}
              />
            </Grid>

            {/* Bureau Value */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Bureau Value"
                value={settings.bureauValue}
                onChange={(e) => handleChange('bureauValue', e.target.value)}
              />
            </Grid>

            {/* Type Serial Value */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Type Serial Value"
                value={settings.typeSerialValue}
                onChange={(e) => handleChange('typeSerialValue', e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PullCreditSettingsSection;

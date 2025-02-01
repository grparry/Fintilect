import React from 'react';
import {
  Box,
  TextField,
  FormControlLabel,
  Switch,
  Grid,
  Typography,
} from '@mui/material';
import { Summit } from '../../../../types/ClientConfiguration/models/FinancialCores/Summit';
import { CoreSettingsComponent } from './CoreSettingsComponent';
import RegularAchTransfersSettings from './summit/RegularAchTransfersSettings';

export const SummitSettings: React.FC = () => {
  return (
    <CoreSettingsComponent<Summit>
      title="Summit Core Settings"
      settingsGroupName="Summit"
      ModelClass={Summit}
    >
      {({ settings, onStringChange, onBooleanChange }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Grid container spacing={2}>
            {/* Regular ACH Transfer Settings */}
            <Grid item xs={12}>
              <RegularAchTransfersSettings 
                settings={settings.regularAchTransfers}
                onChange={(newSettings) => {
                  onStringChange('regularAchTransfers', JSON.stringify(newSettings));
                }}
              />
            </Grid>

            {/* Core Settings */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Core Settings</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Transfer Command Code"
                  value={settings.transferCommandCode}
                  onChange={(e) => onStringChange('transferCommandCode', e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Segmint Marketing ID"
                  value={settings.segmintMarketingIdEnabled}
                  onChange={(e) => onStringChange('segmintMarketingIdEnabled', e.target.value)}
                  fullWidth
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.useTwelveDigitTransactionAmount}
                      onChange={(e) => onBooleanChange('useTwelveDigitTransactionAmount', e.target.checked)}
                    />
                  }
                  label="Use 12-Digit Transaction Amount"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </CoreSettingsComponent>
  );
};

export default SummitSettings;

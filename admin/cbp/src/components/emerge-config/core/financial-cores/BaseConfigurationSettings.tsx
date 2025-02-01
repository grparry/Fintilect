import React from 'react';
import {
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Grid,
} from '@mui/material';
import { FinancialCore } from '../../../../types/ClientConfiguration/models/FinancialCores/FinancialCore';
import { FinancialCoreTypes } from '../../../../types/ClientConfiguration/models/FinancialCores/FinancialCoreTypes';
import { CoreSettingsComponent } from './CoreSettingsComponent';

export const BaseConfigurationSettings: React.FC = () => {
  return (
    <CoreSettingsComponent<FinancialCore>
      title="Financial Core Base Configuration"
      settingsGroupName="FinancialCore"
      ModelClass={FinancialCore}
    >
      {({ settings, onStringChange, onBooleanChange, onNumberChange }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Grid container spacing={2}>
            {/* Core Type Selection */}
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Core Type"
                value={settings.coreType}
                onChange={(e) => onStringChange('coreType', e.target.value)}
                SelectProps={{
                  native: true,
                }}
              >
                {Object.values(FinancialCoreTypes).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </TextField>
            </Grid>

            {/* Boolean Switches */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.useClassicCore}
                    onChange={(e) => onBooleanChange('useClassicCore', e.target.checked)}
                  />
                }
                label="Use Classic Core"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.shouldBypassICoreForAccountInquiry}
                    onChange={(e) => onBooleanChange('shouldBypassICoreForAccountInquiry', e.target.checked)}
                  />
                }
                label="Bypass ICore for Account Inquiry"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.shouldBypassICoreForScheduledTransfers}
                    onChange={(e) => onBooleanChange('shouldBypassICoreForScheduledTransfers', e.target.checked)}
                  />
                }
                label="Bypass ICore for Scheduled Transfers"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.shouldMapPasswordDuringAccountInquiry}
                    onChange={(e) => onBooleanChange('shouldMapPasswordDuringAccountInquiry', e.target.checked)}
                  />
                }
                label="Map Password During Account Inquiry"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.cacheAccountInquiry}
                    onChange={(e) => onBooleanChange('cacheAccountInquiry', e.target.checked)}
                  />
                }
                label="Cache Account Inquiry"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.cacheAccountInquiryForClassicCores}
                    onChange={(e) => onBooleanChange('cacheAccountInquiryForClassicCores', e.target.checked)}
                  />
                }
                label="Cache Account Inquiry for Classic Cores"
              />
            </Grid>

            {/* String and Number Fields */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Core Connection String"
                value={settings.coreConnectionString}
                onChange={(e) => onStringChange('coreConnectionString', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Cache Account Inquiry Wait (seconds)"
                value={settings.cacheAccountInquiryWaitForSeconds}
                onChange={(e) => onNumberChange('cacheAccountInquiryWaitForSeconds', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Cache Expire (minutes)"
                value={settings.cacheExpireInMinutes}
                onChange={(e) => onNumberChange('cacheExpireInMinutes', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Throttle Account Inquiry"
                value={settings.throttleAccoutInquiry}
                onChange={(e) => onNumberChange('throttleAccoutInquiry', e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </CoreSettingsComponent>
  );
};

export default BaseConfigurationSettings;

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { DNA } from '../../../../types/ClientConfiguration/models/FinancialCores/DNA';
import { CoreSettingsComponent } from './CoreSettingsComponent';

export const DNASettings: React.FC = () => {
  return (
    <CoreSettingsComponent<DNA>
      title="DNA Core Settings"
      settingsGroupName="DNA"
      ModelClass={DNA}
    >
      {({ settings, onStringChange, onBooleanChange }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Successful Login Core Field"
            value={settings.successfulLoginCoreField}
            onChange={(e) => onStringChange('successfulLoginCoreField', e.target.value)}
            fullWidth
          />
          <TextField
            label="Extra Statement Accounts Core User Field"
            value={settings.extraStatementAccountsCoreUserField}
            onChange={(e) => onStringChange('extraStatementAccountsCoreUserField', e.target.value)}
            fullWidth
          />
          <TextField
            label="Valid Debit Card Status Codes"
            value={settings.validDebitCardStatusCodes}
            onChange={(e) => onStringChange('validDebitCardStatusCodes', e.target.value)}
            fullWidth
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.mapDormantAccounts}
                onChange={(e) => onBooleanChange('mapDormantAccounts', e.target.checked)}
              />
            }
            label="Map Dormant Accounts"
          />
        </Box>
      )}
    </CoreSettingsComponent>
  );
};

export default DNASettings;

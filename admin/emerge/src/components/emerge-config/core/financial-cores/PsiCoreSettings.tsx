import React from 'react';
import {
  Box,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { PsiCore } from '../../../../types/ClientConfiguration/models/FinancialCores/PsiCore';
import { CoreSettingsComponent } from './CoreSettingsComponent';

export const PsiCoreSettings: React.FC = () => {
  return (
    <CoreSettingsComponent<PsiCore>
      title="PSI Core Settings"
      settingsGroupName="PsiCore"
      ModelClass={PsiCore}
    >
      {({ settings, onBooleanChange }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.setDateOfBirth}
                onChange={(e) => onBooleanChange('setDateOfBirth', e.target.checked)}
              />
            }
            label="Set Date of Birth"
          />
        </Box>
      )}
    </CoreSettingsComponent>
  );
};

export default PsiCoreSettings;

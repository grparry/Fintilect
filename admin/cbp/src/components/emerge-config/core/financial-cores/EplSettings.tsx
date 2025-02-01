import React from 'react';
import {
  Box,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';
import { Epl } from '../../../../types/ClientConfiguration/models/FinancialCores/Epl';
import { CoreSettingsComponent } from './CoreSettingsComponent';

export const EplSettings: React.FC = () => {
  return (
    <CoreSettingsComponent<Epl>
      title="EPL Core Settings"
      settingsGroupName="Epl"
      ModelClass={Epl}
    >
      {({ settings, onBooleanChange }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.shouldAddAccountInquiryRepliesForCrossAccounts}
                onChange={(e) => onBooleanChange('shouldAddAccountInquiryRepliesForCrossAccounts', e.target.checked)}
              />
            }
            label="Add Account Inquiry Replies For Cross Accounts"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.creditCardDepositPermitted}
                onChange={(e) => onBooleanChange('creditCardDepositPermitted', e.target.checked)}
              />
            }
            label="Credit Card Deposit Permitted"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.creditCardInquiryPermitted}
                onChange={(e) => onBooleanChange('creditCardInquiryPermitted', e.target.checked)}
              />
            }
            label="Credit Card Inquiry Permitted"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.creditCardWithdrawalPermitted}
                onChange={(e) => onBooleanChange('creditCardWithdrawalPermitted', e.target.checked)}
              />
            }
            label="Credit Card Withdrawal Permitted"
          />
        </Box>
      )}
    </CoreSettingsComponent>
  );
};

export default EplSettings;

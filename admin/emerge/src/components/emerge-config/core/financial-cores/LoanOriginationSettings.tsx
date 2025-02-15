import React from 'react';
import {
  Box,
  TextField,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { LoanOriginationSettings as LoanOriginationSettingsModel } from '../../../../types/ClientConfiguration/models/FinancialCores/LoanOriginationSettings';
import { CoreSettingsComponent } from './CoreSettingsComponent';

export const LoanOriginationSettings: React.FC = () => {
  return (
    <CoreSettingsComponent<LoanOriginationSettingsModel>
      title="Loan Origination Settings"
      settingsGroupName="LoanOrigination"
      ModelClass={LoanOriginationSettingsModel}
    >
      {({ settings, onStringChange, onBooleanChange }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Application Type Serial"
            value={settings.applicationTypeSerial}
            onChange={(e) => onStringChange('applicationTypeSerial', e.target.value)}
            fullWidth
          />
          <TextField
            label="Application Channel"
            value={settings.applicationChannel}
            onChange={(e) => onStringChange('applicationChannel', e.target.value)}
            fullWidth
          />
          <TextField
            label="Application Branch"
            value={settings.applicationBranch}
            onChange={(e) => onStringChange('applicationBranch', e.target.value)}
            fullWidth
          />
          <TextField
            label="Default Credit Limit"
            value={settings.defaultCreditLimit}
            onChange={(e) => onStringChange('defaultCreditLimit', e.target.value)}
            fullWidth
          />
          <TextField
            label="Default Payment Amount"
            value={settings.defaultPaymentAmount}
            onChange={(e) => onStringChange('defaultPaymentAmount', e.target.value)}
            fullWidth
          />
          <TextField
            label="Workflow Serial"
            value={settings.workFlowSerial}
            onChange={(e) => onStringChange('workFlowSerial', e.target.value)}
            fullWidth
          />
          <TextField
            label="Work Queue Approve Serial"
            value={settings.workQueueApproveSerial}
            onChange={(e) => onStringChange('workQueueApproveSerial', e.target.value)}
            fullWidth
          />
          <TextField
            label="Work Queue Rescreen Serial"
            value={settings.workQueueRescreenSerial}
            onChange={(e) => onStringChange('workQueueRescreenSerial', e.target.value)}
            fullWidth
          />
          <TextField
            label="Work Queue Review Serial"
            value={settings.workQueueReviewSerial}
            onChange={(e) => onStringChange('workQueueReviewSerial', e.target.value)}
            fullWidth
          />
          <TextField
            label="Work Queue Decline Serial"
            value={settings.workQueueDeclineSerial}
            onChange={(e) => onStringChange('workQueueDeclineSerial', e.target.value)}
            fullWidth
          />
          <TextField
            label="Work Queue ILA Default Serial"
            value={settings.workQueueIlaDefaultSerial}
            onChange={(e) => onStringChange('workQueueIlaDefaultSerial', e.target.value)}
            fullWidth
          />
          <TextField
            label="Online Application Note Type Serial"
            value={settings.onlineApplicationNoteTypeSerial}
            onChange={(e) => onStringChange('onlineApplicationNoteTypeSerial', e.target.value)}
            fullWidth
          />
          <TextField
            label="Comments Note Type Serial"
            value={settings.commentsNoteTypeSerial}
            onChange={(e) => onStringChange('commentsNoteTypeSerial', e.target.value)}
            fullWidth
          />
          <TextField
            label="Account Disclosure Note Type Serial"
            value={settings.accountDisclosureNoteTypeSerial}
            onChange={(e) => onStringChange('accountDisclosureNoteTypeSerial', e.target.value)}
            fullWidth
          />
          <TextField
            label="E-notices Disclosure Note Type Serial"
            value={settings.enoticesDisclosureNoteTypeSerial}
            onChange={(e) => onStringChange('enoticesDisclosureNoteTypeSerial', e.target.value)}
            fullWidth
          />
          <TextField
            label="Privacy Notice Disclosure Note Type Serial"
            value={settings.privacyNoticeDisclosureNoteTypeSerial}
            onChange={(e) => onStringChange('privacyNoticeDisclosureNoteTypeSerial', e.target.value)}
            fullWidth
          />
          <TextField
            label="Decision Type Serial"
            value={settings.decisionTypeSerial}
            onChange={(e) => onStringChange('decisionTypeSerial', e.target.value)}
            fullWidth
          />
          <TextField
            label="ChexSystems Credit Type Serial"
            value={settings.creditTypeSerialChexSystems}
            onChange={(e) => onStringChange('creditTypeSerialChexSystems', e.target.value)}
            fullWidth
          />
          <TextField
            label="Equifax Credit Type Serial"
            value={settings.creditTypeSerialEquifax}
            onChange={(e) => onStringChange('creditTypeSerialEquifax', e.target.value)}
            fullWidth
          />
          <TextField
            label="TransUnion Credit Type Serial"
            value={settings.creditTypeSerialTransUnion}
            onChange={(e) => onStringChange('creditTypeSerialTransUnion', e.target.value)}
            fullWidth
          />
        </Box>
      )}
    </CoreSettingsComponent>
  );
};

export default LoanOriginationSettings;

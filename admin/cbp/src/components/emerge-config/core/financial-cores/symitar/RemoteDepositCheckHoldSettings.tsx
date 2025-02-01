import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
} from '@mui/material';
import { RemoteDepositCheckHoldSettings as RemoteDepositCheckHoldSettingsModel } from '../../../../../types/ClientConfiguration/models/FinancialCores/SymitarSettings/RemoteDepositCheckHoldSettings';
import { RemoteDepositCheckHold } from '../../../../../types/ClientConfiguration/models/FinancialCores/SymitarSettings/RemoteDepositCheckHold';

interface Props {
  settings: RemoteDepositCheckHoldSettingsModel;
  onChange: (settings: RemoteDepositCheckHoldSettingsModel) => void;
}

export const RemoteDepositCheckHoldSettings: React.FC<Props> = ({ settings, onChange }) => {
  const handleChange = (field: keyof RemoteDepositCheckHold, value: any) => {
    const updatedSettings = new RemoteDepositCheckHoldSettingsModel();
    updatedSettings.fromSettings(settings.toSettings());
    const checkHold = new RemoteDepositCheckHold();
    checkHold.fromSettings(settings.remoteDepositCheckHold.toSettings());
    (checkHold as any)[field] = value;
    updatedSettings.remoteDepositCheckHold = checkHold;
    onChange(updatedSettings);
  };

  return (
    <Card>
      <CardHeader title="Remote Deposit Check Hold Settings" />
      <Divider />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography>
            Remote deposit check hold settings configuration will be implemented based on infrastructure model requirements.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RemoteDepositCheckHoldSettings;

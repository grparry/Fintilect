import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import { RegularAchTransfers } from '../../../../../types/ClientConfiguration/models/FinancialCores/SummitSettings/RegularAchTransfers';

interface Props {
  settings: RegularAchTransfers;
  onChange: (settings: RegularAchTransfers) => void;
}

export const RegularAchTransfersSettings: React.FC<Props> = ({ settings, onChange }) => {
  const handleChange = (field: keyof RegularAchTransfers, value: string) => {
    const updatedSettings = new RegularAchTransfers();
    updatedSettings.fromSettings(settings.toSettings());
    (updatedSettings as any)[field] = value;
    onChange(updatedSettings);
  };

  return (
    <Card>
      <CardHeader title="Regular ACH Transfer Settings" />
      <Divider />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Transfer Command Code"
            value={settings.transferCommandCode}
            onChange={(e) => handleChange('transferCommandCode', e.target.value)}
            fullWidth
          />
          <TextField
            label="FT Code"
            value={settings.fTCode}
            onChange={(e) => handleChange('fTCode', e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={settings.description}
            onChange={(e) => handleChange('description', e.target.value)}
            fullWidth
          />
          <TextField
            label="History Display Description"
            value={settings.descriptionInHistoryDisplay}
            onChange={(e) => handleChange('descriptionInHistoryDisplay', e.target.value)}
            fullWidth
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default RegularAchTransfersSettings;

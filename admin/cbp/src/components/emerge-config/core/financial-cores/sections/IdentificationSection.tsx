import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { Identification } from '../../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/Identification';

interface IdentificationSectionProps {
  settings: Identification;
  onChange: (settings: Identification) => void;
}

const IdentificationSection: React.FC<IdentificationSectionProps> = ({
  settings,
  onChange
}) => {
  const handleChange = (field: keyof Identification, value: string) => {
    const newSettings = new Identification();
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
                Category Options
              </Typography>
            </Grid>

            {/* Mother's Maiden Name Category Option */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Mother's Maiden Name Category"
                value={settings.mothersMaidenNameCategoryOption}
                onChange={(e) => handleChange('mothersMaidenNameCategoryOption', e.target.value)}
                helperText="Category option for mother's maiden name identification"
              />
            </Grid>

            {/* Driver's License Category Option */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Driver's License Category"
                value={settings.driverLicenseCategoryOption}
                onChange={(e) => handleChange('driverLicenseCategoryOption', e.target.value)}
                helperText="Category option for driver's license identification"
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default IdentificationSection;

import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { PersonTypeSettings } from '../../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/PersonTypeSettings';

interface PersonTypeSettingsSectionProps {
  settings: PersonTypeSettings;
  onChange: (settings: PersonTypeSettings) => void;
}

const PersonTypeSettingsSection: React.FC<PersonTypeSettingsSectionProps> = ({
  settings,
  onChange
}) => {
  const handleChange = (field: keyof PersonTypeSettings, value: string) => {
    const newSettings = new PersonTypeSettings();
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
                Person Type Configuration
              </Typography>
            </Grid>

            {/* Sub-User Person Type Serial */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Sub-User Person Type Serial"
                value={settings.subUserPersonTypeSerial}
                onChange={(e) => handleChange('subUserPersonTypeSerial', e.target.value)}
                helperText="Serial number for sub-user person type"
                required
              />
            </Grid>

            {/* Login ID Format */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Login ID Format"
                value={settings.loginIdFormat}
                onChange={(e) => handleChange('loginIdFormat', e.target.value)}
                helperText="Format pattern for login IDs"
                required
              />
            </Grid>

            {/* Person-Centric Login ID Format */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Person-Centric Login ID Format"
                value={settings.personCentricLoginIdFormat}
                onChange={(e) => handleChange('personCentricLoginIdFormat', e.target.value)}
                helperText="Format pattern for person-centric login IDs"
                required
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PersonTypeSettingsSection;

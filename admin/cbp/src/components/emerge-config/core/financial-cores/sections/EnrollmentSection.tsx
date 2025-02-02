import React from 'react';
import {
  Grid,
  Typography,
  FormControlLabel,
  Switch,
  Paper,
} from '@mui/material';
import { Enrollment } from '../../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/Enrollment';

interface EnrollmentSectionProps {
  settings: Enrollment;
  onChange: (settings: Enrollment) => void;
}

const EnrollmentSection: React.FC<EnrollmentSectionProps> = ({
  settings,
  onChange
}) => {
  const handleChange = (checked: boolean) => {
    const newSettings = new Enrollment();
    Object.assign(newSettings, settings);
    newSettings.allowEnrollmentWithMailingAddress = checked;
    onChange(newSettings);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Enrollment Options
              </Typography>
            </Grid>

            {/* Allow Enrollment With Mailing Address */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.allowEnrollmentWithMailingAddress}
                    onChange={(e) => handleChange(e.target.checked)}
                  />
                }
                label="Allow Enrollment With Mailing Address"
              />
              <Typography variant="caption" display="block" color="textSecondary" sx={{ ml: 2 }}>
                When enabled, users can enroll using their mailing address
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EnrollmentSection;

import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Paper,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { Funding } from '../../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/Funding';

interface FundingSectionProps {
  settings: Funding;
  onChange: (settings: Funding) => void;
}

const FundingSection: React.FC<FundingSectionProps> = ({
  settings,
  onChange
}) => {
  const handleChange = (field: keyof Funding, value: string | boolean) => {
    const newSettings = new Funding();
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
                Funding Settings
              </Typography>
            </Grid>

            {/* Enable/Disable Funding */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.fundingIsEnabled}
                    onChange={(e) => handleChange('fundingIsEnabled', e.target.checked)}
                  />
                }
                label="Enable Funding"
              />
              <Typography variant="caption" display="block" color="textSecondary" sx={{ ml: 2 }}>
                Enable or disable funding functionality
              </Typography>
            </Grid>

            {/* Account Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Account Information
              </Typography>
              <Grid container spacing={2}>
                {/* From Member Account Number */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="From Member Account Number"
                    value={settings.fromMemberAccountNumber}
                    onChange={(e) => handleChange('fromMemberAccountNumber', e.target.value)}
                    helperText="Member account number for funding source"
                    required
                  />
                </Grid>

                {/* From Account Number */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="From Account Number"
                    value={settings.fromAccountNumber}
                    onChange={(e) => handleChange('fromAccountNumber', e.target.value)}
                    helperText="Account number for funding source"
                    required
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Description"
                    value={settings.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    helperText="Optional description for funding configuration"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FundingSection;

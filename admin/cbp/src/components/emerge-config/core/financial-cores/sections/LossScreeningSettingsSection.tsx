import React from 'react';
import {
  Grid,
  TextField,
  FormControlLabel,
  Switch,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LossScreeningSettings } from '../../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/LossScreeningSettings';

interface LossScreeningSettingsSectionProps {
  settings: LossScreeningSettings;
  expanded: string | false;
  onExpand: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  onChange: (settings: LossScreeningSettings) => void;
}

const LossScreeningSettingsSection: React.FC<LossScreeningSettingsSectionProps> = ({
  settings,
  expanded,
  onExpand,
  onChange
}) => {
  const handleChange = (field: keyof LossScreeningSettings, value: any) => {
    const newSettings = new LossScreeningSettings();
    Object.assign(newSettings, settings);
    (newSettings[field] as any) = value;
    onChange(newSettings);
  };

  return (
    <Accordion 
      expanded={expanded === 'lossScreening'} 
      onChange={onExpand('lossScreening')}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Loss Screening Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {/* Loan Past Due Hours Offset */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Loan Past Due Hours Offset"
              value={settings.loanPastDueHoursOffset}
              onChange={(e) => handleChange('loanPastDueHoursOffset', parseInt(e.target.value, 10))}
              helperText="Number of hours to offset loan past due check"
            />
          </Grid>

          {/* Block Account Alert Type Serials */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Block Account Alert Type Serials"
              value={settings.blockAccountAlertTypeSerials}
              onChange={(e) => handleChange('blockAccountAlertTypeSerials', e.target.value)}
              helperText="Enter alert type serials, separated by commas"
            />
          </Grid>

          {/* Boolean Settings */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Screening Criteria
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.shareAvailableAmountLessThenZeroPlusMiniumAmount}
                      onChange={(e) => handleChange('shareAvailableAmountLessThenZeroPlusMiniumAmount', e.target.checked)}
                    />
                  }
                  label="Check Share Available Amount Less Than Zero Plus Minimum"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.shareAvailableAmountLessThenZero}
                      onChange={(e) => handleChange('shareAvailableAmountLessThenZero', e.target.checked)}
                    />
                  }
                  label="Check Share Available Amount Less Than Zero"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.loanPastDue}
                      onChange={(e) => handleChange('loanPastDue', e.target.checked)}
                    />
                  }
                  label="Check Loan Past Due"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.shareHasChargeOfSerial}
                      onChange={(e) => handleChange('shareHasChargeOfSerial', e.target.checked)}
                    />
                  }
                  label="Check Share Has Charge Off Serial"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.loanHasChargeOfSerial}
                      onChange={(e) => handleChange('loanHasChargeOfSerial', e.target.checked)}
                    />
                  }
                  label="Check Loan Has Charge Off Serial"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default LossScreeningSettingsSection;

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
import { PullCreditSettings } from '../../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/PullCreditSettings';

interface PullCreditSettingsSectionProps {
  settings: PullCreditSettings;
  expanded: string | false;
  onExpand: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  onChange: (settings: PullCreditSettings) => void;
}

const PullCreditSettingsSection: React.FC<PullCreditSettingsSectionProps> = ({
  settings,
  expanded,
  onExpand,
  onChange
}) => {
  const handleChange = (field: keyof PullCreditSettings, value: any) => {
    const newSettings = new PullCreditSettings();
    Object.assign(newSettings, settings);
    (newSettings[field] as any) = value;
    onChange(newSettings);
  };

  return (
    <Accordion 
      expanded={expanded === 'pullCredit'} 
      onChange={onExpand('pullCredit')}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Pull Credit Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.enabled}
                  onChange={(e) => handleChange('enabled', e.target.checked)}
                />
              }
              label="Enable Pull Credit"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Credit Report Type"
              value={settings.creditReportType}
              onChange={(e) => handleChange('creditReportType', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Credit Report Format"
              value={settings.creditReportFormat}
              onChange={(e) => handleChange('creditReportFormat', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Credit Report Purpose"
              value={settings.creditReportPurpose}
              onChange={(e) => handleChange('creditReportPurpose', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Credit Report Permission"
              value={settings.creditReportPermission}
              onChange={(e) => handleChange('creditReportPermission', e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.includeEmploymentInformation}
                  onChange={(e) => handleChange('includeEmploymentInformation', e.target.checked)}
                />
              }
              label="Include Employment Information"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.includeAddressInformation}
                  onChange={(e) => handleChange('includeAddressInformation', e.target.checked)}
                />
              }
              label="Include Address Information"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.includePhoneInformation}
                  onChange={(e) => handleChange('includePhoneInformation', e.target.checked)}
                />
              }
              label="Include Phone Information"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.includeNameInformation}
                  onChange={(e) => handleChange('includeNameInformation', e.target.checked)}
                />
              }
              label="Include Name Information"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.includeEmailInformation}
                  onChange={(e) => handleChange('includeEmailInformation', e.target.checked)}
                />
              }
              label="Include Email Information"
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default PullCreditSettingsSection;

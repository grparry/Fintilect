import React from 'react';
import {
  Grid,
  TextField,
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
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Product Value"
              value={settings.productValue}
              onChange={(e) => handleChange('productValue', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Bureau Value"
              value={settings.bureauValue}
              onChange={(e) => handleChange('bureauValue', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Type Serial Value"
              value={settings.typeSerialValue}
              onChange={(e) => handleChange('typeSerialValue', e.target.value)}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default PullCreditSettingsSection;

import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Switch,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Funding } from '../../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/Funding';

interface FundingSectionProps {
  settings: Funding;
  expanded: string | false;
  onExpand: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  onChange: (settings: Funding) => void;
}

const FundingSection: React.FC<FundingSectionProps> = ({
  settings,
  expanded,
  onExpand,
  onChange
}) => {
  const handleChange = (field: keyof Funding, value: string | boolean) => {
    const newSettings = new Funding();
    Object.assign(newSettings, settings);
    (newSettings[field] as any) = value;
    onChange(newSettings);
  };

  return (
    <Accordion 
      expanded={expanded === 'funding'} 
      onChange={onExpand('funding')}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Funding Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {/* Enable/Disable Funding */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
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
            </Paper>
          </Grid>

          {/* Account Information */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
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
            </Paper>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default FundingSection;

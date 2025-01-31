import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CardTypeSettings } from '../../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/CardTypeSettings';

interface CardTypeSettingsSectionProps {
  settings: CardTypeSettings;
  expanded: string | false;
  onExpand: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  onChange: (settings: CardTypeSettings) => void;
}

const CardTypeSettingsSection: React.FC<CardTypeSettingsSectionProps> = ({
  settings,
  expanded,
  onExpand,
  onChange
}) => {
  const handleChange = (field: keyof CardTypeSettings, value: string) => {
    const newSettings = new CardTypeSettings();
    Object.assign(newSettings, settings);
    (newSettings[field] as any) = value;
    onChange(newSettings);
  };

  return (
    <Accordion 
      expanded={expanded === 'cardType'} 
      onChange={onExpand('cardType')}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Card Type Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          {/* ATM Card Settings */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle2" gutterBottom>
                ATM Card Settings
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="ATM Serial"
                    value={settings.atmSerial}
                    onChange={(e) => handleChange('atmSerial', e.target.value)}
                    helperText="Serial number for ATM cards"
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="ATM Description"
                    value={settings.atmDescription}
                    onChange={(e) => handleChange('atmDescription', e.target.value)}
                    helperText="Description for ATM cards"
                    required
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Credit Card Settings */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle2" gutterBottom>
                Credit Card Settings
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Credit Serial"
                    value={settings.creditSerial}
                    onChange={(e) => handleChange('creditSerial', e.target.value)}
                    helperText="Serial number for credit cards"
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Credit Description"
                    value={settings.creditDescription}
                    onChange={(e) => handleChange('creditDescription', e.target.value)}
                    helperText="Description for credit cards"
                    required
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Debit Card Settings */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle2" gutterBottom>
                Debit Card Settings
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Debit Serial"
                    value={settings.debitSerial}
                    onChange={(e) => handleChange('debitSerial', e.target.value)}
                    helperText="Serial number for debit cards"
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Debit Description"
                    value={settings.debitDescription}
                    onChange={(e) => handleChange('debitDescription', e.target.value)}
                    helperText="Description for debit cards"
                    required
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

export default CardTypeSettingsSection;

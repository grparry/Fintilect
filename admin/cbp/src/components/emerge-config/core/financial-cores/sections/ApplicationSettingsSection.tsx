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
import { ApplicationSettings } from '../../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/ApplicationSettings';

interface ApplicationSettingsSectionProps {
  settings: ApplicationSettings;
  expanded: string | false;
  onExpand: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  onChange: (settings: ApplicationSettings) => void;
}

const ApplicationSettingsSection: React.FC<ApplicationSettingsSectionProps> = ({
  settings,
  expanded,
  onExpand,
  onChange
}) => {
  const handleChange = (field: keyof ApplicationSettings, value: string | boolean) => {
    const newSettings = new ApplicationSettings();
    Object.assign(newSettings, settings);
    (newSettings[field] as any) = value;
    onChange(newSettings);
  };

  return (
    <Accordion 
      expanded={expanded === 'application'} 
      onChange={onExpand('application')}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Application Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          {/* Basic Settings */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle2" gutterBottom>
                Basic Settings
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Type Serial"
                    value={settings.typeSerial}
                    onChange={(e) => handleChange('typeSerial', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Channel Serial"
                    value={settings.channelSerial}
                    onChange={(e) => handleChange('channelSerial', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.saveClientsIp}
                        onChange={(e) => handleChange('saveClientsIp', e.target.checked)}
                      />
                    }
                    label="Save Client's IP Address"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Workflow Settings */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle2" gutterBottom>
                Workflow Settings
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Workflow Serial"
                    value={settings.workFlowSerial}
                    onChange={(e) => handleChange('workFlowSerial', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.manualApprovalsBypassWorkQueueLogic}
                        onChange={(e) => handleChange('manualApprovalsBypassWorkQueueLogic', e.target.checked)}
                      />
                    }
                    label="Manual Approvals Bypass Work Queue Logic"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Work Queue Serials */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle2" gutterBottom>
                Work Queue Serials
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Open Queue Serial"
                    value={settings.workQueueOpenSerial}
                    onChange={(e) => handleChange('workQueueOpenSerial', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="New Queue Serial"
                    value={settings.workQueueNewSerial}
                    onChange={(e) => handleChange('workQueueNewSerial', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Approve Queue Serial"
                    value={settings.workQueueApproveSerial}
                    onChange={(e) => handleChange('workQueueApproveSerial', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Rescreen Queue Serial"
                    value={settings.workQueueRescreenSerial}
                    onChange={(e) => handleChange('workQueueRescreenSerial', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Review Queue Serial"
                    value={settings.workQueueReviewSerial}
                    onChange={(e) => handleChange('workQueueReviewSerial', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Decline Queue Serial"
                    value={settings.workQueueDeclineSerial}
                    onChange={(e) => handleChange('workQueueDeclineSerial', e.target.value)}
                    required
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Credit Settings */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle2" gutterBottom>
                Credit Settings
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="ChexSystems Credit Type Serial"
                    value={settings.creditTypeSerialChexSystems}
                    onChange={(e) => handleChange('creditTypeSerialChexSystems', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Equifax Credit Type Serial"
                    value={settings.creditTypeSerialEquifax}
                    onChange={(e) => handleChange('creditTypeSerialEquifax', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="TransUnion Credit Type Serial"
                    value={settings.creditTypeSerialTransUnion}
                    onChange={(e) => handleChange('creditTypeSerialTransUnion', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Credit Pull Max Days Old"
                    value={settings.creditPullMaxDaysOld}
                    onChange={(e) => handleChange('creditPullMaxDaysOld', e.target.value)}
                    required
                    type="number"
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

export default ApplicationSettingsSection;

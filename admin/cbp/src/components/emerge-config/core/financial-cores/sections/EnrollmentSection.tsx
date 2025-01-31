import React from 'react';
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Switch,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Enrollment } from '../../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/Enrollment';

interface EnrollmentSectionProps {
  settings: Enrollment;
  expanded: string | false;
  onExpand: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  onChange: (settings: Enrollment) => void;
}

const EnrollmentSection: React.FC<EnrollmentSectionProps> = ({
  settings,
  expanded,
  onExpand,
  onChange
}) => {
  const handleChange = (checked: boolean) => {
    const newSettings = new Enrollment();
    Object.assign(newSettings, settings);
    newSettings.allowEnrollmentWithMailingAddress = checked;
    onChange(newSettings);
  };

  return (
    <Accordion 
      expanded={expanded === 'enrollment'} 
      onChange={onExpand('enrollment')}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Enrollment Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
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
      </AccordionDetails>
    </Accordion>
  );
};

export default EnrollmentSection;

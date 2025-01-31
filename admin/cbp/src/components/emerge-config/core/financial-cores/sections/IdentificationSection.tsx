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
import { Identification } from '../../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/Identification';

interface IdentificationSectionProps {
  settings: Identification;
  expanded: string | false;
  onExpand: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  onChange: (settings: Identification) => void;
}

const IdentificationSection: React.FC<IdentificationSectionProps> = ({
  settings,
  expanded,
  onExpand,
  onChange
}) => {
  const handleChange = (field: keyof Identification, value: string) => {
    const newSettings = new Identification();
    Object.assign(newSettings, settings);
    (newSettings[field] as string) = value;
    onChange(newSettings);
  };

  return (
    <Accordion 
      expanded={expanded === 'identification'} 
      onChange={onExpand('identification')}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Identification Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Category Options
            </Typography>
          </Grid>

          {/* Mother's Maiden Name Category Option */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Mother's Maiden Name Category"
              value={settings.mothersMaidenNameCategoryOption}
              onChange={(e) => handleChange('mothersMaidenNameCategoryOption', e.target.value)}
              helperText="Category option for mother's maiden name identification"
            />
          </Grid>

          {/* Driver's License Category Option */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Driver's License Category"
              value={settings.driverLicenseCategoryOption}
              onChange={(e) => handleChange('driverLicenseCategoryOption', e.target.value)}
              helperText="Category option for driver's license identification"
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default IdentificationSection;

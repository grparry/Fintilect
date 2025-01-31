import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
import { DraftLookup } from '../../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/DraftLookup';

interface DraftLookupSectionProps {
  settings: DraftLookup;
  expanded: string | false;
  onExpand: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  onChange: (settings: DraftLookup) => void;
}

const DraftLookupSection: React.FC<DraftLookupSectionProps> = ({
  settings,
  expanded,
  onExpand,
  onChange
}) => {
  const handleChange = (value: string) => {
    const newSettings = new DraftLookup();
    Object.assign(newSettings, settings);
    
    // Convert empty string to null, otherwise parse as integer
    const numberValue = value === '' ? null : parseInt(value, 10);
    newSettings.accountNumberLength = isNaN(numberValue as number) ? null : numberValue;
    
    onChange(newSettings);
  };

  const handleClear = () => {
    const newSettings = new DraftLookup();
    Object.assign(newSettings, settings);
    newSettings.accountNumberLength = null;
    onChange(newSettings);
  };

  return (
    <Accordion 
      expanded={expanded === 'draftLookup'} 
      onChange={onExpand('draftLookup')}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Draft Lookup Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Account Number Configuration
            </Typography>
          </Grid>

          {/* Account Number Length */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs>
                <TextField
                  fullWidth
                  type="number"
                  label="Account Number Length"
                  value={settings.accountNumberLength ?? ''}
                  onChange={(e) => handleChange(e.target.value)}
                  helperText="Length of account numbers for draft lookup (optional)"
                  InputProps={{
                    endAdornment: settings.accountNumberLength !== null && (
                      <Tooltip title="Clear value">
                        <IconButton
                          size="small"
                          onClick={handleClear}
                          sx={{ mr: 1 }}
                        >
                          <ClearIcon />
                        </IconButton>
                      </Tooltip>
                    )
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default DraftLookupSection;

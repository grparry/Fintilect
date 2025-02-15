import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  Paper,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { DraftLookup } from '../../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/DraftLookup';

interface DraftLookupSectionProps {
  settings: DraftLookup;
  onChange: (settings: DraftLookup) => void;
}

const DraftLookupSection: React.FC<DraftLookupSectionProps> = ({
  settings,
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Account Number Configuration
              </Typography>
            </Grid>
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
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DraftLookupSection;

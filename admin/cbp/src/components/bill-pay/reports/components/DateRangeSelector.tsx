import React from 'react';
import { Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

interface DateRangeSelectorProps {
  startDate: Dayjs;
  endDate: Dayjs;
  onStartDateChange: (date: Dayjs | null) => void;
  onEndDateChange: (date: Dayjs | null) => void;
  startLabel?: string;
  endLabel?: string;
  disabled?: boolean;
}

/**
 * A reusable component for selecting a date range
 */
const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  startLabel = 'Start Date',
  endLabel = 'End Date',
  disabled = false,
}) => {
  return (
    <Grid container spacing={2} sx={{ mb: 1 }}>
      <Grid item xs={12} md={6} lg={3}>
        <DatePicker
          label={startLabel}
          value={startDate}
          onChange={onStartDateChange}
          slotProps={{ 
            textField: { 
              fullWidth: true,
              size: "small",
              margin: "dense"
            } 
          }}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <DatePicker
          label={endLabel}
          value={endDate}
          onChange={onEndDateChange}
          slotProps={{ 
            textField: { 
              fullWidth: true,
              size: "small",
              margin: "dense"
            } 
          }}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
};

export default DateRangeSelector;

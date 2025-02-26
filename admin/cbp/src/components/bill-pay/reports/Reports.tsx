import React, { useState, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';
import { ReportResponse } from '../../../types/report.types';
import { reportService } from '../../../services/factory/ServiceFactory';

const Reports: React.FC = () => {
  const [filters, setFilters] = useState({
    startDate: dayjs().subtract(7, 'day'),
    endDate: dayjs(),
    reportType: 'PaymentReport',
    searchTerm: '',
  });
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadReportData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const args = JSON.stringify({
        startDate: filters.startDate.format('YYYY-MM-DD'),
        endDate: filters.endDate.format('YYYY-MM-DD'),
        searchTerm: filters.searchTerm
      });

      const response = await reportService.runReport(filters.reportType, args);
      setReportData(JSON.parse(response.jsonResponse));
    } catch (err) {
      setError('Failed to load report data');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const handleDateChange = (field: 'startDate' | 'endDate') => (date: dayjs.Dayjs | null) => {
    if (date) {
      setFilters(prev => ({ ...prev, [field]: date }));
    }
  };

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchTerm: event.target.value }));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Typography variant="h4" gutterBottom color="text.primary">
          Payment Report
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={3}>
                <DatePicker
                  label="Start Date"
                  value={filters.startDate}
                  onChange={handleDateChange('startDate')}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <DatePicker
                  label="End Date"
                  value={filters.endDate}
                  onChange={handleDateChange('endDate')}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Search"
                  value={filters.searchTerm}
                  onChange={handleSearchTermChange}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={loadReportData}
              >
                Run Report
              </Button>
            </Box>
            {reportData && (
              <Box sx={{ mt: 3 }}>
                <pre style={{ whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(reportData, null, 2)}
                </pre>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};

export default Reports;
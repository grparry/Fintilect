import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchIcon from '@mui/icons-material/Search';
import dayjs, { Dayjs } from 'dayjs';
import {
  ReportData,
  ReportType,
  ReportFilters,
  AuditRecord,
  TransactionRecord,
  UserRecord,
} from '../../../types/report.types';
import { reportService } from '../../../services/report.service';

const Reports: React.FC = () => {
  // State
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [filters, setFilters] = useState<ReportFilters>({
    startDate: dayjs().subtract(7, 'day'),
    endDate: dayjs(),
    reportType: 'all',
    searchTerm: '',
  });
  const [reportData, setReportData] = useState<ReportData>({
    audit: [],
    transactions: [],
    users: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [exporting, setExporting] = useState<boolean>(false);

  // Load initial data
  const loadReportData = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Fetching report data with filters:', filters);
      const data = await reportService.getReportData(filters);
      console.log('Received report data:', data);
      setReportData(data);
      setError(null);
    } catch (err) {
      setError('Failed to load report data');
      console.error('Error loading report data:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadReportData();
  }, [loadReportData]);

  // Event handlers
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleDateChange = (field: 'startDate' | 'endDate') => (newValue: Dayjs | null) => {
    if (newValue) {
      setFilters(prev => ({
        ...prev,
        [field]: newValue,
      }));
    }
  };

  const handleReportTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      reportType: event.target.value as ReportType,
    }));
  };

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      searchTerm: event.target.value,
    }));
  };

  const handleSearch = async () => {
    await loadReportData();
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const blob = await reportService.exportReport(filters, {
        format: 'excel',
        includeHeaders: true,
        dateFormat: 'YYYY-MM-DD',
      });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report-${dayjs().format('YYYY-MM-DD')}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setSuccess('Report exported successfully');
    } catch (err) {
      setError('Failed to export report');
      console.error('Error exporting report:', err);
    } finally {
      setExporting(false);
    }
  };

  // Render functions
  const renderAuditTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Timestamp</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportData.audit.map((row: AuditRecord) => (
            <TableRow key={row.id}>
              <TableCell>{dayjs(row.timestamp).format('MM/DD/YYYY')}</TableCell>
              <TableCell>{row.user}</TableCell>
              <TableCell>{row.action}</TableCell>
              <TableCell>{row.details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderTransactionTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Recipient</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportData.transactions.map((row: TransactionRecord) => (
            <TableRow key={row.id}>
              <TableCell>{dayjs(row.date).format('MM/DD/YYYY')}</TableCell>
              <TableCell>${row.amount.toFixed(2)}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.recipient}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderUserTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Last Login</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportData.users.map((row: UserRecord) => (
            <TableRow key={row.id}>
              <TableCell>{row.username}</TableCell>
              <TableCell>{dayjs(row.lastLogin).format('MM/DD/YYYY')}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

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
        <Typography variant="h4" gutterBottom>
          Reports
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(null)}>
            {success}
          </Alert>
        )}
        
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Tabs value={selectedTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tab label="Audit Reports" />
              <Tab label="Transaction Reports" />
              <Tab label="User Reports" />
            </Tabs>

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
              <Grid item xs={12} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Report Type"
                  value={filters.reportType}
                  onChange={handleReportTypeChange}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="login">Login Activity</MenuItem>
                  <MenuItem value="payments">Payment Activity</MenuItem>
                  <MenuItem value="system">System Activity</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={3}>
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
                onClick={handleSearch}
              >
                Search
              </Button>
              <Button
                variant="outlined"
                startIcon={<FileDownloadIcon />}
                onClick={handleExport}
                disabled={exporting}
              >
                {exporting ? 'Exporting...' : 'Export'}
              </Button>
            </Box>

            <Box sx={{ mt: 3 }}>
              {selectedTab === 0 && renderAuditTable()}
              {selectedTab === 1 && renderTransactionTable()}
              {selectedTab === 2 && renderUserTable()}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};

export default Reports;

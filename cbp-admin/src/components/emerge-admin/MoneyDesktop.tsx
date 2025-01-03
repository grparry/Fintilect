import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  MenuItem,
  Chip,
  Stack,
  Alert,
  Tabs,
  Tab,
  CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SyncIcon from '@mui/icons-material/Sync';
import dayjs, { Dayjs } from 'dayjs';
import {
  Account,
  Connection,
  MoneyDesktopFilters,
  StatusColor,
} from '../../types/money-desktop.types';
import { moneyDesktopService } from '../../services/money-desktop.service';
import SyncDialog from './components/SyncDialog';
import DetailsDialog from './components/DetailsDialog';

export const statusColors: StatusColor = {
  Connected: 'success',
  Error: 'error',
  Pending: 'warning',
  Active: 'success',
  Inactive: 'error',
};

const MoneyDesktop: React.FC = () => {
  // State
  const [tabValue, setTabValue] = useState<number>(0);
  const [filters, setFilters] = useState<MoneyDesktopFilters>({
    searchTerm: '',
    selectedStatus: 'all',
    startDate: null,
    endDate: null,
  });
  const [connections, setConnections] = useState<Connection[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [exporting, setExporting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Dialog state
  const [openDetailsDialog, setOpenDetailsDialog] = useState<boolean>(false);
  const [openSyncDialog, setOpenSyncDialog] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Connection | Account | null>(null);

  // Load initial data
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (tabValue === 0) {
        const data = await moneyDesktopService.getConnections(filters);
        setConnections(data);
      } else {
        const data = await moneyDesktopService.getAccounts(filters);
        setAccounts(data);
      }
    } catch (err) {
      setError('Failed to load data');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  }, [tabValue, filters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Event handlers
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFilterChange = (field: keyof MoneyDesktopFilters) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilters(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleDateChange = (field: 'startDate' | 'endDate') => (newValue: Dayjs | null) => {
    setFilters(prev => ({
      ...prev,
      [field]: newValue ? newValue.format('YYYY-MM-DD') : null,
    }));
  };

  const handleSearch = () => {
    loadData();
  };

  const handleRefresh = () => {
    loadData();
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      setError(null);
      
      const blob = await (tabValue === 0
        ? moneyDesktopService.exportConnections(filters)
        : moneyDesktopService.exportAccounts(filters));

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `${tabValue === 0 ? 'connections' : 'accounts'}-${dayjs().format('YYYY-MM-DD')}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setSuccess('Export completed successfully');
    } catch (err) {
      setError('Failed to export data');
      console.error('Error exporting data:', err);
    } finally {
      setExporting(false);
    }
  };

  const handleViewDetails = (item: Connection | Account) => {
    setSelectedItem(item);
    setOpenDetailsDialog(true);
  };

  const handleSync = (item: Connection) => {
    setSelectedItem(item);
    setOpenSyncDialog(true);
  };

  const handleSyncConfirm = async (connection: Connection) => {
    try {
      setError(null);
      await moneyDesktopService.syncConnection(connection.id);
      setSuccess('Sync started successfully');
      loadData();
    } catch (err) {
      setError('Failed to start sync');
      console.error('Error starting sync:', err);
    }
  };

  // Render functions
  const renderConnectionsTab = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Client Name</TableCell>
            <TableCell>Institution</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Last Sync</TableCell>
            <TableCell>Accounts</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {connections.map((connection) => (
            <TableRow key={connection.id}>
              <TableCell>{connection.clientName}</TableCell>
              <TableCell>{connection.institutionName}</TableCell>
              <TableCell>
                <Chip
                  label={connection.status}
                  color={statusColors[connection.status]}
                  size="small"
                />
              </TableCell>
              <TableCell>{connection.lastSync}</TableCell>
              <TableCell>{connection.accounts}</TableCell>
              <TableCell>
                <Tooltip title="View Details">
                  <IconButton size="small" onClick={() => handleViewDetails(connection)}>
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Sync Now">
                  <IconButton size="small" onClick={() => handleSync(connection)}>
                    <SyncIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderAccountsTab = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Client Name</TableCell>
            <TableCell>Institution</TableCell>
            <TableCell>Account Name</TableCell>
            <TableCell>Account Number</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell>{account.clientName}</TableCell>
              <TableCell>{account.institutionName}</TableCell>
              <TableCell>{account.accountName}</TableCell>
              <TableCell>{account.accountNumber}</TableCell>
              <TableCell>{account.type}</TableCell>
              <TableCell>${account.balance.toLocaleString()}</TableCell>
              <TableCell>
                <Chip
                  label={account.status}
                  color={statusColors[account.status]}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Tooltip title="View Details">
                  <IconButton size="small" onClick={() => handleViewDetails(account)}>
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
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
          Money Desktop
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
            <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tab label="Connections" />
              <Tab label="Accounts" />
            </Tabs>

            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={3}>
                <DatePicker
                  label="Start Date"
                  value={filters.startDate ? dayjs(filters.startDate) : null}
                  onChange={handleDateChange('startDate')}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <DatePicker
                  label="End Date"
                  value={filters.endDate ? dayjs(filters.endDate) : null}
                  onChange={handleDateChange('endDate')}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Status"
                  value={filters.selectedStatus}
                  onChange={handleFilterChange('selectedStatus')}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="Connected">Connected</MenuItem>
                  <MenuItem value="Error">Error</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Search"
                  value={filters.searchTerm}
                  onChange={handleFilterChange('searchTerm')}
                />
              </Grid>
            </Grid>

            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
              >
                Search
              </Button>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
              >
                Refresh
              </Button>
              <Button
                variant="outlined"
                startIcon={<FileDownloadIcon />}
                onClick={handleExport}
                disabled={exporting}
              >
                {exporting ? 'Exporting...' : 'Export'}
              </Button>
            </Stack>

            <Box sx={{ mt: 3 }}>
              {tabValue === 0 ? renderConnectionsTab() : renderAccountsTab()}
            </Box>
          </CardContent>
        </Card>

        <SyncDialog
          open={openSyncDialog}
          onClose={() => setOpenSyncDialog(false)}
          connection={selectedItem as Connection}
          onSync={handleSyncConfirm}
        />

        <DetailsDialog
          open={openDetailsDialog}
          onClose={() => setOpenDetailsDialog(false)}
          item={selectedItem}
          type={tabValue === 0 ? 'connection' : 'account'}
          onSync={tabValue === 0 ? handleSync : undefined}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default MoneyDesktop;

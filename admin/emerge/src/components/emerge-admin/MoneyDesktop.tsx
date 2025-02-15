import React, { useState, useEffect } from 'react';
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
import InfoIcon from '@mui/icons-material/Info';
import dayjs, { Dayjs } from 'dayjs';
import {
  Account,
  Connection,
  MoneyDesktopFilters,
  StatusColor,
  ConnectionStatus,
  AccountStatus,
} from '../../types/money-desktop.types';
import { moneyDesktopService } from '../../services/factory/ServiceFactory';
import SyncDialog from './components/SyncDialog';
import DetailsDialog from './components/DetailsDialog';

export const statusColors: StatusColor = {
  Connected: 'success',
  Error: 'error',
  Pending: 'warning',
  Active: 'success',
  Inactive: 'error',
};

interface MoneyDesktopState {
  connections: Connection[];
  accounts: Account[];
  loading: boolean;
  error: string | null;
  success: string | null;
  filters: MoneyDesktopFilters;
  selectedTab: number;
  syncDialogOpen: boolean;
  detailsDialogOpen: boolean;
  selectedItem: Connection | Account | null;
  selectedItemType: 'connection' | 'account' | null;
}

const MoneyDesktop: React.FC = () => {
  const [state, setState] = useState<MoneyDesktopState>({
    connections: [],
    accounts: [],
    loading: true,
    error: null,
    success: null,
    filters: {
      searchTerm: '',
      status: undefined,
      type: undefined,
      dateRange: undefined
    },
    selectedTab: 0,
    syncDialogOpen: false,
    detailsDialogOpen: false,
    selectedItem: null,
    selectedItemType: null
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const [connections, accounts] = await Promise.all([
        moneyDesktopService.getConnections(state.filters),
        moneyDesktopService.getAccounts(state.filters)
      ]);
      setState(prev => ({
        ...prev,
        connections,
        accounts,
        loading: false,
        error: null
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred while loading data'
      }));
    }
  };

  const handleRefresh = () => {
    loadData();
  };

  const handleSearch = () => {
    loadData();
  };

  const handleSync = async (connection: Connection) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await moneyDesktopService.syncConnection(connection.id);
      setState(prev => ({
        ...prev,
        loading: false,
        success: 'Connection synced successfully'
      }));
      loadData();
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred while syncing'
      }));
    }
  };

  const handleFilterChange = (field: keyof MoneyDesktopFilters, value: any) => {
    setState(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [field]: value
      }
    }));
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setState(prev => ({ ...prev, selectedTab: newValue }));
  };

  const handleOpenSyncDialog = (connection: Connection) => {
    setState(prev => ({
      ...prev,
      syncDialogOpen: true,
      selectedItem: connection,
      selectedItemType: 'connection'
    }));
  };

  const handleOpenDetailsDialog = (item: Connection | Account, type: 'connection' | 'account') => {
    setState(prev => ({
      ...prev,
      detailsDialogOpen: true,
      selectedItem: item,
      selectedItemType: type
    }));
  };

  const handleCloseSyncDialog = () => {
    setState(prev => ({
      ...prev,
      syncDialogOpen: false,
      selectedItem: null,
      selectedItemType: null
    }));
  };

  const handleCloseDetailsDialog = () => {
    setState(prev => ({
      ...prev,
      detailsDialogOpen: false,
      selectedItem: null,
      selectedItemType: null
    }));
  };

  const renderFilters = () => (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label="Search"
          value={state.filters.searchTerm}
          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          select
          label="Status"
          value={state.filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <MenuItem value={undefined}>All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date Range"
            value={state.filters.dateRange}
            onChange={(date) => handleFilterChange('dateRange', date)}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
          sx={{ mr: 1 }}
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
      </Grid>
    </Grid>
  );

  const renderConnectionsTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Institution</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Last Sync</TableCell>
            <TableCell>Accounts</TableCell>
            <TableCell>Total Balance</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.connections.map((connection) => (
            <TableRow key={connection.id}>
              <TableCell>{connection.institutionName}</TableCell>
              <TableCell>
                <Chip
                  label={connection.status}
                  color={statusColors[connection.status]}
                  size="small"
                />
              </TableCell>
              <TableCell>
                {connection.lastSync ? new Date(connection.lastSync).toLocaleString() : 'Never'}
              </TableCell>
              <TableCell>{connection.accountCount}</TableCell>
              <TableCell>${connection.totalBalance.toLocaleString()}</TableCell>
              <TableCell>
                <Tooltip title="Sync">
                  <IconButton onClick={() => handleOpenSyncDialog(connection)}>
                    <SyncIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View Details">
                  <IconButton onClick={() => handleOpenDetailsDialog(connection, 'connection')}>
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

  const renderAccountsTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Institution</TableCell>
            <TableCell>Account Name</TableCell>
            <TableCell>Account Number</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.accounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell>{account.institutionName}</TableCell>
              <TableCell>{account.accountName}</TableCell>
              <TableCell>{account.accountNumber}</TableCell>
              <TableCell>{account.type}</TableCell>
              <TableCell>
                <Chip
                  label={account.status}
                  color={statusColors[account.status]}
                  size="small"
                />
              </TableCell>
              <TableCell>${account.balance.toLocaleString()}</TableCell>
              <TableCell>
                <Tooltip title="View Details">
                  <IconButton onClick={() => handleOpenDetailsDialog(account, 'account')}>
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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Money Desktop
      </Typography>

      {state.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {state.error}
        </Alert>
      )}

      {state.success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {state.success}
        </Alert>
      )}

      {renderFilters()}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={state.selectedTab} onChange={handleTabChange}>
          <Tab label="Connections" />
          <Tab label="Accounts" />
        </Tabs>
      </Box>

      {state.loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {state.selectedTab === 0 ? renderConnectionsTable() : renderAccountsTable()}
        </>
      )}

      <SyncDialog
        open={state.syncDialogOpen}
        onClose={handleCloseSyncDialog}
        connection={state.selectedItem as Connection}
        onSync={handleSync}
      />

      <DetailsDialog
        open={state.detailsDialogOpen}
        onClose={handleCloseDetailsDialog}
        item={state.selectedItem}
        type={state.selectedItemType}
        onSync={handleSync}
      />
    </Box>
  );
};

export default MoneyDesktop;

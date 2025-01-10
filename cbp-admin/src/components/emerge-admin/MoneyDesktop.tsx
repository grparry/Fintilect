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
import dayjs, { Dayjs } from 'dayjs';
import {
  Account,
  Connection,
  MoneyDesktopFilters,
  StatusColor,
  ConnectionStatus,
  AccountStatus,
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
      selectedStatus: 'all',
      startDate: null,
      endDate: null
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
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to load data',
        loading: false
      }));
      console.error('Error loading data:', error);
    }
  };

  const handleSync = async (connection: Connection) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await moneyDesktopService.syncConnection(connection.id);

      await loadData(); // Reload data after sync

      setState(prev => ({
        ...prev,
        success: 'Connection synced successfully',
        syncDialogOpen: false,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to sync connection',
        loading: false
      }));
      console.error('Error syncing connection:', error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setState(prev => ({
      ...prev,
      selectedTab: newValue
    }));
  };

  const handleFilterChange = (filters: MoneyDesktopFilters) => {
    setState(prev => ({
      ...prev,
      filters
    }));
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

  const handleCloseDialogs = () => {
    setState(prev => ({
      ...prev,
      syncDialogOpen: false,
      detailsDialogOpen: false,
      selectedItem: null,
      selectedItemType: null
    }));
  };

  const filteredConnections = state.connections.filter(connection => {
    const matchesSearch = connection.clientName.toLowerCase().includes(state.filters.searchTerm.toLowerCase()) ||
                         connection.institutionName.toLowerCase().includes(state.filters.searchTerm.toLowerCase());
    const matchesStatus = state.filters.selectedStatus === 'all' || connection.status === state.filters.selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredAccounts = state.accounts.filter(account => {
    const matchesSearch = account.accountName.toLowerCase().includes(state.filters.searchTerm.toLowerCase()) ||
                         account.accountNumber.toLowerCase().includes(state.filters.searchTerm.toLowerCase());
    const matchesStatus = state.filters.selectedStatus === 'all' || account.status === state.filters.selectedStatus;
    return matchesSearch && matchesStatus;
  });

  if (state.loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Typography variant="h5" gutterBottom>
          Money Desktop
        </Typography>

        {state.error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setState(prev => ({ ...prev, error: null }))}>
            {state.error}
          </Alert>
        )}

        {state.success && (
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => setState(prev => ({ ...prev, success: null }))}>
            {state.success}
          </Alert>
        )}
        
        <Card>
          <CardContent>
            <Tabs value={state.selectedTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tab label="Connections" />
              <Tab label="Accounts" />
            </Tabs>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={3}>
                <DatePicker
                  label="Start Date"
                  value={state.filters.startDate ? dayjs(state.filters.startDate) : null}
                  onChange={(newValue: Dayjs | null) => handleFilterChange({ ...state.filters, startDate: newValue ? newValue.format('YYYY-MM-DD') : null })}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <DatePicker
                  label="End Date"
                  value={state.filters.endDate ? dayjs(state.filters.endDate) : null}
                  onChange={(newValue: Dayjs | null) => handleFilterChange({ ...state.filters, endDate: newValue ? newValue.format('YYYY-MM-DD') : null })}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Status"
                  value={state.filters.selectedStatus}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFilterChange({ ...state.filters, selectedStatus: event.target.value as ConnectionStatus | AccountStatus | 'all' })}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="Connected">Connected</MenuItem>
                  <MenuItem value="Error">Error</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Search"
                  value={state.filters.searchTerm}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFilterChange({ ...state.filters, searchTerm: event.target.value })}
                />
              </Grid>
            </Grid>

            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={loadData}
              >
                Search
              </Button>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={loadData}
              >
                Refresh
              </Button>
              <Button
                variant="outlined"
                startIcon={<FileDownloadIcon />}
                onClick={async () => {
                  try {
                    setState(prev => ({ ...prev, loading: true, error: null }));
                    const blob = await (state.selectedTab === 0
                      ? moneyDesktopService.exportConnections(state.filters)
                      : moneyDesktopService.exportAccounts(state.filters));

                    // Create download link
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute(
                      'download',
                      `${state.selectedTab === 0 ? 'connections' : 'accounts'}-${dayjs().format('YYYY-MM-DD')}.xlsx`
                    );
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    window.URL.revokeObjectURL(url);

                    setState(prev => ({
                      ...prev,
                      success: 'Export completed successfully',
                      loading: false
                    }));
                  } catch (err) {
                    setState(prev => ({
                      ...prev,
                      error: err instanceof Error ? err.message : 'Failed to export data',
                      loading: false
                    }));
                    console.error('Error exporting data:', err);
                  }
                }}
              >
                Export
              </Button>
            </Stack>

            <Box sx={{ mt: 3 }}>
              {state.selectedTab === 0 ? (
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
                      {filteredConnections.map((connection) => (
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
                              <IconButton size="small" onClick={() => handleOpenDetailsDialog(connection, 'connection')}>
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Sync Now">
                              <IconButton size="small" onClick={() => handleOpenSyncDialog(connection)}>
                                <SyncIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
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
                      {filteredAccounts.map((account) => (
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
                              <IconButton size="small" onClick={() => handleOpenDetailsDialog(account, 'account')}>
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          </CardContent>
        </Card>

        <SyncDialog
          open={state.syncDialogOpen}
          onClose={handleCloseDialogs}
          connection={state.selectedItem as Connection}
          onSync={handleSync}
        />

        <DetailsDialog
          open={state.detailsDialogOpen}
          onClose={handleCloseDialogs}
          item={state.selectedItem}
          type={state.selectedItemType || 'connection'}
          onSync={state.selectedItemType === 'connection' ? handleSync : undefined}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default MoneyDesktop;

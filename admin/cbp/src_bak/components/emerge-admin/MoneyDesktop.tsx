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






      ]);

        ...prev,
        ...prev,



        ...prev,
        ...prev,

      ...prev,

      ...prev,

      ...prev,

      ...prev,

      ...prev,



      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Typography variant="h5" gutterBottom>
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
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <DatePicker
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
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
                />
              </Grid>
            </Grid>

            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Button
              >
              </Button>
              <Button
              >
              </Button>
              <Button
                      ? moneyDesktopService.exportConnections(state.filters)
                      : moneyDesktopService.exportAccounts(state.filters));

                    // Create download link
                      'download',
                      `${state.selectedTab === 0 ? 'connections' : 'accounts'}-${dayjs().format('YYYY-MM-DD')}.xlsx`
                    );

                      ...prev,
                      ...prev,
              >
              </Button>
            </Stack>

            <Box sx={{ mt: 3 }}>
              {state.selectedTab === 0 ? (
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
                      {filteredConnections.map((connection) => (
                        <TableRow key={connection.id}>
                          <TableCell>{connection.institutionName}</TableCell>
                          <TableCell>
                            <Chip
                            />
                          </TableCell>
                          <TableCell>
                            {connection.lastSync ? new Date(connection.lastSync).toLocaleString() : 'Never'}
                          </TableCell>
                          <TableCell>{connection.accountCount}</TableCell>
                          <TableCell>${connection.totalBalance.toLocaleString()}</TableCell>
                          <TableCell>
                            <Tooltip title="View Details">
                              <IconButton size="small" onClick={() => handleOpenDetailsDialog(connection, 'connection')}>
                                <InfoIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Sync">
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
                        <TableCell>Institution</TableCell>
                        <TableCell>Account Name</TableCell>
                        <TableCell>Account Number</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Balance</TableCell>
                        <TableCell>Last Updated</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredAccounts.map((account) => (
                        <TableRow key={account.id}>
                          <TableCell>{account.institutionName}</TableCell>
                          <TableCell>{account.accountName}</TableCell>
                          <TableCell>{account.accountNumber}</TableCell>
                          <TableCell>{account.type}</TableCell>
                          <TableCell>
                            <Chip
                            />
                          </TableCell>
                          <TableCell>${account.balance.toLocaleString()}</TableCell>
                          <TableCell>
                            {account.lastUpdated ? new Date(account.lastUpdated).toLocaleString() : 'Never'}
                          </TableCell>
                          <TableCell>
                            <Tooltip title="View Details">
                              <IconButton size="small" onClick={() => handleOpenDetailsDialog(account, 'account')}>
                                <InfoIcon />
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
        />

        <DetailsDialog
        />
      </Box>
    </LocalizationProvider>
  );


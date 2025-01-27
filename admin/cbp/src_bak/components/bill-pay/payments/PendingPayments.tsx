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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  TablePagination,
  Stack,
  Alert,
  Checkbox,
  FormControlLabel,
  SelectChangeEvent,
  CircularProgress,
  LinearProgress,
  OutlinedInput,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HistoryIcon from '@mui/icons-material/History';
import LockIcon from '@mui/icons-material/Lock';
import dayjs, { Dayjs } from 'dayjs';

import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import { useAuth } from '../../../hooks/useAuth';
import {
  PendingPayment,
  PendingPaymentSummary,
  PendingPaymentSearchRequest,
  PaymentStatus,
  PaymentMethod,
  Priority,
  PaymentHistory,
  ConfirmationMethod,
  PaymentConfirmationRequest,
  PaymentConfirmationResponse,
} from '../../../types/bill-pay.types';

interface PaymentDialogState {
  open: boolean;
  payment: PendingPayment | null;
  action: 'view' | 'approve' | 'reject' | 'history' | 'confirm' | null;
  history?: PaymentHistory[];
}

interface FilterState {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  searchTerm: string;
  status?: PaymentStatus[];
  method?: PaymentMethod[];
  priority?: Priority[];
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  clientId?: string;
  payeeId?: string;
  minAmount?: number;
  maxAmount?: number;
}

interface ConfirmationState {
  method: ConfirmationMethod;
  code: string;
  attempts: number;
  maxAttempts: number;
  expiresAt: string | null;
  error: string | null;
  processing: boolean;
  confirmationStatus: string | null;
}

const initialConfirmationState: ConfirmationState = {
  method: ConfirmationMethod.OTP,
  code: '',
  attempts: 0,
  maxAttempts: 3,
  expiresAt: null,
  error: null,
  processing: false,
  confirmationStatus: null
};

const PendingPayments: React.FC = () => {
  const { user } = useAuth();
  const paymentService = ServiceFactory.getInstance().getPaymentService();

  // State








  // State


  // Helper function to get priority color

  // Helper function to get status color

  // Fetch pending payments
      
      

  // Fetch payment summary


  // Apply client-side filtering whenever payments or searchTerm changes

      );


  // Update total payments when filtered results change

  // Handlers


  ) => {


      ...prev,

      ...prev,

      ...prev,


        ...filters,




    




      ...prev,

  // Confirmation handlers
      ...prev,

        ...prev,
        ...prev,

      
      // Since the operation completed without throwing an error, we can proceed

        ...prev,


        ...prev,
      
        // Update the current dialog to show the confirmation status
          ...prev,
        ...prev,

      ...prev,
      [field]: undefined

  ) => {
      
        );
        );
        );

        ...prev,
        [field]: newValue
    // Close the dropdown after deletion

  // Render functions
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                  // Only open dropdown if click wasn't on a chip or delete icon
                  '& .MuiSelect-select': {
                  <Box 
                  >
                    {selected.map((value) => (
                      <Chip
                          '& .MuiChip-deleteIcon': {
                      />
                    ))}
                  </Box>
                )}
              >
                {Object.values(PaymentStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Method</InputLabel>
              <Select
                  <Box 
                  >
                    {selected.map((value) => (
                      <Chip
                          '& .MuiChip-deleteIcon': {
                      />
                    ))}
                  </Box>
                )}
              >
                {Object.values(PaymentMethod).map((method) => (
                  <MenuItem key={method} value={method}>
                    {method}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                  <Box 
                  >
                    {selected.map((value) => (
                      <Chip
                          '& .MuiChip-deleteIcon': {
                      />
                    ))}
                  </Box>
                )}
              >
                {Object.values(Priority).map((priority) => (
                  <MenuItem key={priority} value={priority}>
                    {priority}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

        <Box sx={{ width: '100%', textAlign: 'center', py: 3 }}>
          <CircularProgress />
        </Box>
      );

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                    )
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Payee</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Effective Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : !Array.isArray(filteredPayments) || filteredPayments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                </TableCell>
              </TableRow>
            ) : (
                <TableRow key={payment.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                            ? [...selectedPayments, payment.id]
                            : selectedPayments.filter((id) => id !== payment.id)
                        )
                    />
                  </TableCell>
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>{payment.clientName}</TableCell>
                  <TableCell>{payment.payeeName}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('en-US', {
                  </TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>
                    <Chip
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                    />
                  </TableCell>
                  <TableCell>
                    {dayjs(payment.effectiveDate).format('MM/DD/YYYY')}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="View Details">
                        <IconButton
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      {payment.status === PaymentStatus.PENDING && (
                        <>
                          <Tooltip title="Approve">
                            <IconButton
                            >
                              <CheckCircleIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Reject">
                            <IconButton
                            >
                              <CancelIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                      <Tooltip title="View History">
                        <IconButton
                        >
                          <HistoryIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
        />
      </TableContainer>
    );

    <Dialog
    >
      <DialogTitle>
        {dialogState.action === 'view'
          ? 'Payment Details'
          : dialogState.action === 'approve'
          ? 'Approve Payment'
          : dialogState.action === 'reject'
          ? 'Reject Payment'
          : 'Payment History'}
      </DialogTitle>
      <DialogContent>
        {dialogState.payment && (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                </Typography>
                <Typography>{dialogState.payment.id}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                </Typography>
                <Typography>
                  {new Intl.NumberFormat('en-US', {
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                </Typography>
                <Typography>{dialogState.payment.status}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                </Typography>
                <Typography>{dialogState.payment.method}</Typography>
              </Grid>
              {confirmation.code && (
                <Grid item xs={12}>
                  <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1, border: 1, borderColor: 'divider' }}>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    </Typography>
                    <Typography variant="h6" sx={{ fontFamily: 'monospace', letterSpacing: 1 }}>
                      {confirmation.code}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {confirmation.confirmationStatus && (
                <Grid item xs={12}>
                  <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    </Typography>
                    <Typography variant="body1">
                      {confirmation.confirmationStatus}
                    </Typography>
                    {confirmation.error && (
                      <Typography color="error" sx={{ mt: 1 }}>
                        {confirmation.error}
                      </Typography>
                    )}
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    </Typography>
                    {confirmation.expiresAt && (
                      <Typography variant="caption" display="block">
                      </Typography>
                    )}
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        )}
        {dialogState.action === 'history' && dialogState.history && (
          <Box sx={{ mt: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Action</TableCell>
                    <TableCell>Details</TableCell>
                    <TableCell>Performed By</TableCell>
                    <TableCell>Timestamp</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dialogState.history.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="body2">
                          {entry.action}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {entry.details && typeof entry.details === 'object' ? (
                            <>
                              {entry.details.previousStatus && entry.details.newStatus && (
                                `Status changed from ${entry.details.previousStatus} to ${entry.details.newStatus}`
                              )}
                              {entry.details.description && entry.details.description}
                              {entry.details.notes && (
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                </Typography>
                              )}
                              {entry.details.confirmationCode && (
                                <Box sx={{ mt: 1 }}>
                                  <Typography variant="body2" color="text.secondary">
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontFamily: 'monospace', letterSpacing: 1 }}>
                                    {entry.details.confirmationCode}
                                  </Typography>
                                </Box>
                              )}
                            </>
                          ) : (
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {entry.performedBy}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {dayjs(entry.timestamp).format('MM/DD/YYYY HH:mm:ss')}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
        >
        </Button>
      </DialogActions>
    </Dialog>
  );


      <Dialog
      >
        <DialogTitle>Reject Payment</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
          >
          </Button>
          <Button
          >
          </Button>
        </DialogActions>
      </Dialog>
    );

    <Box>
      {renderFilters()}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item>
          <Button
          >
          </Button>
        </Grid>
        <Grid item>
          <Button
          >
          </Button>
        </Grid>
      </Grid>
      {renderTable()}
      {renderDialog()}
      {renderRejectDialog()}
    </Box>
  );


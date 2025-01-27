import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Stack,
  CircularProgress,
  TablePagination,
  Divider,
  SelectChangeEvent,
  Checkbox,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReplayIcon from '@mui/icons-material/Replay';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import dayjs from 'dayjs';
import { ApiResponse } from '../../../types/api.types';
import {
  FISException,
  FISExceptionFilters,
  FISResponseHistory,
  FISRetryResult,
  ExceptionStats,
  FISExceptionStatus,
  FISErrorCode,
} from '../../../types/bill-pay.types';
import { useAuth } from '../../../hooks/useAuth';

interface FISDialogState {
  open: boolean;
  exception: FISException | null;
  action: 'view' | 'retry' | 'delete' | null;
}

interface FilterState {
  startDate: string | null;
  endDate: string | null;
  status: FISExceptionStatus[];
  errorCodes: FISErrorCode[];
  searchTerm: string;
}

interface FISExceptionHandlingProps {
  api: {
    getExceptions: (filters: FISExceptionFilters) => Promise<ApiResponse<FISException[]>>;
    getResponseHistory: (requestId: string) => Promise<ApiResponse<FISResponseHistory[]>>;
    retryException: (id: string) => Promise<ApiResponse<FISRetryResult>>;
    ignoreException: (id: string, notes: string) => Promise<ApiResponse<void>>;
    bulkRetry: (ids: string[]) => Promise<ApiResponse<FISRetryResult[]>>;
    bulkDelete: (ids: string[]) => Promise<ApiResponse<void>>;
    exportExceptions: (filters: FISExceptionFilters) => Promise<Blob>;
    getExceptionStats: () => Promise<ApiResponse<ExceptionStats>>;
  };
  onClose: () => void;
}

interface ExceptionSummary {
  total: number;
  byStatus: Record<FISExceptionStatus, number>;
}

const getExceptionSummary = (exceptions: FISException[]): ExceptionSummary => {
  const summary: ExceptionSummary = {
    total: exceptions.length,
    byStatus: {
      [FISExceptionStatus.PENDING]: 0,






      [FISExceptionStatus.PENDING]: 0,
      [FISExceptionStatus.IN_PROGRESS]: 0,
      [FISExceptionStatus.RESOLVED]: 0,
      [FISExceptionStatus.FAILED]: 0,
      [FISExceptionStatus.REFUNDED]: 0,
      [FISExceptionStatus.RETRYING]: 0,
      [FISExceptionStatus.REVERSED]: 0,
      [FISExceptionStatus.STOPPED]: 0,
      [FISExceptionStatus.RETURNED]: 0,
      [FISExceptionStatus.RESENT]: 0,
      [FISExceptionStatus.REINITIATED]: 0,
      [FISExceptionStatus.PENDING_REVERSAL]: 0,
      [FISExceptionStatus.PENDING_REFUND]: 0,
      [FISExceptionStatus.PENDING_RETURN]: 0,
      [FISExceptionStatus.PENDING_STOP_PAYMENT]: 0,
      [FISExceptionStatus.PENDING_RESEND]: 0,
      [FISExceptionStatus.PENDING_REINITIATE]: 0,




    <Chip
    />
  );

    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Typography variant="body2">
      </Typography>
      <Typography variant="body2">
      </Typography>
      <Typography variant="body2">
      </Typography>
      <Typography variant="body2">
      </Typography>
      <Typography variant="body2">
      </Typography>
    </Box>
  );


  // State









  ) => {


      ...prev,

      ...prev,


    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Exceptions</Typography>
            <Typography variant="h4">{stats?.total || 0}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Resolution Rate</Typography>
            <Typography variant="h4">
              {((stats?.resolutionRate || 0) * 100).toFixed(1)}%
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Avg Retry Count</Typography>
            <Typography>
              {stats?.averageRetryCount.toFixed(1) || 0}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Pending Exceptions</Typography>
            <Typography>{stats?.byStatus[FISExceptionStatus.PENDING] || 0}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
              >
                {EXCEPTION_STATUSES.map((status: FISExceptionStatus) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Error Code</InputLabel>
              <Select
              >
                {EXCEPTION_CODES.map((code: FISErrorCode) => (
                  <MenuItem key={code} value={code}>
                    {code}
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

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                  )
              />
            </TableCell>
            <TableCell>Request ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Error Code</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Retry Count</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exceptions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((exception) => (
            <TableRow key={exception.id}>
              <TableCell padding="checkbox">
                <Checkbox
                        ? [...selectedIds, exception.id]
                        : selectedIds.filter((id) => id !== exception.id)
                    )
                />
              </TableCell>
              <TableCell>{exception.requestId}</TableCell>
              <TableCell>
                <ExceptionStatusChip status={exception.status} />
              </TableCell>
              <TableCell>{exception.errorCode}</TableCell>
              <TableCell>{exception.errorMessage}</TableCell>
              <TableCell>{exception.retryCount}</TableCell>
              <TableCell>{dayjs(exception.createdAt).format('MM/DD/YYYY HH:mm')}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Tooltip title="View Details">
                    <IconButton
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  {exception.status === FISExceptionStatus.PENDING && (
                    <Tooltip title="Retry">
                      <IconButton
                      >
                        <ReplayIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
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
          ? 'Exception Details'
          : dialogState.action === 'retry'
          ? 'Retry Exception'
          : 'Delete Exception'}
      </DialogTitle>
      <DialogContent>
        {dialogState.exception && (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <Typography variant="subtitle2">Request ID</Typography>
              <Typography>{dialogState.exception.requestId}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">Error Code</Typography>
              <Typography>{dialogState.exception.errorCode}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Error Message</Typography>
              <Typography>{dialogState.exception.errorMessage}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">Status</Typography>
              <ExceptionStatusChip status={dialogState.exception.status} />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">Retry Count</Typography>
              <Typography>{dialogState.exception.retryCount}</Typography>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button
        >
        </Button>
        {dialogState.action === 'retry' && dialogState.exception && (
          <Button
          >
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );


    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box
      >
        <Typography variant="h5">FIS Exception Handling</Typography>
        <Stack direction="row" spacing={2}>
          {selectedIds.length > 0 && (
            <>
              <Button
              >
              </Button>
              <Button
              >
              </Button>
            </>
          )}
          <Button
          >
          </Button>
          <Button
          >
          </Button>
        </Stack>
      </Box>

      {stats && (
        <ExceptionSummaryDisplay summary={{
            [FISExceptionStatus.PENDING]: stats.byStatus[FISExceptionStatus.PENDING],
            [FISExceptionStatus.IN_PROGRESS]: stats.byStatus[FISExceptionStatus.IN_PROGRESS],
            [FISExceptionStatus.RESOLVED]: stats.byStatus[FISExceptionStatus.RESOLVED],
            [FISExceptionStatus.FAILED]: stats.byStatus[FISExceptionStatus.FAILED],
            [FISExceptionStatus.REFUNDED]: stats.byStatus[FISExceptionStatus.REFUNDED],
            [FISExceptionStatus.RETRYING]: stats.byStatus[FISExceptionStatus.RETRYING],
            [FISExceptionStatus.REVERSED]: stats.byStatus[FISExceptionStatus.REVERSED],
            [FISExceptionStatus.STOPPED]: stats.byStatus[FISExceptionStatus.STOPPED],
            [FISExceptionStatus.RETURNED]: stats.byStatus[FISExceptionStatus.RETURNED],
            [FISExceptionStatus.RESENT]: stats.byStatus[FISExceptionStatus.RESENT],
            [FISExceptionStatus.REINITIATED]: stats.byStatus[FISExceptionStatus.REINITIATED],
            [FISExceptionStatus.PENDING_REVERSAL]: stats.byStatus[FISExceptionStatus.PENDING_REVERSAL],
            [FISExceptionStatus.PENDING_REFUND]: stats.byStatus[FISExceptionStatus.PENDING_REFUND],
            [FISExceptionStatus.PENDING_RETURN]: stats.byStatus[FISExceptionStatus.PENDING_RETURN],
            [FISExceptionStatus.PENDING_STOP_PAYMENT]: stats.byStatus[FISExceptionStatus.PENDING_STOP_PAYMENT],
            [FISExceptionStatus.PENDING_RESEND]: stats.byStatus[FISExceptionStatus.PENDING_RESEND],
            [FISExceptionStatus.PENDING_REINITIATE]: stats.byStatus[FISExceptionStatus.PENDING_REINITIATE]
      )}

      {renderFilters()}

      {renderExceptionList()}
      {renderDialog()}
    </Box>
  );


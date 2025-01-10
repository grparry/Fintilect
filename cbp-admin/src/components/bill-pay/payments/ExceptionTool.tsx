import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import dayjs from 'dayjs';
import { useAuth } from '../../../hooks/useAuth';
import { ApiErrorResponse, ApiSuccessResponse } from '../../../types/api.types';
import {
  PaymentException,
  ExceptionResolution,
  ResolutionHistory,
  ExceptionTool as IExceptionTool
} from '../../../types/bill-pay.types';

type PaymentApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

interface ExceptionToolProps {
  api: {
    getExceptions: () => Promise<PaymentApiResponse<PaymentException[]>>;
    resolveException: (id: string, resolution: ExceptionResolution) => Promise<PaymentApiResponse<void>>;
  };
  onClose?: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'resolved':
      return 'success';
    case 'ignored':
      return 'error';
    case 'pending':
    default:
      return 'warning';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
    default:
      return 'info';
  }
};

const ExceptionTool: React.FC<ExceptionToolProps> = ({ api, onClose }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exceptions, setExceptions] = useState<PaymentException[]>([]);
  const [selectedException, setSelectedException] = useState<PaymentException | null>(null);
  const [resolutionHistory, setResolutionHistory] = useState<ResolutionHistory[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const loadExceptions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getExceptions();
      if (response.success) {
        setExceptions(response.data);
      } else {
        setError(response.error.message || 'Failed to load exceptions');
      }
    } catch (err) {
      setError('An error occurred while loading exceptions');
      console.error('Error loading exceptions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExceptions();
  }, []);

  const handleExceptionClick = (exception: PaymentException) => {
    setSelectedException(exception);
    setDialogOpen(true);
  };

  const handleResolution = async (type: 'manual' | 'automated' | 'ignore') => {
    if (!selectedException) return;

    try {
      setLoading(true);
      setError(null);
      const resolution: ExceptionResolution = {
        type,
        action: type === 'ignore' ? 'ignore' : 'retry',
        notes: '',
        userId: user?.id?.toString(),
        timestamp: new Date().toISOString()
      };
      const response = await api.resolveException(selectedException.id, resolution);
      if (response.success) {
        await loadExceptions();
        setDialogOpen(false);
        setSelectedException(null);
      } else {
        setError(response.error.message || 'Failed to resolve exception');
      }
    } catch (err) {
      setError('An error occurred while resolving the exception');
      console.error('Error resolving exception:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h5">Exception Tool</Typography>
        <IconButton onClick={loadExceptions} disabled={loading}>
          <RefreshIcon />
        </IconButton>
        {onClose && (
          <Button onClick={onClose} variant="outlined">
            Close
          </Button>
        )}
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Payment ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exceptions.map((exception) => (
                <TableRow key={exception.id}>
                  <TableCell>{exception.paymentId}</TableCell>
                  <TableCell>
                    <Chip
                      label={exception.type}
                      size="small"
                      color={exception.type === 'system' ? 'error' : 'warning'}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={exception.status}
                      color={getStatusColor(exception.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{exception.message}</TableCell>
                  <TableCell>{dayjs(exception.createdAt).format('MM/DD/YYYY HH:mm:ss')}</TableCell>
                  <TableCell>
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => handleExceptionClick(exception)}
                      >
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

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedException && (
          <>
            <DialogTitle>Exception Details</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Payment ID</Typography>
                  <Typography>{selectedException.paymentId}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Type</Typography>
                  <Chip
                    label={selectedException.type}
                    size="small"
                    color={selectedException.type === 'system' ? 'error' : 'warning'}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Status</Typography>
                  <Chip
                    label={selectedException.status}
                    color={getStatusColor(selectedException.status)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Message</Typography>
                  <Typography>{selectedException.message}</Typography>
                </Grid>
                {selectedException.details && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Details</Typography>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>
                      {JSON.stringify(selectedException.details, null, 2)}
                    </pre>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Resolution History</Typography>
                  {selectedException.resolutions?.map((resolution, index) => (
                    <Box key={index} sx={{ mt: 1 }}>
                      <Typography variant="body2">
                        {dayjs(resolution.timestamp).format('MM/DD/YYYY HH:mm:ss')} - {resolution.action}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Type: {resolution.type}
                        {resolution.notes && ` - Notes: ${resolution.notes}`}
                      </Typography>
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
              {selectedException.status === 'pending' && (
                <>
                  <Button
                    onClick={() => handleResolution('automated')}
                    color="primary"
                    disabled={loading}
                  >
                    Retry
                  </Button>
                  <Button
                    onClick={() => handleResolution('ignore')}
                    color="warning"
                    disabled={loading}
                  >
                    Ignore
                  </Button>
                </>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ExceptionTool;

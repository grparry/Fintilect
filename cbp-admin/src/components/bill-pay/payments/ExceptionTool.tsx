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
import {
  PaymentException,
  ExceptionStatus,
  ExceptionResolution,
  PaymentStatus,
  Priority,
} from '../../../types/bill-pay.types';
import { PaymentApiResponse } from '../../../types/api.types';

interface ExceptionToolProps {
  api: {
    getPaymentExceptions: () => Promise<PaymentApiResponse<PaymentException[]>>;
    resolvePaymentException: (id: string, resolution: ExceptionResolution) => Promise<PaymentApiResponse<void>>;
    retryPaymentException: (id: string) => Promise<PaymentApiResponse<void>>;
  };
  onClose: () => void;
}

const ExceptionTool: React.FC<ExceptionToolProps> = ({ api, onClose }) => {
  const { user } = useAuth();
  
  // State
  const [exceptions, setExceptions] = useState<PaymentException[]>([]);
  const [selectedException, setSelectedException] = useState<PaymentException | null>(null);
  const [resolution, setResolution] = useState<ExceptionResolution>({
    type: 'manual',
    action: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    loadExceptions();
  }, []);

  const loadExceptions = async () => {
    try {
      setLoading(true);
      const response = await api.getPaymentExceptions();
      if (response.success) {
        setExceptions(response.data);
        setError(null);
      } else {
        setError('Failed to load exceptions');
      }
    } catch (err) {
      setError('Failed to load exceptions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (exception: PaymentException) => {
    if (!exception || !resolution.action) {
      setError('Please provide resolution details');
      return;
    }

    try {
      setLoading(true);
      const resolutionData: ExceptionResolution = {
        type: resolution.type,
        action: resolution.action,
        notes: resolution.notes,
        userId: user?.id?.toString(),
        timestamp: new Date().toISOString()
      };
      await api.resolvePaymentException(exception.id, resolutionData);
      await loadExceptions();
      setDialogOpen(false);
      setSelectedException(null);
      setResolution({
        type: 'manual',
        action: '',
        notes: ''
      });
    } catch (err) {
      setError('An error occurred while resolving the exception');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = async (id: string) => {
    try {
      setLoading(true);
      const response = await api.retryPaymentException(id);
      if (response.success) {
        await loadExceptions();
      } else {
        setError('Failed to retry exception');
      }
    } catch (err) {
      setError('An error occurred while retrying the exception');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case Priority.HIGH:
        return 'error';
      case Priority.MEDIUM:
        return 'warning';
      case Priority.LOW:
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: ExceptionStatus) => {
    switch (status) {
      case ExceptionStatus.RESOLVED:
        return <CheckCircleIcon color="success" />;
      case ExceptionStatus.PENDING:
        return <WarningIcon color="warning" />;
      case ExceptionStatus.IGNORED:
        return <ErrorIcon color="error" />;
      default:
        return null;
    }
  };

  const renderExceptionList = () => (
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
                  color={
                    exception.type === 'system'
                      ? 'error'
                      : exception.type === 'validation'
                      ? 'warning'
                      : 'default'
                  }
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={exception.status}
                  size="small"
                  color={
                    exception.status === 'resolved'
                      ? 'success'
                      : exception.status === 'pending'
                      ? 'warning'
                      : 'error'
                  }
                />
              </TableCell>
              <TableCell>{exception.message}</TableCell>
              <TableCell>
                {dayjs(exception.createdAt).format('MM/DD/YYYY HH:mm')}
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Tooltip title="View Details">
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedException(exception);
                        setDialogOpen(true);
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  {exception.status === 'pending' && (
                    <Tooltip title="Retry">
                      <IconButton
                        size="small"
                        onClick={() => handleRetry(exception.id)}
                      >
                        <RefreshIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderResolutionDialog = () => (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Exception Details</DialogTitle>
      <DialogContent>
        {selectedException && (
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Payment ID</Typography>
                <Typography>{selectedException.paymentId}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Type</Typography>
                <Chip
                  label={selectedException.type}
                  size="small"
                  color={
                    selectedException.type === 'system'
                      ? 'error'
                      : selectedException.type === 'validation'
                      ? 'warning'
                      : 'default'
                  }
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
            </Grid>

            {selectedException.status === 'pending' && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Resolution
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Resolution Type</InputLabel>
                      <Select
                        value={resolution.type}
                        onChange={(e) =>
                          setResolution((prev) => ({
                            ...prev,
                            type: e.target.value as 'manual' | 'automated' | 'ignore',
                          }))
                        }
                        label="Resolution Type"
                      >
                        <MenuItem value="manual">Manual Resolution</MenuItem>
                        <MenuItem value="automated">Automated Resolution</MenuItem>
                        <MenuItem value="ignore">Ignore</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Action</InputLabel>
                      <Select
                        value={resolution.action}
                        onChange={(e) =>
                          setResolution((prev) => ({
                            ...prev,
                            action: e.target.value as string,
                          }))
                        }
                        label="Action"
                      >
                        <MenuItem value="retry">Retry Payment</MenuItem>
                        <MenuItem value="cancel">Cancel Payment</MenuItem>
                        <MenuItem value="modify">Modify Payment</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Resolution Notes"
                      value={resolution.notes}
                      onChange={(e) =>
                        setResolution((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
        {selectedException?.status === 'pending' && (
          <Button
            variant="contained"
            onClick={() => handleResolve(selectedException)}
            disabled={!resolution.type || !resolution.action}
          >
            Resolve
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Typography variant="h5">Exception Tool</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={loadExceptions}
            >
              Refresh
            </Button>
          </Grid>
        </Grid>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            renderExceptionList()
          )}
        </CardContent>
      </Card>

      {renderResolutionDialog()}
    </Box>
  );
};

export default ExceptionTool;

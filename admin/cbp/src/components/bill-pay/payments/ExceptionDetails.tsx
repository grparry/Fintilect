import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Stack,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import HistoryIcon from '@mui/icons-material/History';
import { useAuth } from '../../../hooks/useAuth';
import {
  PaymentException,
  ExceptionResolution,
  ExceptionStatus,
  ResolutionHistory,
  FISRetryResult,
  FISExceptionHistory,
  ExceptionToolStatus,
} from '../../../types/bill-pay.types';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import dayjs from 'dayjs';

interface ExceptionDetailsProps {
  exception: PaymentException;
  onClose: () => void;
  onResolutionComplete: () => void;
}
const ExceptionDetails: React.FC<ExceptionDetailsProps> = ({
  exception,
  onClose,
  onResolutionComplete,
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resolution, setResolution] = useState<ExceptionResolution>({
    type: 'manual',
    action: '',
    notes: '',
    userId: user?.id?.toString(),
    timestamp: new Date().toISOString(),
  });
  const [history, setHistory] = useState<ResolutionHistory[]>([]);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [retryResult, setRetryResult] = useState<FISRetryResult | null>(null);
  const exceptionService = ServiceFactory.getInstance().getExceptionService();
  useEffect(() => {
    loadResolutionHistory();
  }, [exception.id]);
  const mapFISHistoryToResolutionHistory = (fisHistory: FISExceptionHistory[]): ResolutionHistory[] => {
    return fisHistory.map(item => ({
      id: parseInt(item.id),
      exceptionId: parseInt(item.exceptionId),
      action: item.type,
      notes: item.details.metadata?.notes as string || '',
      user: item.userName,
      timestamp: item.timestamp,
    }));
  };
  const loadResolutionHistory = async () => {
    try {
      setLoading(true);
      const fisHistory = await exceptionService.getFISExceptionHistory(exception.id);
      setHistory(mapFISHistoryToResolutionHistory(fisHistory));
    } catch (err) {
      setError('Failed to load resolution history. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  const handleResolve = async () => {
    if (!resolution.action || !resolution.notes) {
      setError('Please provide both action and notes for resolution');
      return;
    }
    try {
      setLoading(true);
      await exceptionService.updateExceptionStatus(
        exception.id,
        'Resolved' as ExceptionToolStatus,
        resolution.notes
      );
      onResolutionComplete();
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to resolve exception: ${err.message}`);
      } else {
        setError('Failed to resolve exception. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };
  const handleRetry = async () => {
    try {
      setLoading(true);
      const result = await exceptionService.retryFISException(exception.id);
      setRetryResult(result);
      if (result.success) {
        onResolutionComplete();
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to retry exception: ${err.message}`);
      } else {
        setError('Failed to retry exception. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };
  const renderResolutionHistory = () => (
    <Dialog open={historyDialogOpen} onClose={() => setHistoryDialogOpen(false)} maxWidth="md" fullWidth>
      <DialogTitle>Resolution History</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {history.map((item) => (
            <Box key={item.id} sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Action</Typography>
                  <Typography>{item.action}</Typography>
                </Grid>
                {item.notes && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Notes</Typography>
                    <Typography>{item.notes}</Typography>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Typography variant="caption" color="textSecondary">
                    By {item.user} on {dayjs(item.timestamp).format('MM/DD/YYYY HH:mm:ss')}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setHistoryDialogOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          {error && (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
          {retryResult && !retryResult.success && (
            <Alert severity="warning">
              Retry failed: {retryResult.message}
              {retryResult.retryCount > 0 && (
                <Typography variant="caption" display="block">
                  Retry count: {retryResult.retryCount}
                  {retryResult.lastRetryAt && ` (Last attempt: ${dayjs(retryResult.lastRetryAt).format('MM/DD/YYYY HH:mm')})`}
                </Typography>
              )}
            </Alert>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Exception Details</Typography>
            <Stack direction="row" spacing={1}>
              <Tooltip title="View History">
                <IconButton size="small" onClick={() => setHistoryDialogOpen(true)}>
                  <HistoryIcon />
                </IconButton>
              </Tooltip>
              {exception.status === ExceptionStatus.PENDING && (
                <Tooltip title="Retry">
                  <IconButton size="small" onClick={handleRetry} disabled={loading}>
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Status</Typography>
              <Chip
                label={exception.status}
                size="small"
                color={
                  exception.status === ExceptionStatus.RESOLVED
                    ? 'success'
                    : exception.status === ExceptionStatus.PENDING
                    ? 'warning'
                    : 'error'
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Type</Typography>
              <Typography>{exception.type}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Message</Typography>
              <Typography>{exception.message}</Typography>
            </Grid>
            {exception.details && (
              <Grid item xs={12}>
                <Typography variant="subtitle2">Details</Typography>
                <pre style={{ whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(exception.details, null, 2)}
                </pre>
              </Grid>
            )}
          </Grid>
          {exception.status === ExceptionStatus.PENDING && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Resolution</Typography>
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
                          action: e.target.value,
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
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button onClick={onClose} sx={{ mr: 1 }}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleResolve}
                  disabled={loading || !resolution.action || !resolution.notes}
                >
                  {loading ? <CircularProgress size={24} /> : 'Resolve'}
                </Button>
              </Box>
            </>
          )}
        </Stack>
      </CardContent>
      {renderResolutionHistory()}
    </Card>
  );
};
export default ExceptionDetails;
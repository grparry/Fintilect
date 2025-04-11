import React, { useState, useEffect } from 'react';
import logger from '../../../utils/logger';
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
import { PaymentException } from '@/types/payment.types';
import {
  ExceptionResolution,
  ResolutionHistory,
  ExceptionToolFilters,
} from '@/types/bill-pay.types';
import { Exception, ExceptionStatus } from '@/types/exception.types';
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
  const [currentException, setCurrentException] = useState<PaymentException>(exception);
  const [history, setHistory] = useState<ResolutionHistory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [resolution, setResolution] = useState<{
    action: string;
    notes: string;
  }>({
    action: '',
    notes: ''
  });
  const [retryResult, setRetryResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const exceptionService = ServiceFactory.getInstance().getExceptionService();

  useEffect(() => {
    loadResolutionHistory();
  }, [currentException.id]);

  const loadException = async () => {
    try {
      const result = await exceptionService.getException(currentException.id.toString());
      if (result.status === ExceptionStatus.RESOLVED) {
        onResolutionComplete();
      }
    } catch (err) {
      logger.error('Failed to load exception:', err);
      setError('Failed to load exception');
    }
  };

  const loadResolutionHistory = async () => {
    try {
      const history = await exceptionService.getExceptions({
        searchTerm: currentException.id.toString(),
        page: 1,
        limit: 10
      } as ExceptionToolFilters);
      
      if (history.exceptions) {
        setHistory(history.exceptions.map((item: Exception) => ({
          id: item.id,
          exceptionId: item.id,
          action: item.status || ExceptionStatus.PENDING,
          timestamp: item.created,
          user: item.payeeName || 'Unknown',
          notes: item.serviceRequestNumber || ''
        })));
      }
    } catch (err) {
      logger.error('Failed to load resolution history:', err);
      setError('Failed to load resolution history');
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
        currentException.id.toString(),
        resolution.action as ExceptionStatus,
        resolution.notes
      );
      await loadException();
      onResolutionComplete();
    } catch (err) {
      logger.error('Failed to resolve exception:', err);
      setError('Failed to resolve exception');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = async () => {
    try {
      setLoading(true);
      const result = await exceptionService.getException(currentException.id.toString());
      setRetryResult({
        success: result.status === ExceptionStatus.RESOLVED,
        message: result.serviceRequestNumber || 'Exception processed successfully'
      });
      if (result.status === ExceptionStatus.RESOLVED) {
        onResolutionComplete();
      }
    } catch (err) {
      logger.error('Failed to retry exception:', err);
      setError('Failed to retry exception');
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
          {retryResult && (
            <Alert severity={retryResult.success ? 'success' : 'error'}>
              {retryResult.message}
            </Alert>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" color="text.primary">Exception Details</Typography>
            <Stack direction="row" spacing={1}>
              <Tooltip title="View History">
                <IconButton size="small" onClick={() => setHistoryDialogOpen(true)}>
                  <HistoryIcon />
                </IconButton>
              </Tooltip>
              {!currentException.serviceRequestNumber && (
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
                label={currentException.serviceRequestNumber ? 'Processed' : 'Pending'}
                size="small"
                color={currentException.serviceRequestNumber ? 'success' : 'warning'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Record Type</Typography>
              <Typography>{currentException.recordType}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Message</Typography>
              <Typography>{currentException.memoLineInfo}</Typography>
            </Grid>
            {currentException.serviceRequestNumber && (
              <Grid item xs={12}>
                <Typography variant="subtitle2">Service Request Number</Typography>
                <Typography>{currentException.serviceRequestNumber || 'N/A'}</Typography>
              </Grid>
            )}
            {currentException.serviceRequestNumber && (
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Service Request Date</Typography>
                    <Typography>
                      {currentException.serviceRequestDate
                        ? new Date(currentException.serviceRequestDate).toLocaleString()
                        : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Service Request Time</Typography>
                    <Typography>
                      {currentException.serviceRequestTime || 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Grid>
          {!currentException.serviceRequestNumber && (
            <>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Resolution</Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="resolution-action-label">Action</InputLabel>
                  <Select
                    labelId="resolution-action-label"
                    id="resolution-action"
                    value={resolution.action}
                    label="Action"
                    onChange={(e) => setResolution({ ...resolution, action: e.target.value })}
                  >
                    <MenuItem value={ExceptionStatus.RESOLVED}>Resolve</MenuItem>
                    <MenuItem value={ExceptionStatus.CLOSED}>Close</MenuItem>
                    <MenuItem value={ExceptionStatus.IN_PROGRESS}>In Progress</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Notes"
                  value={resolution.notes}
                  onChange={(e) =>
                    setResolution({ ...resolution, notes: e.target.value })
                  }
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleResolve}
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  Submit Resolution
                </Button>
              </Box>
            </>
          )}
          {!currentException.serviceRequestNumber && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Service request is pending. Please check back later for updates.
            </Alert>
          )}
        </Stack>
      </CardContent>
      {renderResolutionHistory()}
    </Card>
  );
};
export default ExceptionDetails;
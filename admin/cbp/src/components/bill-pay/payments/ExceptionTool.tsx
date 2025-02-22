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
  ExceptionResolution,
  ResolutionHistory,
  ExceptionTool as IExceptionTool,
  ExceptionToolStatus,
  ExceptionFilters,
  PaginatedResponse
} from '../../../types/bill-pay.types';
import { PaymentException } from '../../../types/payment.types';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';

interface ExceptionToolProps {
  onClose?: () => void;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
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

const ExceptionTool: React.FC<ExceptionToolProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exceptions, setExceptions] = useState<IExceptionTool[]>([]);
  const [selectedException, setSelectedException] = useState<IExceptionTool | null>(null);
  const [resolutionDialogOpen, setResolutionDialogOpen] = useState(false);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const { user } = useAuth();

  const exceptionService = ServiceFactory.getInstance().getExceptionService();

  const fetchExceptions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await exceptionService.getExceptions({});
      setExceptions(response.items);
    } catch (err) {
      setError('Failed to fetch exceptions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResolveException = async () => {
    if (!selectedException) return;

    try {
      setLoading(true);
      setError(null);
      await exceptionService.resolveException(selectedException.id, {
        type: 'manual',
        action: 'resolve',
        notes: resolutionNotes,
        userId: String(user?.id),
        timestamp: new Date().toISOString()
      });
      await fetchExceptions();
      setResolutionDialogOpen(false);
      setResolutionNotes('');
      setSelectedException(null);
    } catch (err) {
      setError('Failed to resolve exception');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExceptions();
  }, []);

  const handleExceptionClick = (exception: IExceptionTool) => {
    setSelectedException(exception);
    setResolutionDialogOpen(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h5" color="text.primary">Exception Tool</Typography>
        <IconButton onClick={fetchExceptions} disabled={loading}>
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
                <TableCell>Client</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Error Message</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exceptions.map((exception) => (
                <TableRow key={exception.id}>
                  <TableCell>{exception.paymentId}</TableCell>
                  <TableCell>{exception.clientName}</TableCell>
                  <TableCell>
                    <Chip
                      label={exception.status}
                      color={getStatusColor(exception.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{exception.errorMessage}</TableCell>
                  <TableCell>{dayjs(exception.timestamp).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleExceptionClick(exception)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={resolutionDialogOpen} onClose={() => setResolutionDialogOpen(false)} maxWidth="md" fullWidth>
        {selectedException && (
          <>
            <DialogTitle>Exception Details</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="text.primary">Payment ID</Typography>
                  <Typography>{selectedException.paymentId}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="text.primary">Client</Typography>
                  <Typography>{selectedException.clientName}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="text.primary">Error Message</Typography>
                  <Typography>{selectedException.errorMessage}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="text.primary">Status</Typography>
                  <Chip
                    label={selectedException.status}
                    color={getStatusColor(selectedException.status)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="text.primary">Resolution Notes</Typography>
                  <TextField
                    fullWidth
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setResolutionDialogOpen(false)}>Close</Button>
              <Button onClick={handleResolveException} color="success">
                Resolve
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ExceptionTool;
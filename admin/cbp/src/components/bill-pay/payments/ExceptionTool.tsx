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
  ExceptionResolution,
  ResolutionHistory,
  ExceptionTool as IExceptionTool,
  ExceptionToolStatus,
  ExceptionFilters,
  PaginatedResponse
} from '../../../types/bill-pay.types';
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
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exceptions, setExceptions] = useState<IExceptionTool[]>([]);
  const [selectedException, setSelectedException] = useState<IExceptionTool | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const exceptionService = ServiceFactory.getInstance().getExceptionService();
  const loadExceptions = async () => {
    try {
      setLoading(true);
      setError(null);
      const filters: ExceptionFilters = {
        page: 1,
        limit: 50,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      };
      const response = await exceptionService.getExceptions(filters);
      setExceptions(response.items);
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
  const handleExceptionClick = (exception: IExceptionTool) => {
    setSelectedException(exception);
    setDialogOpen(true);
  };
  const handleResolution = async (status: string, notes: string = '') => {
    if (!selectedException) return;
    try {
      setLoading(true);
      setError(null);
      await exceptionService.updateExceptionStatus(
        selectedException.id.toString(),
        status as ExceptionToolStatus,
        notes
      );
      await loadExceptions();
      setDialogOpen(false);
      setSelectedException(null);
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
        <Typography variant="h5" color="text.primary">Exception Tool</Typography>
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
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
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
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
              {selectedException.status.toLowerCase() === 'pending' && (
                <>
                  <Button
                    onClick={() => handleResolution('resolved', 'Resolved manually')}
                    color="success"
                  >
                    Resolve
                  </Button>
                  <Button
                    onClick={() => handleResolution('ignored', 'Ignored by user')}
                    color="error"
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
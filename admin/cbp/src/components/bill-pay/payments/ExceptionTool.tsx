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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useAuth } from '../../../hooks/useAuth';
import {
  ExceptionFilters
} from '../../../types/bill-pay.types';
import { 
  Exception, 
  ExceptionStatus, 
  ExceptionFilter, 
  ExceptionCorrectionType,
  ExceptionCorrection
} from '../../../types/exception.types';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';

interface ExceptionToolProps {
  onClose?: () => void;
}

const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case ExceptionStatus.RESOLVED:
      return 'success';
    case ExceptionStatus.CLOSED:
      return 'error';
    case ExceptionStatus.IN_PROGRESS:
      return 'info';
    case ExceptionStatus.PENDING:
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
  const [exceptions, setExceptions] = useState<Exception[]>([]);
  const [selectedException, setSelectedException] = useState<Exception | null>(null);
  const [resolutionDialogOpen, setResolutionDialogOpen] = useState(false);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [correctionType, setCorrectionType] = useState<ExceptionCorrectionType | ''>('');
  const [accountNumber, setAccountNumber] = useState('');
  const [fisPayeeId, setFisPayeeId] = useState('');
  const [manualNotes, setManualNotes] = useState('');
  const [memberRefundAmount, setMemberRefundAmount] = useState<number | ''>('');
  const [memberRefundDate, setMemberRefundDate] = useState<Dayjs | null>(null);
  const [memberRefundNotes, setMemberRefundNotes] = useState('');
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [filters, setFilters] = useState<ExceptionFilter>({});
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs().subtract(30, 'day'));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [sponsorId, setSponsorId] = useState<string>('');
  const [correctionMade, setCorrectionMade] = useState<boolean | null>(null);
  const { user } = useAuth();

  const exceptionService = ServiceFactory.getInstance().getExceptionService();

  const applyFilters = () => {
    const newFilters: ExceptionFilter = {};
    
    if (startDate) {
      newFilters.date = startDate.format('YYYY-MM-DD');
    }
    
    if (endDate) {
      newFilters.endDate = endDate.format('YYYY-MM-DD');
    }
    
    if (sponsorId) {
      newFilters.sponsorIds = [sponsorId];
    }
    
    if (correctionMade !== null) {
      newFilters.correctionMade = correctionMade;
    }
    
    setFilters(newFilters);
    fetchExceptions(newFilters);
  };

  const resetFilters = () => {
    setStartDate(dayjs().subtract(30, 'day'));
    setEndDate(dayjs());
    setSponsorId('');
    setCorrectionMade(null);
    
    const defaultFilters: ExceptionFilter = {
      date: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD')
    };
    
    setFilters(defaultFilters);
    fetchExceptions(defaultFilters);
  };

  const fetchExceptions = async (searchFilters?: ExceptionFilter) => {
    try {
      setLoading(true);
      setError(null);
      const response = await exceptionService.getExceptions(searchFilters || filters);
      setExceptions(response.exceptions || []);
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
      await exceptionService.resolveException(
        selectedException.id.toString(), 
        resolutionNotes
      );
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

  const handleCorrectionSubmit = async () => {
    if (!selectedException || !correctionType) return;

    try {
      setLoading(true);
      setError(null);

      const exceptionId = selectedException.id.toString();
      const correctionData: {
        usersAccountAtPayee?: string;
        manualDescription?: string;
        fisPayeeId?: string;
      } = {};

      switch (correctionType) {
        case ExceptionCorrectionType.AccountNumber:
          if (!accountNumber) {
            setError('Account number is required');
            setLoading(false);
            return;
          }
          correctionData.usersAccountAtPayee = accountNumber;
          break;
        case ExceptionCorrectionType.FisPayeeId:
          if (!fisPayeeId) {
            setError('FIS Payee ID is required');
            setLoading(false);
            return;
          }
          correctionData.fisPayeeId = fisPayeeId;
          break;
        case ExceptionCorrectionType.Manual:
          if (!manualNotes) {
            setError('Manual correction notes are required');
            setLoading(false);
            return;
          }
          correctionData.manualDescription = manualNotes;
          break;
        case ExceptionCorrectionType.MemberRefunded:
          if (memberRefundAmount === '' || !memberRefundDate) {
            setError('Refund amount and date are required');
            setLoading(false);
            return;
          }
          // Member refunded is not directly supported in the API spec
          // We'll use manualDescription to store the refund information
          correctionData.manualDescription = `Member refunded: $${memberRefundAmount} on ${memberRefundDate.format('YYYY-MM-DD')}${memberRefundNotes ? `. Notes: ${memberRefundNotes}` : ''}`;
          break;
        default:
          setError('Invalid correction type');
          setLoading(false);
          return;
      }

      await exceptionService.updateExceptionCorrection(
        exceptionId,
        correctionType,
        correctionData
      );

      await fetchExceptions();
      resetCorrectionForm();
      setResolutionDialogOpen(false);
      setSelectedException(null);
    } catch (err) {
      setError('Failed to apply correction');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetCorrectionForm = () => {
    setCorrectionType('');
    setAccountNumber('');
    setFisPayeeId('');
    setManualNotes('');
    setMemberRefundAmount('');
    setMemberRefundDate(null);
    setMemberRefundNotes('');
    setResolutionNotes('');
  };

  const handleExceptionClick = (exception: Exception) => {
    setSelectedException(exception);
    resetCorrectionForm();
    setResolutionDialogOpen(true);
  };

  useEffect(() => {
    fetchExceptions();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h5" color="text.primary">Exception Tool</Typography>
        <IconButton onClick={(event) => fetchExceptions()} disabled={loading}>
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
      
      {/* Search Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" color="text.primary" sx={{ mb: 2 }}>Filters</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Sponsor ID"
              value={sponsorId}
              onChange={(e) => setSponsorId(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id="correction-made-label">Correction Made</InputLabel>
              <Select
                labelId="correction-made-label"
                value={correctionMade === null ? '' : correctionMade ? 'true' : 'false'}
                onChange={(e) => {
                  const value = e.target.value;
                  setCorrectionMade(value === '' ? null : value === 'true');
                }}
                label="Correction Made"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button onClick={applyFilters} variant="contained" color="primary">
                Apply Filters
              </Button>
              <Button onClick={resetFilters} variant="outlined">
                Reset Filters
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Service Request #</TableCell>
                <TableCell>Payee Name</TableCell>
                <TableCell>Sponsor</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exceptions.map((exception) => (
                <TableRow key={exception.id}>
                  <TableCell>{exception.serviceRequestNumber}</TableCell>
                  <TableCell>{exception.payeeName}</TableCell>
                  <TableCell>{exception.sponsorName}</TableCell>
                  <TableCell>{exception.transactionAmount}</TableCell>
                  <TableCell>
                    <Chip
                      label={exception.status || 'PENDING'}
                      color={getStatusColor(exception.status || 'PENDING')}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{dayjs(exception.created).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
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
                  <Typography variant="subtitle1" color="text.primary">Service Request #</Typography>
                  <Typography>{selectedException.serviceRequestNumber}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="text.primary">Payee Name</Typography>
                  <Typography>{selectedException.payeeName}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="text.primary">Sponsor</Typography>
                  <Typography>{selectedException.sponsorName}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="text.primary">Amount</Typography>
                  <Typography>{selectedException.transactionAmount}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="text.primary">Status</Typography>
                  <Chip
                    label={selectedException.status || 'PENDING'}
                    color={getStatusColor(selectedException.status || 'PENDING')}
                  />
                </Grid>

                {/* Correction Section */}
                {selectedException.correctionMade ? (
                  <Grid item xs={12}>
                    <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
                      A correction has already been made for this exception. The details are read-only.
                    </Alert>
                  </Grid>
                ) : (
                  <>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2 }}>
                        Correction Details
                      </Typography>
                      <FormControl fullWidth sx={{ mt: 1 }}>
                        <InputLabel id="correction-type-label">Correction Type</InputLabel>
                        <Select
                          labelId="correction-type-label"
                          value={correctionType}
                          onChange={(e) => setCorrectionType(e.target.value as ExceptionCorrectionType | '')}
                          label="Correction Type"
                        >
                          <MenuItem value="">Select a correction type</MenuItem>
                          <MenuItem value={ExceptionCorrectionType.AccountNumber}>Account Number</MenuItem>
                          <MenuItem value={ExceptionCorrectionType.FisPayeeId}>FIS Payee ID</MenuItem>
                          <MenuItem value={ExceptionCorrectionType.Manual}>Manual</MenuItem>
                          <MenuItem value={ExceptionCorrectionType.MemberRefunded}>Member Refunded</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    {correctionType === ExceptionCorrectionType.AccountNumber && (
                      <Grid item xs={12}>
                        <TextField
                          label="Account Number"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          fullWidth
                        />
                      </Grid>
                    )}

                    {correctionType === ExceptionCorrectionType.FisPayeeId && (
                      <Grid item xs={12}>
                        <TextField
                          label="FIS Payee ID"
                          value={fisPayeeId}
                          onChange={(e) => setFisPayeeId(e.target.value)}
                          fullWidth
                        />
                      </Grid>
                    )}

                    {correctionType === ExceptionCorrectionType.Manual && (
                      <Grid item xs={12}>
                        <TextField
                          label="Manual Correction Notes"
                          value={manualNotes}
                          onChange={(e) => setManualNotes(e.target.value)}
                          multiline
                          rows={4}
                          fullWidth
                        />
                      </Grid>
                    )}

                    {correctionType === ExceptionCorrectionType.MemberRefunded && (
                      <>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Refund Amount"
                            type="number"
                            value={memberRefundAmount}
                            onChange={(e) => {
                              const value = e.target.value;
                              setMemberRefundAmount(value === '' ? '' : Number(value));
                            }}
                            fullWidth
                            InputProps={{
                              startAdornment: <Typography>$</Typography>,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Refund Date"
                              value={memberRefundDate}
                              onChange={(newValue) => setMemberRefundDate(newValue)}
                              slotProps={{ textField: { fullWidth: true } }}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Refund Notes"
                            value={memberRefundNotes}
                            onChange={(e) => setMemberRefundNotes(e.target.value)}
                            multiline
                            rows={2}
                            fullWidth
                          />
                        </Grid>
                      </>
                    )}
                  </>
                )}

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
              {!selectedException.correctionMade && correctionType && (
                <Button 
                  onClick={handleCorrectionSubmit} 
                  color="primary" 
                  variant="contained"
                  disabled={loading}
                >
                  Apply Correction
                </Button>
              )}
              {!selectedException.correctionMade && (
                <Button 
                  onClick={handleResolveException} 
                  color="success"
                  variant="contained"
                  disabled={loading}
                >
                  Resolve
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ExceptionTool;
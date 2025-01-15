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
  LinearProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import dayjs from 'dayjs';
import {
  PayeeConversionFile,
  PayeeConversionRecord,
  PayeeConversionValidation,
  PayeeConversionProgress,
  PayeeConversionFileUploadResponse,
  PayeeConversionProgressResponse,
} from '../../../types/bill-pay.types';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import { useAuth } from '../../../hooks/useAuth';

const PayeeConversion: React.FC = () => {
  const { user } = useAuth();
  const payeeService = ServiceFactory.getInstance().getPayeeService();
  
  // State
  const [files, setFiles] = useState<PayeeConversionFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<PayeeConversionFile | null>(null);
  const [records, setRecords] = useState<PayeeConversionRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validation, setValidation] = useState<PayeeConversionValidation | null>(null);
  const [progress, setProgress] = useState<PayeeConversionProgress | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch data
  const fetchFiles = useCallback(async () => {
    setLoading(true);
    try {
      const files = await payeeService.getConversionFiles();
      setFiles(files);
      setError(null);
    } catch (err) {
      console.error('Error fetching files:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch conversion files');
    } finally {
      setLoading(false);
    }
  }, [payeeService]);

  const fetchRecords = useCallback(async (fileId: string) => {
    try {
      const response = await payeeService.getConversions({ 
        status: undefined,
        type: undefined,
        searchTerm: fileId,
        startDate: undefined,
        endDate: undefined,
        page: 1,
        limit: 50
      });
      setRecords(response.items);
      setError(null);
    } catch (err) {
      console.error('Error fetching records:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch conversion records');
    }
  }, [payeeService]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const response = await payeeService.uploadConversionFile(file, 'default');
      setValidation({
        valid: response.validation.invalidRecords === 0,
        errors: response.validation.errors,
        warnings: response.validation.warnings,
        totalRecords: response.validation.totalRecords,
        validRecords: response.validation.validRecords,
        invalidRecords: response.validation.invalidRecords
      });
      setDialogOpen(true);
      fetchFiles();
      setError(null);
    } catch (err) {
      console.error('Error uploading file:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload file');
    }
  };

  const handleStartConversion = async (fileId: string) => {
    try {
      await payeeService.startConversion(fileId);
      setProgress({
        status: 'PROCESSING',
        totalRecords: 0,
        processedRecords: 0,
        progress: 0,
        currentStep: 'validation',
        totalSteps: 2,
        errors: []
      });
      pollConversionProgress(fileId);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start conversion');
    }
  };

  const pollConversionProgress = useCallback((fileId: string) => {
    const poll = async () => {
      try {
        const progress = await payeeService.getConversionProgress(fileId);
        setProgress({
          status: progress.status,
          totalRecords: progress.totalRecords,
          processedRecords: progress.processedRecords,
          progress: progress.progress,
          currentStep: progress.currentStep,
          totalSteps: progress.totalSteps,
          errors: progress.errors
        });
        
        if (progress.status !== 'PROCESSED') {
          setTimeout(poll, 2000);
        } else {
          fetchFiles();
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to get conversion progress');
      }
    };

    poll();
  }, [fetchFiles, payeeService]);

  useEffect(() => {
    let mounted = true;
    
    const loadFiles = async () => {
      if (mounted) {
        await fetchFiles();
      }
    };
    
    loadFiles();
    
    return () => {
      mounted = false;
    };
  }, [fetchFiles]);

  useEffect(() => {
    if (selectedFile) {
      fetchRecords(selectedFile.id);
    }
  }, [selectedFile, fetchRecords]);

  // Debug state changes
  useEffect(() => {
    console.log('Files state changed:', files);
  }, [files]);

  useEffect(() => {
    console.log('Selected file state changed:', selectedFile);
  }, [selectedFile]);

  useEffect(() => {
    console.log('Records state changed:', records);
  }, [records]);

  useEffect(() => {
    console.log('Loading state changed:', loading);
  }, [loading]);

  useEffect(() => {
    console.log('Error state changed:', error);
  }, [error]);

  useEffect(() => {
    console.log('Validation state changed:', validation);
  }, [validation]);

  useEffect(() => {
    console.log('Progress state changed:', progress);
  }, [progress]);

  useEffect(() => {
    console.log('Dialog open state changed:', dialogOpen);
  }, [dialogOpen]);

  // Component lifecycle logging
  useEffect(() => {
    console.log('PayeeConversion component mounted');
    return () => {
      console.log('PayeeConversion component unmounted');
    };
  }, []);

  const renderFileList = () => {
    console.log('Rendering file list with files:', files);
    
    if (!Array.isArray(files)) {
      console.error('Files is not an array:', files);
      return (
        <Alert severity="error">
          Error loading files. Please try again.
        </Alert>
      );
    }

    if (files.length === 0) {
      console.log('No files found');
      return (
        <Alert severity="info">
          No conversion files found. Upload a file to get started.
        </Alert>
      );
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>File Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Uploaded At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => {
              console.log('Rendering file:', file);
              return (
                <TableRow key={file.id}>
                  <TableCell>{file.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={file.status}
                      color={file.status === 'PROCESSED' ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {dayjs(file.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => setSelectedFile(file)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderRecordList = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Payee Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Error</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.id}</TableCell>
              <TableCell>{record.payeeName}</TableCell>
              <TableCell>
                <Chip
                  label={record.status}
                  color={
                    record.status === 'PROCESSED'
                      ? 'success'
                      : record.status === 'FAILED'
                      ? 'error'
                      : 'warning'
                  }
                  size="small"
                />
              </TableCell>
              <TableCell>
                {dayjs(record.createdAt).format('YYYY-MM-DD HH:mm:ss')}
              </TableCell>
              <TableCell>
                {record.error && (
                  <Tooltip title={record.error}>
                    <IconButton size="small" color="error">
                      <ErrorIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderProgress = () => {
    if (!progress) return null;

    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Conversion Progress: {progress.currentStep} ({Math.round(progress.progress * 100)}%)
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress.progress * 100}
          sx={{ mb: 1 }}
        />
        <Typography variant="body2" color="text.secondary">
          Processed {progress.processedRecords} of {progress.totalRecords} records
        </Typography>
        {progress.errors.length > 0 && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {progress.errors.length} errors encountered during conversion
          </Alert>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Typography variant="h5">Payee Conversion</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              Upload File
              <input
                type="file"
                hidden
                accept=".csv,.xlsx"
                onChange={handleFileUpload}
              />
            </Button>
          </Grid>
        </Grid>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {progress && renderProgress()}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Conversion Files
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            renderFileList()
          )}
        </CardContent>
      </Card>

      {selectedFile && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Records for {selectedFile.name}
            </Typography>
            {renderRecordList()}
          </CardContent>
        </Card>
      )}

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>File Validation Results</DialogTitle>
        <DialogContent>
          {validation && (
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Typography>
                Total Records: {validation.totalRecords}
              </Typography>
              <Typography>
                Valid Records: {validation.validRecords}
              </Typography>
              <Typography>
                Invalid Records: {validation.invalidRecords}
              </Typography>
              {validation.errors.length > 0 && (
                <Box>
                  <Typography color="error" gutterBottom>
                    Errors:
                  </Typography>
                  {validation.errors.map((error, index) => (
                    <Alert severity="error" key={index} sx={{ mb: 1 }}>
                      {error.field}: {error.message}
                    </Alert>
                  ))}
                </Box>
              )}
              {validation.warnings.length > 0 && (
                <Box>
                  <Typography color="warning.main" gutterBottom>
                    Warnings:
                  </Typography>
                  {validation.warnings.map((warning, index) => (
                    <Alert severity="warning" key={index} sx={{ mb: 1 }}>
                      {warning.field}: {warning.message}
                    </Alert>
                  ))}
                </Box>
              )}
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PayeeConversion;

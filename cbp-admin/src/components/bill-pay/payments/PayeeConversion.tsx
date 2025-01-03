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
  PayeeStatus,
  PayeeType,
  PayeeConversionFileUploadResponse,
  PayeeConversionProgressResponse,
} from '../../../types/bill-pay.types';
import { paymentApi } from '../../../services/api/payment.api';
import { useAuth } from '../../../hooks/useAuth';

const PayeeConversion: React.FC = () => {
  const { user } = useAuth();
  
  // State
  const [files, setFiles] = useState<PayeeConversionFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<PayeeConversionFile | null>(null);
  const [records, setRecords] = useState<PayeeConversionRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validation, setValidation] = useState<PayeeConversionValidation | null>(null);
  const [progress, setProgress] = useState<PayeeConversionProgress | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  // Fetch data
  const fetchFiles = useCallback(async () => {
    console.log('Fetching payee conversion files...');
    setLoading(true);
    try {
      const response = await paymentApi.getPayeeConversionFiles();
      console.log('Raw response:', response);
      console.log('Response stringified:', JSON.stringify(response, null, 2));
      
      if (!response.success) {
        throw new Error('Failed to fetch conversion files');
      }

      // Handle the response data
      const filesData = response.data;
      if (!Array.isArray(filesData)) {
        console.error('API response data is not an array:', filesData);
        setError('Failed to fetch conversion files - invalid response format');
        return;
      }
      
      // Validate each file has the required properties
      const validFiles = filesData.filter(file => {
        const isValid = file && 
          typeof file.id === 'string' && 
          typeof file.name === 'string' && 
          typeof file.status === 'string' && 
          typeof file.createdAt === 'string';
        
        if (!isValid) {
          console.error('Invalid file structure:', file);
        }
        return isValid;
      });
      
      console.log('Setting files state with valid files:', validFiles);
      setFiles(validFiles);
    } catch (err) {
      console.error('Error fetching files:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch conversion files');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRecords = useCallback(async (fileId: string) => {
    try {
      const response = await paymentApi.getPayeeConversionRecords(fileId);
      console.log('Got records response:', response);
      if (response.success) {
        setRecords(response.data);
      } else {
        setError(response.message || 'Failed to fetch conversion records');
      }
    } catch (err) {
      console.error('Error fetching records:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch conversion records');
    }
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const response = await paymentApi.uploadPayeeConversionFile(file);
      console.log('Upload response:', response);
      
      if (response.success && response.data) {
        const uploadResponse = response.data as PayeeConversionFileUploadResponse;
        // Create validation object from response data
        const validation: PayeeConversionValidation = {
          valid: uploadResponse.validation.invalidRecords === 0,
          errors: uploadResponse.validation.errors,
          warnings: uploadResponse.validation.warnings,
          totalRecords: uploadResponse.validation.totalRecords,
          validRecords: uploadResponse.validation.validRecords,
          invalidRecords: uploadResponse.validation.invalidRecords
        };
        console.log('Setting validation state:', validation);
        setValidation(validation);
        setDialogOpen(true);
        fetchFiles();
      } else {
        setError(response.message || 'Failed to upload file');
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload file');
    }
  };

  const handleStartConversion = async (fileId: string) => {
    try {
      const response = await paymentApi.startPayeeConversion(fileId);

      if (response.success) {
        // Initialize progress with starting state
        setProgress({
          status: 'PROCESSING',
          totalRecords: 0,
          processedRecords: 0,
          progress: 0,
          currentStep: 'validation',
          totalSteps: 2,
          errors: []
        });
        // Start polling for progress
        pollConversionProgress(fileId);
      } else {
        setError(response.message || 'Failed to start conversion');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start conversion');
    }
  };

  const pollConversionProgress = useCallback((fileId: string) => {
    const poll = async () => {
      try {
        const response = await paymentApi.getPayeeConversionProgress(fileId);
        console.log('Got progress response:', response);
        if (response.success) {
          const progressResponse = response.data as PayeeConversionProgressResponse;
          // Transform response into PayeeConversionProgress
          const progressData: PayeeConversionProgress = {
            status: progressResponse.status,
            totalRecords: progressResponse.validation.totalRecords,
            processedRecords: progressResponse.validation.validRecords + progressResponse.validation.invalidRecords,
            progress: Math.round(((progressResponse.validation.validRecords + progressResponse.validation.invalidRecords) / progressResponse.validation.totalRecords) * 100) || 0,
            currentStep: progressResponse.status === 'PENDING' ? 'validation' : 'processing',
            totalSteps: 2,
            errors: progressResponse.validation.errors.map(e => e.message)
          };
          console.log('Setting progress state:', progressData);
          setProgress(progressData);
          
          if (progressResponse.status !== 'PROCESSED') {
            setTimeout(poll, 2000);
          } else {
            // Final poll - refresh file list
            fetchFiles();
          }
        } else {
          setError(response.message || 'Failed to get conversion progress');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to get conversion progress');
      }
    };

    poll();
  }, [fetchFiles]);

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
                <Alert severity="error">
                  {validation.errors.length} errors found
                </Alert>
              )}
              {validation.warnings.length > 0 && (
                <Alert severity="warning">
                  {validation.warnings.length} warnings found
                </Alert>
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

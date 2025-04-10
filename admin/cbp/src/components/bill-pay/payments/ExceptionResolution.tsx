import React, { useState } from 'react';
import logger from '../../../utils/logger';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Divider,
  SelectChangeEvent,
} from '@mui/material';
import { useAuth } from '../../../hooks/useAuth';
import type { PaymentException } from '../../../types/payment.types';
import type {
  ExceptionResolution,
  ExceptionTool,
} from '../../../types/bill-pay.types';
import { Exception, ExceptionStatus } from '../../../types/exception.types';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';

interface ExceptionResolutionProps {
  exception: ExceptionTool;
  onClose: () => void;
  onResolutionComplete: () => void;
}
const ExceptionResolution: React.FC<ExceptionResolutionProps> = ({
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
    userId: user?.id?.toString() || '',
    timestamp: new Date().toISOString(),
  });
  const exceptionService = ServiceFactory.getInstance().getExceptionService();
  const handleResolve = async () => {
    if (!resolution.action || !resolution.notes) {
      setError('Please provide both action and notes for resolution');
      return;
    }
    try {
      setLoading(true);
      await exceptionService.updateExceptionStatus(
        exception.id.toString(),
        resolution.action as ExceptionStatus,
        resolution.notes
      );
      onResolutionComplete();
    } catch (err) {
      setError('Failed to resolve exception');
      logger.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          {error && (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
          <Box>
            <Typography variant="h6" color="text.primary">Exception Details</Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Status</Typography>
                <Typography>{exception.status}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Client</Typography>
                <Typography>{exception.clientName}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Error Message</Typography>
                <Typography>{exception.errorMessage}</Typography>
              </Grid>
              {exception.errorCode && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Error Code</Typography>
                  <Typography>{exception.errorCode}</Typography>
                </Grid>
              )}
            </Grid>
          </Box>
          <Divider />
          <Box>
            <Typography variant="h6" color="text.primary">Resolution</Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Resolution Type</InputLabel>
                  <Select<'manual' | 'automated' | 'ignore'>
                    value={resolution.type}
                    onChange={(e: SelectChangeEvent<'manual' | 'automated' | 'ignore'>) => {
                      const value = e.target.value as ExceptionResolution['type'];
                      setResolution((prev) => ({
                        ...prev,
                        type: value,
                      }));
                    }}
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
                    onChange={(e) => {
                      setResolution((prev) => ({
                        ...prev,
                        action: e.target.value,
                      }));
                    }}
                    label="Action"
                  >
                    <MenuItem value={ExceptionStatus.RESOLVED}>Resolve</MenuItem>
                    <MenuItem value={ExceptionStatus.CLOSED}>Close</MenuItem>
                    <MenuItem value={ExceptionStatus.IN_PROGRESS}>In Progress</MenuItem>
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleResolve}
              variant="contained"
              disabled={loading || !resolution.action || !resolution.notes}
            >
              {loading ? <CircularProgress size={24} /> : 'Resolve'}
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default ExceptionResolution;
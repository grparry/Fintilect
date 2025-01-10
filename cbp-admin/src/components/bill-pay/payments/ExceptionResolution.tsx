import React, { useState } from 'react';
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
} from '@mui/material';
import { useAuth } from '../../../hooks/useAuth';
import type {
  PaymentException,
  ExceptionResolution as ExceptionResolutionType,
  FISRetryResult,
  ExceptionStatus,
  ApiResponse
} from '../../../types/bill-pay.types';

interface ExceptionResolutionProps {
  exception: PaymentException;
  onClose: () => void;
  onResolutionComplete: () => void;
  api: {
    resolveException: (id: string, resolution: ExceptionResolutionType) => Promise<ApiResponse<void>>;
    retryException: (id: string) => Promise<ApiResponse<FISRetryResult>>;
  };
}

const ExceptionResolution: React.FC<ExceptionResolutionProps> = ({
  exception,
  onClose,
  onResolutionComplete,
  api,
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resolution, setResolution] = useState<ExceptionResolutionType>({
    type: 'manual',
    action: '',
    notes: '',
    userId: user?.id?.toString(),
    timestamp: new Date().toISOString(),
  });
  const [retryResult, setRetryResult] = useState<FISRetryResult | null>(null);

  const handleResolve = async () => {
    if (!resolution.action || !resolution.notes) {
      setError('Please provide both action and notes for resolution');
      return;
    }

    try {
      setLoading(true);
      await api.resolveException(exception.id, {
        ...resolution,
        userId: user?.id?.toString(),
        timestamp: new Date().toISOString(),
      });
      onResolutionComplete();
    } catch (err) {
      setError('Failed to resolve exception');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = async () => {
    try {
      setLoading(true);
      const response = await api.retryException(exception.id);
      if (response.success) {
        setRetryResult(response.data);
        if (response.data.success) {
          onResolutionComplete();
        }
      }
    } catch (err) {
      setError('Failed to retry exception');
      console.error(err);
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
          {retryResult && !retryResult.success && (
            <Alert severity="warning">
              Retry failed: {retryResult.message}
              {retryResult.retryCount > 0 && (
                <Typography variant="caption" display="block">
                  Retry count: {retryResult.retryCount}
                  {retryResult.lastRetryAt && ` (Last attempt: ${retryResult.lastRetryAt})`}
                </Typography>
              )}
            </Alert>
          )}

          <Box>
            <Typography variant="h6">Exception Details</Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Status</Typography>
                <Typography>{exception.status}</Typography>
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
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6">Resolution</Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
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
                    <MenuItem value="ignore">Ignore Exception</MenuItem>
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
                  placeholder="Please provide detailed notes about the resolution..."
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRetry}
              disabled={loading || exception.status !== ExceptionStatus.PENDING}
            >
              {loading ? <CircularProgress size={24} /> : 'Retry Exception'}
            </Button>
            <Button
              variant="contained"
              onClick={handleResolve}
              disabled={loading || !resolution.action || !resolution.notes}
            >
              {loading ? <CircularProgress size={24} /> : 'Resolve Exception'}
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ExceptionResolution;

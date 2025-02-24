import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../../types/components.types';
import logger from '../../utils/logger';

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    logger.error({
      message: 'Error caught by boundary',
      error,
      errorInfo
    });
    // Call onError callback if provided
    this.props.onError?.(error, errorInfo);
  }

  render(): React.ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback, className, style } = this.props;
    if (hasError) {
      if (fallback) {
        return fallback;
      }
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            p: 3,
            textAlign: 'center',
          }}
          className={className}
          style={style}
        >
          <WarningIcon color="error" sx={{ fontSize: 48, mb: 2 }} />
          <Typography variant="h6" gutterBottom color="text.primary">
            Something went wrong
          </Typography>
          <Typography color="textSecondary" sx={{ mb: 2 }}>
            {error?.message || 'An unexpected error occurred'}
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            color="primary"
          >
            Reload Page
          </Button>
        </Box>
      );
    }
    return children;
  }
}
export default ErrorBoundary;
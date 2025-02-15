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
      errorInfo,
      path: window.location.pathname,
      component: 'ErrorBoundary'
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
          className={className}
          style={style}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={3}
        >
          <WarningIcon color="error" style={{ fontSize: 48, marginBottom: 16 }} />
          <Typography variant="h6" color="error" gutterBottom>
            Something went wrong
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center" paragraph>
            {error?.message || 'An unexpected error occurred'}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
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
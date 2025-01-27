import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../types/components.types';
import { ServiceFactory } from '../../services/factory/ServiceFactory';
import logger from '../../utils/logger';

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private auditService = ServiceFactory.getInstance().getAuditService();

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

    // Log to audit service






    // Log to audit service

    // Call onError callback if provided



        <Box
        >
          <WarningIcon color="error" sx={{ fontSize: 48, mb: 2 }} />
          <Typography variant="h6" color="error" gutterBottom>
          </Typography>
          <Typography color="textSecondary" sx={{ mb: 2 }}>
            {error?.message || 'An unexpected error occurred'}
          </Typography>
          <Button
          >
          </Button>
        </Box>
      );



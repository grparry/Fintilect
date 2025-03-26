import React, { ReactNode, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Paper,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import dayjs from 'dayjs';

interface ReportContainerProps {
  title: string;
  description?: string;
  children: ReactNode;
  onRunReport: () => Promise<void> | void;
  onExportCsv?: () => void;
  loading: boolean;
  error: string | null;
  hasData: boolean;
}

/**
 * A container component for report components that provides common UI elements
 * and functionality like error handling, loading states, and export functionality.
 */
const ReportContainer: React.FC<ReportContainerProps> = ({
  title,
  description,
  children,
  onRunReport,
  onExportCsv,
  loading,
  error,
  hasData,
}) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6" color="text.primary">
          {title}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            onClick={onRunReport}
            disabled={loading}
          >
            Run Report
          </Button>
          
          {hasData && onExportCsv && (
            <Button
              size="small"
              variant="outlined"
              color="primary"
              startIcon={<DownloadIcon />}
              onClick={onExportCsv}
              disabled={loading}
            >
              Export
            </Button>
          )}
        </Stack>
      </Box>
      
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {description}
        </Typography>
      )}

      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
          <Box component="form" noValidate>
            {children}
          </Box>
        </CardContent>
      </Card>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2, py: 0 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && !hasData && (
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            No data to display. Please run the report to see results.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default ReportContainer;

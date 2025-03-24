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
  Tabs,
  Tab,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import dayjs from 'dayjs';

interface ReportContainerProps {
  title: string;
  description: string;
  children: ReactNode;
  onRunReport: () => Promise<void>;
  onExportCsv?: () => void;
  loading: boolean;
  error: string | null;
  hasResults: boolean;
  resultsComponent: ReactNode;
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
  hasResults,
  resultsComponent,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom color="text.primary">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {description}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => {}}>
          {error}
        </Alert>
      )}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          {children}

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={onRunReport}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Run Report'}
            </Button>

            {hasResults && onExportCsv && (
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={onExportCsv}
              >
                Export CSV
              </Button>
            )}
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            hasResults && (
              <Box sx={{ mt: 3 }}>
                <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
                  <Tab label="Table View" />
                  <Tab label="JSON View" />
                </Tabs>

                {activeTab === 0 && resultsComponent}
                {activeTab === 1 && (
                  <Paper sx={{ p: 2, maxHeight: 500, overflow: 'auto' }}>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>
                      {JSON.stringify(hasResults, null, 2)}
                    </pre>
                  </Paper>
                )}
              </Box>
            )
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReportContainer;

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Import report components as they are created
import PaymentActivityReport from './reports/PaymentActivityReport';
import ErrorRecapReport from './reports/ErrorRecapReport';
import BillPaySearchReport from './reports/BillPaySearchReport';

// Define the available report types
type ReportType = 
  | 'paymentActivity'
  | 'errorRecap'
  | 'activeUserCount'
  | 'billpaySearch'
  | 'failedOnUs'
  | 'globalHolidays'
  | 'onUsPostings'
  | 'statusesWithNotifications'
  | 'largePayment'
  | 'monthlyUsers'
  | 'pendingPayments'
  | 'processingConfirmation'
  | 'recurringPaymentChangeHistory'
  | 'scheduledPaymentChangeHistory'
  | 'userPayeeChangeHistory';

// Interface for report metadata
interface ReportMetadata {
  label: string;
  description: string;
}

// Report metadata for UI rendering
const reportMetadata: Record<ReportType, ReportMetadata> = {
  paymentActivity: {
    label: 'Payment Activity',
    description: 'View payment activity within a date range',
  },
  errorRecap: {
    label: 'Error Recap',
    description: 'View error history records',
  },
  activeUserCount: {
    label: 'Active User Count',
    description: 'View active user counts within a date range',
  },
  billpaySearch: {
    label: 'Billpay Search',
    description: 'Search billpay items by various criteria',
  },
  failedOnUs: {
    label: 'Failed On-Us Transactions',
    description: 'View failed on-us transactions within a date range',
  },
  globalHolidays: {
    label: 'Global Holidays',
    description: 'View global holidays',
  },
  onUsPostings: {
    label: 'On-Us Postings',
    description: 'View on-us postings within a date range',
  },
  statusesWithNotifications: {
    label: 'Statuses With Notifications',
    description: 'View statuses that have notifications',
  },
  largePayment: {
    label: 'Large Payments',
    description: 'View large payments for a specific date',
  },
  monthlyUsers: {
    label: 'Monthly Users',
    description: 'View monthly user counts within a date range',
  },
  pendingPayments: {
    label: 'Pending Payments',
    description: 'View pending payments for a specific date',
  },
  processingConfirmation: {
    label: 'Processing Confirmation',
    description: 'View processing confirmations within a date range',
  },
  recurringPaymentChangeHistory: {
    label: 'Recurring Payment Change History',
    description: 'View recurring payment change history',
  },
  scheduledPaymentChangeHistory: {
    label: 'Scheduled Payment Change History',
    description: 'View scheduled payment change history',
  },
  userPayeeChangeHistory: {
    label: 'User Payee Change History',
    description: 'View user payee change history',
  },
};

// Reports component
const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<ReportType>('paymentActivity');

  // Handle report type change
  const handleReportChange = (event: SelectChangeEvent) => {
    setSelectedReport(event.target.value as ReportType);
  };

  // Render the selected report component
  const renderReportComponent = () => {
    switch (selectedReport) {
      case 'paymentActivity':
        return <PaymentActivityReport />;
      case 'errorRecap':
        return <ErrorRecapReport />;
      case 'billpaySearch':
        return <BillPaySearchReport />;
      // Add other report components as they are created
      default:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="body1">
              This report is not yet implemented in the new modular format.
            </Typography>
          </Box>
        );
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Typography variant="h4" gutterBottom color="text.primary">
          Reports
        </Typography>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={selectedReport}
                label="Report Type"
                onChange={handleReportChange}
              >
                {Object.entries(reportMetadata).map(([key, meta]) => (
                  <MenuItem key={key} value={key}>{meta.label}</MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {reportMetadata[selectedReport].description}
              </FormHelperText>
            </FormControl>

            {renderReportComponent()}
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};

export default Reports;

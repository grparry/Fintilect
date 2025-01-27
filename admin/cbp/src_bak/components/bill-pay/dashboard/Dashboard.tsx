import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Alert,
  Skeleton,
  SelectChangeEvent,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import DashboardCard from '../../common/DashboardCard';
import {
  DASHBOARD_CARDS,
  TIME_RANGES,
  CHART_VIEWS,
} from './constants';
import { 
  DashboardMetrics,
  TransactionStats,
  UserActivityData,
  ChartData,
  TimeRangeOption,
  ChartViewOption
} from '../../../types/dashboard.types';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import { IBillPayService } from '../../../services/interfaces/IBillPayService';
import { IPaymentProcessorService } from '../../../services/interfaces/IPaymentProcessorService';
import { BillPayStats, PaymentFilters } from '../../types/bill-pay.types';
import { ProcessorMetrics, TransactionSummary, DateRange } from '../../types/payment.types';
import { PaymentStatus } from '../../../types/bill-pay.types';

interface DashboardState {
  billPayStats: BillPayStats | null;
  processorMetrics: ProcessorMetrics | null;
  transactionSummary: TransactionSummary | null;
  loading: boolean;
  error: string | null;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      date: string;
      value: number;
    };
  }>;
  label?: string;
  isAmount: boolean;
}

const formatValue = (value: number, isAmount: boolean): string => {
  if (isAmount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }
  return new Intl.NumberFormat('en-US').format(value);
};

const CustomTooltip = ({ active, payload, label, isAmount }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <Card>






    <Card>
      <CardContent>
        <Typography variant="body2">{label}</Typography>
        <Typography variant="body2" color="textSecondary">
          {formatValue(payload[0].value, isAmount)}
        </Typography>
      </CardContent>
    </Card>
  );

  // Initialize services



      // Convert timeRange to service format

        
        
        // Set to start of day
        // Set end to end of day
        


      ]);

        ...prev, 
        ...prev, 



    // Reload data when time range changes



    // Filter based on the selected time range

    );

    ];




    ];





    // Normalize the key to match our internal keys
    




    // Group transactions by date or month depending on timeRange

      // For quarter and year views, group by month
        // For shorter time ranges, use day-based grouping
      
      


    // Convert to array and sort by date
        // For month-based sorting
        
      // For day-based sorting



      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
          />
          <YAxis 
                ? `$${(value / 1000).toFixed(0)}k`
                : value.toLocaleString()
          />
          <Tooltip 
                ? `$${value.toLocaleString()}`
                : value.toLocaleString()
          />
          <Legend />
          <Bar
          />
        </BarChart>
      </ResponsiveContainer>
    );

        <Grid item xs={12} sm={6} md={3} key={card.id}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box
              >
                <Typography variant="h6" component="div">
                  {card.title}
                </Typography>
                <card.icon />
              </Box>
              <Typography variant="h4" component="div">
                {card.formatter ? card.formatter(value) : value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      );


      <Grid container spacing={3}>
        {cards}
      </Grid>
    );


    <Box sx={{ p: 3 }}>
      {state.error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography>{state.error}</Typography>
        </Alert>
      )}

      {renderMetricCards()}

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Box
          >
            <Typography variant="h6">Transaction Trends</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl size="small">
                <InputLabel>Time Range</InputLabel>
                <Select
                >
                  {TIME_RANGES.map((range) => (
                    <MenuItem key={range.value} value={range.value}>
                      {range.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small">
                <InputLabel>View</InputLabel>
                <Select
                >
                  {CHART_VIEWS.map((view) => (
                    <MenuItem key={view.value} value={view.value}>
                      {view.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <IconButton onClick={handleRefresh} disabled={state.loading}>
                <RefreshIcon />
              </IconButton>
            </Box>
          </Box>
          {renderChart()}
        </CardContent>
      </Card>
    </Box>
  );


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
import DashboardCard from '../../../components/common/DashboardCard';
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
import { TimeRange } from '../../../types';
import { BillPayStats } from '../../../types/bill-pay.types';
import { ProcessorMetrics, TransactionSummary, DateRange } from '../../../types/payment.types';

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
      <CardContent>
        <Typography variant="body2">{label}</Typography>
        <Typography variant="body2" color="textSecondary">
          {formatValue(payload[0].value, isAmount)}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  // Initialize services
  const billPayService = ServiceFactory.getInstance().getBillPayService();
  const processorService = ServiceFactory.getInstance().getPaymentProcessorService();

  const [state, setState] = useState<DashboardState>({
    billPayStats: null,
    processorMetrics: null,
    transactionSummary: null,
    loading: true,
    error: null
  });
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day');
  const [chartView, setChartView] = useState<ChartViewOption['value']>('line');

  const loadDashboardData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const dateRange: DateRange = {
        startDate: getStartDate(timeRange),
        endDate: new Date().toISOString()
      };

      const [billPayStats, processorMetrics, transactionSummary] = await Promise.all([
        billPayService.getStats(timeRange),
        processorService.getProcessorMetrics({ dateRange }),
        processorService.getTransactionSummary({ dateRange })
      ]);

      setState(prev => ({ 
        ...prev, 
        billPayStats: billPayStats,
        processorMetrics: processorMetrics,
        transactionSummary: transactionSummary,
        loading: false 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to load dashboard data', 
        loading: false 
      }));
    }
  }, [timeRange, billPayService, processorService]);

  const getStartDate = (range: 'day' | 'week' | 'month'): string => {
    const now = new Date();
    switch (range) {
      case 'day':
        now.setDate(now.getDate() - 1);
        break;
      case 'week':
        now.setDate(now.getDate() - 7);
        break;
      case 'month':
        now.setMonth(now.getMonth() - 1);
        break;
    }
    return now.toISOString();
  };

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const handleRefresh = () => {
    loadDashboardData();
  };

  const handleTimeRangeChange = (event: SelectChangeEvent<'day' | 'week' | 'month'>) => {
    setTimeRange(event.target.value as 'day' | 'week' | 'month');
  };

  const handleChartViewChange = (event: SelectChangeEvent<ChartViewOption['value']>) => {
    setChartView(event.target.value as ChartViewOption['value']);
  };

  const getMetricValue = (type: 'transactions' | 'processor' | 'summary', key: string): number => {
    if (!state.billPayStats || !state.processorMetrics || !state.transactionSummary) {
      return 0;
    }

    switch (type) {
      case 'transactions':
        const transactionValue = state.billPayStats[key as keyof BillPayStats];
        return typeof transactionValue === 'number' ? transactionValue : 0;
      case 'processor':
        const metrics = state.processorMetrics;
        if (key === 'successRate') return metrics.successRate;
        if (key === 'throughput') return metrics.throughput.daily;
        return 0;
      case 'summary':
        const summary = state.transactionSummary;
        if (key === 'totalAmount') return summary.totalAmount;
        if (key === 'totalCount') return summary.totalCount;
        return 0;
      default:
        return 0;
    }
  };

  const renderStatCards = () => (
    <Grid container spacing={3}>
      {DASHBOARD_CARDS.map((card) => (
        <Grid item xs={12} sm={6} md={3} key={card.id}>
          <DashboardCard
            title={card.title}
            value={state.billPayStats ? getMetricValue(card.metricType, card.dataKey) : undefined}
            icon={card.icon}
            loading={state.loading}
          />
        </Grid>
      ))}
    </Grid>
  );

  const renderChart = () => {
    if (state.loading || !state.billPayStats) {
      return <Skeleton variant="rectangular" height={400} />;
    }

    const chartData = state.billPayStats.recentActivity.map(activity => ({
      date: activity.timestamp,
      amount: activity.amount,
      status: activity.status
    }));

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<CustomTooltip isAmount={true} />} />
          <Legend />
          <Bar
            dataKey="amount"
            fill="#8884d8"
            name="Transaction Amount"
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  if (state.error) {
    return <Alert severity="error">{state.error}</Alert>;
  }

  return (
    <Box sx={{ p: 3 }}>
      {state.error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography>{state.error}</Typography>
        </Alert>
      )}

      {renderStatCards()}

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography variant="h6">Transaction Trends</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl size="small">
                <InputLabel>Time Range</InputLabel>
                <Select
                  value={timeRange}
                  label="Time Range"
                  onChange={handleTimeRangeChange}
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
                  value={chartView}
                  label="View"
                  onChange={handleChartViewChange}
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
};

export default Dashboard;

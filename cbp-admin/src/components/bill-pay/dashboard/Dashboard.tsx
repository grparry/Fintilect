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
import { dashboardService } from '../../../services/factory/ServiceFactory';
import { TimeRange } from '../../../types';

interface DashboardState {
  metrics: DashboardMetrics | null;
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
  const [state, setState] = useState<DashboardState>({
    metrics: null,
    loading: true,
    error: null
  });
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [chartView, setChartView] = useState<ChartViewOption['value']>('line');

  const loadDashboardData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await dashboardService.getStats(timeRange);
      if ('error' in response) {
        setState(prev => ({ 
          ...prev, 
          error: response.error.message,
          loading: false 
        }));
        return;
      }
      setState(prev => ({ 
        ...prev, 
        metrics: response.data,
        loading: false 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to load dashboard data', 
        loading: false 
      }));
    }
  }, [timeRange]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const handleRefresh = () => {
    loadDashboardData();
  };

  const handleTimeRangeChange = (event: SelectChangeEvent<TimeRange>) => {
    setTimeRange(event.target.value as TimeRange);
  };

  const handleChartViewChange = (event: SelectChangeEvent<ChartViewOption['value']>) => {
    setChartView(event.target.value as ChartViewOption['value']);
  };

  const getMetricValue = (metrics: DashboardMetrics, type: 'transactions' | 'userActivity', key: string): number => {
    const data = metrics[type];
    if (type === 'transactions') {
      const transactionData = data as TransactionStats;
      // Special handling for volume since it's an object with daily/weekly/monthly
      if (key === 'volume') {
        // Return the daily volume as that's the most granular metric
        return transactionData.volume.daily;
      }
      // For other transaction stats, they're direct number values
      return transactionData[key as keyof Omit<TransactionStats, 'volume'>] || 0;
    }
    // User activity metrics are all direct number values
    const userData = data as UserActivityData;
    return userData[key as keyof UserActivityData] || 0;
  };

  const renderStatCards = () => (
    <Grid container spacing={3}>
      {DASHBOARD_CARDS.map((card) => (
        <Grid item xs={12} sm={6} md={3} key={card.id}>
          <DashboardCard
            title={card.title}
            value={state.metrics ? getMetricValue(state.metrics, 'transactions', card.dataKey) : undefined}
            icon={card.icon}
            loading={state.loading}
          />
        </Grid>
      ))}
    </Grid>
  );

  const renderChart = () => {
    if (state.loading || !state.metrics) {
      return <Skeleton variant="rectangular" height={400} />;
    }

    const chartData = state.metrics.charts.transactionVolume;

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData.datasets[0].data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip content={<CustomTooltip isAmount={true} />} />
          <Legend />
          <Bar
            dataKey="value"
            fill="#8884d8"
            name={chartData.datasets[0].label}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  if (state.error) {
    return <div>Error: {state.error}</div>;
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

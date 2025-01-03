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
import { BillPayStats, TransactionTrend } from '../../../types/bill-pay.types';
import { ApiSuccessResponse } from '../../../types/api.types';
import api from '../../../services/api';

interface DashboardState {
  stats: BillPayStats | null;
  trends: TransactionTrend[];
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
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

const CustomTooltip = ({ active, payload, label, isAmount }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0];

  return (
    <Card>
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {label}
        </Typography>
        <Typography variant="body1">
          {formatValue(data.value, isAmount)}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState(TIME_RANGES[0].value);
  const [chartView, setChartView] = useState(CHART_VIEWS[0].value);
  const [state, setState] = useState<DashboardState>({
    stats: null,
    trends: [],
    loading: true,
    error: null,
  });

  const fetchDashboardData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const selectedRange = TIME_RANGES.find((r) => r.value === timeRange);
      const days = selectedRange?.days || 7;

      const [statsResponse, trendsResponse] = await Promise.all([
        api.get<ApiSuccessResponse<BillPayStats>>('/bill-pay/dashboard/stats'),
        api.get<ApiSuccessResponse<TransactionTrend[]>>('/bill-pay/dashboard/trends', {
          params: { days }
        })
      ]);

      setState({
        stats: statsResponse.data.data,
        trends: trendsResponse.data.data,
        loading: false,
        error: null
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Failed to load dashboard data'
      }));
    }
  }, [timeRange]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleRefresh = () => {
    fetchDashboardData();
  };

  const handleTimeRangeChange = (event: any) => {
    setTimeRange(event.target.value);
  };

  const handleChartViewChange = (event: any) => {
    setChartView(event.target.value);
  };

  const getCardValue = (card: typeof DASHBOARD_CARDS[0], stats: BillPayStats): string | number | undefined => {
    const value = stats[card.dataKey];
    
    if (value === undefined || value === null) {
      return undefined;
    }

    if (typeof value === 'object') {
      const total = Object.values(value).reduce((sum, curr) => sum + curr, 0);
      return card.formatter ? card.formatter(total) : total;
    }

    return card.formatter ? card.formatter(value as number) : value as number;
  };

  const renderStatCards = () => {
    return (
      <Grid container spacing={3}>
        {DASHBOARD_CARDS.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.id}>
            <DashboardCard
              title={card.title}
              value={state.loading || !state.stats ? undefined : getCardValue(card, state.stats)}
              icon={card.icon}
              loading={state.loading}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderChart = () => {
    if (state.loading) {
      return <Skeleton variant="rectangular" height={400} />;
    }

    const data = state.trends.map(trend => ({
      date: trend.date,
      value: chartView === 'payments' ? trend.count : trend.amount
    }));

    const isAmount = chartView === 'amount';
    const valueFormatter = (value: number) => formatValue(value, isAmount);

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: isAmount ? 60 : 30, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={valueFormatter} width={isAmount ? 60 : 30} />
          <Tooltip content={({ active, payload, label }) => (
            <CustomTooltip
              active={active}
              payload={payload as CustomTooltipProps['payload']}
              label={label}
              isAmount={isAmount}
            />
          )} />
          <Legend />
          <Bar
            dataKey="value"
            fill="#2196f3"
            name={CHART_VIEWS.find(v => v.value === chartView)?.label || ''}
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

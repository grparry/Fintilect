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
  Paper
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
  PieChart,
  Pie,
  Cell
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
import { TimeRange } from '../../../types/index';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import { IBillPayService } from '../../../services/interfaces/IBillPayService';
import { IPaymentProcessorService } from '../../../services/interfaces/IPaymentProcessorService';
import { BillPayStats } from '../../../types/bill-pay.types';
import { 
  ProcessorMetrics, 
  TransactionSummary, 
  DateRange, 
  PaymentStatus,
  PaymentFilters
} from '../../../types/payment.types';

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
        <Typography variant="body2" color="text.primary">{label}</Typography>
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
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('7d');
  const [chartView, setChartView] = useState<'payments' | 'amount'>('payments');

  const loadDashboardData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      // Convert timeRange to service format
      const timeframe = (() => {
        switch (timeRange) {
          case '7d': return 'week';
          case '30d': return 'month';
          case '90d': return 'quarter';
          case '1y': return 'year';
          default: return 'week';
        }
      })();
      const getDateRange = (): DateRange => {
        const now = new Date();
        const start = new Date(now);
        switch (timeRange) {
          case '7d':
            start.setDate(start.getDate() - 7);
            break;
          case '30d':
            start.setDate(start.getDate() - 30);
            break;
          case '90d':
            start.setDate(start.getDate() - 90);
            break;
          case '1y':
            start.setFullYear(start.getFullYear() - 1);
            break;
        }
        // Set to start of day
        start.setHours(0, 0, 0, 0);
        // Set end to end of day
        now.setHours(23, 59, 59, 999);
        return {
          StartDate: start.toISOString().split('T')[0],
          EndDate: now.toISOString().split('T')[0]
        };
      };
      const dateRange = getDateRange();
      const [billPayStats, processorMetrics] = await Promise.all([
        billPayService.getStats(timeframe),
        processorService.getProcessorMetrics({ dateRange })
      ]);
      const statusCounts = {
        [PaymentStatus.PENDING]: processorMetrics.InProcessPayments || 0,
        [PaymentStatus.COMPLETED]: processorMetrics.CompletedPayments || 0,
        [PaymentStatus.FAILED]: processorMetrics.FailedPayments || 0,
        [PaymentStatus.CANCELLED]: processorMetrics.CancelledPayments || 0,
        [PaymentStatus.PROCESSING]: 0,
        [PaymentStatus.PENDING_APPROVAL]: 0,
        [PaymentStatus.ON_HOLD]: 0,
        [PaymentStatus.REJECTED]: 0,
        [PaymentStatus.EXPIRED]: 0
      } as Record<PaymentStatus, number>;
      setState(prev => ({ 
        ...prev, 
        billPayStats: billPayStats,
        processorMetrics: processorMetrics,
        transactionSummary: null,
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

  useEffect(() => {
    console.log('Loading Dashboard Data:', {
      timeRange,
      billPayStats: state.billPayStats ? {
        totalTransactions: state.billPayStats.totalTransactions,
        totalAmount: state.billPayStats.totalAmount,
        recentActivityCount: state.billPayStats.recentActivity?.length,
        transactionsByStatus: state.billPayStats.transactionsByStatus
      } : null
    });
    loadDashboardData();
  }, [loadDashboardData]);

  const handleRefresh = () => {
    loadDashboardData();
  };

  const handleTimeRangeChange = (event: SelectChangeEvent<'7d' | '30d' | '90d' | '1y'>) => {
    setTimeRange(event.target.value as '7d' | '30d' | '90d' | '1y');
    // Reload data when time range changes
    loadDashboardData();
  };

  const handleChartViewChange = (event: SelectChangeEvent<'payments' | 'amount'>) => {
    setChartView(event.target.value as 'payments' | 'amount');
  };

  const getFilteredActivity = useCallback(() => {
    if (!state.billPayStats?.recentActivity) {
      return [];
    }
    // Filter based on the selected time range
    const cutoffDate = new Date();
    switch (timeRange) {
      case '7d':
        cutoffDate.setDate(cutoffDate.getDate() - 7);
        break;
      case '30d':
        cutoffDate.setDate(cutoffDate.getDate() - 30);
        break;
      case '90d':
        cutoffDate.setDate(cutoffDate.getDate() - 90);
        break;
      case '1y':
        cutoffDate.setFullYear(cutoffDate.getFullYear() - 1);
        break;
    }
    cutoffDate.setHours(0, 0, 0, 0);
    return state.billPayStats.recentActivity.filter(activity => 
      new Date(activity.timestamp) >= cutoffDate
    );
  }, [state.billPayStats, timeRange]);

  const getPendingTransactions = useCallback((stats: BillPayStats | null): number => {
    if (!stats) return 0;
    const pendingStatuses = [
      PaymentStatus.PENDING,
      PaymentStatus.PENDING_APPROVAL,
      PaymentStatus.PROCESSING,
      PaymentStatus.ON_HOLD
    ];
    const pendingCounts = pendingStatuses.map(status => ({
      status,
      count: stats.transactionsByStatus[status] || 0
    }));
    const pendingCount = pendingCounts.reduce((total, { count }) => total + count, 0);
    console.log('Getting Pending Transactions:', {
      transactionsByStatus: stats.transactionsByStatus,
      pendingStatuses,
      pendingCounts,
      pendingCount
    });
    return pendingCount;
  }, []);

  const getFailedTransactions = useCallback((stats: BillPayStats | null): number => {
    if (!stats) return 0;
    const failedStatuses = [
      PaymentStatus.FAILED,
      PaymentStatus.REJECTED,
      PaymentStatus.CANCELLED,
      PaymentStatus.EXPIRED
    ];
    const failedCounts = failedStatuses.map(status => ({
      status,
      count: stats.transactionsByStatus[status] || 0
    }));
    const failedCount = failedCounts.reduce((total, { count }) => total + count, 0);
    console.log('Getting Failed Transactions:', {
      transactionsByStatus: stats.transactionsByStatus,
      failedStatuses,
      failedCounts,
      failedCount
    });
    return failedCount;
  }, []);

  const getMetricValue = useCallback((key: string): number => {
    if (!state.billPayStats) return 0;
    let value = 0;
    // Normalize the key to match our internal keys
    const normalizedKey = key.replace(/[^a-zA-Z]/g, '').toLowerCase();
    switch (normalizedKey) {
      case 'totaltransactions':
      case 'totalpayments':
        value = state.billPayStats.totalTransactions;
        break;
      case 'averagetransactionsize':
      case 'averagepayment':
        value = state.billPayStats.averageTransactionSize;
        break;
      case 'pendingtransactions':
      case 'pendingpayments':
        value = getPendingTransactions(state.billPayStats);
        break;
      case 'failedtransactions':
      case 'failedpayments':
        value = getFailedTransactions(state.billPayStats);
        break;
      default:
        console.warn(`Unknown metric key: ${key}`);
        value = 0;
    }
    return value;
  }, [state.billPayStats, getPendingTransactions, getFailedTransactions]);

  const getChartData = useCallback(() => {
    const filteredActivity = getFilteredActivity();
    console.log('Filtered Activity:', {
      timeRange,
      totalActivities: filteredActivity.length,
      dateRange: filteredActivity.length > 0 ? {
        earliest: new Date(filteredActivity[filteredActivity.length - 1].timestamp),
        latest: new Date(filteredActivity[0].timestamp)
      } : null
    });
    if (!filteredActivity.length) {
      return [];
    }
    // Group transactions by date or month depending on timeRange
    const groupedData = filteredActivity.reduce((acc, activity) => {
      const date = new Date(activity.timestamp);
      let dateKey;
      // For quarter and year views, group by month
      if (timeRange === '90d' || timeRange === '1y') {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthName = monthNames[date.getMonth()];
        const year = date.getFullYear();
        dateKey = `${monthName} ${year}`;
      } else {
        // For shorter time ranges, use day-based grouping
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        dateKey = `${month}/${day}`;
      }
      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: dateKey,
          value: chartView === 'amount' ? activity.amount : 1,
          count: 1,
          amount: activity.amount
        };
      } else {
        acc[dateKey].value += chartView === 'amount' ? activity.amount : 1;
        acc[dateKey].count += 1;
        acc[dateKey].amount += activity.amount;
      }
      return acc;
    }, {} as Record<string, { date: string; value: number; count: number; amount: number }>);
    console.log('Grouped Data:', {
      timeRange,
      groupKeys: Object.keys(groupedData),
      totalGroups: Object.keys(groupedData).length
    });
    // Convert to array and sort by date
    return Object.values(groupedData).sort((a, b) => {
      if (timeRange === '90d' || timeRange === '1y') {
        // For month-based sorting
        const [aMonth, aYear] = a.date.split(' ');
        const [bMonth, bYear] = b.date.split(' ');
        const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if (aYear !== bYear) {
          return parseInt(aYear) - parseInt(bYear);
        }
        return monthOrder.indexOf(aMonth) - monthOrder.indexOf(bMonth);
      }
      // For day-based sorting
      const [aMonth, aDay] = a.date.split('/').map(Number);
      const [bMonth, bDay] = b.date.split('/').map(Number);
      if (aMonth !== bMonth) {
        return aMonth - bMonth;
      }
      return aDay - bDay;
    });
  }, [timeRange, chartView, getFilteredActivity]);

  const renderChart = () => {
    if (state.loading || !state.billPayStats) {
      return <Skeleton variant="rectangular" height={400} />;
    }
    const chartData = getChartData();
    const dataInterval = (() => {
      switch (timeRange) {
        case '90d':
        case '1y':
          return 0; // Show all points since we're only showing 2 months of data
        case '30d':
          return chartData.length > 30 ? 2 : 1;
        default:
          return chartData.length > 15 ? Math.ceil(chartData.length / 15) : 0;
      }
    })();
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            angle={-45}
            textAnchor="end"
            height={60}
            interval={dataInterval}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tickFormatter={(value) => 
              chartView === 'amount' 
                ? `$${(value / 1000).toFixed(0)}k`
                : value.toLocaleString()
            }
          />
          <Tooltip 
            formatter={(value: number) => 
              chartView === 'amount'
                ? `$${value.toLocaleString()}`
                : value.toLocaleString()
            }
          />
          <Legend />
          <Bar
            dataKey="value"
            fill="#8884d8"
            name={chartView === 'amount' ? 'Transaction Amount' : 'Number of Transactions'}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderMetricCards = () => {
    const cards = DASHBOARD_CARDS.map(card => {
      const value = getMetricValue(card.dataKey);
      console.log(`Rendering metric card:`, {
        id: card.id,
        title: card.title,
        dataKey: card.dataKey,
        value,
        formattedValue: card.formatter ? card.formatter(value) : value.toString()
      });
      return (
        <Grid item xs={12} sm={6} md={3} key={card.id}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2
                }}
              >
                <Typography variant="h6" color="text.primary">{card.title}</Typography>
                <card.icon />
              </Box>
              <Typography variant="h4" color="text.primary" component="div">
                {card.formatter ? card.formatter(value) : value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    });
    console.log('Rendering all metric cards:', {
      cardCount: cards.length,
      billPayStats: state.billPayStats ? {
        totalTransactions: state.billPayStats.totalTransactions,
        averageTransactionSize: state.billPayStats.averageTransactionSize,
        transactionsByStatus: state.billPayStats.transactionsByStatus
      } : null
    });
    return (
      <Grid container spacing={3}>
        {cards}
      </Grid>
    );
  };

  const renderPaymentStatusChart = () => {
    const statusData = [
      {
        id: 'Pending',
        value: state.billPayStats?.transactionsByStatus?.[PaymentStatus.PENDING] || 0,
        color: '#FFC107'
      },
      {
        id: 'Processing',
        value: state.billPayStats?.transactionsByStatus?.[PaymentStatus.PROCESSING] || 0,
        color: '#2196F3'
      },
      {
        id: 'Completed',
        value: state.billPayStats?.transactionsByStatus?.[PaymentStatus.COMPLETED] || 0,
        color: '#34C759'
      },
      {
        id: 'Failed',
        value: state.billPayStats?.transactionsByStatus?.[PaymentStatus.FAILED] || 0,
        color: '#FF0000'
      },
      {
        id: 'Cancelled',
        value: state.billPayStats?.transactionsByStatus?.[PaymentStatus.CANCELLED] || 0,
        color: '#FF0000'
      },
      {
        id: 'Pending Approval',
        value: state.billPayStats?.transactionsByStatus?.[PaymentStatus.PENDING_APPROVAL] || 0,
        color: '#FFC107'
      },
      {
        id: 'On Hold',
        value: state.billPayStats?.transactionsByStatus?.[PaymentStatus.ON_HOLD] || 0,
        color: '#808080'
      },
      {
        id: 'Rejected',
        value: state.billPayStats?.transactionsByStatus?.[PaymentStatus.REJECTED] || 0,
        color: '#FF0000'
      },
      {
        id: 'Expired',
        value: state.billPayStats?.transactionsByStatus?.[PaymentStatus.EXPIRED] || 0,
        color: '#808080'
      }
    ];

    return (
      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="id"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label={(entry: { name: string }) => entry.name}
              labelLine={false}
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>
    );
  };

  if (state.error) {
    return <Alert severity="error">{state.error}</Alert>;
  }

  return (
    <Box sx={{ p: 3 }}>
      {state.error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography color="text.primary">{state.error}</Typography>
        </Alert>
      )}
      {renderMetricCards()}
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
            <Typography variant="h6" color="text.primary">Transaction Trends</Typography>
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
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" color="text.primary">Payment Status</Typography>
          {renderPaymentStatusChart()}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
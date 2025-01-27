import {
  DashboardMetrics,
  TransactionStats,
  UserActivityData,
  ChartData,
  ChartDataPoint,
  DashboardTask,
  DashboardNews
} from '@/../../../../types/dashboard.types';
import { TimeRange } from '@/../../../../types';

// Helper function to generate random data points
const generateDataPoints = (count: number, min: number, max: number): number[] => {
  return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

// Helper function to generate date labels
const generateDateLabels = (count: number, interval: 'hour' | 'day' | 'week' | 'month'): string[] => {
  const now = new Date('2025-01-11T17:33:16-07:00');
  const labels: string[] = [];
  
  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(now);
    switch (interval) {
      case 'hour':
        date.setHours(date.getHours() - i);
        labels.push(date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
        break;
      case 'day':
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        break;
      case 'week':
        date.setDate(date.getDate() - i * 7);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        break;
      case 'month':
        date.setMonth(date.getMonth() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
        break;
    }
  }
  return labels;
};

export const mockTransactionStats: TransactionStats = {
  successful: 1250,
  failed: 23,
  pending: 45,
  total: 1318,
  volume: {
    daily: 450,
    weekly: 2800,
    monthly: 12000
  }
};

export const mockUserActivityData: UserActivityData = {
  activeUsers: 850,
  newUsers: 125,
  returningUsers: 725,
  averageSessionDuration: 1800 // in seconds
};

export const mockChartData = (timeRange: TimeRange, interval: 'hour' | 'day' | 'week' | 'month'): ChartData => {
  const dataPoints = generateDataPoints(12, 100, 1000);

  return {
    labels: generateDateLabels(12, interval),
    datasets: [
      {
        label: 'Transactions',
        data: dataPoints,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: true
      }
    ]
  };
};

export const mockDashboardMetrics: DashboardMetrics = {
  transactions: mockTransactionStats,
  userActivity: mockUserActivityData,
  charts: {
    transactionVolume: mockChartData(TimeRange.DAY, 'hour'),
    userGrowth: mockChartData(TimeRange.MONTH, 'month'),
    activityBreakdown: {
      labels: ['Active', 'Inactive', 'New'],
      datasets: [{
        label: 'User Activity',
        data: [850, 350, 125],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)'
      }]
    }
  }
};

export const mockDashboardStats = mockTransactionStats;
export const mockDashboardCharts = mockChartData;

export const mockDashboardTasks: DashboardTask[] = [
  {
    id: '1',
    title: 'Review pending payments',
    priority: 'high',
    dueDate: new Date().toISOString(),
    completed: false
  },
  {
    id: '2',
    title: 'Update client settings',
    priority: 'medium',
    dueDate: new Date().toISOString(),
    completed: true
  }
];

export const mockDashboardNews: DashboardNews[] = [
  {
    id: '1',
    title: 'System maintenance scheduled',
    content: 'Scheduled maintenance window on Saturday',
    date: new Date().toISOString(),
    category: 'maintenance'
  },
  {
    id: '2',
    title: 'New feature release',
    content: 'Enhanced reporting capabilities now available',
    date: new Date().toISOString(),
    category: 'feature'
  }
];

export const mockSystemHealth = {
  status: 'healthy' as const,
  components: {
    api: true,
    database: true,
    cache: true,
    queue: true
  },
  lastChecked: new Date('2025-01-11T17:33:16-07:00').toISOString()
};

export const mockRealTimeMetrics = {
  activeTransactions: 42,
  transactionsPerMinute: 8.5,
  errorRate: 0.02,
  averageResponseTime: 250 // in milliseconds
};

export const mockPerformanceInsights = [
  {
    category: 'performance' as const,
    severity: 'low' as const,
    message: 'Average response time increased by 5% in the last hour',
    metric: 250,
    trend: 'up' as const,
    timestamp: new Date('2025-01-11T17:33:16-07:00').toISOString()
  },
  {
    category: 'security' as const,
    severity: 'medium' as const,
    message: 'Unusual number of failed login attempts detected',
    metric: 15,
    trend: 'up' as const,
    timestamp: new Date('2025-01-11T17:33:16-07:00').toISOString()
  },
  {
    category: 'usage' as const,
    severity: 'low' as const,
    message: 'User activity is within normal range',
    metric: 850,
    trend: 'stable' as const,
    timestamp: new Date('2025-01-11T17:33:16-07:00').toISOString()
  }
];

export const mockDashboardAlerts = [
  {
    id: '1',
    type: 'warning',
    message: 'High transaction volume detected',
    timestamp: new Date('2025-01-13T09:32:04-07:00').toISOString(),
    read: false
  },
  {
    id: '2',
    type: 'info',
    message: 'System maintenance scheduled for tonight',
    timestamp: new Date('2025-01-13T09:32:04-07:00').toISOString(),
    read: true
  },
  {
    id: '3',
    type: 'error',
    message: 'Failed transactions above threshold',
    timestamp: new Date('2025-01-13T09:32:04-07:00').toISOString(),
    read: false
  }
];

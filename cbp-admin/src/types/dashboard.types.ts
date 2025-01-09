import { TimeRange } from './index';

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface TimeRangeOption {
  label: string;
  value: TimeRange;
}

export interface ChartViewOption {
  label: string;
  value: 'line' | 'bar' | 'pie';
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
  fill?: boolean;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface DashboardFilters {
  timeRange: TimeRange;
  category?: string;
  status?: string;
}

export interface TransactionStats {
  successful: number;
  failed: number;
  pending: number;
  total: number;
  volume: {
    daily: number;
    weekly: number;
    monthly: number;
  };
}

export interface UserActivityData {
  activeUsers: number;
  newUsers: number;
  returningUsers: number;
  averageSessionDuration: number;
}

export interface DashboardMetrics {
  transactions: TransactionStats;
  userActivity: UserActivityData;
  charts: {
    transactionVolume: ChartData;
    userGrowth: ChartData;
    activityBreakdown: ChartData;
  };
}

export interface DashboardWidgetProps {
  title: string;
  value: number | string;
  change?: number;
  changeType?: 'increase' | 'decrease';
  loading?: boolean;
}

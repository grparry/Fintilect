import { IBaseService } from './IBaseService';
import {
  DashboardMetrics,
  DashboardFilters,
  ChartData,
  TransactionStats,
  UserActivityData,
  ChartDataPoint
} from '../../types/dashboard.types';
import { TimeRange } from '../../types';

/**
 * Interface for dashboard operations
 * Handles metrics collection, data aggregation, and dashboard widget data
 */
export interface IDashboardService extends IBaseService {
  /**
   * Get all dashboard metrics
   * @param filters Dashboard filters
   */
  getDashboardMetrics(filters: DashboardFilters): Promise<DashboardMetrics>;

  /**
   * Get transaction statistics
   * @param timeRange Time range for stats
   */
  getTransactionStats(timeRange: TimeRange): Promise<TransactionStats>;

  /**
   * Get user activity data
   * @param timeRange Time range for activity
   */
  getUserActivityData(timeRange: TimeRange): Promise<UserActivityData>;

  /**
   * Get transaction volume chart data
   * @param timeRange Time range for chart
   * @param interval Data point interval ('hour' | 'day' | 'week' | 'month')
   */
  getTransactionVolumeChart(
    timeRange: TimeRange,
    interval: 'hour' | 'day' | 'week' | 'month'
  ): Promise<ChartData>;

  /**
   * Get user growth chart data
   * @param timeRange Time range for chart
   */
  getUserGrowthChart(timeRange: TimeRange): Promise<ChartData>;

  /**
   * Get activity breakdown chart data
   * @param timeRange Time range for chart
   */
  getActivityBreakdownChart(timeRange: TimeRange): Promise<ChartData>;

  /**
   * Get real-time transaction metrics
   * Updates every minute
   */
  getRealTimeMetrics(): Promise<{
    activeTransactions: number;
    transactionsPerMinute: number;
    errorRate: number;
    averageResponseTime: number;
  }>;

  /**
   * Get system health metrics
   */
  getSystemHealth(): Promise<{
    status: 'healthy' | 'degraded' | 'down';
    components: {
      api: boolean;
      database: boolean;
      cache: boolean;
      queue: boolean;
    };
    lastChecked: string;
  }>;

  /**
   * Get trending metrics over time
   * @param metric Metric to track
   * @param timeRange Time range for trend
   */
  getMetricTrend(
    metric: 'transactions' | 'users' | 'errors' | 'response_time',
    timeRange: TimeRange
  ): Promise<ChartDataPoint[]>;

  /**
   * Get performance insights
   * Analyzes system performance and provides actionable insights
   */
  getPerformanceInsights(): Promise<Array<{
    category: 'performance' | 'security' | 'usage' | 'errors';
    severity: 'low' | 'medium' | 'high';
    message: string;
    metric?: number;
    trend?: 'up' | 'down' | 'stable';
    timestamp: string;
  }>>;

  /**
   * Export dashboard data
   * @param metrics Metrics to include in export
   * @param format Export format
   */
  exportDashboardData(
    metrics: string[],
    format: 'csv' | 'json' | 'pdf'
  ): Promise<string>;

  /**
   * Subscribe to real-time updates
   * @param callback Callback function for updates
   */
  subscribeToUpdates(
    callback: (updates: Partial<DashboardMetrics>) => void
  ): () => void;

  /**
   * Get custom metric data
   * @param metricKey Custom metric identifier
   * @param timeRange Time range for metric
   * @param options Additional options
   */
  getCustomMetric(
    metricKey: string,
    timeRange: TimeRange,
    options?: Record<string, any>
  ): Promise<{
    value: number;
    change: number;
    trend: 'up' | 'down' | 'stable';
    history: ChartDataPoint[];
  }>;
}

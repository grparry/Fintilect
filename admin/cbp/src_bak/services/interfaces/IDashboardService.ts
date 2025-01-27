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


/**
 * Interface for dashboard operations
 * Handles metrics collection, data aggregation, and dashboard widget data
 */
  /**
   * Get all dashboard metrics
   * @param filters Dashboard filters
   */

  /**
   * Get transaction statistics
   * @param timeRange Time range for stats
   */

  /**
   * Get user activity data
   * @param timeRange Time range for activity
   */

  /**
   * Get transaction volume chart data
   * @param timeRange Time range for chart
   * @param interval Data point interval ('hour' | 'day' | 'week' | 'month')
   */
  ): Promise<ChartData>;

  /**
   * Get user growth chart data
   * @param timeRange Time range for chart
   */

  /**
   * Get activity breakdown chart data
   * @param timeRange Time range for chart
   */

  /**
   * Get real-time transaction metrics
   * Updates every minute
   */

  /**
   * Get system health metrics
   */

  /**
   * Get trending metrics over time
   * @param metric Metric to track
   * @param timeRange Time range for trend
   */
  ): Promise<ChartDataPoint[]>;

  /**
   * Get performance insights
   * Analyzes system performance and provides actionable insights
   */

  /**
   * Export dashboard data
   * @param metrics Metrics to include in export
   * @param format Export format
   */
  ): Promise<string>;

  /**
   * Subscribe to real-time updates
   * @param callback Callback function for updates
   */
  ): () => void;

  /**
   * Get custom metric data
   * @param metricKey Custom metric identifier
   * @param timeRange Time range for metric
   * @param options Additional options
   */
  ): Promise<{

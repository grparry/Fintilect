import { IDashboardService } from '@/../interfaces/IDashboardService';
import {
  DashboardMetrics,
  DashboardFilters,
  ChartData,
  TransactionStats,
  UserActivityData,
  ChartDataPoint
} from '@/../../types/dashboard.types';
import { TimeRange } from '@/../../types';
import { BaseService } from '@/BaseService';

export class DashboardService extends BaseService implements IDashboardService {
  private subscriptions: Map<string, (updates: Partial<DashboardMetrics>) => void> = new Map();

  constructor(
    basePath: string = '/api/v1/dashboard'
  ) {
    super(basePath);
  }

  async getDashboardMetrics(filters: DashboardFilters): Promise<DashboardMetrics> {
    return this.get<DashboardMetrics>('/metrics', { params: filters });
  }

  async getTransactionStats(timeRange: TimeRange): Promise<TransactionStats> {
    return this.get<TransactionStats>('/transactions/stats', { params: { timeRange } });
  }

  async getUserActivityData(timeRange: TimeRange): Promise<UserActivityData> {
    return this.get<UserActivityData>('/users/activity', { params: { timeRange } });
  }

  async getTransactionVolumeChart(
    timeRange: TimeRange,
    interval: 'hour' | 'day' | 'week' | 'month'
  ): Promise<ChartData> {
    return this.get<ChartData>('/charts/transaction-volume', {
      params: { timeRange, interval }
    });
  }

  async getUserGrowthChart(timeRange: TimeRange): Promise<ChartData> {
    return this.get<ChartData>('/charts/user-growth', { params: { timeRange } });
  }

  async getActivityBreakdownChart(timeRange: TimeRange): Promise<ChartData> {
    return this.get<ChartData>('/charts/activity-breakdown', { params: { timeRange } });
  }

  async getRealTimeMetrics(): Promise<{
    activeTransactions: number;
    transactionsPerMinute: number;
    errorRate: number;
    averageResponseTime: number;
  }> {
    return this.get('/metrics/realtime');
  }

  async getSystemHealth(): Promise<{
    status: 'healthy' | 'degraded' | 'down';
    components: {
      api: boolean;
      database: boolean;
      cache: boolean;
      queue: boolean;
    };
    lastChecked: string;
  }> {
    return this.get('/health');
  }

  async getMetricTrend(
    metric: 'transactions' | 'users' | 'errors' | 'response_time',
    timeRange: TimeRange
  ): Promise<ChartDataPoint[]> {
    return this.get<ChartDataPoint[]>('/metrics/trend', {
      params: { metric, timeRange }
    });
  }

  async getPerformanceInsights(): Promise<Array<{
    category: 'performance' | 'security' | 'usage' | 'errors';
    severity: 'low' | 'medium' | 'high';
    message: string;
    metric?: number;
    trend?: 'up' | 'down' | 'stable';
    timestamp: string;
  }>> {
    return this.get('/insights/performance');
  }

  async exportDashboardData(metrics: string[], format: 'csv' | 'json' | 'pdf'): Promise<string> {
    const response = await this.post<{ url: string }>('/export', { metrics, format });
    return response.url;
  }

  subscribeToUpdates(callback: (updates: Partial<DashboardMetrics>) => void): () => void {
    const id = Math.random().toString(36).substring(7);
    this.subscriptions.set(id, callback);

    // Set up WebSocket or SSE connection here
    const eventSource = new EventSource('/api/v1/dashboard/updates');
    eventSource.onmessage = (event) => {
      const updates = JSON.parse(event.data);
      callback(updates);
    };
    
    return () => {
      this.subscriptions.delete(id);
      eventSource.close();
    };
  }

  async getCustomMetric(
    metricKey: string,
    timeRange: TimeRange,
    options?: Record<string, any>
  ): Promise<{
    value: number;
    change: number;
    trend: 'up' | 'down' | 'stable';
    history: ChartDataPoint[];
  }> {
    return this.get(`/metrics/custom/${metricKey}`, {
      params: { timeRange, ...options }
    });
  }
}

import { injectable } from 'inversify';
import { IDashboardService } from '../../interfaces/IDashboardService';
import {
  DashboardMetrics,
  DashboardFilters,
  ChartData,
  TransactionStats,
  UserActivityData,
  ChartDataPoint
} from '../../../types/dashboard.types';
import { TimeRange } from '../../../types';
import { BaseMockService } from './BaseMockService';
import {
  mockDashboardMetrics,
  mockTransactionStats,
  mockUserActivityData,
  mockChartData,
  mockSystemHealth,
  mockRealTimeMetrics,
  mockPerformanceInsights
} from '../../../mocks/dashboard';

@injectable()
export class MockDashboardService extends BaseMockService implements IDashboardService {
  private subscriptions: Map<string, (updates: Partial<DashboardMetrics>) => void> = new Map();
  private updateInterval: NodeJS.Timeout | null = null;

  constructor() {
    super('/api/v1/dashboard');
    this.startUpdateLoop();
  }

  private startUpdateLoop(): void {
    this.updateInterval = setInterval(() => {
      const updates: Partial<DashboardMetrics> = {
        transactions: {
          ...mockTransactionStats,
          volume: {
            daily: Math.floor(Math.random() * 500) + 400,
            weekly: Math.floor(Math.random() * 1000) + 2500,
            monthly: Math.floor(Math.random() * 2000) + 11000
          }
        }
      };
      this.notifySubscribers(updates);
    }, 60000); // Update every minute
  }

  private notifySubscribers(updates: Partial<DashboardMetrics>): void {
    this.subscriptions.forEach(callback => callback(updates));
  }

  private cleanup(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    this.subscriptions.clear();
  }

  async getDashboardMetrics(filters: DashboardFilters): Promise<DashboardMetrics> {
    await this.delay();
    return {
      ...mockDashboardMetrics,
      charts: {
        ...mockDashboardMetrics.charts,
        transactionVolume: mockChartData(filters.timeRange, 'day')
      }
    };
  }

  async getTransactionStats(timeRange: TimeRange): Promise<TransactionStats> {
    await this.delay();
    return {
      ...mockTransactionStats,
      volume: {
        daily: Math.floor(Math.random() * 500) + 400,
        weekly: Math.floor(Math.random() * 1000) + 2500,
        monthly: Math.floor(Math.random() * 2000) + 11000
      }
    };
  }

  async getUserActivityData(timeRange: TimeRange): Promise<UserActivityData> {
    await this.delay();
    return {
      ...mockUserActivityData,
      activeUsers: Math.floor(Math.random() * 200) + 750
    };
  }

  async getTransactionVolumeChart(
    timeRange: TimeRange,
    interval: 'hour' | 'day' | 'week' | 'month'
  ): Promise<ChartData> {
    await this.delay();
    return mockChartData(timeRange, interval);
  }

  async getUserGrowthChart(timeRange: TimeRange): Promise<ChartData> {
    await this.delay();
    return mockDashboardMetrics.charts.userGrowth;
  }

  async getActivityBreakdownChart(timeRange: TimeRange): Promise<ChartData> {
    await this.delay();
    return mockDashboardMetrics.charts.activityBreakdown;
  }

  async getRealTimeMetrics(): Promise<{
    activeTransactions: number;
    transactionsPerMinute: number;
    errorRate: number;
    averageResponseTime: number;
  }> {
    await this.delay();
    return {
      ...mockRealTimeMetrics,
      activeTransactions: Math.floor(Math.random() * 20) + 30,
      transactionsPerMinute: Math.random() * 5 + 5
    };
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
    await this.delay();
    return {
      ...mockSystemHealth,
      lastChecked: new Date().toISOString()
    };
  }

  async getMetricTrend(
    metric: 'transactions' | 'users' | 'errors' | 'response_time',
    timeRange: TimeRange
  ): Promise<ChartDataPoint[]> {
    await this.delay();
    const points: ChartDataPoint[] = [];
    const now = new Date();
    const pointCount = 24; // 24 data points

    for (let i = pointCount - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setHours(date.getHours() - i);

      let value: number;
      switch (metric) {
        case 'transactions':
          value = Math.floor(Math.random() * 100) + 200;
          break;
        case 'users':
          value = Math.floor(Math.random() * 50) + 100;
          break;
        case 'errors':
          value = Math.floor(Math.random() * 5);
          break;
        case 'response_time':
          value = Math.floor(Math.random() * 100) + 200;
          break;
      }

      points.push({
        date: date.toISOString(),
        value
      });
    }

    return points;
  }

  async getPerformanceInsights(): Promise<Array<{
    category: 'performance' | 'security' | 'usage' | 'errors';
    severity: 'low' | 'medium' | 'high';
    message: string;
    metric?: number;
    trend?: 'up' | 'down' | 'stable';
    timestamp: string;
  }>> {
    await this.delay();
    return mockPerformanceInsights.map(insight => ({
      ...insight,
      timestamp: new Date().toISOString()
    }));
  }

  async exportDashboardData(metrics: string[], format: 'csv' | 'json' | 'pdf'): Promise<string> {
    await this.delay();
    const data = await this.getDashboardMetrics({ timeRange: 'day' });
    
    switch (format) {
      case 'json':
        return JSON.stringify(data);
      case 'csv':
        return 'timestamp,metric,value\n' + metrics.map(m => `${new Date().toISOString()},${m},100`).join('\n');
      case 'pdf':
        return 'mock-dashboard-report.pdf';
      default:
        throw this.createError('Unsupported export format');
    }
  }

  subscribeToUpdates(callback: (updates: Partial<DashboardMetrics>) => void): () => void {
    const id = Math.random().toString(36).substring(7);
    this.subscriptions.set(id, callback);
    
    return () => {
      this.subscriptions.delete(id);
      if (this.subscriptions.size === 0) {
        this.cleanup();
      }
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
    await this.delay();
    const value = Math.floor(Math.random() * 1000);
    const change = Math.floor(Math.random() * 20) - 10;
    const trend: 'up' | 'down' | 'stable' = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';

    const history: ChartDataPoint[] = [];
    const now = new Date();
    for (let i = 24; i >= 0; i--) {
      const date = new Date(now);
      date.setHours(date.getHours() - i);
      history.push({
        date: date.toISOString(),
        value: Math.floor(Math.random() * 1000)
      });
    }

    return { value, change, trend, history };
  }
}

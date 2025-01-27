import { IDashboardService } from '@/../interfaces/IDashboardService';
import {
  DashboardMetrics,
  DashboardFilters,
  ChartData,
  ChartDataPoint,
  TransactionStats,
  UserActivityData
} from '@/../../types/dashboard.types';
import { TimeRange } from '@/../../types'; 
import { BaseMockService } from '@/BaseMockService';
import {
  mockDashboardStats,
  mockDashboardCharts,
  mockDashboardAlerts,
  mockDashboardTasks,
  mockDashboardNews
} from '@/data/dashboard/dashboard';

export class MockDashboardService extends BaseMockService implements IDashboardService {
  private subscriptions: Map<string, (updates: Partial<DashboardMetrics>) => void> = new Map();
  private updateInterval: NodeJS.Timeout | null = null;

  constructor(private readonly url: string, basePath: string = '/api/v1/dashboard') {
    super(basePath);
    this.startUpdateLoop();
  }

  private startUpdateLoop(): void {
    this.updateInterval = setInterval(() => {
      const updates: Partial<DashboardMetrics> = {
        transactions: {
          successful: Math.floor(Math.random() * 8000),
          failed: Math.floor(Math.random() * 2000),
          pending: Math.floor(Math.random() * 500),
          total: Math.floor(Math.random() * 10000),
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
    const timeRange = filters.timeRange || TimeRange.DAY;
    
    return {
      transactions: await this.getTransactionStats(timeRange),
      userActivity: await this.getUserActivityData(timeRange),
      charts: {
        transactionVolume: await this.getTransactionVolumeChart(timeRange, 'hour'),
        userGrowth: await this.getUserGrowthChart(timeRange),
        activityBreakdown: await this.getActivityBreakdownChart(timeRange)
      }
    };
  }

  async getTransactionStats(timeRange: TimeRange): Promise<TransactionStats> {
    const multiplier = timeRange === TimeRange.DAY ? 1 :
                      timeRange === TimeRange.WEEK ? 7 :
                      timeRange === TimeRange.MONTH ? 30 : 365;
                      
    return {
      total: Math.floor(Math.random() * 10000) * multiplier,
      successful: Math.floor(Math.random() * 8000) * multiplier,
      failed: Math.floor(Math.random() * 2000) * multiplier,
      pending: Math.floor(Math.random() * 500) * multiplier,
      volume: {
        daily: Math.floor(Math.random() * 500) + 400,
        weekly: Math.floor(Math.random() * 1000) + 2500,
        monthly: Math.floor(Math.random() * 2000) + 11000
      }
    };
  }

  async getUserActivityData(timeRange: TimeRange): Promise<UserActivityData> {
    const multiplier = timeRange === TimeRange.DAY ? 1 :
                      timeRange === TimeRange.WEEK ? 7 :
                      timeRange === TimeRange.MONTH ? 30 : 365;
                      
    return {
      activeUsers: Math.floor(Math.random() * 200 + 750) * multiplier,
      newUsers: Math.floor(Math.random() * 50 + 100) * multiplier,
      returningUsers: Math.floor(Math.random() * 150 + 600) * multiplier,
      averageSessionDuration: Math.floor(Math.random() * 300 + 600)
    };
  }

  async getTransactionVolumeChart(
    timeRange: TimeRange,
    interval: 'hour' | 'day' | 'week' | 'month'
  ): Promise<ChartData> {
    const labels = timeRange === TimeRange.DAY ? Array.from({ length: 24 }, (_, i) => `${i}:00`) :
                  timeRange === TimeRange.WEEK ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] :
                  timeRange === TimeRange.MONTH ? Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`) :
                  Array.from({ length: 12 }, (_, i) => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]);

    return {
      labels,
      datasets: [{
        label: 'Transaction Volume',
        data: Array.from({ length: labels.length }, () => Math.floor(Math.random() * 100) + 50),
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)'
      }]
    };
  }

  async getUserGrowthChart(timeRange: TimeRange): Promise<ChartData> {
    const labels = timeRange === TimeRange.DAY ? Array.from({ length: 24 }, (_, i) => `${i}:00`) :
                  timeRange === TimeRange.WEEK ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] :
                  timeRange === TimeRange.MONTH ? Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`) :
                  Array.from({ length: 12 }, (_, i) => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]);

    return {
      labels,
      datasets: [{
        label: 'User Growth',
        data: Array.from({ length: labels.length }, () => Math.floor(Math.random() * 50) + 30),
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)'
      }]
    };
  }

  async getActivityBreakdownChart(timeRange: TimeRange): Promise<ChartData> {
    return {
      labels: ['Logins', 'Transactions', 'Reports', 'Settings'],
      datasets: [{
        label: 'Activity Breakdown',
        data: [300, 250, 100, 50],
        backgroundColor: 'rgba(76, 175, 80, 0.6)'
      }]
    };
  }

  async getMetricTrend(
    metric: 'transactions' | 'users' | 'errors' | 'response_time',
    timeRange: TimeRange
  ): Promise<ChartDataPoint[]> {
    const points: ChartDataPoint[] = [];
    const now = new Date();
    const pointCount = timeRange === TimeRange.DAY ? 24 : 
                      timeRange === TimeRange.WEEK ? 7 : 
                      timeRange === TimeRange.MONTH ? 30 : 365;

    for (let i = pointCount - 1; i >= 0; i--) {
      const date = new Date(now);
      if (timeRange === TimeRange.DAY) {
        date.setHours(date.getHours() - i);
      } else if (timeRange === TimeRange.WEEK) {
        date.setDate(date.getDate() - i);
      } else if (timeRange === TimeRange.MONTH) {
        date.setDate(date.getDate() - i);
      } else {
        date.setDate(date.getDate() - i);
      }

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
    return mockDashboardAlerts.map(alert => ({
      category: alert.type as 'performance' | 'security' | 'usage' | 'errors',
      severity: 'medium',
      message: alert.message,
      timestamp: alert.timestamp
    }));
  }

  async exportDashboardData(metrics: string[], format: 'csv' | 'json' | 'pdf'): Promise<string> {
    const timeRange: TimeRange = TimeRange.DAY;
    const data = await this.getDashboardMetrics({ timeRange });
    
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

  async getRealTimeMetrics(): Promise<{
    activeTransactions: number;
    transactionsPerMinute: number;
    errorRate: number;
    averageResponseTime: number;
  }> {
    return {
      activeTransactions: Math.floor(Math.random() * 100) + 50,
      transactionsPerMinute: Math.floor(Math.random() * 60) + 30,
      errorRate: Number((Math.random() * 2).toFixed(2)),
      averageResponseTime: Math.floor(Math.random() * 200) + 100
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
    const components = {
      api: Math.random() > 0.1,
      database: Math.random() > 0.1,
      cache: Math.random() > 0.1,
      queue: Math.random() > 0.1
    };

    const allHealthy = Object.values(components).every(status => status);
    const anyDown = Object.values(components).some(status => !status);

    return {
      status: allHealthy ? 'healthy' : anyDown ? 'down' : 'degraded',
      components,
      lastChecked: new Date().toISOString()
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
    const baseValue = Math.floor(Math.random() * 1000);
    const change = Math.floor(Math.random() * 100) - 50;
    const trend: 'up' | 'down' | 'stable' = 
      change > 10 ? 'up' : 
      change < -10 ? 'down' : 
      'stable';

    const history = await this.getMetricTrend(
      'transactions',
      timeRange
    );

    return {
      value: baseValue,
      change,
      trend,
      history
    };
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
}

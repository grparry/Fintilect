import { api, type ApiResponse } from '../utils/api';
import type { TimeRange } from '../types';
import type { 
  DashboardFilters, 
  DashboardMetrics, 
  TransactionStats, 
  UserActivityData,
  ChartData
} from '../types/dashboard.types';

/**
 * Service for managing dashboard functionality
 */
class DashboardService {
  private readonly basePath = '/dashboard';

  /**
   * Get dashboard statistics
   */
  async getStats(timeRange: TimeRange): Promise<ApiResponse<DashboardMetrics>> {
    return api.get(`${this.basePath}/stats`, { params: { timeRange } });
  }

  /**
   * Get transaction statistics
   */
  async getTransactionStats(filters: DashboardFilters): Promise<ApiResponse<TransactionStats>> {
    return api.get(`${this.basePath}/transactions`, { params: filters });
  }

  /**
   * Get user activity data
   */
  async getUserActivity(timeRange: TimeRange): Promise<ApiResponse<UserActivityData>> {
    return api.get(`${this.basePath}/user-activity`, { params: { timeRange } });
  }

  /**
   * Get transaction volume chart data
   */
  async getTransactionVolumeChart(timeRange: TimeRange): Promise<ApiResponse<ChartData>> {
    return api.get(`${this.basePath}/charts/transaction-volume`, { params: { timeRange } });
  }

  /**
   * Get user growth chart data
   */
  async getUserGrowthChart(timeRange: TimeRange): Promise<ApiResponse<ChartData>> {
    return api.get(`${this.basePath}/charts/user-growth`, { params: { timeRange } });
  }

  /**
   * Get activity breakdown chart data
   */
  async getActivityBreakdownChart(timeRange: TimeRange): Promise<ApiResponse<ChartData>> {
    return api.get(`${this.basePath}/charts/activity-breakdown`, { params: { timeRange } });
  }

  /**
   * Export dashboard data
   */
  async exportDashboardData(filters: DashboardFilters): Promise<ApiResponse<Blob>> {
    return api.get(`${this.basePath}/export`, { 
      params: filters,
      responseType: 'blob'
    });
  }

  /**
   * Get system status
   */
  async getSystemStatus(): Promise<ApiResponse<{
    status: 'healthy' | 'degraded' | 'down';
    lastChecked: string;
    services: {
      name: string;
      status: 'up' | 'down';
      latency: number;
    }[];
  }>> {
    return api.get(`${this.basePath}/system/status`);
  }
}

// Export singleton instance
export const dashboardService = new DashboardService();

import { api, type ApiSuccessResponse } from '../../../utils/api';
import { dashboardService } from '../../dashboard.service';
import type { TimeRange } from '../../../types';
import type { DashboardMetrics, TransactionStats, UserActivityData, ChartData } from '../../../types/dashboard.types';

// Mock the API client
jest.mock('../../../utils/api', () => ({
  api: {
    get: jest.fn()
  }
}));

describe('DashboardService Integration Tests', () => {
  const mockTimeRange: TimeRange = 'week';
  const mockFilters = {
    timeRange: mockTimeRange,
    category: 'all'
  };

  const mockDashboardMetrics: DashboardMetrics = {
    transactions: {
      successful: 100,
      failed: 5,
      pending: 10,
      total: 115,
      volume: {
        daily: 15,
        weekly: 115,
        monthly: 450
      }
    },
    userActivity: {
      activeUsers: 50,
      newUsers: 10,
      returningUsers: 40,
      averageSessionDuration: 1800
    },
    charts: {
      transactionVolume: {
        labels: ['Mon', 'Tue', 'Wed'],
        datasets: [{
          label: 'Volume',
          data: [10, 20, 30]
        }]
      },
      userGrowth: {
        labels: ['Mon', 'Tue', 'Wed'],
        datasets: [{
          label: 'Users',
          data: [5, 8, 12]
        }]
      },
      activityBreakdown: {
        labels: ['Active', 'Inactive'],
        datasets: [{
          label: 'Users',
          data: [80, 20]
        }]
      }
    }
  };

  const mockTransactionStats: TransactionStats = mockDashboardMetrics.transactions;
  const mockUserActivity: UserActivityData = mockDashboardMetrics.userActivity;
  const mockChartData: ChartData = mockDashboardMetrics.charts.transactionVolume;

  const mockSystemStatus = {
    status: 'healthy' as const,
    lastChecked: '2025-01-09T15:51:55-07:00',
    services: [
      { name: 'API', status: 'up' as const, latency: 50 },
      { name: 'Database', status: 'up' as const, latency: 100 }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getStats', () => {
    it('should fetch dashboard statistics', async () => {
      const mockResponse: ApiSuccessResponse<DashboardMetrics> = { success: true, data: mockDashboardMetrics };
      (api.get as jest.Mock).mockResolvedValueOnce(mockResponse);
      
      const result = await dashboardService.getStats(mockTimeRange);
      
      expect(api.get).toHaveBeenCalledWith('/dashboard/stats', { params: { timeRange: mockTimeRange } });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTransactionStats', () => {
    it('should fetch transaction statistics', async () => {
      const mockResponse: ApiSuccessResponse<TransactionStats> = { success: true, data: mockTransactionStats };
      (api.get as jest.Mock).mockResolvedValueOnce(mockResponse);
      
      const result = await dashboardService.getTransactionStats(mockFilters);
      
      expect(api.get).toHaveBeenCalledWith('/dashboard/transactions', { params: mockFilters });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getUserActivity', () => {
    it('should fetch user activity data', async () => {
      const mockResponse: ApiSuccessResponse<UserActivityData> = { success: true, data: mockUserActivity };
      (api.get as jest.Mock).mockResolvedValueOnce(mockResponse);
      
      const result = await dashboardService.getUserActivity(mockTimeRange);
      
      expect(api.get).toHaveBeenCalledWith('/dashboard/user-activity', { params: { timeRange: mockTimeRange } });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTransactionVolumeChart', () => {
    it('should fetch transaction volume chart data', async () => {
      const mockResponse: ApiSuccessResponse<ChartData> = { success: true, data: mockChartData };
      (api.get as jest.Mock).mockResolvedValueOnce(mockResponse);
      
      const result = await dashboardService.getTransactionVolumeChart(mockTimeRange);
      
      expect(api.get).toHaveBeenCalledWith('/dashboard/charts/transaction-volume', { params: { timeRange: mockTimeRange } });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getUserGrowthChart', () => {
    it('should fetch user growth chart data', async () => {
      const mockResponse: ApiSuccessResponse<ChartData> = { success: true, data: mockChartData };
      (api.get as jest.Mock).mockResolvedValueOnce(mockResponse);
      
      const result = await dashboardService.getUserGrowthChart(mockTimeRange);
      
      expect(api.get).toHaveBeenCalledWith('/dashboard/charts/user-growth', { params: { timeRange: mockTimeRange } });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getActivityBreakdownChart', () => {
    it('should fetch activity breakdown chart data', async () => {
      const mockResponse: ApiSuccessResponse<ChartData> = { success: true, data: mockChartData };
      (api.get as jest.Mock).mockResolvedValueOnce(mockResponse);
      
      const result = await dashboardService.getActivityBreakdownChart(mockTimeRange);
      
      expect(api.get).toHaveBeenCalledWith('/dashboard/charts/activity-breakdown', { params: { timeRange: mockTimeRange } });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('exportDashboardData', () => {
    it('should export dashboard data as blob', async () => {
      const mockBlob = new Blob(['test data'], { type: 'text/csv' });
      const mockResponse: ApiSuccessResponse<Blob> = { success: true, data: mockBlob };
      (api.get as jest.Mock).mockResolvedValueOnce(mockResponse);
      
      const result = await dashboardService.exportDashboardData(mockFilters);
      
      expect(api.get).toHaveBeenCalledWith('/dashboard/export', { 
        params: mockFilters,
        responseType: 'blob'
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getSystemStatus', () => {
    it('should fetch system status', async () => {
      const mockResponse: ApiSuccessResponse<typeof mockSystemStatus> = { success: true, data: mockSystemStatus };
      (api.get as jest.Mock).mockResolvedValueOnce(mockResponse);
      
      const result = await dashboardService.getSystemStatus();
      
      expect(api.get).toHaveBeenCalledWith('/dashboard/system/status');
      expect(result).toEqual(mockResponse);
    });
  });
});

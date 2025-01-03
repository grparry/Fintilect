import api from './api';
import { TimeRange } from '../types/index';
import { 
  DashboardFilters, 
  DashboardMetrics, 
  TransactionStats, 
  UserActivityData 
} from '../types/dashboard.types';
import { ApiSuccessResponse } from '../types/api.types';

export const DashboardService = {
  getStats: async (timeRange: TimeRange): Promise<ApiSuccessResponse<DashboardMetrics>> => {
    try {
      const response = await api.get<ApiSuccessResponse<DashboardMetrics>>('/dashboard/stats', { params: { timeRange } });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch dashboard stats');
    }
  },

  getTransactionStats: async (filters: DashboardFilters): Promise<ApiSuccessResponse<TransactionStats>> => {
    try {
      const response = await api.get<ApiSuccessResponse<TransactionStats>>('/dashboard/transactions', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch transaction stats');
    }
  },

  getUserActivity: async (timeRange: TimeRange): Promise<ApiSuccessResponse<UserActivityData>> => {
    try {
      const response = await api.get<ApiSuccessResponse<UserActivityData>>('/dashboard/user-activity', { params: { timeRange } });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user activity data');
    }
  }
};

export default DashboardService;

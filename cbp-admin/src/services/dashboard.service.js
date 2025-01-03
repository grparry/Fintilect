import api from './api';

export const DashboardService = {
  getStats: async (timeRange) => {
    try {
      const response = await api.get(`/dashboard/stats`, { params: { timeRange } });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch dashboard stats');
    }
  },

  getChartData: async (timeRange) => {
    try {
      const response = await api.get(`/dashboard/chart-data`, { params: { timeRange } });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch chart data');
    }
  },

  getPendingPayments: async () => {
    try {
      const response = await api.get('/dashboard/pending-payments');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch pending payments');
    }
  }
};

export default DashboardService;

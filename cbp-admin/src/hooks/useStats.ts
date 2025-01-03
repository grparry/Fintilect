import { useState, useEffect } from 'react';
import { DashboardService } from '../services/dashboard.service';
import { DashboardStats, TimeRange } from '../types';
import { DashboardMetrics } from '../types/dashboard.types';

interface UseStatsResult {
  stats: DashboardStats | null;
  isLoading: boolean;
  error: string | null;
}

const transformMetricsToStats = (metrics: DashboardMetrics): DashboardStats => {
  return {
    totalUsers: metrics.userActivity.activeUsers + metrics.userActivity.newUsers,
    activeUsers: metrics.userActivity.activeUsers,
    totalTransactions: metrics.transactions.total,
    transactionVolume: metrics.transactions.volume.daily,
  };
};

export const useStats = (timeRange: TimeRange): UseStatsResult => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await DashboardService.getStats(timeRange);
        setStats(transformMetricsToStats(response.data));
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [timeRange]);

  return { stats, isLoading, error };
};

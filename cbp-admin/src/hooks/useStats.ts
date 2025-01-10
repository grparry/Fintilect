import { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboard.service';
import { TimeRange } from '../types';
import { DashboardMetrics } from '../types/dashboard.types';

interface UseStatsResult {
  stats: DashboardMetrics | null;
  isLoading: boolean;
  error: string | null;
}

export const useStats = (timeRange: TimeRange): UseStatsResult => {
  const [stats, setStats] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await dashboardService.getStats(timeRange);
        if (response.success) {
          setStats(response.data);
          setError(null);
        } else {
          setError(response.error?.message || 'Failed to load stats');
        }
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

import { useEffect, useState } from 'react';
import { dashboardService } from './services/factory/ServiceFactory';
import { TimeRange } from './types';
import { DashboardMetrics } from './types/dashboard.types';

interface UseStatsResult {
  stats: DashboardMetrics | null;
  loading: boolean;
  error: string | null;
}

export const useStats = (timeRange: TimeRange): UseStatsResult => {
  const [stats, setStats] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async (): Promise<void> => {
      setLoading(true);
      try {
        const data = await dashboardService.getDashboardMetrics({ timeRange });
        setStats(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stats');
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [timeRange]);

  return { stats, loading, error };
};

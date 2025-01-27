import { useState, useEffect } from 'react';
import DashboardService from '../services/dashboard.service';

export const useStats = (timeRange) => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const data = await DashboardService.getStats(timeRange);
        setStats(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [timeRange]);
  return { stats, isLoading, error };
};
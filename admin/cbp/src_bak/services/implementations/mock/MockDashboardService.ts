import { IDashboardService } from '../../interfaces/IDashboardService';
import {
  DashboardMetrics,
  DashboardFilters,
  ChartData,
  ChartDataPoint,
  TransactionStats,
  UserActivityData
} from '../../../types/dashboard.types';
import { TimeRange } from '../../../types'; 
import { BaseMockService } from './BaseMockService';
import {
  mockDashboardStats,
  mockDashboardCharts,
  mockDashboardAlerts,
  mockDashboardTasks,
  mockDashboardNews
} from './data/dashboard/dashboard';

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
    







    

                      

                      

  ): Promise<ChartData> {





  ): Promise<ChartDataPoint[]> {





    





  ): Promise<{
      'stable';

      'transactions',
    );


    

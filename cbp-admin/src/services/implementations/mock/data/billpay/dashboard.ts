import { ChartDataPoint, TimeRangeOption, ChartViewOption } from '../../../../../types/dashboard.types';
import { BillPayStats, PaymentMethod, PaymentStatus, TransactionTrend } from '../../../../../types/bill-pay.types';
import { TimeRange } from '../../../../../types';

export const mockChartData: ChartDataPoint[] = [
  { date: '2024-12-10', value: 1000 },
  { date: '2024-12-11', value: 1200 },
  { date: '2024-12-12', value: 800 },
  { date: '2024-12-13', value: 1500 },
  { date: '2024-12-14', value: 1100 }
];

export const TIME_RANGES: TimeRangeOption[] = [
  { label: 'Today', value: TimeRange.DAY },
  { label: 'This Week', value: TimeRange.WEEK },
  { label: 'This Month', value: TimeRange.MONTH },
  { label: 'This Year', value: TimeRange.YEAR }
];

export const CHART_VIEWS: ChartViewOption[] = [
  { label: 'Line', value: 'line' },
  { label: 'Bar', value: 'bar' },
  { label: 'Pie', value: 'pie' }
];

const formatTimestamp = (date: Date): string => {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${month}/${day}`;
};

export const mockDashboardStats = (timeframe?: 'day' | 'week' | 'month' | 'quarter' | 'year'): BillPayStats => {
  console.log('Generating Mock Dashboard Stats:', { timeframe });
  const now = new Date();

  // Base activities per day with seasonal adjustments
  const getActivitiesForDate = (date: Date, baseActivities: number): number => {
    const month = date.getMonth();
    const dayOfWeek = date.getDay();
    
    // Seasonal factors (Q4 higher, Q1 lower)
    let seasonalFactor = 1.0;
    if (month >= 9 && month <= 11) seasonalFactor = 1.3;  // Q4: 30% increase
    if (month >= 0 && month <= 2) seasonalFactor = 0.8;   // Q1: 20% decrease
    
    // Day of week factors (weekends lower)
    const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.6 : 1.0;
    
    // Monthly growth trend (1% monthly growth)
    const monthsSinceStart = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
    const growthFactor = Math.pow(1.01, monthsSinceStart);
    
    // Combine all factors
    const adjustedActivities = Math.round(baseActivities * seasonalFactor * weekendFactor * growthFactor);
    
    // Add some random variation (±20%)
    const randomFactor = 0.8 + (Math.random() * 0.4); // 0.8 to 1.2
    return Math.max(1, Math.round(adjustedActivities * randomFactor));
  };

  // Calculate start date based on timeframe
  const startDate = new Date(now);
  switch (timeframe) {
    case 'day':
      startDate.setDate(startDate.getDate() - 1);
      break;
    case 'week':
      startDate.setDate(startDate.getDate() - 7);
      break;
    case 'month':
      startDate.setMonth(startDate.getMonth() - 1);
      break;
    case 'quarter':
      startDate.setMonth(startDate.getMonth() - 3);
      break;
    case 'year':
      startDate.setFullYear(startDate.getFullYear() - 1);
      break;
    default:
      startDate.setMonth(startDate.getMonth() - 1);
  }
  startDate.setHours(0, 0, 0, 0);

  console.log('Date Range:', {
    startDate,
    now,
    timeframe,
    daysBetween: Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  });

  // Base activities per day based on timeframe
  const baseActivitiesPerDay = (() => {
    switch (timeframe) {
      case 'day': return 24;    // One per hour
      case 'week':
      case 'month':
      case 'quarter':
      case 'year':
        return 15;  // Maintain consistent density for all longer timeframes
      default: return 15;
    }
  })();

  const methods = [PaymentMethod.ACH, PaymentMethod.WIRE, PaymentMethod.RTP, PaymentMethod.CHECK, PaymentMethod.CARD];

  // Initialize stats
  const stats: BillPayStats = {
    totalTransactions: 0,
    totalAmount: 0,
    successRate: 85 + Math.random() * 15,
    averageTransactionSize: 0,
    transactionsByMethod: Object.values(PaymentMethod).reduce((acc, method) => {
      acc[method] = 0;
      return acc;
    }, {} as Record<PaymentMethod, number>),
    transactionsByStatus: Object.values(PaymentStatus).reduce((acc, status) => {
      acc[status] = 0;
      return acc;
    }, {} as Record<PaymentStatus, number>),
    recentActivity: []
  };

  // Generate daily transactions
  let totalTransactions = 0;
  let totalAmount = 0;
  let currentDate = new Date(startDate);

  while (currentDate <= now) {
    const dailyTransactions = getActivitiesForDate(currentDate, baseActivitiesPerDay);
    totalTransactions += dailyTransactions;
    
    // Generate amounts and statuses for each transaction
    for (let j = 0; j < dailyTransactions; j++) {
      // Random amount between $100 and $10000
      const amount = Math.round(100 + Math.random() * 9900);
      totalAmount += amount;
      
      // Randomly assign method and status with realistic probabilities
      const method = methods[Math.floor(Math.random() * methods.length)];
      stats.transactionsByMethod[method]++;
      
      // Status distribution with more varied statuses
      const statusRoll = Math.random() * 100;
      let status: PaymentStatus;
      if (statusRoll < 75) {
        // 75% completed
        status = PaymentStatus.COMPLETED;
      } else if (statusRoll < 85) {
        // 10% pending states
        const pendingRoll = Math.random() * 100;
        if (pendingRoll < 30) {
          status = PaymentStatus.PENDING;
        } else if (pendingRoll < 50) {
          status = PaymentStatus.PENDING_APPROVAL;
        } else if (pendingRoll < 70) {
          status = PaymentStatus.PROCESSING;
        } else if (pendingRoll < 85) {
          status = PaymentStatus.DRAFT;
        } else {
          status = PaymentStatus.SCHEDULED;
        }
      } else {
        // 15% failed states
        const failedRoll = Math.random() * 100;
        if (failedRoll < 40) {
          status = PaymentStatus.FAILED;
        } else if (failedRoll < 70) {
          status = PaymentStatus.REJECTED;
        } else if (failedRoll < 85) {
          status = PaymentStatus.CANCELLED;
        } else {
          status = PaymentStatus.EXPIRED;
        }
      }

      console.log('Generated transaction:', {
        status,
        statusRoll,
        currentStats: stats.transactionsByStatus
      });

      stats.transactionsByStatus[status]++;
      
      // Add to recent activity - no longer limiting to 30 days
      stats.recentActivity.push({
        id: `pmt_${currentDate.getTime()}_${j}`,
        amount,
        method,
        status,
        timestamp: new Date(currentDate).toISOString()
      });
    }
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  stats.totalTransactions = totalTransactions;
  stats.totalAmount = totalAmount;
  stats.averageTransactionSize = Number((totalAmount / totalTransactions).toFixed(2));

  // Sort recent activity by timestamp (newest first)
  stats.recentActivity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  console.log('Generated Stats:', {
    timeframe,
    totalTransactions,
    totalAmount,
    averageTransactionSize: stats.averageTransactionSize,
    recentActivityCount: stats.recentActivity.length,
    transactionsByStatus: stats.transactionsByStatus,
    dateRange: {
      earliest: stats.recentActivity.length > 0 ? new Date(stats.recentActivity[stats.recentActivity.length - 1].timestamp) : null,
      latest: stats.recentActivity.length > 0 ? new Date(stats.recentActivity[0].timestamp) : null
    }
  });

  return stats;
};

export const generateMockTrends = (days: number): TransactionTrend[] => {
  const trends: TransactionTrend[] = [];
  const now = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    trends.push({
      date: date.toISOString(),
      amount: Math.floor(Math.random() * 10000) + 1000,
      count: Math.floor(Math.random() * 50) + 10
    });
  }

  return trends.reverse(); // Return in chronological order
};

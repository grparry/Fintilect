import { ChartDataPoint, TimeRangeOption, ChartViewOption } from '../../../../types/dashboard.types';
import { BillPayStats, PaymentMethod, PaymentStatus, TransactionTrend } from '../../../../types/bill-pay.types';
import { TimeRange } from '../../../../../types';

export const mockChartData: ChartDataPoint[] = [
  { date: '2024-12-10', value: 1000 },


  { date: '2024-12-10', value: 1000 },
  { date: '2024-12-11', value: 1200 },
  { date: '2024-12-12', value: 800 },
  { date: '2024-12-13', value: 1500 },
  { date: '2024-12-14', value: 1100 }
];

  { label: 'Today', value: TimeRange.DAY },
  { label: 'This Week', value: TimeRange.WEEK },
  { label: 'This Month', value: TimeRange.MONTH },
  { label: 'This Year', value: TimeRange.YEAR }
];

  { label: 'Line', value: 'line' },
  { label: 'Bar', value: 'bar' },
  { label: 'Pie', value: 'pie' }
];



  // Base activities per day with seasonal adjustments
    
    // Seasonal factors (Q4 higher, Q1 lower)
    
    // Day of week factors (weekends lower)
    
    // Monthly growth trend (1% monthly growth)
    
    // Combine all factors
    
    // Add some random variation (±20%)

  // Calculate start date based on timeframe


  // Base activities per day based on timeframe


  // Initialize stats

  // Generate daily transactions

    
    // Generate amounts and statuses for each transaction
      // Random amount between $100 and $10000
      
      // Randomly assign method and status with realistic probabilities
      
      // Status distribution with more varied statuses
        // 75% completed
        // 10% pending states
        // 15% failed states


      
      // Add to recent activity - no longer limiting to 30 days
    
    // Move to next day


  // Sort recent activity by timestamp (newest first)






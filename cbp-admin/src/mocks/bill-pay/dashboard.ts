import { ChartDataPoint, TimeRangeOption, ChartViewOption } from '../../types/dashboard.types';
import { BillPayStats, PaymentMethod, PaymentStatus, TransactionTrend } from '../../types/bill-pay.types';

export const mockChartData: ChartDataPoint[] = [
  { date: '2024-12-10', value: 1000 },
  { date: '2024-12-11', value: 1200 },
  { date: '2024-12-12', value: 800 },
  { date: '2024-12-13', value: 1500 },
  { date: '2024-12-14', value: 1100 }
];

export const TIME_RANGES: TimeRangeOption[] = [
  { label: 'Today', value: 'day' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
  { label: 'This Year', value: 'year' }
] as const;

export const CHART_VIEWS: ChartViewOption[] = [
  { label: 'Line', value: 'line' },
  { label: 'Bar', value: 'bar' },
  { label: 'Pie', value: 'pie' }
] as const;

export const mockDashboardStats = (): BillPayStats => ({
  totalTransactions: 450,
  totalAmount: 1250000.00,
  successRate: 92.5,
  averageTransactionSize: 2777.78,
  transactionsByMethod: {
    [PaymentMethod.ACH]: 150,
    [PaymentMethod.WIRE]: 100,
    [PaymentMethod.RTP]: 100,
    [PaymentMethod.CHECK]: 50,
    [PaymentMethod.CARD]: 50
  },
  transactionsByStatus: {
    [PaymentStatus.PENDING]: 10,
    [PaymentStatus.APPROVED]: 5,
    [PaymentStatus.REJECTED]: 2,
    [PaymentStatus.PROCESSING]: 8,
    [PaymentStatus.COMPLETED]: 15,
    [PaymentStatus.FAILED]: 3,
    [PaymentStatus.CANCELLED]: 1,
    [PaymentStatus.EXPIRED]: 0,
    [PaymentStatus.PENDING_APPROVAL]: 0,
    [PaymentStatus.DRAFT]: 0,
    [PaymentStatus.SUBMITTED]: 0,
    [PaymentStatus.SCHEDULED]: 0,
    [PaymentStatus.RETURNED]: 0,
    [PaymentStatus.STOP_PAYMENT]: 0,
    [PaymentStatus.REVERSED]: 0,
    [PaymentStatus.REFUNDED]: 0,
    [PaymentStatus.RESENT]: 0,
    [PaymentStatus.REINITIATED]: 0,
    [PaymentStatus.PENDING_REVERSAL]: 0,
    [PaymentStatus.PENDING_REFUND]: 0,
    [PaymentStatus.PENDING_RETURN]: 0,
    [PaymentStatus.PENDING_STOP_PAYMENT]: 0,
    [PaymentStatus.PENDING_RESEND]: 0,
    [PaymentStatus.PENDING_REINITIATE]: 0
  },
  recentActivity: [
    {
      id: 'txn_001',
      amount: 50000.00,
      method: PaymentMethod.ACH,
      status: PaymentStatus.PENDING,
      timestamp: '2024-12-30T08:00:00Z'
    },
    {
      id: 'txn_002',
      amount: 75000.00,
      method: PaymentMethod.WIRE,
      status: PaymentStatus.APPROVED,
      timestamp: '2024-12-30T07:45:00Z'
    },
    {
      id: 'txn_003',
      amount: 25000.00,
      method: PaymentMethod.RTP,
      status: PaymentStatus.REJECTED,
      timestamp: '2024-12-30T07:30:00Z'
    }
  ]
});

export const generateMockTrends = (days: number): TransactionTrend[] => {
  return Array.from({ length: days }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    return {
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 100) + 50,
      amount: Math.round((Math.random() * 10000 + 5000) * 100) / 100,
      successRate: Math.round((Math.random() * 0.1 + 0.9) * 1000) / 1000,
    };
  });
};

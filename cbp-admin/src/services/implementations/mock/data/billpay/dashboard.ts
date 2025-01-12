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
    [PaymentStatus.PENDING]: 50,
    [PaymentStatus.APPROVED]: 25,
    [PaymentStatus.REJECTED]: 10,
    [PaymentStatus.PROCESSING]: 40,
    [PaymentStatus.COMPLETED]: 200,
    [PaymentStatus.FAILED]: 15,
    [PaymentStatus.CANCELLED]: 5,
    [PaymentStatus.EXPIRED]: 2,
    [PaymentStatus.PENDING_APPROVAL]: 20,
    [PaymentStatus.DRAFT]: 30,
    [PaymentStatus.SUBMITTED]: 15,
    [PaymentStatus.SCHEDULED]: 10,
    [PaymentStatus.RETURNED]: 8,
    [PaymentStatus.STOP_PAYMENT]: 3,
    [PaymentStatus.VOID]: 5,
    [PaymentStatus.HOLD]: 4,
    [PaymentStatus.SUSPENDED]: 3,
    [PaymentStatus.REFUNDED]: 3,
    [PaymentStatus.PARTIALLY_REFUNDED]: 1,
    [PaymentStatus.CHARGEBACK]: 1
  },
  recentActivity: [
    {
      id: 'pmt_1',
      amount: 1000.00,
      method: PaymentMethod.ACH,
      status: PaymentStatus.COMPLETED,
      timestamp: '2024-12-28T21:43:09-07:00'
    },
    {
      id: 'pmt_2',
      amount: 500.00,
      method: PaymentMethod.WIRE,
      status: PaymentStatus.PENDING,
      timestamp: '2024-12-28T21:42:13-07:00'
    },
    {
      id: 'pmt_3',
      amount: 750.00,
      method: PaymentMethod.RTP,
      status: PaymentStatus.PROCESSING,
      timestamp: '2024-12-28T21:41:00-07:00'
    }
  ]
});

export const generateMockTrends = (days: number): TransactionTrend[] => {
  const trends: TransactionTrend[] = [];
  const baseDate = new Date('2024-12-28T21:43:09-07:00');

  for (let i = 0; i < days; i++) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    trends.push({
      date: date.toISOString(),
      amount: Math.floor(Math.random() * 10000) + 1000,
      count: Math.floor(Math.random() * 50) + 10
    });
  }

  return trends;
};

import { ElementType } from 'react';
import {
  Assessment as AssessmentIcon,
  AttachMoney as MoneyIcon,
  Payment as PaymentIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';

interface DashboardCard {
  id: string;
  title: string;
  dataKey: string;
  metricType: 'transactions' | 'processor' | 'summary';
  icon: ElementType;
  formatter?: (value: number) => string;
}
interface TimeRange {
  value: string;
  label: string;
  days: number;
}
interface ChartView {
  value: 'payments' | 'amount';
  label: string;
  formatter?: (value: number) => string;
}
export const DASHBOARD_CARDS: DashboardCard[] = [
  {
    id: 'total-transactions',
    title: 'Total Payments',
    dataKey: 'totalTransactions',
    metricType: 'transactions',
    icon: PaymentIcon,
    formatter: (value) => value.toLocaleString(),
  },
  {
    id: 'average-payment',
    title: 'Average Payment',
    dataKey: 'averageTransactionSize',
    metricType: 'transactions',
    icon: MoneyIcon,
    formatter: (value) => `$${value.toFixed(2)}`,
  },
  {
    id: 'pending-payments',
    title: 'Pending Payments',
    dataKey: 'pendingTransactions',
    metricType: 'transactions',
    icon: AssessmentIcon,
    formatter: (value) => value.toLocaleString(),
  },
  {
    id: 'failed-payments',
    title: 'Failed Payments',
    dataKey: 'failedTransactions',
    metricType: 'transactions',
    icon: SpeedIcon,
    formatter: (value) => value.toLocaleString(),
  },
];
export const TIME_RANGES: TimeRange[] = [
  { value: 'day', label: 'Last 24 Hours', days: 1 },
  { value: 'week', label: 'Last 7 Days', days: 7 },
  { value: 'month', label: 'Last 30 Days', days: 30 },
  { value: 'quarter', label: 'Last 90 Days', days: 90 },
  { value: 'year', label: 'Last Year', days: 365 }
];
export const CHART_VIEWS: ChartView[] = [
  {
    value: 'payments',
    label: 'Payment Count',
    formatter: (value) => value.toLocaleString()
  },
  {
    value: 'amount',
    label: 'Payment Amount',
    formatter: (value) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
];
export const DEFAULT_CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value: number) => value.toLocaleString(),
      },
    },
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
    },
  },
};
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
  value: 'day' | 'week' | 'month';
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
    title: 'Total Transactions',
    dataKey: 'totalTransactions',
    metricType: 'transactions',
    icon: PaymentIcon,
    formatter: (value) => value.toLocaleString(),
  },
  {
    id: 'total-amount',
    title: 'Total Amount',
    dataKey: 'totalAmount',
    metricType: 'summary',
    icon: MoneyIcon,
    formatter: (value) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  },
  {
    id: 'success-rate',
    title: 'Success Rate',
    dataKey: 'successRate',
    metricType: 'processor',
    icon: AssessmentIcon,
    formatter: (value) => `${value.toFixed(1)}%`,
  },
  {
    id: 'daily-throughput',
    title: 'Daily Throughput',
    dataKey: 'throughput',
    metricType: 'processor',
    icon: SpeedIcon,
    formatter: (value) => value.toLocaleString(),
  },
];

export const TIME_RANGES: TimeRange[] = [
  { value: 'day', label: 'Last 24 Hours', days: 1 },
  { value: 'week', label: 'Last 7 Days', days: 7 },
  { value: 'month', label: 'Last 30 Days', days: 30 },
];

export const CHART_VIEWS: ChartView[] = [
  {
    value: 'payments',
    label: 'Transaction Count',
    formatter: (value) => value.toLocaleString(),
  },
  {
    value: 'amount',
    label: 'Payment Amount',
    formatter: (value) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  },
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

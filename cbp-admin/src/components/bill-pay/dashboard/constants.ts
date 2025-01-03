import { ElementType } from 'react';
import {
  Assessment as AssessmentIcon,
  AttachMoney as MoneyIcon,
  Payment as PaymentIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { BillPayStats } from '../../../types/bill-pay.types';

interface DashboardCard {
  id: string;
  title: string;
  dataKey: keyof BillPayStats;
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
    title: 'Total Transactions',
    dataKey: 'totalTransactions',
    icon: PaymentIcon,
    formatter: (value) => value.toLocaleString(),
  },
  {
    id: 'total-amount',
    title: 'Total Amount',
    dataKey: 'totalAmount',
    icon: MoneyIcon,
    formatter: (value) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  },
  {
    id: 'success-rate',
    title: 'Success Rate',
    dataKey: 'successRate',
    icon: AssessmentIcon,
    formatter: (value) => `${value.toFixed(1)}%`,
  },
  {
    id: 'average-size',
    title: 'Average Transaction',
    dataKey: 'averageTransactionSize',
    icon: MoneyIcon,
    formatter: (value) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  },
];

export const TIME_RANGES: TimeRange[] = [
  { value: '7d', label: 'Last 7 Days', days: 7 },
  { value: '30d', label: 'Last 30 Days', days: 30 },
  { value: '90d', label: 'Last 90 Days', days: 90 },
];

export const CHART_VIEWS: ChartView[] = [
  {
    value: 'payments',
    label: 'Payment Count',
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
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Transaction Trends',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

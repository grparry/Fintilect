import {
  Assessment as AssessmentIcon,
  AttachMoney as MoneyIcon,
  Payment as PaymentIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

export const DASHBOARD_CARDS = [
  {
    id: 'total-payments',
    title: 'Total Payments',
    dataKey: 'totalPayments',
    icon: PaymentIcon,
  },
  {
    id: 'average-payment',
    title: 'Average Payment',
    dataKey: 'averagePayment',
    icon: MoneyIcon,
  },
  {
    id: 'pending-payments',
    title: 'Pending Payments',
    dataKey: 'pendingPayments',
    icon: AssessmentIcon,
  },
  {
    id: 'failed-payments',
    title: 'Failed Payments',
    dataKey: 'failedPayments',
    icon: WarningIcon,
  },
];

export const TIME_RANGES = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: '1y', label: 'Last Year' },
];

export const CHART_VIEWS = [
  { value: 'payments', label: 'Number of Payments' },
  { value: 'amount', label: 'Payment Amount' },
];

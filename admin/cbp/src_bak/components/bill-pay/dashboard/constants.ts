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





  {
  {
  {
  {
];

  { value: 'day', label: 'Last 24 Hours', days: 1 },
  { value: 'week', label: 'Last 7 Days', days: 7 },
  { value: 'month', label: 'Last 30 Days', days: 30 },
  { value: 'quarter', label: 'Last 90 Days', days: 90 },
  { value: 'year', label: 'Last Year', days: 365 }
];

  {
  {
];


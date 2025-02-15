import { ReactNode, CSSProperties } from 'react';
import { SelectOption } from './index';

// Common component props
export interface BaseComponentProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
// DashboardCard props
export interface DashboardCardProps extends BaseComponentProps {
  title: string;
  subtitle?: string;
  loading?: boolean;
  error?: string | null;
  action?: ReactNode;
  footerContent?: ReactNode;
}
// DataTable props
export interface Column<T = any> {
  field: keyof T;
  headerName: string;
  width?: number;
  sortable?: boolean;
  renderCell?: (params: { row: T }) => ReactNode;
  align?: 'left' | 'center' | 'right';
}
export interface DataTableProps<T = any> extends BaseComponentProps {
  columns: Column<T>[];
  rows: T[];
  loading?: boolean;
  error?: string | null;
  pageSize?: number;
  rowsPerPageOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onRowClick?: (row: T) => void;
  onSortChange?: (field: keyof T, direction: 'asc' | 'desc') => void;
  selectedRows?: T[];
  onSelectionChange?: (selectedRows: T[]) => void;
}
// ErrorBoundary props and state
export interface ErrorBoundaryProps extends BaseComponentProps {
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}
// GlobalProfiler props
export interface GlobalProfilerProps extends BaseComponentProps {
  id: string;
  enabled?: boolean;
  onMeasurement?: (measurements: {
    componentName: string;
    phase: 'mount' | 'update';
    duration: number;
    timestamp: number;
  }) => void;
}
// Re-export FormField from Form component
export type { FormField } from '@/components/common/Form';
// Table props
export interface TableColumn<T> {
  field: keyof T;
  headerName: string;
  width?: number;
  sortable?: boolean;
  renderCell?: (row: T) => React.ReactNode;
}
export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onSortChange?: (field: keyof T, direction: 'asc' | 'desc') => void;
}
// Button props
export interface ButtonProps {
  onClick: () => void;
  label: string;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}
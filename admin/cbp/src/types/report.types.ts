import { Dayjs } from 'dayjs';

export type ReportType = 'all' | 'login' | 'payments' | 'system';
export interface AuditRecord {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  details: string;
}
export interface TransactionRecord {
  id: number;
  date: string;
  amount: number;
  type: string;
  status: string;
  recipient: string;
}
export interface UserRecord {
  id: number;
  username: string;
  lastLogin: string;
  status: string;
  role: string;
}
export interface ReportData {
  audit: AuditRecord[];
  transactions: TransactionRecord[];
  users: UserRecord[];
}
export interface ReportFilters {
  startDate: Dayjs;
  endDate: Dayjs;
  reportType: ReportType;
  searchTerm: string;
}
export interface ExportOptions {
  format: 'csv' | 'pdf' | 'excel';
  includeHeaders: boolean;
  dateFormat: string;
}
import { reportService } from '../services/factory/ServiceFactory';

/**
 * Report Helpers
 * 
 * This module provides strongly-typed helper methods for executing reports.
 * Each method corresponds to a specific stored procedure in the database.
 */

// ===== Type Definitions for Common Parameters =====

/**
 * Common search types used across multiple reports
 */
export type SearchType = 
  // Member-related search types
  | 'MemberId' 
  | 'PaymentId' 
  | 'PayeeName'
  // Error-related search types
  | 'StatusCode' 
  | 'ErrorType' 
  | 'ErrorMessage';

// ===== Type Definitions for Report Parameters =====

/**
 * Parameters for Billpay Search Report
 * Stored Procedure: rptBillpaySearchJSON
 */
export interface BillpaySearchReportParams {
  searchType: string;
  id: string;
  days?: number;
  reportType?: string;
}

/**
 * Error Recap search type display names
 */
export const ERROR_RECAP_SEARCH_TYPES = {
  'PaymentID': 'Payment ID',
  'MemberID': 'Member ID',
  'UserPayeeListID': 'User Payee List ID',
  'StatusCode': 'Status Code'
};

/**
 * Parameters for Error Recap Report
 * Stored Procedure: rptErrorRecapJSON
 */
export interface ErrorRecapReportParams {
  searchType: keyof typeof ERROR_RECAP_SEARCH_TYPES;
  searchValue: string;
}

/**
 * Parameters for Active User Count Report
 * Stored Procedure: rptGetActiveUserCountJSON
 */
export interface ActiveUserCountReportParams {
  startDate: Date;
  endDate: Date;
}

/**
 * Parameters for Failed On-Us Report
 * Stored Procedure: rptGetFailedOnUsJSON
 */
export interface FailedOnUsReportParams {
  startDate: Date;
  endDate: Date;
}

/**
 * Parameters for On-Us Postings Report
 * Stored Procedure: rptGetOnUsPostingsJSON
 */
export interface OnUsPostingsReportParams {
  startDate: Date;
  endDate: Date;
}

/**
 * Parameters for Large Payment Report
 * Stored Procedure: rptLargePaymentJSON
 */
export interface LargePaymentReportParams {
  runDate: Date;
}

/**
 * Parameters for Monthly Users Report
 * Stored Procedure: rptMonthlyUsersJSON
 */
export interface MonthlyUsersReportParams {
  startDate: Date;
  endDate: Date;
}

/**
 * Payment Activity search type display names
 */
export const PAYMENT_ACTIVITY_SEARCH_TYPES = {
  'PaymentActivity_MemberID': 'Member ID',
  'PaymentActivity_MemberIDAndDate': 'Member ID and Date Range',
  'PaymentActivity_MemberIDAndPayeeName': 'Member ID and Payee Name',
  'PaymentActivity_MemberIDAndDateAndPayeeName': 'Member ID, Date Range, and Payee Name',
  'PaymentActivity_Date': 'Date Range'
};

/**
 * Parameters for Payment Activity Report
 * Stored Procedure: rptPaymentActivityJSON
 */
export interface PaymentActivityReportParams {
  searchType: keyof typeof PAYMENT_ACTIVITY_SEARCH_TYPES;
  startDate?: Date;
  endDate?: Date;
  memberId?: string;
  payeeName?: string;
}

/**
 * Parameters for Pending Payments Report
 * Stored Procedure: rptPendingPaymentsJSON
 */
export interface PendingPaymentsReportParams {
  date: Date;
}

/**
 * Parameters for Processing Confirmation Report
 * Stored Procedure: rptProcessingConfirmationJSON
 */
export interface ProcessingConfirmationReportParams {
  startDate: Date;
  endDate: Date;
}

/**
 * Parameters for Recurring Payment Change History Report
 * Stored Procedure: rptRecurringPaymentChangeHistoryJSON
 */
export interface RecurringPaymentChangeHistoryReportParams {
  startDate: Date;
  endDate: Date;
  searchType: string;
  searchValue: string;
}

/**
 * Parameters for Scheduled Payment Change History Report
 * Stored Procedure: rptScheduledPaymentChangeHistoryJSON
 */
export interface ScheduledPaymentChangeHistoryReportParams {
  startDate: Date;
  endDate: Date;
  searchType: string;
  searchValue: string;
}

/**
 * Parameters for User Payee Change History Report
 * Stored Procedure: rptUserPayeeChangeHistoryJSON
 */
export interface UserPayeeChangeHistoryReportParams {
  startDate: Date;
  endDate: Date;
  searchType: string;
  searchValue: string;
}

// ===== Type Definitions for Report Responses =====

/**
 * Generic report response data interface
 * All specific report responses should extend this
 */
export interface ReportResponseData {
  [key: string]: any;
}

/**
 * Response data for Billpay Search Report
 */
export interface BillpaySearchReportData extends ReportResponseData {
  billpayItems: Array<{
    id: string;
    memberId: string;
    type: string;
    status: string;
    amount: number;
    createdDate: string;
  }>;
  totalCount: number;
}

/**
 * Response data for Error Recap Report
 */
export interface ErrorRecapReportData extends ReportResponseData {
  jsonResponse: Array<{
    failedDate: string;
    memberId: string;
    paymentId: string;
    amount: number;
    payeeId: string;
    payeeName: string;
    userPayeeListId: string;
    usersAccountAtPayee: string;
    nameOnAccount: string;
    status: string;
    hostCode: string;
    error: string;
  }>;
}

/**
 * Response data for Active User Count Report
 */
export interface ActiveUserCountReportData extends ReportResponseData {
  dailyCounts: Array<{
    date: string;
    activeUsers: number;
    newUsers: number;
  }>;
  totalActiveUsers: number;
  totalNewUsers: number;
}

/**
 * Response data for Failed On-Us Report
 */
export interface FailedOnUsReportData extends ReportResponseData {
  failedItems: Array<{
    id: string;
    memberId: string;
    amount: number;
    failedDate: string;
    reason: string;
  }>;
  totalCount: number;
}

/**
 * Response data for Global Holidays Report
 */
export interface GlobalHolidaysReportData extends ReportResponseData {
  holidays: Array<{
    date: string;
    name: string;
    description: string;
    isBusinessDay: boolean;
  }>;
}

/**
 * Response data for On-Us Postings Report
 */
export interface OnUsPostingsReportData extends ReportResponseData {
  postings: Array<{
    id: string;
    memberId: string;
    amount: number;
    postingDate: string;
    status: string;
  }>;
  totalCount: number;
}

/**
 * Response data for Large Payment Report
 */
export interface LargePaymentReportData extends ReportResponseData {
  payments: Array<{
    paymentId: string;
    memberId: string;
    amount: number;
    scheduledDate: string;
    payeeName: string;
  }>;
  totalCount: number;
}

/**
 * Response data for Monthly Users Report
 */
export interface MonthlyUsersReportData extends ReportResponseData {
  monthlyCounts: Array<{
    month: string;
    activeUsers: number;
    newUsers: number;
  }>;
  totalActiveUsers: number;
  totalNewUsers: number;
}

/**
 * Payment Activity Report Data
 */
export interface PaymentActivityReportData {
  memberId: string;
  paymentId: string;
  payeeId: string;
  payeeName: string;
  dateProcessed: string;
  dueDate: string;
  status: string;
  paymentMethod: string;
  amount: number;
}

/**
 * Payment Activity Report Response
 */
export interface PaymentActivityReportResponse {
  jsonResponse: PaymentActivityReportData[];
}

/**
 * Response data for Pending Payments Report
 */
export interface PendingPaymentsReportData extends ReportResponseData {
  payments: Array<{
    paymentId: string;
    memberId: string;
    amount: number;
    scheduledDate: string;
    payeeName: string;
    status: string;
  }>;
  totalCount: number;
}

/**
 * Response data for Processing Confirmation Report
 */
export interface ProcessingConfirmationReportData extends ReportResponseData {
  confirmations: Array<{
    id: string;
    processDate: string;
    itemCount: number;
    totalAmount: number;
    status: string;
  }>;
  totalCount: number;
}

/**
 * Response data for Recurring Payment Change History Report
 */
export interface RecurringPaymentChangeHistoryReportData extends ReportResponseData {
  changes: Array<{
    changeId: string;
    recurringPaymentId: string;
    memberId: string;
    changeDate: string;
    changeType: string;
    oldValue: string;
    newValue: string;
    changedBy: string;
  }>;
  totalCount: number;
}

/**
 * Response data for Scheduled Payment Change History Report
 */
export interface ScheduledPaymentChangeHistoryReportData extends ReportResponseData {
  changes: Array<{
    changeId: string;
    paymentId: string;
    memberId: string;
    changeDate: string;
    changeType: string;
    oldValue: string;
    newValue: string;
    changedBy: string;
  }>;
  totalCount: number;
}

/**
 * Response data for User Payee Change History Report
 */
export interface UserPayeeChangeHistoryReportData extends ReportResponseData {
  changes: Array<{
    changeId: string;
    payeeId: string;
    memberId: string;
    changeDate: string;
    changeType: string;
    oldValue: string;
    newValue: string;
    changedBy: string;
  }>;
  totalCount: number;
}

// ===== Report Helper Methods =====

/**
 * Get billpay search results
 * @param params Parameters for the billpay search report
 * @returns Billpay search report data
 */
export async function getBillpaySearch(params: BillpaySearchReportParams): Promise<BillpaySearchReportData> {
  const reportParams: Record<string, string | number | Date> = {
    SearchType: params.searchType,
    Id: params.id
  };
  
  if (params.days !== undefined) reportParams.Days = params.days;
  if (params.reportType) reportParams.ReportType = params.reportType;
  
  const response = await reportService.runReportWithParams('rptBillpaySearchJSON', reportParams);
  
  return JSON.parse(response.jsonResponse);
}

/**
 * Get error recap
 * @param params Parameters for the error recap report
 * @returns Error recap report data
 */
export async function getErrorRecap(params: ErrorRecapReportParams): Promise<ErrorRecapReportData['jsonResponse']> {
  // Only include the required parameters: SearchType and SearchValue
  const reportParams: Record<string, string> = {
    SearchType: params.searchType,
    SearchValue: params.searchValue
  };
  
  try {
    const response = await reportService.runReportWithParams('rptErrorRecapJSON', reportParams);
    
    // The response might be an object with jsonResponse property or a string that needs parsing
    let result: any;
    
    if (typeof response.jsonResponse === 'string') {
      try {
        // Try to parse if it's a string
        result = JSON.parse(response.jsonResponse);
      } catch (error) {
        console.error('Error parsing error recap report response:', error);
        return [];
      }
    } else {
      // If it's already an object, use it directly
      result = response.jsonResponse;
    }
    
    // Handle different response formats
    if (Array.isArray(result)) {
      return result;
    } else if (result && Array.isArray(result.jsonResponse)) {
      return result.jsonResponse;
    } else {
      // Return empty array if no valid data format is found
      return [];
    }
  } catch (error) {
    console.error('Error fetching error recap report:', error);
    return [];
  }
}

/**
 * Get active user count within a date range
 * @param params Parameters for the active user count report
 * @returns Active user count report data
 */
export async function getActiveUserCount(params: ActiveUserCountReportParams): Promise<ActiveUserCountReportData> {
  const response = await reportService.runReportWithParams('rptGetActiveUserCountJSON', {
    StartDate: params.startDate,
    EndDate: params.endDate
  });
  
  return JSON.parse(response.jsonResponse);
}

/**
 * Get failed on-us transactions
 * @param params Parameters for the failed on-us report
 * @returns Failed on-us report data
 */
export async function getFailedOnUs(params: FailedOnUsReportParams): Promise<FailedOnUsReportData> {
  const response = await reportService.runReportWithParams('rptGetFailedOnUsJSON', {
    StartDate: params.startDate,
    EndDate: params.endDate
  });
  
  return JSON.parse(response.jsonResponse);
}

/**
 * Get global holidays
 * @returns Global holidays report data
 */
export async function getGlobalHolidays(): Promise<GlobalHolidaysReportData> {
  // The stored procedure has a dummy argument but doesn't actually use it
  const response = await reportService.runReportWithParams('rptGetGlobalHolidaysJSON', {
    DummyArgument: ''
  });
  
  return JSON.parse(response.jsonResponse);
}

/**
 * Get on-us postings
 * @param params Parameters for the on-us postings report
 * @returns On-us postings report data
 */
export async function getOnUsPostings(params: OnUsPostingsReportParams): Promise<OnUsPostingsReportData> {
  const response = await reportService.runReportWithParams('rptGetOnUsPostingsJSON', {
    StartDate: params.startDate,
    EndDate: params.endDate
  });
  
  return JSON.parse(response.jsonResponse);
}

/**
 * Get statuses with notifications
 * @returns Statuses with notifications report data
 */
export async function getStatusesWithNotifications(): Promise<ReportResponseData> {
  const response = await reportService.runReport('rptGetStatusesWithNotificationsJSON', '');
  
  return JSON.parse(response.jsonResponse);
}

/**
 * Get large payments
 * @param params Parameters for the large payment report
 * @returns Large payment report data
 */
export async function getLargePayment(params: LargePaymentReportParams): Promise<LargePaymentReportData> {
  const response = await reportService.runReportWithParams('rptLargePaymentJSON', {
    RunDate: params.runDate
  });
  
  return JSON.parse(response.jsonResponse);
}

/**
 * Get monthly users
 * @param params Parameters for the monthly users report
 * @returns Monthly users report data
 */
export async function getMonthlyUsers(params: MonthlyUsersReportParams): Promise<MonthlyUsersReportData> {
  const response = await reportService.runReportWithParams('rptMonthlyUsersJSON', {
    StartDate: params.startDate,
    EndDate: params.endDate
  });
  
  return JSON.parse(response.jsonResponse);
}

/**
 * Get payment activity
 * @param params Parameters for the payment activity report
 * @returns Payment activity report data
 */
export async function getPaymentActivity(params: PaymentActivityReportParams): Promise<PaymentActivityReportData[]> {
  // All parameters must be included in the request, even if they're empty
  const reportParams: Record<string, string | number | Date> = {
    SearchType: params.searchType,
    StartDate: params.startDate || '',
    EndDate: params.endDate || '',
    MemberId: params.memberId || '',
    PayeeName: params.payeeName || ''
  };
  
  console.log('getPaymentActivity reportParams:', reportParams);
  
  try {
    const response = await reportService.runReportWithParams('rptPaymentActivityJSON', reportParams);
    
    // The response might be an object with jsonResponse property or a string that needs parsing
    let result: any;
    
    if (typeof response.jsonResponse === 'string') {
      try {
        // Try to parse if it's a string
        result = JSON.parse(response.jsonResponse);
      } catch (error) {
        console.error('Error parsing payment activity report response:', error);
        return [];
      }
    } else {
      // If it's already an object, use it directly
      result = response.jsonResponse;
    }
    
    // Handle different response formats
    if (Array.isArray(result)) {
      return result;
    } else if (result && Array.isArray(result.jsonResponse)) {
      return result.jsonResponse;
    } else {
      // Return empty array if no valid data format is found
      return [];
    }
  } catch (error) {
    console.error('Error fetching payment activity report:', error);
    return [];
  }
}

/**
 * Get pending payments
 * @param params Parameters for the pending payments report
 * @returns Pending payments report data
 */
export async function getPendingPayments(params: PendingPaymentsReportParams): Promise<PendingPaymentsReportData> {
  const response = await reportService.runReportWithParams('rptPendingPaymentsJSON', {
    Date: params.date
  });
  
  return JSON.parse(response.jsonResponse);
}

/**
 * Get processing confirmation
 * @param params Parameters for the processing confirmation report
 * @returns Processing confirmation report data
 */
export async function getProcessingConfirmation(params: ProcessingConfirmationReportParams): Promise<ProcessingConfirmationReportData> {
  const response = await reportService.runReportWithParams('rptProcessingConfirmationJSON', {
    StartDate: params.startDate,
    EndDate: params.endDate
  });
  
  return JSON.parse(response.jsonResponse);
}

/**
 * Get recurring payment change history
 * @param params Parameters for the recurring payment change history report
 * @returns Recurring payment change history report data
 */
export async function getRecurringPaymentChangeHistory(params: RecurringPaymentChangeHistoryReportParams): Promise<RecurringPaymentChangeHistoryReportData> {
  const response = await reportService.runReportWithParams('rptRecurringPaymentChangeHistoryJSON', {
    StartDate: params.startDate,
    EndDate: params.endDate,
    SearchType: params.searchType,
    SearchValue: params.searchValue
  });
  
  return JSON.parse(response.jsonResponse);
}

/**
 * Get scheduled payment change history
 * @param params Parameters for the scheduled payment change history report
 * @returns Scheduled payment change history report data
 */
export async function getScheduledPaymentChangeHistory(params: ScheduledPaymentChangeHistoryReportParams): Promise<ScheduledPaymentChangeHistoryReportData> {
  const response = await reportService.runReportWithParams('rptScheduledPaymentChangeHistoryJSON', {
    StartDate: params.startDate,
    EndDate: params.endDate,
    SearchType: params.searchType,
    SearchValue: params.searchValue
  });
  
  return JSON.parse(response.jsonResponse);
}

/**
 * Get user payee change history
 * @param params Parameters for the user payee change history report
 * @returns User payee change history report data
 */
export async function getUserPayeeChangeHistory(params: UserPayeeChangeHistoryReportParams): Promise<UserPayeeChangeHistoryReportData> {
  const response = await reportService.runReportWithParams('rptUserPayeeChangeHistoryJSON', {
    StartDate: params.startDate,
    EndDate: params.endDate,
    SearchType: params.searchType,
    SearchValue: params.searchValue
  });
  
  return JSON.parse(response.jsonResponse);
}

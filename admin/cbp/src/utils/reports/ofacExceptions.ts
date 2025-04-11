import { reportService } from '../../services/factory/ServiceFactory';
import logger from '../logger';

/**
 * Search Type enum for OFAC Exceptions
 * Maps UI-friendly names to API expected string values
 */
export enum OFACExceptionsSearchType {
  SingleDate = 'SingleDate',
  MonthYear = 'MonthYear',
  DateRange = 'DateRange',
  All = 'All'
}

/**
 * OFAC Exceptions search type display names
 */
export const OFAC_EXCEPTIONS_SEARCH_TYPES = {
  [OFACExceptionsSearchType.SingleDate]: 'Single Date',
  [OFACExceptionsSearchType.MonthYear]: 'Month/Year',
  [OFACExceptionsSearchType.DateRange]: 'Date Range',
  [OFACExceptionsSearchType.All]: 'All'
};

/**
 * Sort Column enum for OFAC Exceptions
 */
export enum OFACExceptionsSortColumn {
  SponsorTransactionId = 'SponsorTransactionId',
  SponsorId = 'SponsorId',
  SponsorName = 'SponsorName',
  CustomerId = 'CustomerId',
  PrimaryCustomerFirstName = 'PrimaryCustomerFirstName',
  PrimaryCustomerLastName = 'PrimaryCustomerLastName',
  BusinessName = 'BusinessName',
  PayeeName = 'PayeeName',
  ConfirmationNumber = 'ConfirmationNumber',
  TransactionAmount = 'TransactionAmount',
  ServiceRequestNumber = 'ServiceRequestNumber',
  ServiceRequestDate = 'ServiceRequestDate',
  CheckNumber = 'CheckNumber',
  Created = 'Created'
}

/**
 * OFAC Exceptions Item interface matching C# API
 */
export interface OFACExceptionsItem {
  id: number;
  sponsorTransactionId: string | null;
  sponsorId: string | null;
  sponsorName: string | null;
  customerId: string | null;
  primaryCustomerFirstName: string | null;
  primaryCustomerLastName: string | null;
  businessName: string | null;
  customerAddress1: string | null;
  customerAddress2: string | null;
  customerCity: string | null;
  customerState: string | null;
  customerZip: string | null;
  customerCountry: string | null;
  internalPayeeId: string | null;
  payeeName: string | null;
  payeeAddress1: string | null;
  payeeAddress2: string | null;
  payeeCity: string | null;
  payeeState: string | null;
  payeeZip: string | null;
  payeeCountry: string | null;
  customerPayeeId: string | null;
  customerPayeeAccountNumber: string | null;
  confirmationNumber: string | null;
  transactionAmount: number;
  memoLineInfo: string | null;
  serviceRequestNumber: string | null;
  serviceRequestDate: string | null;
  serviceRequestType: string | null;
  problemCauseType: string | null;
  effectiveDate: string | null;
  deliverByDate: string | null;
  checkNumber: string | null;
  created: string | null;
}

/**
 * Paged response interface for OFAC Exceptions
 */
export interface OFACExceptionsItemPagedResponse {
  items: OFACExceptionsItem[] | null;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * OFAC Exceptions request parameters matching API
 */
export interface OFACExceptionsRequest {
  searchType: OFACExceptionsSearchType;
  selectedSingleDate?: string;
  monthSelected?: number;
  yearSelected?: number;
  selectedStartDate?: string;
  selectedEndDate?: string;
  sortColumn?: string;
  sortDirection?: 'ASC' | 'DESC';
  pageNumber?: number;
  pageSize?: number;
}

/**
 * Parameters for OFAC Exceptions Report
 */
export interface OFACExceptionsParams {
  searchType: OFACExceptionsSearchType;
  selectedSingleDate?: string;
  monthSelected?: number;
  yearSelected?: number;
  selectedStartDate?: string;
  selectedEndDate?: string;
  pageNumber?: number;
  pageSize?: number;
  sortColumn?: OFACExceptionsSortColumn;
  sortDirection?: 'ASC' | 'DESC';
}

/**
 * Get OFAC exceptions based on the provided parameters
 * @param params Parameters for the OFAC exceptions report
 * @returns Paginated OFAC exceptions report data
 */
export async function getOFACExceptions(
  params: OFACExceptionsParams
): Promise<OFACExceptionsItemPagedResponse> {
  try {
    // Ensure required parameters are provided
    if (params.searchType === undefined) {
      throw new Error('SearchType is a required parameter');
    }

    // Map the params to the format expected by the API
    const requestParams: OFACExceptionsRequest = {
      searchType: params.searchType,
      selectedSingleDate: params.selectedSingleDate,
      monthSelected: params.monthSelected,
      yearSelected: params.yearSelected,
      selectedStartDate: params.selectedStartDate,
      selectedEndDate: params.selectedEndDate,
      pageNumber: params.pageNumber || 1,
      pageSize: params.pageSize || 20,
      sortColumn: params.sortColumn,
      sortDirection: params.sortDirection
    };
    
    // Log the parameters being sent for debugging
    logger.log('OFAC Exceptions request parameters:', requestParams);
    
    // Call the dedicated endpoint through the report service
    return await reportService.getOFACExceptionsReport(requestParams);
  } catch (error) {
    logger.error('Error fetching OFAC exceptions report:', error);
    throw error; // Re-throw to allow component to handle the error
  }
}

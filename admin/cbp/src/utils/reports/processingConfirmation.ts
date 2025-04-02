import { reportService } from '../../services/factory/ServiceFactory';

/**
 * Enum for Processing Confirmation search types
 * These values must match the API's ProcessingConfirmationSearchType enum
 */
export enum ProcessingConfirmationSearchType {
  DateRange = 'DateRange'
}

/**
 * Enum for Processing Confirmation sort columns
 * These values must match the API's ProcessingConfirmationSortColumn enum
 */
export enum ProcessingConfirmationSortColumn {
  Start = 'Start',
  End = 'End',
  Message = 'Message'
}

/**
 * Array of sort column options for dropdown
 */
export const PROCESSING_CONFIRMATION_SORT_COLUMNS = [
  { value: ProcessingConfirmationSortColumn.Start, label: 'Start Time' },
  { value: ProcessingConfirmationSortColumn.End, label: 'End Time' },
  { value: ProcessingConfirmationSortColumn.Message, label: 'Message' }
];

/**
 * Interface for Processing Confirmation request parameters
 */
export interface ProcessingConfirmationParams {
  searchType: ProcessingConfirmationSearchType;
  startDate: string;
  endDate: string;
  sortColumn?: ProcessingConfirmationSortColumn;
  sortDirection?: 'ASC' | 'DESC';
  pageNumber?: number;
  pageSize?: number;
}

/**
 * Interface for Processing Confirmation item
 */
export interface ProcessingConfirmationItem {
  start?: string;
  end?: string;
  message?: string;
}

/**
 * Interface for Processing Confirmation response
 */
export interface ProcessingConfirmationResponse {
  items: ProcessingConfirmationItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Get processing confirmation data from the API
 * @param params Processing confirmation search parameters
 * @returns Promise with processing confirmation data
 */
export const getProcessingConfirmation = async (
  params: ProcessingConfirmationParams
): Promise<ProcessingConfirmationResponse> => {
  return reportService.getProcessingConfirmation(params);
};

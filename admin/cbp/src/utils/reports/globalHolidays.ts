/**
 * Global Holidays Report utility file
 * Contains types, enums, and API service functions for the Global Holidays report
 */
import { reportService } from '../../services/factory/ServiceFactory';

/**
 * Search Type enum for Global Holidays
 */
export enum GlobalHolidaysSearchType {
  All = 'All'
}

/**
 * Global Holidays Search Type display names
 */
export const GLOBAL_HOLIDAYS_SEARCH_TYPES = {
  [GlobalHolidaysSearchType.All]: 'All'
};

/**
 * Sort Column enum for Global Holidays
 */
export enum GlobalHolidaysSortColumn {
  Date = 'Date',
  Id = 'Id',
  Description = 'Description',
  HolidayType = 'HolidayType'
}

/**
 * Global Holidays Sort Column display names
 */
export const GLOBAL_HOLIDAYS_SORT_COLUMNS = {
  [GlobalHolidaysSortColumn.Date]: 'Date',
  [GlobalHolidaysSortColumn.Id]: 'ID',
  [GlobalHolidaysSortColumn.Description]: 'Description',
  [GlobalHolidaysSortColumn.HolidayType]: 'Holiday Type'
};

/**
 * Global Holidays Item interface matching C# API
 * Note: Property names use camelCase to match API response format
 */
export interface GlobalHolidaysItem {
  id: string;
  date: string;
  description: string;
  holidayType: string;
}

/**
 * Global Holidays Response interface
 */
export interface GlobalHolidaysResponse {
  items: GlobalHolidaysItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Global Holidays Params interface for API request
 */
export interface GlobalHolidaysParams {
  searchType: GlobalHolidaysSearchType;
  pageNumber: number;
  pageSize: number;
  sortColumn?: GlobalHolidaysSortColumn;
  sortDirection?: 'ASC' | 'DESC';
}

/**
 * Fetches Global Holidays data from the API
 * @param params Request parameters
 * @returns Promise with the response data
 */
export const getGlobalHolidays = async (
  params: GlobalHolidaysParams
): Promise<GlobalHolidaysResponse> => {
  const response = await reportService.getGlobalHolidays(params);
  return response;
};

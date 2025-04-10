import { reportService } from '../../services/factory/ServiceFactory';

/**
 * Search Type enum for Settlement Summary
 * Maps UI-friendly names to API expected string values
 */
export enum SettlementSummarySearchType {
  SingleDate = 'SingleDate',
  MonthYear = 'MonthYear',
  Year = 'Year',
  DateRange = 'DateRange'
}

/**
 * Settlement Summary search type display names
 */
export const SETTLEMENT_SUMMARY_SEARCH_TYPES = {
  [SettlementSummarySearchType.SingleDate]: 'Single Date',
  [SettlementSummarySearchType.MonthYear]: 'Month/Year',
  [SettlementSummarySearchType.Year]: 'Year',
  [SettlementSummarySearchType.DateRange]: 'Date Range'
};

/**
 * Settlement Summary Item interface matching C# API
 * Note: Property names match the exact casing from the API
 */
export interface SettlementSummaryItem {
  categoryName: string | null;
  description: string | null;
  count: number;
  amount: number;
}

/**
 * Settlement Summary request parameters matching API
 */
export interface SettlementSummaryRequest {
  searchType: SettlementSummarySearchType;
  selectedSingleDate?: string;
  monthSelected?: number;
  yearSelected?: number;
  selectedStartDate?: string;
  selectedEndDate?: string;
}

/**
 * Parameters for Settlement Summary Report
 */
export interface SettlementSummaryParams {
  searchType: SettlementSummarySearchType;
  selectedSingleDate?: string;
  monthSelected?: number;
  yearSelected?: number;
  selectedStartDate?: string;
  selectedEndDate?: string;
}

/**
 * Get settlement summary data based on the provided parameters
 * @param params Parameters for the settlement summary report
 * @returns Array of settlement summary items
 */
export const getSettlementSummary = async (
  params: SettlementSummaryParams
): Promise<SettlementSummaryItem[]> => {
  return await reportService.getSettlementSummaryReport(params);
};

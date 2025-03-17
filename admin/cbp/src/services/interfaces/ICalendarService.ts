import { Holiday, HolidayInput, HolidayValidation } from '../../types/calendar.types';

/**
 * Interface for the Calendar Service
 * Defines methods for managing holidays
 */
export interface ICalendarService {
  /**
   * Get all holidays
   * @returns Promise resolving to an array of holidays
   */
  getHolidays(): Promise<Holiday[]>;

  /**
   * Get a specific holiday by ID
   * @param id The holiday ID
   * @returns Promise resolving to the holiday
   */
  getHolidayById(id: number): Promise<Holiday>;

  /**
   * Create a new holiday
   * @param holiday The holiday data
   * @returns Promise resolving to the created holiday
   */
  createHoliday(holiday: HolidayInput): Promise<Holiday>;

  /**
   * Update an existing holiday
   * @param id The holiday ID
   * @param holiday The holiday data to update
   * @returns Promise resolving to the updated holiday
   */
  updateHoliday(id: number, holiday: Partial<HolidayInput>): Promise<Holiday>;

  /**
   * Delete a holiday
   * @param id The holiday ID
   * @returns Promise resolving when the holiday is deleted
   */
  deleteHoliday(id: number): Promise<void>;

  /**
   * Validate holiday data
   * @param holiday The holiday data to validate
   * @returns Promise resolving to validation results
   */
  validateHoliday(holiday: HolidayInput): Promise<HolidayValidation>;

  /**
   * Check if a date is a holiday
   * @param date The date to check in ISO format (YYYY-MM-DD)
   * @returns Promise resolving to true if the date is a holiday
   */
  isHoliday(date: string): Promise<boolean>;

  /**
   * Get the next business day after a given date
   * @param date The starting date in ISO format (YYYY-MM-DD)
   * @returns Promise resolving to the next business day in ISO format
   */
  getNextBusinessDay(date: string): Promise<string>;

  /**
   * Get holidays between two dates
   * @param startDate The start date in ISO format (YYYY-MM-DD)
   * @param endDate The end date in ISO format (YYYY-MM-DD)
   * @returns Promise resolving to an array of holidays
   */
  getHolidaysBetweenDates(startDate: string, endDate: string): Promise<Holiday[]>;

  /**
   * Get the number of business days between two dates
   * @param startDate The start date in ISO format (YYYY-MM-DD)
   * @param endDate The end date in ISO format (YYYY-MM-DD)
   * @returns Promise resolving to the number of business days
   */
  getBusinessDayCount(startDate: string, endDate: string): Promise<number>;
}

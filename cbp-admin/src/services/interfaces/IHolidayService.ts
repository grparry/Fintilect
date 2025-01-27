import { Holiday, HolidayInput, HolidayValidation } from '@/../types/bill-pay.types';

export interface IHolidayService {
  /**
   * Get all holidays
   */
  getHolidays(): Promise<Holiday[]>;

  /**
   * Get a holiday by ID
   * @param id Holiday ID
   */
  getHolidayById(id: number): Promise<Holiday>;

  /**
   * Create a new holiday
   * @param holiday Holiday data
   */
  createHoliday(holiday: HolidayInput): Promise<Holiday>;

  /**
   * Update an existing holiday
   * @param id Holiday ID
   * @param holiday Holiday data
   */
  updateHoliday(id: number, holiday: Partial<HolidayInput>): Promise<Holiday>;

  /**
   * Delete a holiday
   * @param id Holiday ID
   */
  deleteHoliday(id: number): Promise<void>;

  /**
   * Validate holiday data
   * @param holiday Holiday data to validate
   */
  validateHoliday(holiday: HolidayInput): Promise<HolidayValidation>;

  /**
   * Check if a given date is a holiday
   * @param date Date to check
   */
  isHoliday(date: string): Promise<boolean>;

  /**
   * Get the next business day after a given date, skipping holidays
   * @param date Starting date
   */
  getNextBusinessDay(date: string): Promise<string>;

  /**
   * Get all holidays between two dates
   * @param startDate Start date
   * @param endDate End date
   */
  getHolidaysBetweenDates(startDate: string, endDate: string): Promise<Holiday[]>;

  /**
   * Calculate the number of business days between two dates, excluding holidays
   * @param startDate Start date
   * @param endDate End date
   */
  getBusinessDayCount(startDate: string, endDate: string): Promise<number>;
}

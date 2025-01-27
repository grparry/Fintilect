import { Holiday, HolidayInput, HolidayValidation } from '../types/bill-pay.types';

export interface IHolidayService {
  /**


  /**
   * Get all holidays
   */

  /**
   * Get a holiday by ID
   * @param id Holiday ID
   */

  /**
   * Create a new holiday
   * @param holiday Holiday data
   */

  /**
   * Update an existing holiday
   * @param id Holiday ID
   * @param holiday Holiday data
   */

  /**
   * Delete a holiday
   * @param id Holiday ID
   */

  /**
   * Validate holiday data
   * @param holiday Holiday data to validate
   */

  /**
   * Check if a given date is a holiday
   * @param date Date to check
   */

  /**
   * Get the next business day after a given date, skipping holidays
   * @param date Starting date
   */

  /**
   * Get all holidays between two dates
   * @param startDate Start date
   * @param endDate End date
   */

  /**
   * Calculate the number of business days between two dates, excluding holidays
   * @param startDate Start date
   * @param endDate End date
   */

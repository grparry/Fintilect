import { HolidayType, HolidayStatus, Holiday, HolidayInput, HolidayValidation, HolidayCreateRequest, HolidayUpdateRequest, HolidayResponse, HolidayListResponse } from '../../../types/calendar.types';
import { ICalendarService } from '../../interfaces/ICalendarService';
import { BaseService } from './BaseService';
import { getSponsorId } from '../../../config/host.config';

/**
 * Implementation of the Calendar Service
 * Uses the Calendar API to manage holidays
 */
export class CalendarService extends BaseService implements ICalendarService {
  constructor(basePath: string = '/api/v1/Calendar') {
    super(basePath);
  }

  /**
   * Get all holidays
   * @returns Promise resolving to an array of holidays
   */
  async getHolidays(): Promise<Holiday[]> {
    // Get the sponsor ID from the host configuration
    const sponsorId = getSponsorId();
    const response = await this.get<HolidayListResponse>(`/holiday/all/${sponsorId}`);
    return response.holidays.map(holiday => this.mapToHoliday(holiday)) || [];
  }

  /**
   * Get a specific holiday by ID
   * @param id The holiday ID
   * @returns Promise resolving to the holiday
   */
  async getHolidayById(id: number): Promise<Holiday> {
    const response = await this.get<HolidayResponse>(`/holiday/${id}`);
    return this.mapToHoliday(response);
  }

  /**
   * Create a new holiday
   * @param holiday The holiday data
   * @returns Promise resolving to the created holiday
   */
  async createHoliday(holiday: HolidayInput): Promise<Holiday> {
    // Map the HolidayInput to the format expected by the Calendar API
    const createRequest: HolidayCreateRequest = {
      sponsorID: getSponsorId().toString(), // Convert number to string
      date: new Date(holiday.date).toISOString(),
      description: holiday.name // Use name as description
    };
    
    const response = await this.post<HolidayResponse>('/holiday', createRequest);
    return this.mapToHoliday(response);
  }

  /**
   * Update an existing holiday
   * @param id The holiday ID
   * @param holiday The updated holiday data
   * @returns Promise resolving to the updated holiday
   */
  async updateHoliday(id: number, holiday: Partial<HolidayInput>): Promise<Holiday> {
    // Map the HolidayInput to the format expected by the Calendar API
    const updateRequest: HolidayUpdateRequest = {
      id,
      sponsorID: getSponsorId().toString(), // Convert number to string
      date: holiday.date ? new Date(holiday.date).toISOString() : '',
      description: holiday.name || '' // Use name as description
    };
    
    const response = await this.put<HolidayResponse>(`/holiday/${id}`, updateRequest);
    return this.mapToHoliday(response);
  }

  /**
   * Delete a holiday
   * @param id The holiday ID
   * @returns Promise resolving when the holiday is deleted
   */
  async deleteHoliday(id: number): Promise<void> {
    await this.delete(`/holiday/${id}`);
  }

  /**
   * Validate holiday data
   * @param holiday The holiday data to validate
   * @returns Promise resolving to validation results
   */
  async validateHoliday(holiday: HolidayInput): Promise<HolidayValidation> {
    // Implement client-side validation since the Calendar API doesn't have a validation endpoint
    const errors: Record<string, string> = {};
    
    if (!holiday.name) {
      errors.name = 'Name is required';
    }
    
    if (!holiday.date) {
      errors.date = 'Date is required';
    }
    
    if (!holiday.type) {
      errors.type = 'Type is required';
    }
    
    if (!holiday.status) {
      errors.status = 'Status is required';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Check if a date is a holiday
   * @param date The date to check in ISO format (YYYY-MM-DD)
   * @returns Promise resolving to true if the date is a holiday
   */
  async isHoliday(date: string): Promise<boolean> {
    try {
      const holidays = await this.getHolidays();
      return holidays.some(holiday => 
        holiday.date.split('T')[0] === date.split('T')[0]
      );
    } catch (error) {
      console.error('Error checking if date is a holiday:', error);
      return false;
    }
  }

  /**
   * Get the next business day after a given date
   * @param date The starting date in ISO format (YYYY-MM-DD)
   * @returns Promise resolving to the next business day in ISO format
   */
  async getNextBusinessDay(date: string): Promise<string> {
    // Implement client-side calculation since the Calendar API doesn't have this endpoint
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    
    const isWeekend = (date: Date) => {
      const day = date.getDay();
      return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
    };
    
    let nextDateStr = nextDay.toISOString().split('T')[0];
    
    while (isWeekend(nextDay) || await this.isHoliday(nextDateStr)) {
      nextDay.setDate(nextDay.getDate() + 1);
      nextDateStr = nextDay.toISOString().split('T')[0];
    }
    
    return nextDateStr;
  }

  /**
   * Get holidays between two dates
   * @param startDate The start date in ISO format (YYYY-MM-DD)
   * @param endDate The end date in ISO format (YYYY-MM-DD)
   * @returns Promise resolving to an array of holidays
   */
  async getHolidaysBetweenDates(startDate: string, endDate: string): Promise<Holiday[]> {
    const holidays = await this.getHolidays();
    return holidays.filter(
      holiday => {
        const holidayDate = holiday.date.split('T')[0];
        return holidayDate >= startDate && holidayDate <= endDate;
      }
    );
  }

  /**
   * Get the number of business days between two dates
   * @param startDate The start date in ISO format (YYYY-MM-DD)
   * @param endDate The end date in ISO format (YYYY-MM-DD)
   * @returns Promise resolving to the number of business days
   */
  async getBusinessDayCount(startDate: string, endDate: string): Promise<number> {
    // Implement client-side calculation since the Calendar API doesn't have this endpoint
    let count = 0;
    let currentDate = new Date(startDate);
    const end = new Date(endDate);
    
    const isWeekend = (date: Date) => {
      const day = date.getDay();
      return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
    };
    
    while (currentDate <= end) {
      const dateStr = currentDate.toISOString().split('T')[0];
      if (!isWeekend(currentDate) && !(await this.isHoliday(dateStr))) {
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return count;
  }

  /**
   * Map a HolidayResponse from the Calendar API to a Holiday model
   * @param response The HolidayResponse from the Calendar API
   * @returns A Holiday model
   */
  private mapToHoliday(response: HolidayResponse): Holiday {
    return {
      id: response.id,
      name: response.description || '',
      date: response.date,
      // Map to the appropriate HolidayType enum value
      type: HolidayType.FEDERAL, // Default to FEDERAL since the API doesn't provide type
      // Map to the appropriate HolidayStatus enum value
      status: HolidayStatus.ACTIVE, // Default to ACTIVE since the API doesn't provide status
      description: response.description || '',
      sponsorID: response.sponsorID
    };
  }
}

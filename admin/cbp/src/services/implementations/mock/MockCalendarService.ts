import { Holiday, HolidayInput, HolidayType, HolidayStatus, HolidayValidation } from '../../../types/calendar.types';
import { ICalendarService } from '../../interfaces/ICalendarService';
import { mockHolidays } from './data/calendar/holidays';

/**
 * Mock implementation of the Calendar Service
 * Used for testing purposes
 */
export class MockCalendarService implements ICalendarService {
  private holidays: Holiday[] = [...mockHolidays];

  private nextId = 5; // Start after the last ID in mockHolidays

  constructor(basePath: string = '/api/v1/Calendar/holiday') {
    // Mock service doesn't need the basePath, but we include it for consistency
  }

  /**
   * Get all holidays
   * @returns Promise resolving to an array of holidays
   */
  async getHolidays(): Promise<Holiday[]> {
    return Promise.resolve([...this.holidays]);
  }

  /**
   * Get a specific holiday by ID
   * @param id The holiday ID
   * @returns Promise resolving to the holiday
   */
  async getHolidayById(id: number): Promise<Holiday> {
    const holiday = this.holidays.find(h => h.id === id);
    if (!holiday) {
      return Promise.reject(new Error(`Holiday with ID ${id} not found`));
    }
    return Promise.resolve({ ...holiday });
  }

  /**
   * Create a new holiday
   * @param holiday The holiday data
   * @returns Promise resolving to the created holiday
   */
  async createHoliday(holiday: HolidayInput): Promise<Holiday> {
    const newHoliday: Holiday = {
      id: this.nextId++,
      name: holiday.name,
      date: holiday.date,
      type: holiday.type,
      status: holiday.status,
      description: holiday.description || holiday.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.holidays.push(newHoliday);
    return Promise.resolve({ ...newHoliday });
  }

  /**
   * Update an existing holiday
   * @param id The holiday ID
   * @param holiday The holiday data to update
   * @returns Promise resolving to the updated holiday
   */
  async updateHoliday(id: number, holiday: Partial<HolidayInput>): Promise<Holiday> {
    const index = this.holidays.findIndex(h => h.id === id);
    if (index === -1) {
      return Promise.reject(new Error(`Holiday with ID ${id} not found`));
    }
    
    const updatedHoliday: Holiday = {
      ...this.holidays[index],
      name: holiday.name || this.holidays[index].name,
      date: holiday.date || this.holidays[index].date,
      type: holiday.type || this.holidays[index].type,
      status: holiday.status || this.holidays[index].status,
      description: holiday.description || this.holidays[index].description,
      updatedAt: new Date().toISOString()
    };
    
    this.holidays[index] = updatedHoliday;
    return Promise.resolve({ ...updatedHoliday });
  }

  /**
   * Delete a holiday
   * @param id The holiday ID
   * @returns Promise resolving when the holiday is deleted
   */
  async deleteHoliday(id: number): Promise<void> {
    const index = this.holidays.findIndex(h => h.id === id);
    if (index === -1) {
      return Promise.reject(new Error(`Holiday with ID ${id} not found`));
    }
    
    this.holidays.splice(index, 1);
    return Promise.resolve();
  }

  /**
   * Validate holiday data
   * @param holiday The holiday data to validate
   * @returns Promise resolving to validation results
   */
  async validateHoliday(holiday: HolidayInput): Promise<HolidayValidation> {
    const errors: Record<string, string> = {};
    
    if (!holiday.name) {
      errors.name = 'Name is required';
    }
    
    if (!holiday.date) {
      errors.date = 'Date is required';
    } else {
      // Check if date is valid
      const date = new Date(holiday.date);
      if (isNaN(date.getTime())) {
        errors.date = 'Invalid date format';
      }
    }
    
    if (!holiday.type) {
      errors.type = 'Type is required';
    } else if (!Object.values(HolidayType).includes(holiday.type)) {
      errors.type = 'Invalid holiday type';
    }
    
    if (!holiday.status) {
      errors.status = 'Status is required';
    } else if (!Object.values(HolidayStatus).includes(holiday.status)) {
      errors.status = 'Invalid holiday status';
    }
    
    return Promise.resolve({
      isValid: Object.keys(errors).length === 0,
      errors
    });
  }

  /**
   * Check if a date is a holiday
   * @param date The date to check in ISO format (YYYY-MM-DD)
   * @returns Promise resolving to true if the date is a holiday
   */
  async isHoliday(date: string): Promise<boolean> {
    return Promise.resolve(
      this.holidays.some(holiday => 
        holiday.date.split('T')[0] === date.split('T')[0] && 
        holiday.status === HolidayStatus.ACTIVE
      )
    );
  }

  /**
   * Get the next business day after a given date
   * @param date The starting date in ISO format (YYYY-MM-DD)
   * @returns Promise resolving to the next business day in ISO format
   */
  async getNextBusinessDay(date: string): Promise<string> {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    
    const isWeekend = (date: Date) => {
      const day = date.getDay();
      return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
    };
    
    let nextDateStr = nextDay.toISOString().split('T')[0];
    
    // Check if it's a weekend or holiday
    while (isWeekend(nextDay) || await this.isHoliday(nextDateStr)) {
      nextDay.setDate(nextDay.getDate() + 1);
      nextDateStr = nextDay.toISOString().split('T')[0];
    }
    
    return Promise.resolve(nextDateStr);
  }

  /**
   * Get holidays between two dates
   * @param startDate The start date in ISO format (YYYY-MM-DD)
   * @param endDate The end date in ISO format (YYYY-MM-DD)
   * @returns Promise resolving to an array of holidays
   */
  async getHolidaysBetweenDates(startDate: string, endDate: string): Promise<Holiday[]> {
    return Promise.resolve(
      this.holidays.filter(holiday => {
        const holidayDate = holiday.date.split('T')[0];
        return holidayDate >= startDate && holidayDate <= endDate;
      })
    );
  }

  /**
   * Get the number of business days between two dates
   * @param startDate The start date in ISO format (YYYY-MM-DD)
   * @param endDate The end date in ISO format (YYYY-MM-DD)
   * @returns Promise resolving to the number of business days
   */
  async getBusinessDayCount(startDate: string, endDate: string): Promise<number> {
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
    
    return Promise.resolve(count);
  }
}

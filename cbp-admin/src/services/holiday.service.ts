import { api, type ApiSuccessResponse } from '../utils/api';
import type { Holiday, HolidayInput } from '../types/bill-pay.types';

interface HolidayFilters {
  year?: number;
  month?: number;
  status?: 'active' | 'inactive' | 'all';
}

/**
 * Service for managing system holidays
 */
class HolidayService {
  private readonly basePath = '/system/holidays';

  /**
   * Get all holidays with optional filters
   */
  async getHolidays(filters?: HolidayFilters): Promise<{
    holidays: Holiday[];
    total: number;
  }> {
    const response = await api.get<{
      holidays: Holiday[];
      total: number;
    }>(this.basePath, { params: filters });
    if (!response.success) {
      throw new Error(response.error.message);
    }
    return response.data;
  }

  /**
   * Get a single holiday by ID
   */
  async getHoliday(id: number): Promise<Holiday> {
    const response = await api.get<Holiday>(
      `${this.basePath}/${id}`
    );
    if (!response.success) {
      throw new Error(response.error.message);
    }
    return response.data;
  }

  /**
   * Create a new holiday
   */
  async createHoliday(data: HolidayInput): Promise<Holiday> {
    const response = await api.post<Holiday>(
      this.basePath,
      data
    );
    if (!response.success) {
      throw new Error(response.error.message);
    }
    return response.data;
  }

  /**
   * Update an existing holiday
   */
  async updateHoliday(id: number, data: Partial<HolidayInput>): Promise<Holiday> {
    const response = await api.patch<Holiday>(
      `${this.basePath}/${id}`,
      data
    );
    if (!response.success) {
      throw new Error(response.error.message);
    }
    return response.data;
  }

  /**
   * Delete a holiday
   */
  async deleteHoliday(id: number): Promise<void> {
    await api.delete(`${this.basePath}/${id}`);
  }

  /**
   * Create multiple holidays at once
   */
  async bulkCreateHolidays(holidays: HolidayInput[]): Promise<Holiday[]> {
    const response = await api.post<Holiday[]>(
      `${this.basePath}/bulk`,
      { holidays }
    );
    if (!response.success) {
      throw new Error(response.error.message);
    }
    return response.data;
  }

  /**
   * Update multiple holidays at once
   */
  async bulkUpdateHolidays(
    updates: Array<{ id: number; data: Partial<HolidayInput> }>
  ): Promise<Holiday[]> {
    const response = await api.patch<Holiday[]>(
      `${this.basePath}/bulk`,
      { updates }
    );
    if (!response.success) {
      throw new Error(response.error.message);
    }
    return response.data;
  }

  /**
   * Delete multiple holidays at once
   */
  async bulkDeleteHolidays(ids: number[]): Promise<void> {
    await api.delete(`${this.basePath}/bulk`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: { ids: ids.join(',') }
    });
  }

  /**
   * Import holidays from a file
   */
  async importHolidays(file: File): Promise<Holiday[]> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<Holiday[]>(
      `${this.basePath}/import`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    if (!response.success) {
      throw new Error(response.error.message);
    }
    return response.data;
  }

  /**
   * Export holidays to a file
   */
  async exportHolidays(): Promise<Blob> {
    const response = await api.get<Blob>(`${this.basePath}/export`, {
      responseType: 'blob'
    });
    if (!response.success) {
      throw new Error(response.error.message);
    }
    return response.data;
  }
}

export const holidayService = new HolidayService();

import api from './api';
import { ApiSuccessResponse } from '../types/api.types';
import { Holiday } from '../types/bill-pay.types';

interface HolidayFilters {
  year?: number;
  month?: number;
  status?: 'active' | 'inactive' | 'all';
}

interface HolidayFormData {
  name: string;
  date: string;
  isRecurring: boolean;
  description?: string;
  status?: 'active' | 'inactive';
}

class HolidaysService {
  private readonly baseUrl = '/api/holidays';

  async getHolidays(filters?: HolidayFilters): Promise<{
    holidays: Holiday[];
    total: number;
  }> {
    const response = await api.get<ApiSuccessResponse<{
      holidays: Holiday[];
      total: number;
    }>>(this.baseUrl, { params: filters });
    return response.data.data;
  }

  async getHoliday(id: number): Promise<Holiday> {
    const response = await api.get<ApiSuccessResponse<Holiday>>(
      `${this.baseUrl}/${id}`
    );
    return response.data.data;
  }

  async createHoliday(data: HolidayFormData): Promise<Holiday> {
    const response = await api.post<ApiSuccessResponse<Holiday>>(
      this.baseUrl,
      data
    );
    return response.data.data;
  }

  async updateHoliday(id: number, data: Partial<HolidayFormData>): Promise<Holiday> {
    const response = await api.patch<ApiSuccessResponse<Holiday>>(
      `${this.baseUrl}/${id}`,
      data
    );
    return response.data.data;
  }

  async deleteHoliday(id: number): Promise<void> {
    await api.delete(`${this.baseUrl}/${id}`);
  }

  async bulkCreateHolidays(holidays: HolidayFormData[]): Promise<Holiday[]> {
    const response = await api.post<ApiSuccessResponse<Holiday[]>>(
      `${this.baseUrl}/bulk`,
      { holidays }
    );
    return response.data.data;
  }

  async bulkUpdateHolidays(
    updates: Array<{ id: number; data: Partial<HolidayFormData> }>
  ): Promise<Holiday[]> {
    const response = await api.patch<ApiSuccessResponse<Holiday[]>>(
      `${this.baseUrl}/bulk`,
      { updates }
    );
    return response.data.data;
  }

  async bulkDeleteHolidays(ids: number[]): Promise<void> {
    await api.delete(`${this.baseUrl}/bulk`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: { ids: ids.join(',') }
    });
  }

  async importHolidays(file: File): Promise<Holiday[]> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<ApiSuccessResponse<Holiday[]>>(
      `${this.baseUrl}/import`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data;
  }

  async exportHolidays(filters?: HolidayFilters): Promise<Blob> {
    const response = await api.get<Blob>(
      `${this.baseUrl}/export`,
      {
        params: filters,
        responseType: 'blob',
      }
    );
    return response.data;
  }
}

export const holidaysService = new HolidaysService();

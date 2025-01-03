import { BaseApi } from './api/base.api';
import { ApiSuccessResponse } from '../types/api.types';
import { Holiday, HolidayInput } from '../types/bill-pay.types';

class HolidayService extends BaseApi {
  private readonly basePath = '/holidays';

  async getHolidays(): Promise<Holiday[]> {
    const response = await this.get<ApiSuccessResponse<Holiday[]>>(this.basePath);
    return response.data;
  }

  async getHoliday(id: number): Promise<Holiday> {
    const response = await this.get<ApiSuccessResponse<Holiday>>(`${this.basePath}/${id}`);
    return response.data;
  }

  async createHoliday(data: HolidayInput): Promise<Holiday> {
    const response = await this.post<ApiSuccessResponse<Holiday>>(this.basePath, data);
    return response.data;
  }

  async updateHoliday(id: number, data: Partial<HolidayInput>): Promise<Holiday> {
    const response = await this.patch<ApiSuccessResponse<Holiday>>(`${this.basePath}/${id}`, data);
    return response.data;
  }

  async deleteHoliday(id: number): Promise<void> {
    await this.delete(`${this.basePath}/${id}`);
  }

  async bulkCreateHolidays(holidays: HolidayInput[]): Promise<Holiday[]> {
    const response = await this.post<ApiSuccessResponse<Holiday[]>>(`${this.basePath}/bulk`, { holidays });
    return response.data;
  }

  async bulkUpdateHolidays(
    updates: Array<{ id: number; data: Partial<HolidayInput> }>
  ): Promise<Holiday[]> {
    const response = await this.patch<ApiSuccessResponse<Holiday[]>>(`${this.basePath}/bulk`, { updates });
    return response.data;
  }

  async bulkDeleteHolidays(ids: number[]): Promise<void> {
    await this.delete(`${this.basePath}/bulk`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: { ids: ids.join(',') }
    });
  }

  async importHolidays(file: File): Promise<Holiday[]> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await this.post<ApiSuccessResponse<Holiday[]>>(`${this.basePath}/import`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }

  async exportHolidays(): Promise<Blob> {
    return this.getBlob(`${this.basePath}/export`);
  }
}

export const holidayService = new HolidayService();

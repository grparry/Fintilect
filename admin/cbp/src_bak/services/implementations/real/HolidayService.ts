import { IHolidayService } from '../../interfaces/IHolidayService';
import { BaseService } from './BaseService';
import { Holiday, HolidayInput, HolidayValidation } from '../../types/bill-pay.types';

export class HolidayService extends BaseService implements IHolidayService {
    constructor(basePath: string = '/api/v1/holidays') {
        super(basePath);
    }

    async getHolidays(): Promise<Holiday[]> {
        return this.get<Holiday[]>('');
    }

    async getHolidayById(id: number): Promise<Holiday> {
        return this.get<Holiday>(`/${id}`);
    }

    async createHoliday(holiday: HolidayInput): Promise<Holiday> {
        return this.post<Holiday>('', holiday);
    }

    async updateHoliday(id: number, holiday: Partial<HolidayInput>): Promise<Holiday> {
        return this.put<Holiday>(`/${id}`, holiday);
    }

    async deleteHoliday(id: number): Promise<void> {
        await this.delete(`/${id}`);
    }

    async validateHoliday(holiday: HolidayInput): Promise<HolidayValidation> {
        return this.post<HolidayValidation>('/validate', holiday);
    }

    async importHolidays(holidays: HolidayInput[]): Promise<Holiday[]> {
        return this.post<Holiday[]>('/import', { holidays });
    }

    async exportHolidays(): Promise<string> {
        const response = await this.get<{ url: string }>('/export');
        return response.url;
    }

    async isHoliday(date: string): Promise<boolean> {
        const response = await this.get<{ isHoliday: boolean }>(`/check?date=${date}`);
        return response.isHoliday;
    }

    async getNextBusinessDay(date: string): Promise<string> {
        const response = await this.get<{ nextBusinessDay: string }>(`/next-business-day?date=${date}`);
        return response.nextBusinessDay;
    }

    async getHolidaysBetweenDates(startDate: string, endDate: string): Promise<Holiday[]> {
        return this.get<Holiday[]>(`/between?startDate=${startDate}&endDate=${endDate}`);
    }

    async getBusinessDayCount(startDate: string, endDate: string): Promise<number> {
        const response = await this.get<{ count: number }>(`/business-days?startDate=${startDate}&endDate=${endDate}`);
        return response.count;
    }
}

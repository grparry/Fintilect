import { injectable } from 'inversify';
import { Holiday, HolidayInput, HolidayValidation } from '../../../types/bill-pay.types';
import { IHolidayService } from '../../interfaces/IHolidayService';
import { BaseService } from './BaseService';

@injectable()
export class HolidayService extends BaseService implements IHolidayService {
    constructor() {
        super('/api/v1/holidays');
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
        return this.patch<Holiday>(`/${id}`, holiday);
    }

    async deleteHoliday(id: number): Promise<void> {
        return this.delete(`/${id}`);
    }

    async validateHoliday(holiday: HolidayInput): Promise<HolidayValidation> {
        return this.post<HolidayValidation>('/validate', holiday);
    }

    async isHoliday(date: string): Promise<boolean> {
        const response = await this.get<{ isHoliday: boolean }>(`/check/${date}`);
        return response.isHoliday;
    }

    async getNextBusinessDay(date: string): Promise<string> {
        const response = await this.get<{ nextBusinessDay: string }>(`/next-business-day/${date}`);
        return response.nextBusinessDay;
    }

    async getHolidaysBetweenDates(startDate: string, endDate: string): Promise<Holiday[]> {
        return this.get<Holiday[]>(`/between/${startDate}/${endDate}`);
    }

    async getBusinessDayCount(startDate: string, endDate: string): Promise<number> {
        const response = await this.get<{ businessDays: number }>(`/business-days/${startDate}/${endDate}`);
        return response.businessDays;
    }
}

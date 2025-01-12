import { injectable } from 'inversify';
import { Holiday, HolidayInput, HolidayValidation, HolidayStatus } from '../../../types/bill-pay.types';
import { IHolidayService } from '../../interfaces/IHolidayService';
import { BaseMockService } from './BaseMockService';
import { mockHolidays } from './data/holiday/holidays';
import { addDays, isWeekend, parseISO } from 'date-fns';

@injectable()
export class MockHolidayService extends BaseMockService implements IHolidayService {
    private holidays: Map<number, Holiday> = new Map();

    constructor() {
        super('/api/v1/holidays');
        this.initializeData();
    }

    private initializeData(): void {
        const activeHolidays = mockHolidays.filter(
            (holiday) => holiday.status === HolidayStatus.ACTIVE
        );
        activeHolidays.forEach(holiday => {
            this.holidays.set(holiday.id, holiday);
        });
    }

    async getHolidays(): Promise<Holiday[]> {
        await this.delay();
        return Array.from(this.holidays.values());
    }

    async getHolidayById(id: number): Promise<Holiday> {
        await this.delay();
        const holiday = this.holidays.get(id);
        if (!holiday) {
            throw this.createError(`Holiday not found: ${id}`);
        }
        return holiday;
    }

    async createHoliday(holiday: HolidayInput): Promise<Holiday> {
        await this.delay();
        const newHoliday: Holiday = {
            ...holiday,
            id: Math.max(...Array.from(this.holidays.keys())) + 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.holidays.set(newHoliday.id, newHoliday);
        return newHoliday;
    }

    async updateHoliday(id: number, holiday: Partial<HolidayInput>): Promise<Holiday> {
        await this.delay();
        const existingHoliday = await this.getHolidayById(id);
        const updatedHoliday: Holiday = {
            ...existingHoliday,
            ...holiday,
            updatedAt: new Date().toISOString()
        };
        this.holidays.set(id, updatedHoliday);
        return updatedHoliday;
    }

    async deleteHoliday(id: number): Promise<void> {
        await this.delay();
        if (!this.holidays.has(id)) {
            throw this.createError(`Holiday not found: ${id}`);
        }
        this.holidays.delete(id);
    }

    async validateHoliday(holiday: HolidayInput): Promise<HolidayValidation> {
        await this.delay();
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

    async isHoliday(date: string): Promise<boolean> {
        await this.delay();
        return Array.from(this.holidays.values()).some(
            holiday => holiday.date === date && holiday.status === HolidayStatus.ACTIVE
        );
    }

    async getNextBusinessDay(date: string): Promise<string> {
        await this.delay();
        let nextDate = addDays(parseISO(date), 1);
        
        while (
            isWeekend(nextDate) || 
            await this.isHoliday(nextDate.toISOString().split('T')[0])
        ) {
            nextDate = addDays(nextDate, 1);
        }
        
        return nextDate.toISOString().split('T')[0];
    }

    async getHolidaysBetweenDates(startDate: string, endDate: string): Promise<Holiday[]> {
        await this.delay();
        return Array.from(this.holidays.values()).filter(
            holiday => holiday.date >= startDate && holiday.date <= endDate
        );
    }

    async getBusinessDayCount(startDate: string, endDate: string): Promise<number> {
        await this.delay();
        let count = 0;
        let currentDate = parseISO(startDate);
        const end = parseISO(endDate);
        
        while (currentDate <= end) {
            if (
                !isWeekend(currentDate) && 
                !(await this.isHoliday(currentDate.toISOString().split('T')[0]))
            ) {
                count++;
            }
            currentDate = addDays(currentDate, 1);
        }
        
        return count;
    }
}

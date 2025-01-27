import { Holiday, HolidayInput, HolidayValidation, HolidayStatus } from '../../types/bill-pay.types';
import { IHolidayService } from '../../interfaces/IHolidayService';
import { BaseMockService } from './BaseMockService';
import { mockHolidays } from './data/holiday/holidays';
import { addDays, isWeekend, parseISO } from 'date-fns';

export class MockHolidayService extends BaseMockService implements IHolidayService {
    private holidays: Map<number, Holiday> = new Map();

    constructor(basePath: string = '/api/v1/holidays') {
        super(basePath);
        this.initializeData();
    }

    private initializeData(): void {
        const activeHolidays = mockHolidays.filter(
            (holiday) => holiday.status === HolidayStatus.ACTIVE




            (holiday) => holiday.status === HolidayStatus.ACTIVE
        );



            ...holiday,

            ...existingHoliday,
            ...holiday,


        


        );

        
        ) {
        

        );

        
                !isWeekend(currentDate) && 
                !(await this.isHoliday(currentDate.toISOString().split('T')[0]))
            ) {
        

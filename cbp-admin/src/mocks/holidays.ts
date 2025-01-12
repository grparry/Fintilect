import { Holiday, HolidayType, HolidayStatus } from '../types/bill-pay.types';

export const mockHolidays: Holiday[] = [
    {
        id: 1,
        name: "New Year's Day",
        date: "2025-01-01",
        type: 'FEDERAL' as HolidayType,
        status: 'Active' as HolidayStatus,
        description: "First day of the year",
        createdAt: "2024-12-01T00:00:00Z",
        updatedAt: "2024-12-01T00:00:00Z"
    },
    {
        id: 2,
        name: "Martin Luther King Jr. Day",
        date: "2025-01-20",
        type: 'FEDERAL' as HolidayType,
        status: 'Active' as HolidayStatus,
        description: "Birthday of Martin Luther King Jr.",
        createdAt: "2024-12-01T00:00:00Z",
        updatedAt: "2024-12-01T00:00:00Z"
    },
    {
        id: 3,
        name: "Presidents Day",
        date: "2025-02-17",
        type: 'FEDERAL' as HolidayType,
        status: 'Active' as HolidayStatus,
        description: "Washington's Birthday",
        createdAt: "2024-12-01T00:00:00Z",
        updatedAt: "2024-12-01T00:00:00Z"
    },
    {
        id: 4,
        name: "Memorial Day",
        date: "2025-05-26",
        type: 'FEDERAL' as HolidayType,
        status: 'Active' as HolidayStatus,
        description: "Memorial Day",
        createdAt: "2024-12-01T00:00:00Z",
        updatedAt: "2024-12-01T00:00:00Z"
    }
];

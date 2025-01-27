import { Holiday, HolidayType, HolidayStatus } from '@/../../../../types/bill-pay.types';

export const mockHolidays: Holiday[] = [
    {
        id: 1,
        name: "New Year's Day",
        date: "2025-01-01",
        type: HolidayType.FEDERAL,
        status: HolidayStatus.ACTIVE,
        description: "First day of the year",
        createdAt: "2024-12-01T00:00:00Z",
        updatedAt: "2024-12-01T00:00:00Z"
    },
    {
        id: 2,
        name: "Martin Luther King Jr. Day",
        date: "2025-01-20",
        type: HolidayType.FEDERAL,
        status: HolidayStatus.ACTIVE,
        description: "Birthday of Martin Luther King Jr.",
        createdAt: "2024-12-01T00:00:00Z",
        updatedAt: "2024-12-01T00:00:00Z"
    },
    {
        id: 3,
        name: "Presidents Day",
        date: "2025-02-17",
        type: HolidayType.FEDERAL,
        status: HolidayStatus.ACTIVE,
        description: "Washington's Birthday",
        createdAt: "2024-12-01T00:00:00Z",
        updatedAt: "2024-12-01T00:00:00Z"
    },
    {
        id: 4,
        name: "Memorial Day",
        date: "2025-05-26",
        type: HolidayType.FEDERAL,
        status: HolidayStatus.ACTIVE,
        description: "Memorial Day",
        createdAt: "2024-12-01T00:00:00Z",
        updatedAt: "2024-12-01T00:00:00Z"
    }
];

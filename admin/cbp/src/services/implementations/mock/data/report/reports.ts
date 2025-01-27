import { ReportData } from '../../../../../types/report.types';

export const mockReportData: ReportData[] = [
    {
        audit: [
            {
                id: 1,
                timestamp: new Date().toISOString(),
                user: 'user1',
                action: 'login',
                details: 'User logged in successfully'
            },
            {
                id: 2,
                timestamp: new Date().toISOString(),
                user: 'user2',
                action: 'update',
                details: 'Updated user profile'
            }
        ],
        transactions: [
            {
                id: 1,
                date: new Date().toISOString(),
                amount: 100.50,
                type: 'credit',
                status: 'completed',
                recipient: 'John Doe'
            },
            {
                id: 2,
                date: new Date().toISOString(),
                amount: 50.25,
                type: 'debit',
                status: 'pending',
                recipient: 'Jane Smith'
            }
        ],
        users: [
            {
                id: 1,
                username: 'johndoe',
                lastLogin: new Date().toISOString(),
                status: 'active',
                role: 'admin'
            },
            {
                id: 2,
                username: 'janesmith',
                lastLogin: new Date().toISOString(),
                status: 'active',
                role: 'user'
            }
        ]
    }
];


// Mock audit log data for permission groups
export const mockPermissionAuditLog: Record<number, Array<{
    timestamp: string;
    action: string;
    userId: string;
    changes: Record<string, any>;
}>> = {
    1: [
        {
            timestamp: '2024-01-01T00:00:00Z',
            action: 'CREATE',
            userId: 'system',
            changes: {
                name: 'Administrator',
                description: 'Full system access',
                permissions: {
                    BillPay: ['view', 'edit', 'process', 'approve']
                }
            }
        },
        {
            timestamp: '2024-01-02T00:00:00Z',
            action: 'UPDATE',
            userId: 'system',
            changes: {
                permissions: {
                    Reports: ['view', 'export', 'create']
                }
            }
        }
    ],
    2: [
        {
            timestamp: '2024-01-01T00:00:00Z',
            action: 'CREATE',
            userId: 'system',
            changes: {
                name: 'Bill Pay Operator',
                description: 'Bill pay operations access',
                permissions: {
                    BillPay: ['view', 'process']
                }
            }
        }
    ]
};
import { Client, Payee } from '../../../../../../types/bill-pay.types';

export const mockClients: Client[] = [
    {
        id: 'client_1',
        name: 'ACME Corp',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'client_2',
        name: 'TechCorp',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];
export const mockPayees: Payee[] = [
    {
        id: 'payee_1',
        clientId: 'client_1',
        name: 'Electric Company',
        accountNumber: '1234567890',
        routingNumber: '987654321',
        bankName: 'First Bank',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'payee_2',
        clientId: 'client_1',
        name: 'Water Utility',
        accountNumber: '0987654321',
        routingNumber: '123456789',
        bankName: 'Second Bank',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];
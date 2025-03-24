import { Client } from '../../../../../types/client.types';
import { Payee } from '../../../../../types/bill-pay.types';

export const mockClients: Client[] = [
    {
        id: 1,
        name: 'ACME Corp',
        tenantId: 1,
        isActive: true,
        createdOn: new Date().toISOString(),
        updatedOn: new Date().toISOString(),
        type: 'ENTERPRISE',
        status: 'ACTIVE',
        environment: 'PRODUCTION',
        require2FA: true,
        domain: 'acme.com',
        sponsorId: null,
        routingId: null,
        logoUrl: null
    },
    {
        id: 2,
        name: 'TechCorp',
        tenantId: 2,
        isActive: true,
        createdOn: new Date().toISOString(),
        updatedOn: new Date().toISOString(),
        type: 'ENTERPRISE',
        status: 'ACTIVE',
        environment: 'PRODUCTION',
        require2FA: true,
        domain: 'acme.com',
        sponsorId: null,
        routingId: null,
        logoUrl: null
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
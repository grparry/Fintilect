import { http, HttpResponse } from 'msw';
import { Client, Environment, ClientStatus, ClientType, AuditLog, ApiResponse } from '../../types/client.types';
import dayjs from 'dayjs';
import { decodeId } from '../../utils/idEncoder';

// Mock client data
const mockClients: Client[] = [
  {
    id: '1',
    name: 'Example Credit Union',
    type: ClientType.Enterprise,
    environment: Environment.Production,
    status: ClientStatus.Active,
    domain: 'examplecu.com',
    contactName: 'John Doe',
    contactEmail: 'john@example.com',
    contactPhone: '555-0100',
    settings: {
      general: {
        timezone: 'America/Denver',
        dateFormat: 'MM/DD/YYYY',
        timeFormat: '12h',
        currency: 'USD',
        language: 'en',
      },
      security: {
        passwordPolicy: {
          minLength: 8,
          requireUppercase: true,
          requireLowercase: true,
          requireNumbers: true,
          requireSpecialChars: true,
          expirationDays: 90,
        },
        loginPolicy: {
          maxAttempts: 5,
          lockoutDuration: 30,
        },
        sessionTimeout: 30,
        mfaEnabled: true,
        ipWhitelist: [],
      },
      notifications: {
        emailEnabled: true,
        smsEnabled: true,
        pushEnabled: true,
        frequency: 'realtime',
        alertTypes: ['payment', 'security', 'system'],
      },
      branding: {
        logo: 'https://example.com/logo.png',
        primaryColor: '#1976d2',
        secondaryColor: '#dc004e',
        favicon: 'https://example.com/favicon.ico',
      },
      features: {
        billPay: true,
        moneyDesktop: true,
        mobileDeposit: true,
        p2p: true,
        cardControls: true,
      },
    },
    createdAt: '2024-12-26T10:00:00Z',
    updatedAt: '2024-12-26T10:00:00Z'
  },
  {
    id: '2',
    name: 'Test Credit Union',
    type: ClientType.Small,
    environment: Environment.Development,
    status: ClientStatus.Active,
    domain: 'testcu.com',
    contactName: 'Jane Smith',
    contactEmail: 'jane@example.com',
    contactPhone: '555-0200',
    settings: {
      general: {
        timezone: 'America/Chicago',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24h',
        currency: 'USD',
        language: 'en',
      },
      security: {
        passwordPolicy: {
          minLength: 10,
          requireUppercase: true,
          requireLowercase: true,
          requireNumbers: true,
          requireSpecialChars: false,
          expirationDays: 60,
        },
        loginPolicy: {
          maxAttempts: 3,
          lockoutDuration: 15,
        },
        sessionTimeout: 15,
        mfaEnabled: false,
        ipWhitelist: [],
      },
      notifications: {
        emailEnabled: true,
        smsEnabled: false,
        pushEnabled: false,
        frequency: 'daily',
        alertTypes: ['security'],
      },
      branding: {
        logo: 'https://example.com/logo2.png',
        primaryColor: '#4caf50',
        secondaryColor: '#ff9800',
        favicon: 'https://example.com/favicon2.ico',
      },
      features: {
        billPay: true,
        moneyDesktop: false,
        mobileDeposit: true,
        p2p: false,
        cardControls: true,
      },
    },
    createdAt: '2024-12-26T10:00:00Z',
    updatedAt: '2024-12-26T10:00:00Z'
  }
];

// Mock audit log entries
const generateAuditLogs = (clientId: string): AuditLog[] => {
  return [
    {
      id: '1',
      timestamp: dayjs().subtract(1, 'hour').toISOString(),
      action: 'UPDATE_SETTINGS',
      userId: 'admin',
      userName: 'Admin User',
      resourceType: 'client',
      resourceId: clientId,
      details: JSON.stringify({
        before: { maxDailyLimit: 50000 },
        after: { maxDailyLimit: 100000 }
      }),
      status: 'Success'
    },
    {
      id: '2',
      timestamp: dayjs().subtract(2, 'hours').toISOString(),
      action: 'ADD_USER',
      userId: 'admin',
      userName: 'Admin User',
      resourceType: 'user',
      resourceId: 'new_user_1',
      details: JSON.stringify({
        email: 'newuser@example.com',
        role: 'USER'
      }),
      status: 'Success'
    }
  ];
};

export const clientHandlers = [
  // Get all clients
  http.get('*/admin/clients', ({ request }) => {
    console.log('MSW: Handling get clients request');
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('searchTerm')?.toLowerCase() || '';
    const environment = url.searchParams.get('environment');

    let filteredClients = [...mockClients];

    if (searchTerm) {
      filteredClients = filteredClients.filter(client =>
        client.name.toLowerCase().includes(searchTerm)
      );
    }

    if (environment) {
      filteredClients = filteredClients.filter(client =>
        client.environment === environment
      );
    }

    console.log('MSW: Returning filtered clients', filteredClients);

    return HttpResponse.json({
      success: true,
      data: filteredClients
    } as ApiResponse<Client[]>);
  }),

  // Get client by ID
  http.get('*/admin/clients/:id', ({ params }) => {
    console.log('MSW: Handling get client request', params);
    const decodedId = decodeId(params.id as string);
    const client = mockClients.find(c => c.id === decodedId);

    if (!client) {
      return new HttpResponse(null, { status: 404 });
    }

    console.log('MSW: Returning client', client);

    return HttpResponse.json({
      success: true,
      data: client
    } as ApiResponse<Client>);
  }),

  // Get client audit log
  http.get('*/admin/clients/:id/audit-log', ({ params, request }) => {
    console.log('MSW: Handling get client audit log request', params);
    const decodedId = decodeId(params.id as string);
    const url = new URL(request.url);
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');

    const auditLogs = generateAuditLogs(decodedId);
    let filteredLogs = [...auditLogs];

    if (startDate) {
      filteredLogs = filteredLogs.filter(log =>
        dayjs(log.timestamp).isAfter(startDate)
      );
    }

    if (endDate) {
      filteredLogs = filteredLogs.filter(log =>
        dayjs(log.timestamp).isBefore(endDate)
      );
    }

    console.log('MSW: Returning filtered audit logs', filteredLogs);

    return HttpResponse.json({
      success: true,
      data: filteredLogs
    } as ApiResponse<AuditLog[]>);
  }),

  // Get client management audit log
  http.get('*/admin/client-management/:id/audit-log', ({ params, request }) => {
    console.log('MSW: Handling get client management audit log request', params);
    const decodedId = decodeId(params.id as string);
    const url = new URL(request.url);
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');

    const auditLogs = generateAuditLogs(decodedId);
    let filteredLogs = [...auditLogs];

    if (startDate) {
      filteredLogs = filteredLogs.filter(log =>
        dayjs(log.timestamp).isAfter(startDate)
      );
    }

    if (endDate) {
      filteredLogs = filteredLogs.filter(log =>
        dayjs(log.timestamp).isBefore(endDate)
      );
    }

    console.log('MSW: Returning filtered audit logs', filteredLogs);

    return HttpResponse.json({
      success: true,
      data: filteredLogs
    } as ApiResponse<AuditLog[]>);
  }),

  // Update client
  http.put('*/admin/clients/:id', async ({ params, request }) => {
    console.log('MSW: Handling update client request', params);
    const decodedId = decodeId(params.id as string);
    const index = mockClients.findIndex(c => c.id === decodedId);

    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    const updates = await request.json() as Partial<Client>;
    const updatedClient = {
      ...mockClients[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    mockClients[index] = updatedClient;
    console.log('MSW: Updated client', updatedClient);

    return HttpResponse.json({
      success: true,
      data: updatedClient
    } as ApiResponse<Client>);
  })
];

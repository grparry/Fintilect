import { http, HttpResponse } from 'msw';
import { Client, Environment, ClientStatus, ClientType, AuditLog, ClientListResponse, User, UserListResponse, UserRole, UserStatus } from '../../types/client.types';
import { ApiSuccessResponse } from '../../types/api.types';
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

// Mock user data
const mockUsers: User[] = [
  {
    id: '1',
    clientId: '1',
    username: 'john',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    role: UserRole.Admin,
    status: UserStatus.ACTIVE,
    department: 'IT',
    lastLogin: new Date().toISOString(),
    locked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    clientId: '2',
    username: 'jane',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    role: UserRole.User,
    status: UserStatus.ACTIVE,
    department: 'Operations',
    lastLogin: new Date().toISOString(),
    locked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
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
  http.get('*/admin/client-management/list', ({ request }) => {
    console.log('MSW: Handling get clients request');
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 20;

    const response: ApiSuccessResponse<ClientListResponse> = {
      success: true,
      data: {
        items: mockClients,
        pagination: {
          total: mockClients.length,
          page,
          limit,
          pages: Math.ceil(mockClients.length / limit)
        }
      }
    };

    return HttpResponse.json(response);
  }),

  // Get client by ID
  http.get('*/admin/client-management/:id', ({ params }) => {
    const client = mockClients.find(c => c.id === params.id);
    if (!client) {
      return new HttpResponse(null, { status: 404 });
    }

    const response: ApiSuccessResponse<Client> = {
      success: true,
      data: client
    };

    return HttpResponse.json(response);
  }),

  // Get client settings
  http.get('*/admin/client-management/:id/settings', ({ params }) => {
    const client = mockClients.find(c => c.id === params.id);
    if (!client) {
      return new HttpResponse(null, { status: 404 });
    }

    const response: ApiSuccessResponse<any> = {
      success: true,
      data: client.settings
    };

    return HttpResponse.json(response);
  }),

  // Update client settings
  http.put('*/admin/client-management/:id/settings', async ({ params, request }) => {
    const settings = await request.json() as any;
    const clientIndex = mockClients.findIndex(c => c.id === params.id);
    
    if (clientIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockClients[clientIndex] = {
      ...mockClients[clientIndex],
      settings: {
        ...mockClients[clientIndex].settings,
        ...settings
      }
    };

    const response: ApiSuccessResponse<any> = {
      success: true,
      data: mockClients[clientIndex].settings
    };

    return HttpResponse.json(response);
  }),

  // Update client
  http.put('*/admin/client-management/:id', async ({ params, request }) => {
    const updates = await request.json() as Partial<Client>;
    const clientIndex = mockClients.findIndex(c => c.id === params.id);
    
    if (clientIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    const updatedClient = {
      ...mockClients[clientIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    mockClients[clientIndex] = updatedClient;

    const response: ApiSuccessResponse<Client> = {
      success: true,
      data: updatedClient
    };

    return HttpResponse.json(response);
  }),

  // Get client audit log
  http.get('*/admin/client-management/:id/audit-log', ({ params, request }) => {
    const url = new URL(request.url);
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');

    let logs = generateAuditLogs(params.id as string);

    if (from) {
      logs = logs.filter(log => log.timestamp >= from);
    }

    if (to) {
      logs = logs.filter(log => log.timestamp <= to);
    }

    const response: ApiSuccessResponse<AuditLog[]> = {
      success: true,
      data: logs
    };

    return HttpResponse.json(response);
  }),

  // Get users for client
  http.get('*/admin/client-management/:clientId/users', ({ params, request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');

    const clientUsers = mockUsers.filter(u => u.clientId === params.clientId as string);
    const total = clientUsers.length;
    const pages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = clientUsers.slice(startIndex, endIndex);

    const response: ApiSuccessResponse<UserListResponse> = {
      success: true,
      data: {
        items: paginatedUsers,
        pagination: {
          total,
          page,
          limit,
          pages
        }
      }
    };

    return HttpResponse.json(response);
  }),

  // Create user
  http.post('*/admin/client-management/:clientId/users', async ({ params, request }) => {
    const userData = await request.json() as Partial<User>;

    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      clientId: params.clientId as string,
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as User;

    mockUsers.push(newUser);

    const response: ApiSuccessResponse<User> = {
      success: true,
      data: newUser
    };

    return HttpResponse.json(response);
  }),

  // Update user
  http.put('*/admin/client-management/:clientId/users/:userId', async ({ params, request }) => {
    const updates = await request.json() as Partial<User>;
    const userIndex = mockUsers.findIndex(u => u.id === params.userId && u.clientId === params.clientId);

    if (userIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    const updatedUser = {
      ...mockUsers[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    } as User;

    mockUsers[userIndex] = updatedUser;

    const response: ApiSuccessResponse<User> = {
      success: true,
      data: updatedUser
    };

    return HttpResponse.json(response);
  }),

  // Delete user
  http.delete('*/admin/client-management/:clientId/users/:userId', ({ params }) => {
    const userIndex = mockUsers.findIndex(u => u.id === params.userId && u.clientId === params.clientId);

    if (userIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockUsers.splice(userIndex, 1);

    const response: ApiSuccessResponse<void> = {
      success: true,
      data: undefined
    };

    return HttpResponse.json(response);
  })
];

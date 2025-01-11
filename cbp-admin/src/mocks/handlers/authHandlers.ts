import { http, HttpResponse } from 'msw';
import { mockUsers } from '../client-management/mockClientData';
import { ApiSuccessResponse } from '../../types/api.types';
import { User } from '../../types/client.types';
import { LoginCredentials } from '../../types/auth.types';

// Mock credentials - in a real app, this would be handled securely
const mockCredentials: Record<string, string> = {
  admin: 'Admin@123!Secure',  // Complex password for admin
  user1: 'user1',            // Keep simple passwords for test accounts
  support: 'support',
  manager: 'manager'
} as const;

export const authHandlers = [
  // Login handler
  http.post('*/v1/auth/login', async ({ request }) => {
    console.log('MSW: Intercepted login request');
    const credentials = await request.json() as LoginCredentials;
    console.log('Login attempt:', credentials);
    console.log('Available users:', mockUsers);

    const user = mockUsers.find(u => 
      u.username === credentials.username && 
      mockCredentials[credentials.username as keyof typeof mockCredentials] === credentials.password
    );

    console.log('Found user:', user);

    if (!user) {
      console.log('Login failed: Invalid credentials');
      return new HttpResponse(
        JSON.stringify({
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid username or password',
            timestamp: new Date().toISOString(),
          },
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const response: ApiSuccessResponse<User> = {
      success: true,
      data: user,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'mock-request-id',
      },
    };

    console.log('Login successful:', response);

    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),

  // Logout handler
  http.post('*/v1/auth/logout', () => {
    console.log('MSW: Intercepted logout request');
    return new HttpResponse(null, { status: 204 });
  }),

  // Refresh token handler
  http.post('*/v1/auth/refresh', () => {
    console.log('MSW: Intercepted refresh token request');
    return HttpResponse.json({
      success: true,
      data: {
        accessToken: 'mock-refreshed-token',
        expiresIn: 3600,
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'mock-request-id',
      },
    });
  }),
];

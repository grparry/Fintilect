import { render, screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from '@/../../../test-utils/navigation';
import ClientManagementWrapper from '@/ClientManagementWrapper';
import { act } from 'react-dom/test-utils';
import { Client, ClientType, ClientStatus, Environment as ClientEnvironment } from '@/../../../types/client.types';
import type { ApiResponse, ApiSuccessResponse, ApiErrorResponse } from '@/../../../types/api.types';

// Mock the idEncoder utility
jest.mock('../../../../utils/idEncoder', () => ({
  decodeId: jest.fn((id) => id === 'encoded123' ? '1' : null)
}));

describe('ClientManagementWrapper', () => {
  const mockClient: Client = {
    id: '1',
    name: 'Test Client',
    status: ClientStatus.Active,
    type: ClientType.Enterprise,
    environment: ClientEnvironment.Development,
    settings: {
      general: {
        timezone: 'America/Denver',
        dateFormat: 'MM/DD/YYYY',
        timeFormat: '12h',
        language: 'en',
        currency: 'USD'
      },
      security: {
        passwordPolicy: {
          minLength: 8,
          requireNumbers: true,
          requireSpecialChars: true,
          requireUppercase: true,
          requireLowercase: true,
          expirationDays: 90,
          preventReuse: 5,
          complexityScore: 3
        },
        loginPolicy: {
          maxAttempts: 5,
          lockoutDuration: 30,
          sessionTimeout: 30,
          requireMFA: false,
          allowRememberMe: false,
          allowMultipleSessions: false,
          requirePasswordChange: false
        },
        ipWhitelist: {
          enabled: false,
          addresses: [],
          allowedRanges: []
        },
        mfaSettings: {
          methods: ['email', 'sms'],
          defaultMethod: 'email',
          gracePeriod: 24,
          trustDuration: 30
        },
        auditSettings: {
          retentionDays: 90,
          highRiskEvents: ['login_failed', 'password_reset'],
          alertThresholds: {}
        },
        alertSettings: {
          enableEmailAlerts: true,
          enableSMSAlerts: false,
          recipients: [],
          severityLevels: ['high', 'critical']
        }
      },
      notifications: {
        emailEnabled: true,
        smsEnabled: false,
        pushEnabled: false,
        frequency: 'daily',
        alertTypes: ['payment', 'security']
      }
    }
  };

  const mockSuccessResponse: ApiSuccessResponse<Client> = {
    success: true,
    data: mockClient
  };

  const mockErrorResponse: ApiErrorResponse = {
    success: false,
    status: 404,
    error: {
      code: 'NOT_FOUND',
      message: 'Client not found',
      timestamp: new Date().toISOString()
    }
  };

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders without client ID', async () => {
    await act(async () => {
      renderWithRouter(<ClientManagementWrapper />, {
        route: '/admin/client-management',
        path: '/admin/client-management/*'
      });
    });
    await waitFor(() => {
      expect(screen.getByText('No client ID provided. Please select a client from the list.')).toBeInTheDocument();
    });
  });

  it('renders with client ID', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSuccessResponse),
      })
    );

    await act(async () => {
      renderWithRouter(<ClientManagementWrapper />, {
        route: '/admin/client-management/encoded123',
        path: '/admin/client-management/:clientId/*'
      });
    });

    await waitFor(() => {
      expect(screen.queryByText('No client ID provided')).not.toBeInTheDocument();
      expect(screen.queryByText('Invalid client ID format')).not.toBeInTheDocument();
    });
  });

  it('handles invalid client ID', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve(mockErrorResponse)
      })
    );

    await act(async () => {
      renderWithRouter(<ClientManagementWrapper />, {
        route: '/admin/client-management/invalid-id',
        path: '/admin/client-management/:clientId/*'
      });
    });

    await waitFor(() => {
      expect(screen.getByText('Invalid client ID format. Please select a client from the list.')).toBeInTheDocument();
    });
  });
});

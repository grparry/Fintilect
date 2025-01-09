import { billPayService } from '../bill-pay.service';
import api from '../api';
import {
  AuditLog,
  BillPayConfig,
  BillPayStats,
  PaymentMethod,
  PaymentStatus,
  Payment,
  PaymentHistory,
  PaymentFilters,
  PaymentConfirmationRequest,
  PaymentConfirmationResponse,
  Priority,
} from '../../types/bill-pay.types';
import { ApiPaginatedResponse, ApiSuccessResponse } from '../../types/api.types';

jest.mock('../api');
const mockedApi = api as jest.Mocked<typeof api>;

describe('BillPayService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockAuditLog: AuditLog = {
    id: '123',
    timestamp: '2025-01-08T12:00:00Z',
    action: 'PAYMENT_CREATED',
    userId: 'user123',
    userName: 'Test User',
    resourceType: 'payment',
    resourceId: 'payment123',
    details: {
      paymentId: 'payment123',
      amount: 1000,
      status: PaymentStatus.PENDING,
    },
    status: 'Success',
  };

  const mockConfig: BillPayConfig = {
    id: 'config123',
    cutoffTime: '17:00',
    maxDailyLimit: 100000,
    maxTransactionLimit: 50000,
    allowWeekendProcessing: false,
    requireDualApproval: true,
    retryAttempts: 3,
    notificationEmail: 'test@example.com',
    enableEmailNotifications: true,
    lastUpdatedAt: '2025-01-08T12:00:00Z',
    lastUpdatedBy: 'user123',
    validationRules: {
      minTransactionAmount: 0,
      maxTransactionAmount: 50000,
      minDailyLimit: 0,
      maxDailyLimit: 1000000,
      minRetryAttempts: 1,
      maxRetryAttempts: 5,
    },
  };

  const mockStats: BillPayStats = {
    totalTransactions: 100,
    totalAmount: 1000000,
    successRate: 95,
    averageTransactionSize: 10000,
    transactionsByMethod: {
      [PaymentMethod.ACH]: 50,
      [PaymentMethod.WIRE]: 30,
      [PaymentMethod.CHECK]: 10,
      [PaymentMethod.CARD]: 5,
      [PaymentMethod.RTP]: 5,
    },
    transactionsByStatus: {
      [PaymentStatus.PENDING]: 20,
      [PaymentStatus.APPROVED]: 60,
      [PaymentStatus.REJECTED]: 5,
      [PaymentStatus.PROCESSING]: 10,
      [PaymentStatus.COMPLETED]: 5,
      [PaymentStatus.FAILED]: 0,
      [PaymentStatus.CANCELLED]: 0,
    },
    recentActivity: [
      {
        id: '123',
        amount: 1000,
        method: PaymentMethod.ACH,
        status: PaymentStatus.COMPLETED,
        timestamp: '2025-01-08T12:00:00Z',
      },
    ],
  };

  describe('getAuditLogs', () => {
    const mockPaginatedMeta = {
      currentPage: 1,
      totalPages: 2,
      pageSize: 10,
      totalCount: 15,
      hasNextPage: true,
      hasPreviousPage: false,
      timestamp: '2025-01-08T12:00:00Z',
      requestId: 'test-request-1',
    };

    const mockPaginatedResponse: ApiPaginatedResponse<AuditLog[]> = {
      success: true,
      data: [mockAuditLog],
      meta: mockPaginatedMeta,
    };

    it('should fetch audit logs with pagination', async () => {
      mockedApi.get.mockResolvedValueOnce({
        success: true,
        data: mockPaginatedResponse,
        meta: {
          timestamp: '2025-01-08T12:00:00Z',
          requestId: 'test-request-1',
        },
      });

      const params = {
        page: 1,
        pageSize: 10,
        startDate: '2025-01-01',
        endDate: '2025-01-08',
      };

      const result = await billPayService.getAuditLogs(params);

      expect(result).toEqual({
        logs: [mockAuditLog],
        total: 15,
        page: 1,
        totalPages: 2,
        pageSize: 10,
      });

      expect(mockedApi.get).toHaveBeenCalledWith('/api/v2/bill-pay/audit-log', {
        params,
      });
    });
  });

  describe('getConfig', () => {
    it('should fetch bill pay configuration', async () => {
      mockedApi.get.mockResolvedValueOnce({
        success: true,
        data: {
          success: true,
          data: mockConfig,
          meta: {
            timestamp: '2025-01-08T12:00:00Z',
            requestId: 'test-request-2',
          },
        },
        meta: {
          timestamp: '2025-01-08T12:00:00Z',
          requestId: 'test-request-2',
        },
      });

      const result = await billPayService.getConfig();

      expect(result).toEqual(mockConfig);
      expect(mockedApi.get).toHaveBeenCalledWith('/api/v2/bill-pay/config');
    });
  });

  describe('updateConfig', () => {
    it('should update bill pay configuration', async () => {
      const updatedConfig = { ...mockConfig, maxTransactionLimit: 75000 };

      mockedApi.patch.mockResolvedValueOnce({
        success: true,
        data: {
          success: true,
          data: updatedConfig,
          meta: {
            timestamp: '2025-01-08T12:00:00Z',
            requestId: 'test-request-3',
          },
        },
        meta: {
          timestamp: '2025-01-08T12:00:00Z',
          requestId: 'test-request-3',
        },
      });

      const result = await billPayService.updateConfig({ maxTransactionLimit: 75000 });

      expect(result).toEqual(updatedConfig);
      expect(mockedApi.patch).toHaveBeenCalledWith('/api/v2/bill-pay/config', {
        maxTransactionLimit: 75000,
      });
    });
  });

  describe('getStats', () => {
    it('should fetch bill pay statistics', async () => {
      mockedApi.get.mockResolvedValueOnce({
        success: true,
        data: {
          success: true,
          data: mockStats,
          meta: {
            timestamp: '2025-01-08T12:00:00Z',
            requestId: 'test-request-4',
          },
        },
        meta: {
          timestamp: '2025-01-08T12:00:00Z',
          requestId: 'test-request-4',
        },
      });

      const params = {
        startDate: '2025-01-01',
        endDate: '2025-01-08',
        method: [PaymentMethod.ACH, PaymentMethod.WIRE],
      };

      const result = await billPayService.getStats(params);

      expect(result).toEqual(mockStats);
      expect(mockedApi.get).toHaveBeenCalledWith('/api/v2/bill-pay/stats', {
        params,
      });
    });
  });

  describe('enableBillPay', () => {
    it('should enable bill pay', async () => {
      mockedApi.post.mockResolvedValueOnce({
        success: true,
        data: {
          success: true,
          data: null,
          meta: {
            timestamp: '2025-01-08T12:00:00Z',
            requestId: 'test-request-5',
          },
        },
        meta: {
          timestamp: '2025-01-08T12:00:00Z',
          requestId: 'test-request-5',
        },
      });

      await billPayService.enableBillPay();

      expect(mockedApi.post).toHaveBeenCalledWith('/api/v2/bill-pay/enable');
    });
  });

  describe('disableBillPay', () => {
    it('should disable bill pay', async () => {
      mockedApi.post.mockResolvedValueOnce({
        success: true,
        data: {
          success: true,
          data: null,
          meta: {
            timestamp: '2025-01-08T12:00:00Z',
            requestId: 'test-request-6',
          },
        },
        meta: {
          timestamp: '2025-01-08T12:00:00Z',
          requestId: 'test-request-6',
        },
      });

      await billPayService.disableBillPay();

      expect(mockedApi.post).toHaveBeenCalledWith('/api/v2/bill-pay/disable');
    });
  });

  describe('resetBillPay', () => {
    it('should reset bill pay', async () => {
      mockedApi.post.mockResolvedValueOnce({
        success: true,
        data: {
          success: true,
          data: null,
          meta: {
            timestamp: '2025-01-08T12:00:00Z',
            requestId: 'test-request-7',
          },
        },
        meta: {
          timestamp: '2025-01-08T12:00:00Z',
          requestId: 'test-request-7',
        },
      });

      await billPayService.resetBillPay();

      expect(mockedApi.post).toHaveBeenCalledWith('/api/v2/bill-pay/reset');
    });
  });

  // Core Payment Operations Tests
  describe('createPayment', () => {
    const mockPayment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'> = {
      clientId: 'client123',
      clientName: 'Test Client',
      payeeId: 'payee123',
      payeeName: 'Test Payee',
      amount: 1000,
      currency: 'USD',
      method: PaymentMethod.ACH,
      status: PaymentStatus.PENDING,
      effectiveDate: '2025-01-08',
      description: 'Test payment',
      priority: Priority.MEDIUM,
    };

    it('should create a new payment', async () => {
      const expectedResponse = {
        ...mockPayment,
        id: 'payment123',
        createdAt: '2025-01-08T12:00:00Z',
        updatedAt: '2025-01-08T12:00:00Z',
      };

      mockedApi.post.mockResolvedValueOnce({
        success: true,
        data: {
          success: true,
          data: expectedResponse,
          meta: { timestamp: '2025-01-08T12:00:00Z' },
        },
      });

      const result = await billPayService.createPayment(mockPayment);
      expect(result).toEqual(expectedResponse);
      expect(mockedApi.post).toHaveBeenCalledWith(
        '/api/v2/bill-pay/payments',
        mockPayment
      );
    });
  });

  describe('getPaymentDetails', () => {
    it('should fetch payment details', async () => {
      const mockPaymentDetails: Payment = {
        id: 'payment123',
        clientId: 'client123',
        clientName: 'Test Client',
        payeeId: 'payee123',
        payeeName: 'Test Payee',
        amount: 1000,
        currency: 'USD',
        method: PaymentMethod.ACH,
        status: PaymentStatus.PENDING,
        effectiveDate: '2025-01-08',
        description: 'Test payment',
        priority: Priority.MEDIUM,
        createdAt: '2025-01-08T12:00:00Z',
        updatedAt: '2025-01-08T12:00:00Z',
      };

      mockedApi.get.mockResolvedValueOnce({
        success: true,
        data: {
          success: true,
          data: mockPaymentDetails,
          meta: { timestamp: '2025-01-08T12:00:00Z' },
        },
      });

      const result = await billPayService.getPaymentDetails('payment123');
      expect(result).toEqual(mockPaymentDetails);
      expect(mockedApi.get).toHaveBeenCalledWith(
        '/api/v2/bill-pay/payments/payment123'
      );
    });
  });

  describe('updatePaymentStatus', () => {
    it('should update payment status', async () => {
      const mockUpdatedPayment: Payment = {
        id: 'payment123',
        clientId: 'client123',
        clientName: 'Test Client',
        payeeId: 'payee123',
        payeeName: 'Test Payee',
        amount: 1000,
        currency: 'USD',
        method: PaymentMethod.ACH,
        status: PaymentStatus.APPROVED,
        effectiveDate: '2025-01-08',
        description: 'Test payment',
        priority: Priority.MEDIUM,
        createdAt: '2025-01-08T12:00:00Z',
        updatedAt: '2025-01-08T12:00:00Z',
      };

      mockedApi.patch.mockResolvedValueOnce({
        success: true,
        data: {
          success: true,
          data: mockUpdatedPayment,
          meta: { timestamp: '2025-01-08T12:00:00Z' },
        },
      });

      const result = await billPayService.updatePaymentStatus(
        'payment123',
        PaymentStatus.APPROVED,
        'Approved by manager'
      );
      
      expect(result).toEqual(mockUpdatedPayment);
      expect(mockedApi.patch).toHaveBeenCalledWith(
        '/api/v2/bill-pay/payments/payment123/status',
        { status: PaymentStatus.APPROVED, notes: 'Approved by manager' }
      );
    });
  });

  describe('cancelPayment', () => {
    it('should cancel a payment', async () => {
      const mockCancelledPayment: Payment = {
        id: 'payment123',
        clientId: 'client123',
        clientName: 'Test Client',
        payeeId: 'payee123',
        payeeName: 'Test Payee',
        amount: 1000,
        currency: 'USD',
        method: PaymentMethod.ACH,
        status: PaymentStatus.CANCELLED,
        effectiveDate: '2025-01-08',
        description: 'Test payment',
        priority: Priority.MEDIUM,
        createdAt: '2025-01-08T12:00:00Z',
        updatedAt: '2025-01-08T12:00:00Z',
      };

      mockedApi.post.mockResolvedValueOnce({
        success: true,
        data: {
          success: true,
          data: mockCancelledPayment,
          meta: { timestamp: '2025-01-08T12:00:00Z' },
        },
      });

      const result = await billPayService.cancelPayment(
        'payment123',
        'Cancelled by user request'
      );
      
      expect(result).toEqual(mockCancelledPayment);
      expect(mockedApi.post).toHaveBeenCalledWith(
        '/api/v2/bill-pay/payments/payment123/cancel',
        { reason: 'Cancelled by user request' }
      );
    });
  });

  describe('submitBatchPayments', () => {
    it('should process batch payments', async () => {
      const mockPayments = [
        {
          clientId: 'client123',
          clientName: 'Test Client',
          payeeId: 'payee123',
          payeeName: 'Test Payee',
          amount: 1000,
          currency: 'USD',
          method: PaymentMethod.ACH,
          status: PaymentStatus.PENDING,
          effectiveDate: '2025-01-08',
          description: 'Test payment 1',
          priority: Priority.MEDIUM,
        },
        {
          clientId: 'client124',
          clientName: 'Test Client 2',
          payeeId: 'payee124',
          payeeName: 'Test Payee 2',
          amount: 2000,
          currency: 'USD',
          method: PaymentMethod.ACH,
          status: PaymentStatus.PENDING,
          effectiveDate: '2025-01-08',
          description: 'Test payment 2',
          priority: Priority.MEDIUM,
        },
      ];

      const mockResponse = {
        successful: [
          {
            ...mockPayments[0],
            id: 'payment123',
            createdAt: '2025-01-08T12:00:00Z',
            updatedAt: '2025-01-08T12:00:00Z',
          },
        ],
        failed: [
          {
            payment: mockPayments[1],
            error: 'Invalid payee information',
          },
        ],
      };

      mockedApi.post.mockResolvedValueOnce({
        success: true,
        data: {
          success: true,
          data: mockResponse,
          meta: { timestamp: '2025-01-08T12:00:00Z' },
        },
      });

      const result = await billPayService.submitBatchPayments(mockPayments);
      
      expect(result).toEqual(mockResponse);
      expect(mockedApi.post).toHaveBeenCalledWith(
        '/api/v2/bill-pay/payments/batch',
        { payments: mockPayments }
      );
    });
  });

  describe('validatePayment', () => {
    it('should validate payment data', async () => {
      const mockPayment = {
        clientId: 'client123',
        amount: -1000, // Invalid amount
        currency: 'USD',
        method: PaymentMethod.ACH,
      };

      const mockValidationResponse = {
        valid: false,
        errors: [
          {
            field: 'amount' as keyof Payment,
            message: 'Amount must be greater than 0',
          },
        ],
      };

      mockedApi.post.mockResolvedValueOnce({
        success: true,
        data: {
          success: true,
          data: mockValidationResponse,
          meta: { timestamp: '2025-01-08T12:00:00Z' },
        },
      });

      const result = await billPayService.validatePayment(mockPayment);
      
      expect(result).toEqual(mockValidationResponse);
      expect(mockedApi.post).toHaveBeenCalledWith(
        '/api/v2/bill-pay/payments/validate',
        mockPayment
      );
    });
  });

  describe('searchPayments', () => {
    it('should search payments with filters', async () => {
      const mockFilters: PaymentFilters = {
        clientId: 'client123',
        method: [PaymentMethod.ACH],
        status: [PaymentStatus.PENDING],
        startDate: '2025-01-01',
        endDate: '2025-01-08',
      };

      const mockSearchResponse = {
        data: [
          {
            id: 'payment123',
            clientId: 'client123',
            clientName: 'Test Client',
            payeeId: 'payee123',
            payeeName: 'Test Payee',
            amount: 1000,
            currency: 'USD',
            method: PaymentMethod.ACH,
            status: PaymentStatus.PENDING,
            effectiveDate: '2025-01-08',
            description: 'Test payment',
            priority: Priority.MEDIUM,
            createdAt: '2025-01-08T12:00:00Z',
            updatedAt: '2025-01-08T12:00:00Z',
          },
        ],
        meta: {
          currentPage: 1,
          totalPages: 1,
          pageSize: 10,
          totalCount: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };

      mockedApi.get.mockResolvedValueOnce({
        success: true,
        data: mockSearchResponse,
      });

      const result = await billPayService.searchPayments(mockFilters);
      
      expect(result).toEqual(mockSearchResponse);
      expect(mockedApi.get).toHaveBeenCalledWith(
        '/api/v2/bill-pay/payments/search',
        { params: mockFilters }
      );
    });
  });
});

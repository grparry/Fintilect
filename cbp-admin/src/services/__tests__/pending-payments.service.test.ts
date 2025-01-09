import { pendingPaymentsService } from '../pending-payments.service';
import api from '../api';
import {
  PaymentMethod,
  PaymentStatus,
  Priority,
  PendingPayment,
  PendingPaymentSummary,
  PendingPaymentApproval,
  PendingPaymentRejection,
} from '../../types/bill-pay.types';
import { ApiPaginatedResponse, ApiSuccessResponse, ApiPaginationMeta } from '../../types/api.types';

jest.mock('../api');
const mockedApi = api as jest.Mocked<typeof api>;

describe('PendingPaymentsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockPayment: PendingPayment = {
    id: '123',
    clientId: 'client123',
    clientName: 'Test Client',
    payeeId: 'payee123',
    payeeName: 'Test Payee',
    amount: 1000,
    currency: 'USD',
    method: PaymentMethod.ACH,
    status: PaymentStatus.PENDING,
    priority: Priority.HIGH,
    effectiveDate: '2025-01-08T12:00:00Z',
    recipient: {
      name: 'Test Recipient',
      accountNumber: '1234567890',
      routingNumber: '987654321',
      bankName: 'Test Bank',
    },
    createdAt: '2025-01-08T12:00:00Z',
    updatedAt: '2025-01-08T12:00:00Z',
  };

  describe('fetchPayments', () => {
    const mockPaginatedMeta: ApiPaginationMeta & { timestamp: string; requestId: string } = {
      currentPage: 1,
      totalPages: 1,
      pageSize: 10,
      totalCount: 1,
      hasNextPage: false,
      hasPreviousPage: false,
      timestamp: '2025-01-08T12:00:00Z',
      requestId: 'test-request-1',
    };

    const mockPaginatedResponse: ApiPaginatedResponse<PendingPayment[]> = {
      success: true,
      data: [mockPayment],
      meta: mockPaginatedMeta,
    };

    it('should fetch payments with all filters', async () => {
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
        limit: 10,
        status: [PaymentStatus.PENDING],
        method: [PaymentMethod.ACH],
        priority: [Priority.HIGH],
        sortBy: 'createdAt',
        sortOrder: 'desc' as const,
      };

      const result = await pendingPaymentsService.fetchPayments(params);

      expect(result).toEqual({
        payments: [mockPayment],
        total: 1,
        page: 1,
        totalPages: 1,
        limit: 10,
      });

      expect(mockedApi.get).toHaveBeenCalledWith('/api/v2/payments/pending', {
        params,
      });
    });

    it('should fetch payments without filters', async () => {
      const emptyResponse: ApiPaginatedResponse<PendingPayment[]> = {
        success: true,
        data: [],
        meta: {
          ...mockPaginatedMeta,
          totalCount: 0,
          totalPages: 0,
        },
      };

      mockedApi.get.mockResolvedValueOnce({
        success: true,
        data: emptyResponse,
        meta: {
          timestamp: '2025-01-08T12:00:00Z',
          requestId: 'test-request-1',
        },
      });

      const result = await pendingPaymentsService.fetchPayments({});

      expect(result).toEqual({
        payments: [],
        total: 0,
        page: 1,
        totalPages: 0,
        limit: 10,
      });

      expect(mockedApi.get).toHaveBeenCalledWith('/api/v2/payments/pending', {
        params: {},
      });
    });
  });

  describe('getPaymentById', () => {
    const mockSuccessResponse: ApiSuccessResponse<PendingPayment> = {
      success: true,
      data: mockPayment,
      meta: {
        timestamp: '2025-01-08T12:00:00Z',
        requestId: 'test-request-2',
      },
    };

    it('should fetch single payment successfully', async () => {
      mockedApi.get.mockResolvedValueOnce({
        success: true,
        data: mockSuccessResponse,
        meta: {
          timestamp: '2025-01-08T12:00:00Z',
          requestId: 'test-request-2',
        },
      });

      const result = await pendingPaymentsService.getPaymentById('123');

      expect(result).toEqual(mockPayment);
      expect(mockedApi.get).toHaveBeenCalledWith('/api/v2/payments/pending/123');
    });

    it('should handle payment not found error', async () => {
      const errorMessage = 'Payment not found';
      mockedApi.get.mockRejectedValueOnce({
        response: {
          data: {
            message: errorMessage,
          },
        },
      });

      await expect(pendingPaymentsService.getPaymentById('invalid-id'))
        .rejects.toThrow(errorMessage);
    });

    it('should handle unexpected error format', async () => {
      mockedApi.get.mockRejectedValueOnce(new Error('Network error'));

      await expect(pendingPaymentsService.getPaymentById('123'))
        .rejects.toThrow('Network error');
    });
  });

  describe('approvePayment', () => {
    const mockApproval: Omit<PendingPaymentApproval, 'paymentId'> = {
      approvedBy: 'user123',
      approvedAt: '2025-01-08T12:00:00Z',
      notes: 'Test approval',
    };

    it('should approve payment successfully', async () => {
      mockedApi.post.mockResolvedValueOnce({
        success: true,
        data: {
          success: true,
          data: null,
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

      await pendingPaymentsService.approvePayment('123', { paymentId: '123', ...mockApproval });

      expect(mockedApi.post).toHaveBeenCalledWith(
        '/api/v2/payments/pending/123/approve',
        { paymentId: '123', ...mockApproval }
      );
    });
  });

  describe('rejectPayment', () => {
    const mockRejection: Omit<PendingPaymentRejection, 'paymentId'> = {
      rejectedBy: 'user123',
      rejectedAt: '2025-01-08T12:00:00Z',
      reason: 'Invalid payment',
      notes: 'Test rejection',
    };

    it('should reject payment successfully', async () => {
      mockedApi.post.mockResolvedValueOnce({
        success: true,
        data: {
          success: true,
          data: null,
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

      await pendingPaymentsService.rejectPayment('123', { paymentId: '123', ...mockRejection });

      expect(mockedApi.post).toHaveBeenCalledWith(
        '/api/v2/payments/pending/123/reject',
        { paymentId: '123', ...mockRejection }
      );
    });
  });

  describe('bulkApprovePayments', () => {
    const mockBulkResponse: ApiSuccessResponse<Array<{ id: string; success: boolean; error?: string }>> = {
      success: true,
      data: [
        { id: '123', success: true },
        { id: '456', success: true },
      ],
      meta: {
        timestamp: '2025-01-08T12:00:00Z',
        requestId: 'test-request-5',
      },
    };

    it('should approve multiple payments', async () => {
      mockedApi.post.mockResolvedValueOnce({
        success: true,
        data: mockBulkResponse,
        meta: {
          timestamp: '2025-01-08T12:00:00Z',
          requestId: 'test-request-5',
        },
      });

      const ids = ['123', '456'];
      const approval = {
        approvedBy: 'user123',
        approvedAt: '2025-01-08T12:00:00Z',
        notes: 'Bulk approval test',
      };

      const result = await pendingPaymentsService.bulkApprovePayments(ids, approval);

      expect(result).toEqual([
        { id: '123', success: true },
        { id: '456', success: true },
      ]);

      expect(mockedApi.post).toHaveBeenCalledWith(
        '/api/v2/payments/pending/bulk/approve',
        {
          ids,
          ...approval,
        }
      );
    });
  });

  describe('bulkRejectPayments', () => {
    const mockBulkResponse: ApiSuccessResponse<Array<{ id: string; success: boolean; error?: string }>> = {
      success: true,
      data: [
        { id: '123', success: true },
        { id: '456', success: true },
      ],
      meta: {
        timestamp: '2025-01-08T12:00:00Z',
        requestId: 'test-request-6',
      },
    };

    it('should reject multiple payments', async () => {
      mockedApi.post.mockResolvedValueOnce({
        success: true,
        data: mockBulkResponse,
        meta: {
          timestamp: '2025-01-08T12:00:00Z',
          requestId: 'test-request-6',
        },
      });

      const ids = ['123', '456'];
      const rejection = {
        rejectedBy: 'user123',
        rejectedAt: '2025-01-08T12:00:00Z',
        reason: 'Bulk rejection test',
      };

      const result = await pendingPaymentsService.bulkRejectPayments(ids, rejection);

      expect(result).toEqual([
        { id: '123', success: true },
        { id: '456', success: true },
      ]);

      expect(mockedApi.post).toHaveBeenCalledWith(
        '/api/v2/payments/pending/bulk/reject',
        {
          ids,
          ...rejection,
        }
      );
    });
  });

  describe('getSummary', () => {
    const mockSummary: PendingPaymentSummary = {
      totalAmount: 5000,
      byMethod: {
        [PaymentMethod.ACH]: { count: 3, amount: 3000 },
        [PaymentMethod.WIRE]: { count: 2, amount: 2000 },
        [PaymentMethod.CHECK]: { count: 0, amount: 0 },
        [PaymentMethod.CARD]: { count: 0, amount: 0 },
        [PaymentMethod.RTP]: { count: 0, amount: 0 },
      },
      byStatus: {
        [PaymentStatus.PENDING]: 3,
        [PaymentStatus.APPROVED]: 2,
        [PaymentStatus.REJECTED]: 0,
        [PaymentStatus.PROCESSING]: 0,
        [PaymentStatus.COMPLETED]: 0,
        [PaymentStatus.FAILED]: 0,
        [PaymentStatus.CANCELLED]: 0,
      },
      byPriority: {
        [Priority.HIGH]: 2,
        [Priority.MEDIUM]: 2,
        [Priority.LOW]: 1,
      },
    };

    it('should fetch payment summary with filters', async () => {
      const mockResponse: ApiSuccessResponse<PendingPaymentSummary> = {
        success: true,
        data: mockSummary,
        meta: {
          timestamp: '2025-01-08T12:00:00Z',
          requestId: 'test-request-7',
        },
      };

      mockedApi.get.mockResolvedValueOnce({
        success: true,
        data: mockResponse,
        meta: {
          timestamp: '2025-01-08T12:00:00Z',
          requestId: 'test-request-7',
        },
      });

      const filters = {
        startDate: '2025-01-01',
        endDate: '2025-01-08',
      };

      const result = await pendingPaymentsService.getSummary(filters);

      expect(result).toEqual(mockSummary);
      expect(mockedApi.get).toHaveBeenCalledWith('/api/v2/payments/pending/summary', {
        params: filters,
      });
    });
  });
});

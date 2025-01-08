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
import { ApiPaginatedResponse, ApiSuccessResponse, ApiErrorResponse } from '../../types/api.types';

// Mock the api module
jest.mock('../api');
const mockedApi = api as jest.Mocked<typeof api>;

describe('PendingPaymentsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockPayment = {
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
    it('should fetch payments with filters', async () => {
      const params = {
        page: 1,
        limit: 10,
        status: [PaymentStatus.PENDING],
        method: [PaymentMethod.ACH],
        priority: [Priority.HIGH],
      };

      const mockResponse: ApiPaginatedResponse<PendingPayment[]> = {
        success: true,
        data: [mockPayment],
        meta: {
          currentPage: 1,
          totalPages: 1,
          pageSize: 10,
          totalCount: 1,
          hasNextPage: false,
          hasPreviousPage: false,
          timestamp: '2025-01-08T12:00:00Z',
          requestId: 'test-request-1',
        },
      };

      mockedApi.get.mockResolvedValueOnce(mockResponse);

      const result = await pendingPaymentsService.fetchPayments(params);

      expect(result).toEqual({
        payments: [mockPayment],
        total: 1,
        page: 1,
        totalPages: 1,
        limit: 10,
      });

      expect(mockedApi.get).toHaveBeenCalledWith('/api/v2/payments/pending', {
        params: {
          page: params.page,
          limit: params.limit,
          status: params.status,
          method: params.method,
          priority: params.priority,
        },
      });
    });

    it('should handle empty response', async () => {
      const mockResponse: ApiPaginatedResponse<PendingPayment[]> = {
        success: true,
        data: [],
        meta: {
          currentPage: 1,
          totalPages: 0,
          pageSize: 10,
          totalCount: 0,
          hasNextPage: false,
          hasPreviousPage: false,
          timestamp: '2025-01-08T12:00:00Z',
          requestId: 'test-request-2',
        },
      };

      mockedApi.get.mockResolvedValueOnce(mockResponse);

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
    it('should get payment by id', async () => {
      const mockResponse: ApiSuccessResponse<PendingPayment> = {
        success: true,
        data: mockPayment,
        meta: {
          timestamp: '2025-01-08T12:00:00Z',
          requestId: 'test-request-3',
        },
      };

      mockedApi.get.mockResolvedValueOnce(mockResponse);

      const result = await pendingPaymentsService.getPaymentById('123');

      expect(result).toEqual(mockPayment);
      expect(mockedApi.get).toHaveBeenCalledWith('/api/v2/payments/pending/123');
    });

    it('should handle error when getting payment', async () => {
      const errorMessage = 'Payment not found';
      mockedApi.get.mockRejectedValueOnce({
        response: {
          data: {
            message: errorMessage,
          },
        },
      });

      await expect(pendingPaymentsService.getPaymentById('123')).rejects.toThrow(
        errorMessage
      );
    });
  });

  describe('approvePayment', () => {
    it('should approve payment', async () => {
      const approval: PendingPaymentApproval = {
        paymentId: '123',
        approvedBy: 'user123',
        approvedAt: '2025-01-08T12:00:00Z',
        notes: 'Approved payment',
      };

      const mockResponse: ApiSuccessResponse<void> = {
        success: true,
        data: undefined,
        meta: {
          timestamp: '2025-01-08T12:00:00Z',
          requestId: 'test-request-4',
        },
      };

      mockedApi.post.mockResolvedValueOnce(mockResponse);

      await pendingPaymentsService.approvePayment('123', approval);

      expect(mockedApi.post).toHaveBeenCalledWith('/api/v2/payments/pending/123/approve', approval);
    });
  });

  describe('rejectPayment', () => {
    it('should reject payment', async () => {
      const rejection: PendingPaymentRejection = {
        paymentId: '123',
        rejectedBy: 'user123',
        rejectedAt: '2025-01-08T12:00:00Z',
        reason: 'Invalid payment',
        notes: 'Payment rejected',
      };

      const mockResponse: ApiSuccessResponse<void> = {
        success: true,
        data: undefined,
        meta: {
          timestamp: '2025-01-08T12:00:00Z',
          requestId: 'test-request-5',
        },
      };

      mockedApi.post.mockResolvedValueOnce(mockResponse);

      await pendingPaymentsService.rejectPayment('123', rejection);

      expect(mockedApi.post).toHaveBeenCalledWith('/api/v2/payments/pending/123/reject', rejection);
    });
  });

  describe('getSummary', () => {
    it('should get payment summary', async () => {
      const mockSummary = {
        totalAmount: 5000,
        count: 5,
        amount: 5000,
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

      const mockResponse: ApiSuccessResponse<PendingPaymentSummary> = {
        success: true,
        data: mockSummary,
        meta: {
          timestamp: '2025-01-08T12:00:00Z',
          requestId: 'test-request-6',
        },
      };

      mockedApi.get.mockResolvedValueOnce(mockResponse);

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

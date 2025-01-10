import { paymentsService } from '../payments.service';
import api from '../api';
import { paymentApi } from '../api/payment.api';
import {
  Payment,
  PaymentStatus,
  PendingPayment,
  PendingPaymentSearchRequest,
  PendingPaymentListResponse,
  PendingPaymentSummary,
  PaymentMethod,
  Payee,
  Client,
  ConfirmationMethod,
  Priority
} from '../../types/bill-pay.types';

jest.mock('../api');
jest.mock('../api/payment.api');

describe('PaymentsService', () => {
  const mockPayment: Payment = {
    id: '123',
    amount: 1000,
    status: PaymentStatus.PENDING,
    createdAt: '2025-01-08T11:20:00Z',
    updatedAt: '2025-01-08T11:20:00Z',
    payeeId: 'payee-123',
    payeeName: 'Test Payee',
    clientId: 'client-123',
    clientName: 'Test Client',
    method: PaymentMethod.ACH,
    description: 'Test payment',
    currency: 'USD',
    effectiveDate: '2025-01-09T00:00:00Z',
    priority: Priority.MEDIUM
  };

  const mockPendingPayment: PendingPayment = {
    ...mockPayment,
    recipient: {
      name: 'Test Payee',
      accountNumber: '123456',
      routingNumber: '987654',
      bankName: 'Test Bank'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchPayments', () => {
    it('should fetch payments with pagination', async () => {
      const mockResponse = {
        data: [mockPayment],
        meta: {
          totalCount: 1,
          currentPage: 1,
          totalPages: 1,
          pageSize: 10,
          hasNextPage: false,
          hasPreviousPage: false
        }
      };

      (api.getPaginated as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await paymentsService.fetchPayments({
        page: 1,
        pageSize: 10
      });

      expect(api.getPaginated).toHaveBeenCalledWith('/api/v1/payment', {
        params: {
          page: 1,
          pageSize: 10,
          sortBy: undefined,
          sortDirection: undefined
        }
      });
      expect(result.payments).toEqual([mockPayment]);
      expect(result.meta).toEqual(mockResponse.meta);
    });
  });

  describe('validatePayment', () => {
    it('should validate payment successfully', async () => {
      const mockResponse = {
        success: true,
        data: true,
        meta: {
          timestamp: '2025-01-08T11:20:00Z',
          requestId: '123',
          errors: []
        }
      };

      (paymentApi.validatePayment as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await paymentsService.validatePayment(mockPayment);

      expect(paymentApi.validatePayment).toHaveBeenCalledWith(mockPayment);
      expect(result).toEqual({
        valid: true,
        errors: []
      });
    });

    it('should return validation errors', async () => {
      const mockResponse = {
        success: true,
        data: false,
        meta: {
          timestamp: '2025-01-08T11:20:00Z',
          requestId: '123',
          errors: [
            { field: 'amount', message: 'Amount must be greater than 0' }
          ]
        }
      };

      (paymentApi.validatePayment as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await paymentsService.validatePayment(mockPayment);

      expect(paymentApi.validatePayment).toHaveBeenCalledWith(mockPayment);
      expect(result).toEqual({
        valid: false,
        errors: [
          { field: 'amount', message: 'Amount must be greater than 0' }
        ]
      });
    });
  });

  describe('pending payment operations', () => {
    it('should create pending payment', async () => {
      const mockResponse = {
        success: true,
        data: mockPendingPayment,
        meta: {
          timestamp: '2025-01-08T11:20:00Z',
          requestId: '123'
        }
      };

      (paymentApi.createPendingPayment as jest.Mock).mockResolvedValueOnce(mockResponse);

      const newPayment = {
        amount: 1000,
        payeeId: 'payee-123',
        payeeName: 'Test Payee',
        clientId: 'client-123',
        clientName: 'Test Client',
        method: PaymentMethod.ACH,
        description: 'Test payment',
        currency: 'USD',
        effectiveDate: '2025-01-09T00:00:00Z',
        priority: Priority.MEDIUM,
        recipient: {
          name: 'Test Payee',
          accountNumber: '123456',
          routingNumber: '987654',
          bankName: 'Test Bank'
        }
      };

      const result = await paymentsService.createPendingPayment(newPayment);

      expect(paymentApi.createPendingPayment).toHaveBeenCalledWith(newPayment);
      expect(result).toEqual(mockPendingPayment);
    });

    it('should search pending payments', async () => {
      const mockResponse = {
        success: true,
        data: {
          payments: [mockPendingPayment],
          meta: {
            totalCount: 1,
            currentPage: 1,
            totalPages: 1,
            pageSize: 10
          }
        },
        meta: {
          timestamp: '2025-01-08T11:20:00Z',
          requestId: '123'
        }
      };

      (paymentApi.searchPendingPayments as jest.Mock).mockResolvedValueOnce(mockResponse);

      const searchRequest: PendingPaymentSearchRequest = {
        page: 1,
        limit: 10,
        clientId: 'client-123'
      };

      const result = await paymentsService.searchPendingPayments(searchRequest);

      expect(paymentApi.searchPendingPayments).toHaveBeenCalledWith(searchRequest);
      expect(result).toEqual(mockResponse.data);
    });

    it('should get pending payment summary', async () => {
      const mockSummary: PendingPaymentSummary = {
        totalAmount: 1000,
        byMethod: {
          [PaymentMethod.ACH]: { count: 1, amount: 1000 },
          [PaymentMethod.WIRE]: { count: 0, amount: 0 },
          [PaymentMethod.CHECK]: { count: 0, amount: 0 },
          [PaymentMethod.CARD]: { count: 0, amount: 0 },
          [PaymentMethod.RTP]: { count: 0, amount: 0 }
        },
        byStatus: {
          [PaymentStatus.PENDING]: 1,
          [PaymentStatus.APPROVED]: 0,
          [PaymentStatus.REJECTED]: 0,
          [PaymentStatus.PROCESSING]: 0,
          [PaymentStatus.COMPLETED]: 0,
          [PaymentStatus.FAILED]: 0,
          [PaymentStatus.CANCELLED]: 0,
          [PaymentStatus.EXPIRED]: 0,
          [PaymentStatus.PENDING_APPROVAL]: 0,
          [PaymentStatus.DRAFT]: 0,
          [PaymentStatus.SUBMITTED]: 0,
          [PaymentStatus.SCHEDULED]: 0,
          [PaymentStatus.RETURNED]: 0,
          [PaymentStatus.STOP_PAYMENT]: 0,
          [PaymentStatus.REVERSED]: 0,
          [PaymentStatus.REFUNDED]: 0,
          [PaymentStatus.RESENT]: 0,
          [PaymentStatus.REINITIATED]: 0,
          [PaymentStatus.PENDING_REVERSAL]: 0,
          [PaymentStatus.PENDING_REFUND]: 0,
          [PaymentStatus.PENDING_RETURN]: 0,
          [PaymentStatus.PENDING_STOP_PAYMENT]: 0,
          [PaymentStatus.PENDING_RESEND]: 0,
          [PaymentStatus.PENDING_REINITIATE]: 0
        },
        byPriority: {
          [Priority.HIGH]: 0,
          [Priority.MEDIUM]: 1,
          [Priority.LOW]: 0
        }
      };

      const mockResponse = {
        success: true,
        data: mockSummary,
        meta: {
          timestamp: '2025-01-08T11:20:00Z',
          requestId: '123'
        }
      };

      (paymentApi.getPendingPaymentsSummary as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await paymentsService.getPendingPaymentsSummary({
        clientId: 'client-123'
      });

      expect(paymentApi.getPendingPaymentsSummary).toHaveBeenCalledWith({
        clientId: 'client-123'
      });
      expect(result).toEqual(mockSummary);
    });
  });

  describe('payment confirmation', () => {
    it('should confirm payment successfully', async () => {
      const mockResponse = {
        success: true,
        data: {
          success: true,
          message: 'Payment confirmed successfully',
          confirmationStatus: 'verified',
          attempts: 1,
          maxAttempts: 3,
          expiresAt: '2025-01-08T12:20:00Z'
        },
        meta: {
          timestamp: '2025-01-08T11:20:00Z',
          requestId: '123'
        }
      };

      (paymentApi.confirmPayment as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await paymentsService.confirmPayment(
        '123',
        ConfirmationMethod.OTP,
        '123456',
        'user-123'
      );

      expect(paymentApi.confirmPayment).toHaveBeenCalledWith({
        paymentId: '123',
        confirmationMethod: ConfirmationMethod.OTP,
        code: '123456',
        userId: 'user-123'
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('reference data', () => {
    it('should fetch payees', async () => {
      const mockPayees: Payee[] = [{
        id: 'payee-123',
        clientId: 'client-123',
        name: 'Test Payee',
        accountNumber: '123456',
        routingNumber: '987654',
        bankName: 'Test Bank',
        status: 'active',
        createdAt: '2025-01-08T11:20:00Z',
        updatedAt: '2025-01-08T11:20:00Z'
      }];

      const mockResponse = {
        success: true,
        data: mockPayees,
        meta: {
          timestamp: '2025-01-08T11:20:00Z',
          requestId: '123'
        }
      };

      (paymentApi.getPayees as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await paymentsService.getPayees();

      expect(paymentApi.getPayees).toHaveBeenCalled();
      expect(result).toEqual(mockPayees);
    });

    it('should fetch clients', async () => {
      const mockClients: Client[] = [{
        id: 'client-123',
        name: 'Test Client',
        status: 'active',
        createdAt: '2025-01-08T11:20:00Z',
        updatedAt: '2025-01-08T11:20:00Z'
      }];

      const mockResponse = {
        success: true,
        data: mockClients,
        meta: {
          timestamp: '2025-01-08T11:20:00Z',
          requestId: '123'
        }
      };

      (paymentApi.getClients as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await paymentsService.getClients();

      expect(paymentApi.getClients).toHaveBeenCalled();
      expect(result).toEqual(mockClients);
    });

    it('should fetch payment limits', async () => {
      const mockLimits: Record<PaymentMethod, number> = {
        [PaymentMethod.ACH]: 10000,
        [PaymentMethod.WIRE]: 100000,
        [PaymentMethod.CHECK]: 5000,
        [PaymentMethod.CARD]: 2000,
        [PaymentMethod.RTP]: 50000
      };

      const mockResponse = {
        success: true,
        data: mockLimits,
        meta: {
          timestamp: '2025-01-08T11:20:00Z',
          requestId: '123'
        }
      };

      (paymentApi.getPaymentLimits as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await paymentsService.getPaymentLimits();

      expect(paymentApi.getPaymentLimits).toHaveBeenCalled();
      expect(result).toEqual(mockLimits);
    });
  });
});

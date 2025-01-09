import { paymentValidationService } from '../payment-validation.service';
import { billPayService } from '../../bill-pay.service';
import {
  Payment,
  PaymentMethod,
  BillPayConfig,
  Priority,
  PaymentStatus,
} from '../../../types/bill-pay.types';

jest.mock('../../bill-pay.service');
const mockedBillPayService = billPayService as jest.Mocked<typeof billPayService>;

describe('PaymentValidationService', () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
    mockedBillPayService.getConfig.mockResolvedValue(mockConfig);
  });

  describe('validatePayment', () => {
    it('should validate a valid payment', async () => {
      const payment: Partial<Payment> = {
        clientId: 'client123',
        amount: 1000,
        currency: 'USD',
        method: PaymentMethod.ACH,
        effectiveDate: '2025-01-09', // A future date
        description: 'Test payment',
        priority: Priority.MEDIUM,
      };

      mockedBillPayService.searchPayments.mockResolvedValue({
        success: true,
        data: [],
        meta: {
          currentPage: 1,
          totalPages: 1,
          pageSize: 10,
          totalCount: 0,
          hasNextPage: false,
          hasPreviousPage: false,
          timestamp: '2025-01-08T12:00:00Z',
          requestId: 'test-request-1',
        },
      });

      const result = await paymentValidationService.validatePayment(payment);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate amount limits', async () => {
      const payment: Partial<Payment> = {
        clientId: 'client123',
        amount: 1000000, // Exceeds limit
        currency: 'USD',
        method: PaymentMethod.ACH,
        effectiveDate: '2025-01-09',
      };

      const result = await paymentValidationService.validatePayment(payment);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          field: 'amount',
          message: expect.stringContaining('cannot exceed'),
        })
      );
    });

    it('should validate daily limits', async () => {
      const payment: Partial<Payment> = {
        clientId: 'client123',
        amount: 60000,
        currency: 'USD',
        method: PaymentMethod.ACH,
        effectiveDate: '2025-01-09',
      };

      // Mock existing payments for today
      mockedBillPayService.searchPayments.mockResolvedValue({
        success: true,
        data: [
          {
            id: 'payment1',
            clientId: 'client123',
            amount: 50000,
            status: PaymentStatus.COMPLETED,
            createdAt: '2025-01-08T10:00:00Z',
          } as Payment,
        ],
        meta: {
          currentPage: 1,
          totalPages: 1,
          pageSize: 10,
          totalCount: 1,
          hasNextPage: false,
          hasPreviousPage: false,
          timestamp: '2025-01-08T12:00:00Z',
          requestId: 'test-request-2',
        },
      });

      const result = await paymentValidationService.validatePayment(payment);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          field: 'amount',
          message: expect.stringContaining('Daily payment limit'),
        })
      );
    });

    it('should validate method-specific rules for wire transfers', async () => {
      const payment: Partial<Payment> = {
        clientId: 'client123',
        amount: 10000,
        currency: 'USD',
        method: PaymentMethod.WIRE,
        effectiveDate: '2025-01-09',
        // Missing required description
      };

      const result = await paymentValidationService.validatePayment(payment);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          field: 'description',
          message: 'Description is required for wire transfers',
        })
      );
    });

    it('should validate business rules for weekend processing', async () => {
      const payment: Partial<Payment> = {
        clientId: 'client123',
        amount: 10000,
        currency: 'USD',
        method: PaymentMethod.ACH,
        effectiveDate: '2025-01-13', // A Sunday
      };

      const result = await paymentValidationService.validatePayment(payment);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          field: 'effectiveDate',
          message: 'Weekend processing is not allowed',
        })
      );
    });

    it('should flag payments requiring dual approval', async () => {
      const payment: Partial<Payment> = {
        clientId: 'client123',
        amount: 30000, // More than half of maxTransactionLimit
        currency: 'USD',
        method: PaymentMethod.ACH,
        effectiveDate: '2025-01-09',
      };

      const result = await paymentValidationService.validatePayment(payment);
      expect(result.requiresApproval).toBe(true);
      expect(result.warnings).toContainEqual(
        expect.objectContaining({
          field: 'approval',
          message: 'This payment requires dual approval',
          type: 'warning',
        })
      );
    });

    it('should validate currency support for payment methods', async () => {
      const payment: Partial<Payment> = {
        clientId: 'client123',
        amount: 10000,
        currency: 'EUR', // EUR not supported for ACH
        method: PaymentMethod.ACH,
        effectiveDate: '2025-01-09',
      };

      const result = await paymentValidationService.validatePayment(payment);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          field: 'currency',
          message: 'EUR is not supported for ach payments',
        })
      );
    });
  });
});

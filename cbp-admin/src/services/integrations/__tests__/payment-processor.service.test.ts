import { paymentProcessorService } from '../payment-processor.service';
import { api } from '../../../utils/api';
import { auditService } from '../../audit.service';
import { 
  Payment, 
  PaymentMethod, 
  PaymentStatus, 
  ProcessorResponse, 
  ProcessorWebhookEvent,
  Priority,
} from '../../../types/bill-pay.types';

jest.mock('../../../utils/api');
jest.mock('../../audit.service');

describe('PaymentProcessorService', () => {
  const mockPayment: Payment = {
    id: 'payment123',
    clientId: 'client123',
    clientName: 'Test Client',
    payeeId: 'payee123',
    payeeName: 'Test Payee',
    amount: 100,
    currency: 'USD',
    method: PaymentMethod.ACH,
    status: PaymentStatus.PENDING,
    effectiveDate: '2025-01-08',
    priority: Priority.MEDIUM,
    createdAt: '2025-01-08T14:21:58-07:00',
    updatedAt: '2025-01-08T14:21:58-07:00',
  };

  const mockProcessorResponse: ProcessorResponse = {
    success: true,
    processorId: 'proc123',
    transactionId: 'tx123',
    status: PaymentStatus.COMPLETED,
    timestamp: '2025-01-08T14:21:58-07:00',
    requiresApproval: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (api.post as jest.Mock).mockResolvedValue({ 
      data: { data: mockProcessorResponse } 
    });
    (auditService.logEvent as jest.Mock).mockResolvedValue(undefined);
  });

  describe('submitPayment', () => {
    it('should successfully submit payment to processor', async () => {
      const result = await paymentProcessorService.submitPayment(mockPayment);
      
      expect(api.post).toHaveBeenCalledWith(
        '/api/v1/processor/submit',
        expect.objectContaining({
          paymentId: mockPayment.id,
          amount: mockPayment.amount,
          currency: mockPayment.currency,
          method: mockPayment.method,
        })
      );
      expect(result).toEqual(mockProcessorResponse);
      expect(auditService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: 'PAYMENT_PROCESSOR_SUBMIT',
          resourceId: mockPayment.id,
          resourceType: 'payment',
          status: 'INITIATED',
        })
      );
    });

    it('should handle processor errors', async () => {
      const error = new Error('Processor error');
      (api.post as jest.Mock).mockRejectedValue(error);

      await expect(paymentProcessorService.submitPayment(mockPayment))
        .rejects.toThrow('Processor error');

      expect(auditService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: 'PAYMENT_PROCESSOR_ERROR',
          resourceId: mockPayment.id,
          resourceType: 'payment',
          status: 'ERROR',
        })
      );
    });
  });

  describe('getPaymentStatus', () => {
    it('should retrieve payment status from processor', async () => {
      (api.get as jest.Mock).mockResolvedValue({
        data: { data: mockProcessorResponse }
      });

      const result = await paymentProcessorService.getPaymentStatus(mockPayment.id);

      expect(api.get).toHaveBeenCalledWith(
        `/api/v1/processor/payments/${mockPayment.id}/status`
      );
      expect(result).toEqual(mockProcessorResponse);
    });

    it('should handle status check errors', async () => {
      const error = new Error('Status check failed');
      (api.get as jest.Mock).mockRejectedValue(error);

      await expect(paymentProcessorService.getPaymentStatus(mockPayment.id))
        .rejects.toThrow('Status check failed');
    });
  });

  describe('handleWebhook', () => {
    const mockWebhook: ProcessorWebhookEvent = {
      eventId: 'evt123',
      paymentId: mockPayment.id,
      processorId: 'proc123',
      status: PaymentStatus.COMPLETED,
      timestamp: '2025-01-08T14:21:58-07:00',
      metadata: {
        clientId: mockPayment.clientId,
        amount: mockPayment.amount,
        currency: mockPayment.currency,
      },
    };

    it('should process webhook events', async () => {
      const result = await paymentProcessorService.handleWebhook(mockWebhook);

      expect(auditService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: 'WEBHOOK_RECEIVED',
          resourceId: mockPayment.id,
          resourceType: 'payment',
          status: 'RECEIVED',
        })
      );
      expect(result).toBe(true);
    });

    it('should handle webhook processing errors', async () => {
      const error = new Error('Webhook processing failed');
      (auditService.logEvent as jest.Mock).mockRejectedValue(error);

      await expect(paymentProcessorService.handleWebhook(mockWebhook))
        .rejects.toThrow('Webhook processing failed');
    });
  });
});

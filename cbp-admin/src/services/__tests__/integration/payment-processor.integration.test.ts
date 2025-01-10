import api from '../../api';
import { paymentProcessorService } from '../../integrations/payment-processor.service';
import { billPayService } from '../../bill-pay.service';
import { auditService } from '../../audit.service';
import { notificationService } from '../../integrations/notification.service';
import {
  Payment,
  PaymentMethod,
  PaymentStatus,
  Priority,
  ProcessorConfig,
  ProcessorResponse,
  ProcessorWebhookEvent,
  NotificationRequest,
  NotificationResponse,
  NotificationType,
} from '../../../types/bill-pay.types';
import { ApiSuccessResponse } from '../../../types/api.types';

// Mock dependencies
jest.mock('../../api');
jest.mock('../../bill-pay.service');
jest.mock('../../audit.service');
jest.mock('../../integrations/notification.service');

const mockedApi = api as jest.Mocked<typeof api>;
const mockedBillPayService = billPayService as jest.Mocked<typeof billPayService>;
const mockedAuditService = auditService as jest.Mocked<typeof auditService>;
const mockedNotificationService = notificationService as jest.Mocked<typeof notificationService>;

describe('Payment Processor Integration', () => {
  const mockPayment: Payment = {
    id: 'test_payment_1',
    clientId: 'test_client',
    clientName: 'Test Client',
    payeeId: 'test_payee',
    payeeName: 'Test Payee',
    amount: 100.00,
    currency: 'USD',
    method: PaymentMethod.ACH,
    status: PaymentStatus.PENDING,
    effectiveDate: new Date().toISOString(),
    priority: Priority.MEDIUM,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockProcessorConfig: ProcessorConfig = {
    processorId: 'test_processor',
    apiKey: 'test_key',
    apiEndpoint: 'https://api.test.com',
    webhookSecret: 'test_secret',
    timeout: 30000,
    retryAttempts: 3,
    supportedMethods: [PaymentMethod.ACH, PaymentMethod.WIRE],
    methodConfigs: {
      [PaymentMethod.ACH]: {
        enabled: true,
        limits: { min: 0, max: 100000 },
        currencies: ['USD'],
        requiresApproval: false,
      },
      [PaymentMethod.WIRE]: {
        enabled: true,
        limits: { min: 0, max: 1000000 },
        currencies: ['USD', 'EUR'],
        requiresApproval: true,
      },
      [PaymentMethod.CHECK]: {
        enabled: false,
        limits: { min: 0, max: 0 },
        currencies: [],
        requiresApproval: false,
      },
      [PaymentMethod.CARD]: {
        enabled: false,
        limits: { min: 0, max: 0 },
        currencies: [],
        requiresApproval: false,
      },
      [PaymentMethod.RTP]: {
        enabled: false,
        limits: { min: 0, max: 0 },
        currencies: [],
        requiresApproval: false,
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock processor config
    mockedApi.get.mockResolvedValue({ 
      success: true,
      data: mockProcessorConfig 
    } as ApiSuccessResponse<ProcessorConfig>);
  });

  describe('Payment Submission Flow', () => {
    it('should successfully submit a payment and update all services', async () => {
      // Mock successful API response
      mockedApi.post.mockResolvedValue({
        success: true,
        data: {
          transactionId: 'test_transaction_1',
          status: PaymentStatus.PENDING,
          timestamp: new Date().toISOString(),
          processorId: 'test_processor',
          requiresApproval: false,
        } as ProcessorResponse,
      } as ApiSuccessResponse<ProcessorResponse>);

      // Mock Bill Pay Service response
      mockedBillPayService.updatePaymentStatus.mockImplementation((id, status, metadata) => {
        return Promise.resolve({ ...mockPayment, status });
      });

      // Mock Audit Service response
      mockedAuditService.logEvent.mockResolvedValue(undefined);

      // Mock Notification Service response
      mockedNotificationService.sendNotification.mockResolvedValue({
        id: 'test_notification_1',
        recipientId: mockPayment.clientId,
        type: 'PAYMENT_COMPLETED' as NotificationType,
        status: 'SENT',
        channel: 'email',
        sentAt: new Date().toISOString(),
      } as NotificationResponse);

      // Submit payment
      const response = await paymentProcessorService.submitPayment(mockPayment);

      // Verify processor response
      expect(response).toEqual({
        transactionId: 'test_transaction_1',
        status: PaymentStatus.PENDING,
        timestamp: expect.any(String),
        processorId: 'test_processor',
        requiresApproval: false,
      });

      // Verify Bill Pay Service was updated
      expect(mockedBillPayService.updatePaymentStatus).toHaveBeenCalledWith(
        mockPayment.id,
        PaymentStatus.PENDING,
        JSON.stringify({ processorResponse: response })
      );

      // Verify audit log
      expect(mockedAuditService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: 'PAYMENT_PROCESSOR_SUBMIT',
          resourceId: mockPayment.id,
          resourceType: 'payment',
          status: 'COMPLETED',
          metadata: expect.objectContaining({
            processorResponse: response,
            processorId: mockProcessorConfig.processorId,
          }),
        })
      );

      // No notification should be sent for successful submission without approval required
      expect(mockedNotificationService.sendNotification).not.toHaveBeenCalled();
    });

    it('should handle processor errors and notify all services', async () => {
      const mockError = new Error('Processor Error');
      // Mock API error response
      mockedApi.post.mockRejectedValue(mockError);

      // Mock Bill Pay Service response
      mockedBillPayService.updatePaymentStatus.mockImplementation((id, status, metadata) => {
        return Promise.resolve({ ...mockPayment, status });
      });

      // Mock Audit Service response
      mockedAuditService.logEvent.mockResolvedValue(undefined);

      // Mock Notification Service response
      mockedNotificationService.sendNotification.mockResolvedValue({
        id: 'test_notification_1',
        recipientId: mockPayment.clientId,
        type: 'PAYMENT_FAILED' as NotificationType,
        status: 'SENT',
        channel: 'email',
        sentAt: new Date().toISOString(),
      } as NotificationResponse);

      // Submit payment and expect error
      await expect(paymentProcessorService.submitPayment(mockPayment))
        .rejects.toThrow('Processor Error');

      // Verify Bill Pay Service was updated with error status
      expect(mockedBillPayService.updatePaymentStatus).toHaveBeenCalledWith(
        mockPayment.id,
        PaymentStatus.FAILED,
        JSON.stringify({ error: mockError.message })
      );

      // Verify audit log
      expect(mockedAuditService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: 'PAYMENT_PROCESSOR_ERROR',
          resourceId: mockPayment.id,
          resourceType: 'payment',
          status: 'ERROR',
          metadata: expect.objectContaining({
            error: mockError.message,
            processorId: mockProcessorConfig.processorId,
          }),
        })
      );

      // Verify error notification was sent
      expect(mockedNotificationService.sendNotification).toHaveBeenCalledWith({
        type: 'PAYMENT_FAILED' as NotificationType,
        recipientId: mockPayment.clientId,
        data: {
          paymentId: mockPayment.id,
          error: mockError.message,
        },
      } as NotificationRequest);
    });
  });

  describe('Webhook Processing Flow', () => {
    it('should process webhooks and update all services', async () => {
      const webhookEvent: ProcessorWebhookEvent = {
        eventId: 'test_event_1',
        paymentId: mockPayment.id,
        processorId: mockProcessorConfig.processorId,
        status: 'COMPLETED',
        timestamp: new Date().toISOString(),
        metadata: {
          clientId: mockPayment.clientId,
          amount: mockPayment.amount,
          currency: mockPayment.currency,
          completedAt: new Date().toISOString(),
        },
      };

      // Mock Bill Pay Service response
      mockedBillPayService.updatePaymentStatus.mockImplementation((id, status, metadata) => {
        return Promise.resolve({ ...mockPayment, status });
      });

      // Mock Audit Service response
      mockedAuditService.logEvent.mockResolvedValue(undefined);

      // Mock Notification Service response
      mockedNotificationService.sendNotification.mockResolvedValue({
        id: 'test_notification_2',
        recipientId: mockPayment.clientId,
        type: 'PAYMENT_COMPLETED' as NotificationType,
        status: 'SENT',
        channel: 'email',
        sentAt: new Date().toISOString(),
      } as NotificationResponse);

      // Process webhook
      await paymentProcessorService.handleWebhook(webhookEvent);

      // Verify Bill Pay Service was updated
      expect(mockedBillPayService.updatePaymentStatus).toHaveBeenCalledWith(
        mockPayment.id,
        'COMPLETED',
        JSON.stringify({ processorMetadata: webhookEvent.metadata })
      );

      // Verify audit log
      expect(mockedAuditService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: 'PAYMENT_PROCESSOR_WEBHOOK',
          resourceId: mockPayment.id,
          resourceType: 'payment',
          status: 'PROCESSED',
          metadata: expect.objectContaining({
            processorStatus: 'COMPLETED',
            updatedAt: expect.any(String),
          }),
        })
      );

      // Verify completion notification was sent
      expect(mockedNotificationService.sendNotification).toHaveBeenCalledWith({
        type: 'PAYMENT_COMPLETED' as NotificationType,
        recipientId: mockPayment.clientId,
        data: {
          paymentId: mockPayment.id,
          amount: mockPayment.amount,
          currency: mockPayment.currency,
          completedAt: expect.any(String),
        },
      } as NotificationRequest);
    });

    it('should handle invalid webhooks gracefully', async () => {
      const invalidWebhook: ProcessorWebhookEvent = {
        eventId: 'invalid_event',
        paymentId: 'invalid_payment',
        processorId: '', // Invalid processor ID
        status: 'COMPLETED',
        timestamp: new Date().toISOString(),
        metadata: {
          clientId: 'invalid_client',
          amount: 100,
          currency: 'USD',
        },
      };

      // Mock Bill Pay Service response
      mockedBillPayService.updatePaymentStatus.mockRejectedValue(new Error('Invalid processor ID'));

      // Mock Audit Service response
      mockedAuditService.logEvent.mockResolvedValue(undefined);

      // Process invalid webhook
      await expect(paymentProcessorService.handleWebhook(invalidWebhook))
        .rejects.toThrow('Invalid processor ID');

      // Verify error was logged
      expect(mockedAuditService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: 'PAYMENT_PROCESSOR_WEBHOOK',
          resourceId: invalidWebhook.paymentId,
          resourceType: 'payment',
          status: 'ERROR',
          metadata: expect.objectContaining({
            error: 'Invalid processor ID',
            event: invalidWebhook,
          }),
        })
      );

      // Verify no status update or notification was sent
      expect(mockedBillPayService.updatePaymentStatus).toHaveBeenCalledTimes(1);
      expect(mockedNotificationService.sendNotification).not.toHaveBeenCalled();
    });
  });
});

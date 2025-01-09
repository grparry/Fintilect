import api from '../api';
import {
  Payment,
  PaymentMethod,
  PaymentStatus,
  ProcessorResponse,
  ProcessorWebhookEvent,
  ProcessorConfig,
} from '../../types/bill-pay.types';
import { ApiSuccessResponse } from '../../types/api.types';
import { billPayService } from '../bill-pay.service';
import { auditService } from '../audit.service';
import { notificationService } from './notification.service';

class PaymentProcessorService {
  private readonly baseUrl = '/api/v1/processor';
  private processorConfig: ProcessorConfig | null = null;

  private async getConfig(): Promise<ProcessorConfig> {
    if (!this.processorConfig) {
      const response = await api.get<ProcessorConfig>(`${this.baseUrl}/config`);
      this.processorConfig = response.data;
    }
    return this.processorConfig;
  }

  public async submitPayment(payment: Payment): Promise<ProcessorResponse> {
    const config = await this.getConfig();
    
    try {
      // Pre-submission logging
      await auditService.logEvent({
        eventType: 'PAYMENT_PROCESSOR_SUBMIT',
        resourceId: payment.id,
        resourceType: 'payment',
        status: 'INITIATED',
        metadata: {
          amount: payment.amount,
          method: payment.method,
          processorId: config.processorId,
        },
      });

      // Submit to processor
      const response = await api.post<ProcessorResponse>(
        `${this.baseUrl}/submit`,
        {
          paymentId: payment.id,
          amount: payment.amount,
          currency: payment.currency,
          method: payment.method,
          effectiveDate: payment.effectiveDate,
          priority: payment.priority,
          processorConfig: config,
        }
      );

      // Update payment status
      await billPayService.updatePaymentStatus(payment.id, response.data.status, 
        JSON.stringify({ processorResponse: response.data })
      );

      // Post-submission logging
      await auditService.logEvent({
        eventType: 'PAYMENT_PROCESSOR_SUBMIT',
        resourceId: payment.id,
        resourceType: 'payment',
        status: 'COMPLETED',
        metadata: {
          processorResponse: response.data,
          processorId: config.processorId,
        },
      });

      // Send notification if needed
      if (response.data.requiresApproval) {
        await notificationService.sendNotification({
          type: 'PAYMENT_APPROVAL_REQUIRED',
          recipientId: payment.clientId,
          data: {
            paymentId: payment.id,
            amount: payment.amount,
            currency: payment.currency,
          },
        });
      }

      return response.data;
    } catch (err) {
      // Error logging
      const error = err as Error;

      // Update payment status
      await billPayService.updatePaymentStatus(payment.id, PaymentStatus.FAILED, 
        JSON.stringify({ error: error.message })
      );

      await auditService.logEvent({
        eventType: 'PAYMENT_PROCESSOR_ERROR',
        resourceId: payment.id,
        resourceType: 'payment',
        status: 'ERROR',
        metadata: {
          error: error.message,
          processorId: config.processorId,
        },
      });

      // Send error notification
      await notificationService.sendNotification({
        type: 'PAYMENT_FAILED',
        recipientId: payment.clientId,
        data: {
          paymentId: payment.id,
          error: error.message,
        },
      });

      throw error;
    }
  }

  public async handleWebhook(event: ProcessorWebhookEvent): Promise<void> {
    const { paymentId, status, metadata } = event;

    try {
      // Log webhook receipt
      await auditService.logEvent({
        eventType: 'PAYMENT_PROCESSOR_WEBHOOK',
        resourceId: paymentId,
        resourceType: 'payment',
        status: 'RECEIVED',
        metadata: event,
      });

      // Update payment status
      await billPayService.updatePaymentStatus(paymentId, status as PaymentStatus, 
        JSON.stringify({ processorMetadata: metadata })
      );

      // Send notifications based on status
      switch (status) {
        case PaymentStatus.COMPLETED:
          await notificationService.sendNotification({
            type: 'PAYMENT_COMPLETED',
            recipientId: metadata.clientId,
            data: {
              paymentId,
              amount: metadata.amount,
              currency: metadata.currency,
              completedAt: metadata.completedAt,
            },
          });
          break;

        case PaymentStatus.FAILED:
          await notificationService.sendNotification({
            type: 'PAYMENT_FAILED',
            recipientId: metadata.clientId,
            data: {
              paymentId,
              amount: metadata.amount,
              currency: metadata.currency,
              error: metadata.error,
            },
          });
          break;

        case PaymentStatus.PENDING_APPROVAL:
          await notificationService.sendNotification({
            type: 'PAYMENT_APPROVAL_REQUIRED',
            recipientId: metadata.clientId,
            data: {
              paymentId,
              amount: metadata.amount,
              currency: metadata.currency,
            },
          });
          break;
      }

      // Log webhook processing completion
      await auditService.logEvent({
        eventType: 'PAYMENT_PROCESSOR_WEBHOOK',
        resourceId: paymentId,
        resourceType: 'payment',
        status: 'PROCESSED',
        metadata: {
          processorStatus: status,
          updatedAt: new Date().toISOString(),
        },
      });
    } catch (err) {
      const error = err as Error;
      await auditService.logEvent({
        eventType: 'PAYMENT_PROCESSOR_WEBHOOK',
        resourceId: paymentId,
        resourceType: 'payment',
        status: 'ERROR',
        metadata: {
          error: error.message,
          event,
        },
      });

      throw error;
    }
  }

  public async getPaymentStatus(paymentId: string): Promise<ProcessorResponse> {
    const config = await this.getConfig();

    try {
      const response = await api.get<ProcessorResponse>(
        `${this.baseUrl}/status/${paymentId}`
      );

      await auditService.logEvent({
        eventType: 'PAYMENT_PROCESSOR_STATUS',
        resourceId: paymentId,
        resourceType: 'payment',
        status: 'COMPLETED',
        metadata: {
          processorStatus: response.data.status,
          processorId: config.processorId,
        },
      });

      return response.data;
    } catch (err) {
      const error = err as Error;
      await auditService.logEvent({
        eventType: 'PAYMENT_PROCESSOR_STATUS',
        resourceId: paymentId,
        resourceType: 'payment',
        status: 'ERROR',
        metadata: {
          error: error.message,
          processorId: config.processorId,
        },
      });

      throw error;
    }
  }
}

export const paymentProcessorService = new PaymentProcessorService();

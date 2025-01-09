import api from './api';
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
  PaymentValidationResult,
} from '../types/bill-pay.types';
import {
  ApiPaginatedResponse,
  ApiSuccessResponse,
  ApiPaginationMeta,
} from '../types/api.types';
import { billPaySecurityService } from './bill-pay-security.service';
import { BillPaySecuritySettings } from '../types/security.types';
import { auditService } from './audit.service'; // Import auditService

interface AuditLogRequest {
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
  page?: number;
  pageSize?: number;
}

interface BillPayResponse {
  logs: AuditLog[];
  total: number;
  page: number;
  totalPages: number;
  pageSize: number;
}

interface StatsRequest {
  startDate?: string;
  endDate?: string;
  method?: PaymentMethod[];
}

class BillPayService {
  private readonly baseUrl = '/api/v2/bill-pay';

  private async validateSecurity(action: string): Promise<void> {
    try {
      const settings = await billPaySecurityService.getSettings();
      const userId = await billPaySecurityService.getCurrentUserId();
      
      // Check IP whitelist if enabled
      if (settings.ipWhitelist.enabled) {
        const isAllowed = await billPaySecurityService.validateIP();
        if (!isAllowed) {
          await auditService.logEvent({
            eventType: 'SECURITY_IP_BLOCKED',
            resourceId: userId,
            resourceType: 'security',
            status: 'ERROR',
            metadata: {
              action,
              ipAddress: await billPaySecurityService.getCurrentIP(),
            },
          });
          throw new Error('IP address not authorized');
        }
      }

      // Check MFA requirement
      if (settings.loginPolicy.requireMFA && this.requiresMFA(action)) {
        const isVerified = await billPaySecurityService.verifyMFA();
        if (!isVerified) {
          await auditService.logEvent({
            eventType: 'SECURITY_MFA_REQUIRED',
            resourceId: userId,
            resourceType: 'security',
            status: 'ERROR',
            metadata: {
              action,
              requiresMFA: true,
            },
          });
          throw new Error('MFA verification required');
        }
      }

      // Check rate limits
      const isRateLimited = await billPaySecurityService.checkRateLimit(action);
      if (isRateLimited) {
        await auditService.logEvent({
          eventType: 'SECURITY_RATE_LIMITED',
          resourceId: userId,
          resourceType: 'security',
          status: 'ERROR',
          metadata: {
            action,
            limit: billPaySecurityService.getRateLimit(action),
          },
        });
        throw new Error('Rate limit exceeded');
      }

      // Log successful security validation
      await auditService.logEvent({
        eventType: 'SECURITY_VALIDATION',
        resourceId: userId,
        resourceType: 'security',
        status: 'COMPLETED',
        metadata: {
          action,
          ipAddress: await billPaySecurityService.getCurrentIP(),
          mfaVerified: true,
        },
      });
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Unknown error occurred';
      const userId = await billPaySecurityService.getCurrentUserId();
      await auditService.logEvent({
        eventType: 'SECURITY_ERROR',
        resourceId: userId,
        resourceType: 'security',
        status: 'ERROR',
        metadata: {
          action,
          error,
        },
      });
      throw err;
    }
  }

  async createPayment(payment: Partial<Payment>): Promise<Payment> {
    try {
      await this.validateSecurity('createPayment');
      const response = await api.post<ApiSuccessResponse<Payment>>(
        `${this.baseUrl}/payments`,
        payment
      );
      const userId = await billPaySecurityService.getCurrentUserId();

      await auditService.logEvent({
        eventType: 'PAYMENT_CREATED',
        resourceId: response.data.data.id,
        resourceType: 'payment',
        status: 'COMPLETED',
        metadata: {
          amount: payment.amount,
          currency: payment.currency,
          method: payment.method,
          clientId: payment.clientId,
          payeeId: payment.payeeId,
          userId,
        },
      });

      return response.data.data;
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Unknown error occurred';
      const userId = await billPaySecurityService.getCurrentUserId();
      await auditService.logEvent({
        eventType: 'PAYMENT_CREATE_ERROR',
        resourceId: userId,
        resourceType: 'payment',
        status: 'ERROR',
        metadata: {
          error,
          payment,
          userId,
        },
      });
      throw err;
    }
  }

  private requiresMFA(action: string): boolean {
    const mfaRequiredActions = [
      'createPayment',
      'cancelPayment',
      'updatePaymentStatus',
      'updateConfig',
    ];
    return mfaRequiredActions.includes(action);
  }

  async getAuditLogs(params: AuditLogRequest): Promise<BillPayResponse> {
    const response = await api.get<ApiPaginatedResponse<AuditLog[]>>(
      `${this.baseUrl}/audit-log`,
      { params }
    );

    const { data, meta } = response.data;

    return {
      logs: data,
      total: meta.totalCount,
      page: meta.currentPage,
      totalPages: meta.totalPages,
      pageSize: meta.pageSize,
    };
  }

  async getConfig(): Promise<BillPayConfig> {
    const response = await api.get<ApiSuccessResponse<BillPayConfig>>(
      `${this.baseUrl}/config`
    );
    return response.data.data;
  }

  async updateConfig(config: Partial<BillPayConfig>): Promise<BillPayConfig> {
    await this.validateSecurity('updateConfig');
    const response = await api.patch<ApiSuccessResponse<BillPayConfig>>(
      `${this.baseUrl}/config`,
      config
    );
    return response.data.data;
  }

  async getStats(params: StatsRequest): Promise<BillPayStats> {
    const response = await api.get<ApiSuccessResponse<BillPayStats>>(
      `${this.baseUrl}/stats`,
      { params }
    );
    return response.data.data;
  }

  async enableBillPay(): Promise<void> {
    await this.validateSecurity('enableBillPay');
    
    await auditService.logEvent({
      eventType: 'SYSTEM_ENABLE',
      resourceId: 'bill-pay',
      resourceType: 'system',
      status: 'INITIATED',
    });

    try {
      await api.post<ApiSuccessResponse<void>>(`${this.baseUrl}/enable`);
      
      await auditService.logEvent({
        eventType: 'SYSTEM_ENABLE',
        resourceId: 'bill-pay',
        resourceType: 'system',
        status: 'COMPLETED',
        metadata: {
          userId: await billPaySecurityService.getCurrentUserId(),
        },
      });
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Unknown error occurred';
      await auditService.logEvent({
        eventType: 'SYSTEM_ENABLE',
        resourceId: 'bill-pay',
        resourceType: 'system',
        status: 'ERROR',
        metadata: {
          error,
          userId: await billPaySecurityService.getCurrentUserId(),
        },
      });
      throw err;
    }
  }

  async disableBillPay(): Promise<void> {
    await this.validateSecurity('disableBillPay');
    
    await auditService.logEvent({
      eventType: 'SYSTEM_DISABLE',
      resourceId: 'bill-pay',
      resourceType: 'system',
      status: 'INITIATED',
    });

    try {
      await api.post<ApiSuccessResponse<void>>(`${this.baseUrl}/disable`);
      
      await auditService.logEvent({
        eventType: 'SYSTEM_DISABLE',
        resourceId: 'bill-pay',
        resourceType: 'system',
        status: 'COMPLETED',
        metadata: {
          userId: await billPaySecurityService.getCurrentUserId(),
        },
      });
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Unknown error occurred';
      await auditService.logEvent({
        eventType: 'SYSTEM_DISABLE',
        resourceId: 'bill-pay',
        resourceType: 'system',
        status: 'ERROR',
        metadata: {
          error,
          userId: await billPaySecurityService.getCurrentUserId(),
        },
      });
      throw err;
    }
  }

  async resetBillPay(): Promise<void> {
    await api.post<ApiSuccessResponse<void>>(`${this.baseUrl}/reset`);
  }

  async getPaymentDetails(paymentId: string): Promise<Payment> {
    const response = await api.get<ApiSuccessResponse<Payment>>(
      `${this.baseUrl}/payments/${paymentId}`
    );
    return response.data.data;
  }

  async updatePaymentStatus(
    paymentId: string,
    status: PaymentStatus,
    notes?: string
  ): Promise<Payment> {
    await this.validateSecurity('updatePaymentStatus');
    
    await auditService.logEvent({
      eventType: 'PAYMENT_STATUS_UPDATE',
      resourceId: paymentId,
      resourceType: 'payment',
      status: 'INITIATED',
      metadata: { newStatus: status, notes },
    });

    try {
      const response = await api.patch<ApiSuccessResponse<Payment>>(
        `${this.baseUrl}/payments/${paymentId}/status`,
        { status, notes }
      );

      await auditService.logEvent({
        eventType: 'PAYMENT_STATUS_UPDATE',
        resourceId: paymentId,
        resourceType: 'payment',
        status: 'COMPLETED',
        metadata: {
          oldStatus: response.data.data.status,
          newStatus: status,
          notes,
          userId: await billPaySecurityService.getCurrentUserId(),
        },
      });

      return response.data.data;
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Unknown error occurred';
      await auditService.logEvent({
        eventType: 'PAYMENT_STATUS_UPDATE',
        resourceId: paymentId,
        resourceType: 'payment',
        status: 'ERROR',
        metadata: {
          error,
          attemptedStatus: status,
          notes,
          userId: await billPaySecurityService.getCurrentUserId(),
        },
      });
      throw err;
    }
  }

  async cancelPayment(paymentId: string, reason?: string): Promise<Payment> {
    await this.validateSecurity('cancelPayment');
    
    await auditService.logEvent({
      eventType: 'PAYMENT_CANCEL',
      resourceId: paymentId,
      resourceType: 'payment',
      status: 'INITIATED',
      metadata: { reason },
    });

    try {
      const response = await api.post<ApiSuccessResponse<Payment>>(
        `${this.baseUrl}/payments/${paymentId}/cancel`,
        { reason }
      );

      await auditService.logEvent({
        eventType: 'PAYMENT_CANCEL',
        resourceId: paymentId,
        resourceType: 'payment',
        status: 'COMPLETED',
        metadata: {
          reason,
          userId: await billPaySecurityService.getCurrentUserId(),
        },
      });

      return response.data.data;
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Unknown error occurred';
      await auditService.logEvent({
        eventType: 'PAYMENT_CANCEL',
        resourceId: paymentId,
        resourceType: 'payment',
        status: 'ERROR',
        metadata: {
          error,
          reason,
          userId: await billPaySecurityService.getCurrentUserId(),
        },
      });
      throw err;
    }
  }

  async submitBatchPayments(
    payments: Array<Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<{
    successful: Payment[];
    failed: Array<{
      payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;
      error: string;
    }>;
  }> {
    const response = await api.post<
      ApiSuccessResponse<{
        successful: Payment[];
        failed: Array<{
          payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;
          error: string;
        }>;
      }>
    >(`${this.baseUrl}/payments/batch`, { payments });
    return response.data.data;
  }

  async validatePayment(
    payment: Partial<Payment>
  ): Promise<PaymentValidationResult> {
    const response = await api.post<ApiSuccessResponse<PaymentValidationResult>>(
      `${this.baseUrl}/payments/validate`,
      payment
    );
    return response.data.data;
  }

  async getPaymentHistory(paymentId: string): Promise<PaymentHistory[]> {
    const response = await api.get<ApiSuccessResponse<PaymentHistory[]>>(
      `${this.baseUrl}/payments/${paymentId}/history`
    );
    return response.data.data;
  }

  async searchPayments(filters: PaymentFilters): Promise<ApiPaginatedResponse<Payment[]>> {
    const response = await api.get<ApiPaginatedResponse<Payment[]>>(
      `${this.baseUrl}/payments/search`,
      { params: filters }
    );
    return response.data;
  }

  async requestPaymentConfirmation(
    request: PaymentConfirmationRequest
  ): Promise<PaymentConfirmationResponse> {
    const response = await api.post<ApiSuccessResponse<PaymentConfirmationResponse>>(
      `${this.baseUrl}/payments/${request.paymentId}/confirm`,
      request
    );
    return response.data.data;
  }

  async verifyPaymentConfirmation(
    paymentId: string,
    code: string
  ): Promise<PaymentConfirmationResponse> {
    const response = await api.post<ApiSuccessResponse<PaymentConfirmationResponse>>(
      `${this.baseUrl}/payments/${paymentId}/verify`,
      { code }
    );
    return response.data.data;
  }
}

export const billPayService = new BillPayService();

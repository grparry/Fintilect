import { IPaymentService } from '../../interfaces/IPaymentService';
import {
  PendingPayment,
  PendingPaymentSummary,
  PendingPaymentSearchRequest,
  PaymentStatus,
  PaymentMethod,
  Priority,
  PaymentHistory,
  PaginatedResponse,
  PaymentConfirmationResponse
} from '../../../types/bill-pay.types';
import { BaseService } from './real/BaseService';

export class PaymentService extends BaseService implements IPaymentService {
  constructor(basePath: string = '/api/v1/payments') {
    super(basePath);
  }

  async getPendingPayments(request: PendingPaymentSearchRequest): Promise<PaginatedResponse<PendingPayment>> {
    try {
      const response = await this.get<PaginatedResponse<PendingPayment>>('/pending', {
        params: {
          status: request.status,
          method: request.method,
          startDate: request.startDate || new Date().toISOString(),
          endDate: request.endDate || new Date().toISOString(),
          page: request.page || 1,
          limit: request.limit || 10
        }
      });

      return {
        data: response.data || [],
        total: response.total || 0,
        page: response.page || 1,
        limit: response.limit || 10
      };
    } catch (error) {
      console.error('Failed to fetch pending payments:', error);
      return {
        data: [],
        total: 0,
        page: request.page || 1,
        limit: request.limit || 10
      };
    }
  }

  async getPendingPaymentsSummary(request: PendingPaymentSearchRequest): Promise<PendingPaymentSummary> {
    try {
      const summary = await this.get<PendingPaymentSummary>('/pending/summary', {
        params: {
          startDate: request.startDate || new Date().toISOString(),
          endDate: request.endDate || new Date().toISOString()
        }
      });

      return {
        byMethod: {
          [PaymentMethod.ACH]: summary.byMethod?.[PaymentMethod.ACH] || { count: 0, amount: 0 },






          [PaymentMethod.ACH]: summary.byMethod?.[PaymentMethod.ACH] || { count: 0, amount: 0 },
          [PaymentMethod.WIRE]: summary.byMethod?.[PaymentMethod.WIRE] || { count: 0, amount: 0 },
          [PaymentMethod.CHECK]: summary.byMethod?.[PaymentMethod.CHECK] || { count: 0, amount: 0 },
          [PaymentMethod.CARD]: summary.byMethod?.[PaymentMethod.CARD] || { count: 0, amount: 0 },
          [PaymentMethod.RTP]: summary.byMethod?.[PaymentMethod.RTP] || { count: 0, amount: 0 }
          [PaymentStatus.PENDING]: summary.byStatus?.[PaymentStatus.PENDING] || 0,
          [PaymentStatus.PROCESSING]: summary.byStatus?.[PaymentStatus.PROCESSING] || 0,
          [PaymentStatus.COMPLETED]: summary.byStatus?.[PaymentStatus.COMPLETED] || 0,
          [PaymentStatus.FAILED]: summary.byStatus?.[PaymentStatus.FAILED] || 0,
          [PaymentStatus.CANCELLED]: summary.byStatus?.[PaymentStatus.CANCELLED] || 0,
          [PaymentStatus.EXPIRED]: summary.byStatus?.[PaymentStatus.EXPIRED] || 0,
          [PaymentStatus.PENDING_APPROVAL]: summary.byStatus?.[PaymentStatus.PENDING_APPROVAL] || 0,
          [PaymentStatus.DRAFT]: summary.byStatus?.[PaymentStatus.DRAFT] || 0,
          [PaymentStatus.APPROVED]: summary.byStatus?.[PaymentStatus.APPROVED] || 0,
          [PaymentStatus.REJECTED]: summary.byStatus?.[PaymentStatus.REJECTED] || 0,
          [PaymentStatus.SUBMITTED]: summary.byStatus?.[PaymentStatus.SUBMITTED] || 0,
          [PaymentStatus.SCHEDULED]: summary.byStatus?.[PaymentStatus.SCHEDULED] || 0,
          [PaymentStatus.RETURNED]: summary.byStatus?.[PaymentStatus.RETURNED] || 0,
          [PaymentStatus.STOP_PAYMENT]: summary.byStatus?.[PaymentStatus.STOP_PAYMENT] || 0,
          [PaymentStatus.VOID]: summary.byStatus?.[PaymentStatus.VOID] || 0,
          [PaymentStatus.HOLD]: summary.byStatus?.[PaymentStatus.HOLD] || 0,
          [PaymentStatus.SUSPENDED]: summary.byStatus?.[PaymentStatus.SUSPENDED] || 0,
          [PaymentStatus.REFUNDED]: summary.byStatus?.[PaymentStatus.REFUNDED] || 0,
          [PaymentStatus.PARTIALLY_REFUNDED]: summary.byStatus?.[PaymentStatus.PARTIALLY_REFUNDED] || 0,
          [PaymentStatus.CHARGEBACK]: summary.byStatus?.[PaymentStatus.CHARGEBACK] || 0
          [Priority.HIGH]: summary.byPriority?.[Priority.HIGH] || 0,
          [Priority.MEDIUM]: summary.byPriority?.[Priority.MEDIUM] || 0,
          [Priority.LOW]: summary.byPriority?.[Priority.LOW] || 0
          [PaymentMethod.ACH]: { count: 0, amount: 0 },
          [PaymentMethod.WIRE]: { count: 0, amount: 0 },
          [PaymentMethod.CHECK]: { count: 0, amount: 0 },
          [PaymentMethod.CARD]: { count: 0, amount: 0 },
          [PaymentMethod.RTP]: { count: 0, amount: 0 }
          [PaymentStatus.PENDING]: 0,
          [PaymentStatus.PROCESSING]: 0,
          [PaymentStatus.COMPLETED]: 0,
          [PaymentStatus.FAILED]: 0,
          [PaymentStatus.CANCELLED]: 0,
          [PaymentStatus.EXPIRED]: 0,
          [PaymentStatus.PENDING_APPROVAL]: 0,
          [PaymentStatus.DRAFT]: 0,
          [PaymentStatus.APPROVED]: 0,
          [PaymentStatus.REJECTED]: 0,
          [PaymentStatus.SUBMITTED]: 0,
          [PaymentStatus.SCHEDULED]: 0,
          [PaymentStatus.RETURNED]: 0,
          [PaymentStatus.STOP_PAYMENT]: 0,
          [PaymentStatus.VOID]: 0,
          [PaymentStatus.HOLD]: 0,
          [PaymentStatus.SUSPENDED]: 0,
          [PaymentStatus.REFUNDED]: 0,
          [PaymentStatus.PARTIALLY_REFUNDED]: 0,
          [PaymentStatus.CHARGEBACK]: 0
          [Priority.HIGH]: 0,
          [Priority.MEDIUM]: 0,
          [Priority.LOW]: 0








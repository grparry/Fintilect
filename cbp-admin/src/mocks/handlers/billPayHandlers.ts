import { http, HttpResponse } from 'msw';
import dayjs from 'dayjs';
import {
  AuditLog,
  Payment,
  PaymentStatus,
  PaymentConfirmationRequest,
  PaymentConfirmationResponse,
  ConfirmationStatus,
  PendingPayment,
  PendingPaymentSearchRequest,
  PendingPaymentListResponse,
  PendingPaymentSummary,
  PendingPaymentApproval,
  PendingPaymentRejection,
  PaymentHistory
} from '../../types/bill-pay.types';
import { mockDashboardStats, generateMockTrends } from '../bill-pay/dashboard';
import { mockPayments, mockPendingPayments, mockPaymentHistory } from '../bill-pay/payments';

// Track confirmation attempts
const confirmationAttempts = new Map<string, {
  attempts: number;
  expiresAt: string;
  method: string;
  status: ConfirmationStatus;
}>();

const MAX_CONFIRMATION_ATTEMPTS = 3;
const CONFIRMATION_EXPIRY_MINUTES = 5;

// Mock audit log data
const mockAuditLogs: AuditLog[] = [
  {
    id: 'audit_1',
    timestamp: '2024-12-30T16:00:00Z',
    action: 'PAYMENT_CREATED',
    userId: 'user_1',
    userName: 'John Doe',
    resourceType: 'payment',
    resourceId: 'pmt_123',
    details: { amount: 1000, payee: 'Acme Corp' },
    status: 'Success'
  },
  {
    id: 'audit_2',
    timestamp: '2024-12-30T16:30:00Z',
    action: 'PAYMENT_APPROVED',
    userId: 'user_2',
    userName: 'Jane Smith',
    resourceType: 'payment',
    resourceId: 'pmt_123',
    details: { notes: 'Approved for processing' },
    status: 'Success'
  }
];

export const billPayHandlers = [
  // Dashboard endpoints
  http.get('*/bill-pay/dashboard/stats', () => {
    return HttpResponse.json({
      success: true,
      data: mockDashboardStats()
    });
  }),

  http.get('*/bill-pay/dashboard/trends', ({ request }) => {
    const url = new URL(request.url);
    const days = parseInt(url.searchParams.get('days') || '7');
    
    return HttpResponse.json({
      success: true,
      data: generateMockTrends(days)
    });
  }),

  // Get all payments with filtering and pagination
  http.get('*/bill-pay/payments', ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '0')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const status = url.searchParams.get('status')?.split(',') || []
    const startDate = url.searchParams.get('startDate')
    const endDate = url.searchParams.get('endDate')
    const priority = url.searchParams.get('priority')?.split(',') || []
    const paymentType = url.searchParams.get('paymentType')?.split(',') || []
    const searchTerm = url.searchParams.get('searchTerm') || ''
    const sortBy = url.searchParams.get('sortBy')
    const sortOrder = url.searchParams.get('sortOrder') as 'asc' | 'desc'

    let filteredPayments = [...mockPayments]

    // Apply filters
    if (status.length > 0) {
      filteredPayments = filteredPayments.filter(payment => 
        status.includes(payment.status)
      )
    }

    if (startDate) {
      filteredPayments = filteredPayments.filter(payment =>
        dayjs(payment.effectiveDate).isAfter(startDate)
      )
    }

    if (endDate) {
      filteredPayments = filteredPayments.filter(payment =>
        dayjs(payment.effectiveDate).isBefore(endDate)
      )
    }

    if (priority.length > 0) {
      filteredPayments = filteredPayments.filter(payment =>
        priority.includes(payment.priority)
      )
    }

    if (paymentType.length > 0) {
      filteredPayments = filteredPayments.filter(payment =>
        paymentType.includes(payment.method)
      )
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredPayments = filteredPayments.filter(payment =>
        payment.payeeName.toLowerCase().includes(term) ||
        payment.clientName.toLowerCase().includes(term) ||
        payment.id.toLowerCase().includes(term)
      )
    }

    // Apply sorting
    if (sortBy) {
      filteredPayments.sort((a: any, b: any) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];
        const order = sortOrder === 'desc' ? -1 : 1;
        if (aVal < bVal) return -1 * order;
        if (aVal > bVal) return 1 * order;
        return 0;
      });
    }

    // Apply pagination
    const start = page * limit
    const end = start + limit
    const paginatedPayments = filteredPayments.slice(start, end)

    return HttpResponse.json({
      success: true,
      data: {
        items: paginatedPayments,
        total: filteredPayments.length,
        page,
        limit,
        hasMore: end < filteredPayments.length
      }
    });
  }),

  // Payment confirmation endpoint
  http.post('*/bill-pay/payments/:id/confirm', async ({ request, params }) => {
    const { id } = params;
    const confirmationRequest = await request.json() as PaymentConfirmationRequest;
    
    // Validate request
    if (!confirmationRequest.confirmationMethod || !confirmationRequest.code) {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'Bad Request',
      });
    }

    // Get or initialize confirmation attempts
    let confirmation = confirmationAttempts.get(id as string);
    if (!confirmation) {
      confirmation = {
        attempts: 0,
        expiresAt: new Date(Date.now() + CONFIRMATION_EXPIRY_MINUTES * 60000).toISOString(),
        method: confirmationRequest.confirmationMethod,
        status: ConfirmationStatus.PENDING
      };
      confirmationAttempts.set(id as string, confirmation);
    }

    // Check expiration
    if (new Date(confirmation.expiresAt) < new Date()) {
      confirmation.status = ConfirmationStatus.EXPIRED;
      return HttpResponse.json({
        success: false,
        confirmationStatus: ConfirmationStatus.EXPIRED,
        message: 'Confirmation code has expired',
        attempts: confirmation.attempts,
        maxAttempts: MAX_CONFIRMATION_ATTEMPTS,
        expiresAt: confirmation.expiresAt
      } as PaymentConfirmationResponse, { status: 400 });
    }

    // Check max attempts
    if (confirmation.attempts >= MAX_CONFIRMATION_ATTEMPTS) {
      confirmation.status = ConfirmationStatus.FAILED;
      return HttpResponse.json({
        success: false,
        confirmationStatus: ConfirmationStatus.FAILED,
        message: 'Maximum confirmation attempts exceeded',
        attempts: confirmation.attempts,
        maxAttempts: MAX_CONFIRMATION_ATTEMPTS,
        expiresAt: confirmation.expiresAt
      } as PaymentConfirmationResponse, { status: 400 });
    }

    // Validate confirmation code (mock validation)
    const isValidCode = confirmationRequest.code === '123456' || confirmationRequest.code === 'valid_test_code';
    confirmation.attempts++;

    if (!isValidCode) {
      return HttpResponse.json({
        success: false,
        confirmationStatus: ConfirmationStatus.PENDING,
        message: 'Invalid confirmation code',
        attempts: confirmation.attempts,
        maxAttempts: MAX_CONFIRMATION_ATTEMPTS,
        expiresAt: confirmation.expiresAt
      } as PaymentConfirmationResponse, { status: 400 });
    }

    // Update payment status and add to history
    const payment = mockPayments.find(p => p.id === id);
    if (payment) {
      payment.status = PaymentStatus.APPROVED;
      
      const historyEntry: PaymentHistory = {
        paymentId: id as string,
        action: 'payment_confirmed',
        performedBy: confirmationRequest.userId || 'system',
        timestamp: new Date().toISOString(),
        details: {
          amount: payment.amount,
          currency: payment.currency,
          method: payment.method,
          notes: `Payment confirmed via ${confirmationRequest.confirmationMethod}`
        }
      };

      mockPaymentHistory.push(historyEntry);
    }

    // Return success response
    return HttpResponse.json({
      success: true,
      confirmationStatus: ConfirmationStatus.VERIFIED,
      message: 'Payment confirmed successfully',
      attempts: confirmation.attempts,
      maxAttempts: MAX_CONFIRMATION_ATTEMPTS,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes from now
    } as PaymentConfirmationResponse);
  }),

  // Get payment history
  http.get('*/bill-pay/payments/:id/history', ({ params }) => {
    const { id } = params;
    const history = mockPaymentHistory.filter(h => h.paymentId === id);
    
    return HttpResponse.json({
      success: true,
      data: history
    });
  }),

  // Get pending payments with filtering and pagination
  http.get('*/api/pending-payments', ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const status = url.searchParams.get('status')?.split(',') || []
    const startDate = url.searchParams.get('startDate')
    const endDate = url.searchParams.get('endDate')
    const priority = url.searchParams.get('priority')?.split(',') || []
    const paymentType = url.searchParams.get('paymentType')?.split(',') || []
    const searchTerm = url.searchParams.get('searchTerm') || ''
    const sortBy = url.searchParams.get('sortBy')
    const sortOrder = url.searchParams.get('sortOrder') as 'asc' | 'desc'

    let filteredPayments = [...mockPendingPayments]

    // Apply filters
    if (status.length > 0) {
      filteredPayments = filteredPayments.filter(payment => 
        status.includes(payment.status)
      )
    }

    if (priority.length > 0) {
      filteredPayments = filteredPayments.filter(payment =>
        priority.includes(payment.priority)
      )
    }

    if (paymentType.length > 0) {
      filteredPayments = filteredPayments.filter(payment =>
        paymentType.includes(payment.method)
      )
    }

    if (startDate) {
      filteredPayments = filteredPayments.filter(payment =>
        dayjs(payment.effectiveDate).isAfter(startDate)
      )
    }

    if (endDate) {
      filteredPayments = filteredPayments.filter(payment =>
        dayjs(payment.effectiveDate).isBefore(endDate)
      )
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredPayments = filteredPayments.filter(payment =>
        payment.payeeName.toLowerCase().includes(term) ||
        payment.clientName.toLowerCase().includes(term) ||
        payment.id.toLowerCase().includes(term)
      )
    }

    // Apply sorting
    if (sortBy) {
      filteredPayments.sort((a: any, b: any) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];
        const order = sortOrder === 'desc' ? -1 : 1;
        if (aVal < bVal) return -1 * order;
        if (aVal > bVal) return 1 * order;
        return 0;
      });
    }

    // Apply pagination
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedPayments = filteredPayments.slice(start, end)
    const currentPage = page
    const pageSize = limit

    return HttpResponse.json({
      success: true,
      data: paginatedPayments,
      total: filteredPayments.length,
      page: currentPage,
      limit: pageSize
    } as PendingPaymentListResponse);
  }),

  // Approve pending payment
  http.post('*/api/pending-payments/:id/approve', async ({ params, request }) => {
    const { id } = params;
    const approval = await request.json() as PendingPaymentApproval;
    const payment = mockPendingPayments.find(p => p.id === id);

    if (!payment) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Payment not found',
      });
    }

    payment.status = PaymentStatus.APPROVED;
    const historyEntry: PaymentHistory = {
      paymentId: id as string,
      action: 'payment_approved',
      performedBy: approval.approvedBy,
      timestamp: approval.approvedAt,
      details: {
        amount: payment.amount,
        currency: payment.currency,
        method: payment.method,
        notes: 'Payment approved'
      }
    };

    mockPaymentHistory.push(historyEntry);

    return HttpResponse.json({ success: true });
  }),

  // Reject pending payment
  http.post('*/api/pending-payments/:id/reject', async ({ params, request }) => {
    const { id } = params;
    const rejection = await request.json() as PendingPaymentRejection;
    const payment = mockPendingPayments.find(p => p.id === id);

    if (!payment) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Payment not found',
      });
    }

    payment.status = PaymentStatus.CANCELLED;
    const historyEntry: PaymentHistory = {
      paymentId: id as string,
      action: 'payment_rejected',
      performedBy: rejection.rejectedBy,
      timestamp: rejection.rejectedAt,
      details: {
        amount: payment.amount,
        currency: payment.currency,
        method: payment.method,
        notes: rejection.reason
      }
    };

    mockPaymentHistory.push(historyEntry);

    return HttpResponse.json({ success: true });
  }),

  // Bulk approve pending payments
  http.post('*/api/pending-payments/bulk-approve', async ({ request }) => {
    const { ids, ...approval } = await request.json() as { ids: string[] } & PendingPaymentApproval;

    ids.forEach(id => {
      const payment = mockPendingPayments.find(p => p.id === id);
      if (payment) {
        payment.status = PaymentStatus.APPROVED;
        const historyEntry: PaymentHistory = {
          paymentId: id as string,
          action: 'payment_approved',
          performedBy: approval.approvedBy,
          timestamp: approval.approvedAt,
          details: {
            amount: payment.amount,
            currency: payment.currency,
            method: payment.method,
            notes: 'Payment approved in batch'
          }
        };

        mockPaymentHistory.push(historyEntry);
      }
    });

    return HttpResponse.json({ success: true });
  }),

  // Bulk reject pending payments
  http.post('*/api/pending-payments/bulk-reject', async ({ request }) => {
    const { ids, ...rejection } = await request.json() as { ids: string[] } & PendingPaymentRejection;

    ids.forEach(id => {
      const payment = mockPendingPayments.find(p => p.id === id);
      if (payment) {
        payment.status = PaymentStatus.CANCELLED;
        const historyEntry: PaymentHistory = {
          paymentId: id as string,
          action: 'payment_rejected',
          performedBy: rejection.rejectedBy,
          timestamp: rejection.rejectedAt,
          details: {
            amount: payment.amount,
            currency: payment.currency,
            method: payment.method,
            notes: `Batch rejection: ${rejection.reason}`
          }
        };

        mockPaymentHistory.push(historyEntry);
      }
    });

    return HttpResponse.json({ success: true });
  }),

  // Get audit logs with filtering and pagination
  http.get('*/api/bill-pay/audit-log', ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('searchTerm') || '';
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');

    let filteredLogs = [...mockAuditLogs];

    // Apply search filter
    if (searchTerm) {
      filteredLogs = filteredLogs.filter(log => 
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.resourceId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply date filters
    if (startDate) {
      filteredLogs = filteredLogs.filter(log => 
        new Date(log.timestamp) >= new Date(startDate)
      );
    }
    if (endDate) {
      filteredLogs = filteredLogs.filter(log => 
        new Date(log.timestamp) <= new Date(endDate)
      );
    }

    return HttpResponse.json({
      success: true,
      data: filteredLogs,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    });
  }),
];

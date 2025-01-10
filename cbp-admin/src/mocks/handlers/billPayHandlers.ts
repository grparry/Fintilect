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
  PaymentHistory,
  AuditEventStatus
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
    status: AuditEventStatus.COMPLETED
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
    status: AuditEventStatus.COMPLETED
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
    const statusParam = url.searchParams.get('status');
    const status = statusParam ? statusParam.split(',').filter(Boolean) : [];
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
        status.some(s => s === payment.status)
      )
    }

    if (startDate) {
      filteredPayments = filteredPayments.filter(payment =>
        payment.effectiveDate >= startDate
      )
    }

    if (endDate) {
      filteredPayments = filteredPayments.filter(payment =>
        payment.effectiveDate <= endDate
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
      const term = searchTerm.toLowerCase()
      filteredPayments = filteredPayments.filter(payment =>
        payment.payeeName.toLowerCase().includes(term) ||
        payment.description?.toLowerCase().includes(term)
      )
    }

    // Sort payments
    if (sortBy) {
      filteredPayments.sort((a, b) => {
        const aValue = a[sortBy as keyof Payment]
        const bValue = b[sortBy as keyof Payment]
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        }
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
        }
        
        return 0
      })
    }

    // Paginate
    const start = page * limit
    const end = start + limit
    const paginatedPayments = filteredPayments.slice(start, end)

    return HttpResponse.json({
      success: true,
      data: {
        payments: paginatedPayments,
        total: filteredPayments.length,
        page,
        limit
      }
    });
  }),

  // Get payment by ID
  http.get<{ id: string }>('*/bill-pay/payments/:id', ({ params }) => {
    const { id } = params;
    const payment = mockPayments.find(p => p.id === id);

    if (!payment) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({
      success: true,
      data: payment
    });
  }),

  // Payment confirmation endpoint
  http.post<{ id: string }>('*/bill-pay/payments/:id/confirm', async ({ request, params }) => {
    const id = params.id;
    
    // Validate ID parameter
    if (!id) {
      return new HttpResponse(null, { 
        status: 400,
        statusText: 'Missing payment ID'
      });
    }

    const confirmationRequest = await request.json() as PaymentConfirmationRequest;
    
    // Validate request
    if (!confirmationRequest.method || !confirmationRequest.confirmationMethod) {
      return new HttpResponse(null, { 
        status: 400,
        statusText: 'Missing required fields'
      });
    }

    const existingAttempt = confirmationAttempts.get(id);
    const now = dayjs();

    if (existingAttempt) {
      // Check if expired
      if (now.isAfter(existingAttempt.expiresAt)) {
        const response: PaymentConfirmationResponse = {
          success: false,
          confirmationStatus: ConfirmationStatus.EXPIRED,
          message: 'Confirmation code has expired',
          attempts: existingAttempt.attempts,
          maxAttempts: MAX_CONFIRMATION_ATTEMPTS,
          expiresAt: existingAttempt.expiresAt
        };
        return HttpResponse.json(response);
      }

      // Check attempts
      if (existingAttempt.attempts >= MAX_CONFIRMATION_ATTEMPTS) {
        const response: PaymentConfirmationResponse = {
          success: false,
          confirmationStatus: ConfirmationStatus.FAILED,
          message: 'Maximum confirmation attempts exceeded',
          attempts: existingAttempt.attempts,
          maxAttempts: MAX_CONFIRMATION_ATTEMPTS,
          expiresAt: existingAttempt.expiresAt
        };
        return HttpResponse.json(response);
      }

      // Validate code if provided
      if (confirmationRequest.code) {
        existingAttempt.attempts += 1;
        
        if (confirmationRequest.code === '123456') { // Mock valid code
          const response: PaymentConfirmationResponse = {
            success: true,
            confirmationStatus: ConfirmationStatus.VERIFIED,
            message: 'Payment confirmed successfully',
            attempts: existingAttempt.attempts,
            maxAttempts: MAX_CONFIRMATION_ATTEMPTS,
            expiresAt: existingAttempt.expiresAt
          };
          return HttpResponse.json(response);
        } else {
          const response: PaymentConfirmationResponse = {
            success: false,
            confirmationStatus: ConfirmationStatus.FAILED,
            message: 'Invalid confirmation code',
            attempts: existingAttempt.attempts,
            maxAttempts: MAX_CONFIRMATION_ATTEMPTS,
            expiresAt: existingAttempt.expiresAt
          };
          return HttpResponse.json(response);
        }
      }
    }

    // Create new confirmation attempt
    const expiresAt = now.add(CONFIRMATION_EXPIRY_MINUTES, 'minute').toISOString();
    confirmationAttempts.set(id, {
      attempts: 0,
      expiresAt,
      method: confirmationRequest.confirmationMethod,
      status: ConfirmationStatus.PENDING
    });

    const response: PaymentConfirmationResponse = {
      success: true,
      confirmationStatus: ConfirmationStatus.PENDING,
      message: 'Confirmation code sent',
      attempts: 0,
      maxAttempts: MAX_CONFIRMATION_ATTEMPTS,
      expiresAt
    };

    return HttpResponse.json(response);
  }),

  // Get pending payments
  http.get('*/api/pending-payments', ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const statusParam = url.searchParams.get('status');
    const status = statusParam ? statusParam.split(',').filter(Boolean) : [];

    let filteredPayments = [...mockPendingPayments]

    // Apply filters
    if (status.length > 0) {
      filteredPayments = filteredPayments.filter(payment => 
        status.some(s => s === payment.status)
      )
    }

    // Calculate pagination
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedPayments = filteredPayments.slice(start, end)

    const response: PendingPaymentListResponse = {
      data: paginatedPayments,
      total: filteredPayments.length,
      page,
      limit
    }

    return HttpResponse.json(response)
  }),

  // Get pending payment by ID
  http.get<{ id: string }>('*/api/pending-payments/:id', ({ params }) => {
    const { id } = params;
    const payment = mockPendingPayments.find(p => p.id === id);

    if (!payment) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(payment)
  }),

  // Approve pending payment
  http.post<{ id: string }>('*/api/pending-payments/:id/approve', async ({ params, request }) => {
    const id = params.id;
    
    // Validate ID parameter
    if (!id) {
      return new HttpResponse(null, { 
        status: 400,
        statusText: 'Missing payment ID'
      });
    }

    const approval = await request.json() as PendingPaymentApproval;
    const payment = mockPendingPayments.find(p => p.id === id);

    if (!payment) {
      return new HttpResponse(null, { status: 404 });
    }

    // Update payment status
    payment.status = PaymentStatus.APPROVED;
    payment.updatedAt = new Date().toISOString();

    return HttpResponse.json({
      success: true,
      message: 'Payment approved successfully'
    });
  }),

  // Reject pending payment
  http.post<{ id: string }>('*/api/pending-payments/:id/reject', async ({ params, request }) => {
    const id = params.id;
    
    // Validate ID parameter
    if (!id) {
      return new HttpResponse(null, { 
        status: 400,
        statusText: 'Missing payment ID'
      });
    }

    const rejection = await request.json() as PendingPaymentRejection;
    const payment = mockPendingPayments.find(p => p.id === id);

    if (!payment) {
      return new HttpResponse(null, { status: 404 });
    }

    // Update payment status
    payment.status = PaymentStatus.REJECTED;
    payment.updatedAt = new Date().toISOString();

    return HttpResponse.json({
      success: true,
      message: 'Payment rejected successfully'
    });
  }),

  // Bulk approve pending payments
  http.post<{ ids: string[] }>('*/api/pending-payments/bulk-approve', async ({ request }) => {
    const { ids, ...approval } = await request.json() as { ids: string[] } & PendingPaymentApproval;

    ids.forEach(id => {
      const payment = mockPendingPayments.find(p => p.id === id);
      if (payment) {
        payment.status = PaymentStatus.APPROVED;
        payment.updatedAt = new Date().toISOString();
      }
    });

    return HttpResponse.json({
      success: true,
      message: `${ids.length} payments approved successfully`
    });
  }),

  // Bulk reject pending payments
  http.post<{ ids: string[] }>('*/api/pending-payments/bulk-reject', async ({ request }) => {
    const { ids, ...rejection } = await request.json() as { ids: string[] } & PendingPaymentRejection;

    ids.forEach(id => {
      const payment = mockPendingPayments.find(p => p.id === id);
      if (payment) {
        payment.status = PaymentStatus.REJECTED;
        payment.updatedAt = new Date().toISOString();
      }
    });

    return HttpResponse.json({
      success: true,
      message: `${ids.length} payments rejected successfully`
    });
  }),

  // Get payment history
  http.get<{ id: string }>('*/api/payments/:id/history', ({ params }) => {
    const { id } = params;
    const history = mockPaymentHistory.filter(h => h.paymentId === id);

    return HttpResponse.json({
      success: true,
      data: history
    });
  })
];

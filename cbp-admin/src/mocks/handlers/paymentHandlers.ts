import { http, HttpResponse } from 'msw';
import {
  PendingPayment,
  PendingPaymentSearchRequest,
  PendingPaymentSummary,
  PaymentMethod,
  Client,
  PayeeConversionFile,
  PayeeConversionRecord,
  PayeeConversionFileUploadResponse,
  PayeeConversionProgressResponse,
  PaymentStatus,
  PaymentConfirmationRequest,
  PaymentConfirmationResponse,
  ConfirmationStatus,
  Priority
} from '../../types/bill-pay.types';
import { mockPendingPayments } from '../payment-processing/mockPaymentData';
import { mockPayeeConversionFiles } from '../payment-processing/mockPayeeConversionData';

// Simple request ID generator
const generateRequestId = () => `req_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export const paymentHandlers = [
  // Get pending payments
  http.get('*/api/v1/payment/pending', async ({ request }) => {
    try {
      const url = new URL(request.url);
      const status = url.searchParams.get('status');
      const priority = url.searchParams.get('priority');
      const page = parseInt(url.searchParams.get('page') || '1');
      const limit = parseInt(url.searchParams.get('limit') || '10');
      const sortBy = url.searchParams.get('sortBy') || 'createdAt';
      const sortOrder = url.searchParams.get('sortOrder') || 'desc';

      console.log('Mock Handler - Request params:', {
        status,
        priority,
        page,
        limit,
        sortBy,
        sortOrder
      });

      console.log('Mock Handler - Initial payments:', mockPendingPayments);
      let filteredPayments = [...mockPendingPayments];

      if (status) {
        console.log('Mock Handler - Filtering by status:', status);
        filteredPayments = filteredPayments.filter(p => p.status === status);
      }

      if (priority) {
        console.log('Mock Handler - Filtering by priority:', priority);
        filteredPayments = filteredPayments.filter(p => p.priority === priority);
      }

      // Sort payments
      filteredPayments.sort((a, b) => {
        const aValue = a[sortBy as keyof PendingPayment];
        const bValue = b[sortBy as keyof PendingPayment];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        if (aValue instanceof Date && bValue instanceof Date) {
          return sortOrder === 'asc'
            ? aValue.getTime() - bValue.getTime()
            : bValue.getTime() - aValue.getTime();
        }
        
        return 0;
      });

      // Apply pagination
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedPayments = filteredPayments.slice(start, end);

      console.log('Mock Handler - Returning payments:', paginatedPayments);

      return HttpResponse.json({
        success: true,
        data: {
          items: paginatedPayments,
          total: filteredPayments.length,
          page,
          limit,
          pages: Math.ceil(filteredPayments.length / limit)
        },
        meta: {
          timestamp: new Date().toISOString(),
          requestId: generateRequestId()
        }
      });
    } catch (error) {
      console.error('Error in mock handler:', error);
      return new HttpResponse(
        JSON.stringify({ 
          success: false, 
          error: 'Internal server error' 
        }), 
        { status: 500 }
      );
    }
  }),

  // Get pending payments summary
  http.get('*/api/v1/payment/pending/summary', () => {
    const summary: PendingPaymentSummary = {
      totalAmount: mockPendingPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0),
      byStatus: {
        [PaymentStatus.PENDING]: mockPendingPayments.filter(p => p.status === PaymentStatus.PENDING).length,
        [PaymentStatus.APPROVED]: mockPendingPayments.filter(p => p.status === PaymentStatus.APPROVED).length,
        [PaymentStatus.REJECTED]: mockPendingPayments.filter(p => p.status === PaymentStatus.REJECTED).length,
        [PaymentStatus.PROCESSING]: mockPendingPayments.filter(p => p.status === PaymentStatus.PROCESSING).length,
        [PaymentStatus.COMPLETED]: mockPendingPayments.filter(p => p.status === PaymentStatus.COMPLETED).length,
        [PaymentStatus.FAILED]: mockPendingPayments.filter(p => p.status === PaymentStatus.FAILED).length,
        [PaymentStatus.CANCELLED]: mockPendingPayments.filter(p => p.status === PaymentStatus.CANCELLED).length
      },
      byPriority: {
        [Priority.HIGH]: mockPendingPayments.filter(p => p.priority === Priority.HIGH).length,
        [Priority.MEDIUM]: mockPendingPayments.filter(p => p.priority === Priority.MEDIUM).length,
        [Priority.LOW]: mockPendingPayments.filter(p => p.priority === Priority.LOW).length
      },
      byMethod: {
        [PaymentMethod.ACH]: {
          count: mockPendingPayments.filter(p => p.method === PaymentMethod.ACH).length,
          amount: mockPendingPayments.filter(p => p.method === PaymentMethod.ACH)
            .reduce((sum, payment) => sum + (payment.amount || 0), 0)
        },
        [PaymentMethod.WIRE]: {
          count: mockPendingPayments.filter(p => p.method === PaymentMethod.WIRE).length,
          amount: mockPendingPayments.filter(p => p.method === PaymentMethod.WIRE)
            .reduce((sum, payment) => sum + (payment.amount || 0), 0)
        },
        [PaymentMethod.CHECK]: {
          count: mockPendingPayments.filter(p => p.method === PaymentMethod.CHECK).length,
          amount: mockPendingPayments.filter(p => p.method === PaymentMethod.CHECK)
            .reduce((sum, payment) => sum + (payment.amount || 0), 0)
        },
        [PaymentMethod.CARD]: {
          count: mockPendingPayments.filter(p => p.method === PaymentMethod.CARD).length,
          amount: mockPendingPayments.filter(p => p.method === PaymentMethod.CARD)
            .reduce((sum, payment) => sum + (payment.amount || 0), 0)
        },
        [PaymentMethod.RTP]: {
          count: mockPendingPayments.filter(p => p.method === PaymentMethod.RTP).length,
          amount: mockPendingPayments.filter(p => p.method === PaymentMethod.RTP)
            .reduce((sum, payment) => sum + (payment.amount || 0), 0)
        }
      }
    };

    return HttpResponse.json({
      success: true,
      data: summary,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: generateRequestId()
      }
    });
  }),

  // Approve pending payment
  http.post('*/api/v1/payment/pending/:id/approve', async ({ params }) => {
    const { id } = params;
    const payment = mockPendingPayments.find(p => p.id === id);

    if (!payment) {
      return new HttpResponse(
        JSON.stringify({ 
          success: false, 
          error: 'Payment not found' 
        }), 
        { status: 404 }
      );
    }

    payment.status = PaymentStatus.APPROVED;
    payment.updatedAt = new Date().toISOString();

    return HttpResponse.json({
      success: true,
      data: payment,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: generateRequestId()
      }
    });
  }),

  // Reject pending payment
  http.post('*/api/v1/payment/pending/:id/reject', async ({ params }) => {
    const { id } = params;
    const payment = mockPendingPayments.find(p => p.id === id);

    if (!payment) {
      return new HttpResponse(
        JSON.stringify({ 
          success: false, 
          error: 'Payment not found' 
        }), 
        { status: 404 }
      );
    }

    payment.status = PaymentStatus.REJECTED;
    payment.updatedAt = new Date().toISOString();

    return HttpResponse.json({
      success: true,
      data: payment,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: generateRequestId()
      }
    });
  }),

  // Get payment by ID
  http.get('*/api/v1/payment/:id', ({ params }) => {
    try {
      const { id } = params;
      const payment = mockPendingPayments.find(p => p.id === id);

      if (!payment) {
        return new HttpResponse(
          JSON.stringify({ success: false, error: 'Payment not found' }),
          { status: 404 }
        );
      }

      return HttpResponse.json({
        success: true,
        data: payment
      });
    } catch (error) {
      console.error('Error in get payment by ID handler:', error);
      return new HttpResponse(
        JSON.stringify({ success: false, error: 'Internal server error' }),
        { status: 500 }
      );
    }
  }),

  // Confirm payment
  http.post('*/api/v1/payment/:id/confirm', async ({ params, request }) => {
    try {
      const { id } = params;
      const payment = mockPendingPayments.find(p => p.id === id);
      
      let confirmationRequest: PaymentConfirmationRequest;
      try {
        confirmationRequest = await request.json() as PaymentConfirmationRequest;
      } catch (error) {
        return new HttpResponse(
          JSON.stringify({ success: false, error: 'Invalid request body' }),
          { status: 400 }
        );
      }

      if (!payment) {
        return new HttpResponse(
          JSON.stringify({ success: false, error: 'Payment not found' }),
          { status: 404 }
        );
      }

      if (!confirmationRequest.code) {
        return new HttpResponse(
          JSON.stringify({ success: false, error: 'Confirmation code is required' }),
          { status: 400 }
        );
      }

      const response: PaymentConfirmationResponse = {
        success: true,
        confirmationStatus: ConfirmationStatus.VERIFIED,
        message: 'Payment confirmed successfully',
        attempts: 1,
        maxAttempts: 3,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString()
      };

      return HttpResponse.json(response);
    } catch (error) {
      console.error('Error in confirm payment handler:', error);
      return new HttpResponse(
        JSON.stringify({ success: false, error: 'Internal server error' }),
        { status: 500 }
      );
    }
  }),

  // Create payment
  http.post('*/api/v1/payment', async ({ request }) => {
    try {
      let paymentData: Omit<PendingPayment, 'id' | 'status' | 'createdAt' | 'updatedAt'>;
      try {
        paymentData = await request.json() as Omit<PendingPayment, 'id' | 'status' | 'createdAt' | 'updatedAt'>;
      } catch (error) {
        return new HttpResponse(
          JSON.stringify({ success: false, error: 'Invalid request body' }),
          { status: 400 }
        );
      }
      
      const newPayment: PendingPayment = {
        ...paymentData,
        id: Math.random().toString(36).substr(2, 9),
        status: PaymentStatus.PENDING,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      mockPendingPayments.push(newPayment);

      return new HttpResponse(
        JSON.stringify({
          success: true,
          data: newPayment
        }),
        { status: 201 }
      );
    } catch (error) {
      console.error('Error in create payment handler:', error);
      return new HttpResponse(
        JSON.stringify({ success: false, error: 'Internal server error' }),
        { status: 500 }
      );
    }
  }),

  // Update payment
  http.put('*/api/v1/payment/:id', async ({ params, request }) => {
    try {
      const { id } = params;
      let updates: Partial<PendingPayment>;
      try {
        updates = await request.json() as Partial<PendingPayment>;
      } catch (error) {
        return new HttpResponse(
          JSON.stringify({ success: false, error: 'Invalid request body' }),
          { status: 400 }
        );
      }

      const index = mockPendingPayments.findIndex(p => p.id === id);

      if (index === -1) {
        return new HttpResponse(
          JSON.stringify({ success: false, error: 'Payment not found' }),
          { status: 404 }
        );
      }

      mockPendingPayments[index] = {
        ...mockPendingPayments[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      return HttpResponse.json({
        success: true,
        data: mockPendingPayments[index]
      });
    } catch (error) {
      console.error('Error in update payment handler:', error);
      return new HttpResponse(
        JSON.stringify({ success: false, error: 'Internal server error' }),
        { status: 500 }
      );
    }
  }),

  // Delete payment
  http.delete('*/api/v1/payment/:id', ({ params }) => {
    try {
      const { id } = params;
      const index = mockPendingPayments.findIndex(p => p.id === id);

      if (index === -1) {
        return new HttpResponse(
          JSON.stringify({ success: false, error: 'Payment not found' }),
          { status: 404 }
        );
      }

      mockPendingPayments.splice(index, 1);

      return new HttpResponse(null, { status: 204 });
    } catch (error) {
      console.error('Error in delete payment handler:', error);
      return new HttpResponse(
        JSON.stringify({ success: false, error: 'Internal server error' }),
        { status: 500 }
      );
    }
  }),

  // Get payee conversion progress
  http.get('*/api/v1/payment/payee-conversion/:fileId/progress', () => {
    const progressResponse = {
      id: 'file_123',
      name: 'payees.csv',
      status: 'PROCESSING',
      validation: {
        totalRecords: 100,
        validRecords: 85,
        invalidRecords: 15,
        errors: [
          { field: 'accountNumber', message: 'Invalid account number format' },
          { field: 'routingNumber', message: 'Invalid routing number' }
        ],
        warnings: [
          { field: 'name', message: 'Name might contain special characters' }
        ]
      },
      createdAt: new Date().toISOString()
    };

    return HttpResponse.json({
      success: true,
      data: progressResponse,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: generateRequestId()
      }
    });
  }),

  // Get payee conversion records
  http.get('*/api/v1/payment/payee-conversion/:fileId/records', () => {
    const records: PayeeConversionRecord[] = [
      {
        id: 'record_1',
        fileId: 'file_123',
        payeeName: 'John Doe',
        payeeId: 'payee_1',
        status: 'PROCESSED',
        createdAt: new Date().toISOString(),
        processedAt: new Date().toISOString()
      },
      {
        id: 'record_2',
        fileId: 'file_123',
        payeeName: 'Jane Smith',
        status: 'FAILED',
        error: 'Invalid account number format',
        createdAt: new Date().toISOString()
      },
      {
        id: 'record_3',
        fileId: 'file_123',
        payeeName: 'Bob Wilson',
        status: 'PENDING',
        createdAt: new Date().toISOString()
      }
    ];

    return HttpResponse.json({
      success: true,
      data: records,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: generateRequestId()
      }
    });
  }),

  // Upload payee conversion file
  http.post('*/api/v1/payment/payee-conversion/upload', async ({ request }) => {
    try {
      const formData = await request.formData();
      const file = formData.get('file') as File;
      
      if (!file) {
        return new HttpResponse(
          JSON.stringify({ 
            success: false, 
            error: 'No file provided' 
          }),
          { status: 400 }
        );
      }

      const fileId = `file_${Date.now()}`;
      const uploadResponse = {
        id: fileId,
        name: file.name,
        status: 'PENDING',
        validation: {
          totalRecords: 100,
          validRecords: 95,
          invalidRecords: 5,
          errors: [
            { field: 'accountNumber', message: 'Invalid account number format' },
            { field: 'routingNumber', message: 'Invalid routing number' }
          ],
          warnings: [
            { field: 'name', message: 'Name might contain special characters' }
          ]
        },
        createdAt: new Date().toISOString()
      };

      return HttpResponse.json({
        success: true,
        data: uploadResponse,
        meta: {
          timestamp: new Date().toISOString(),
          requestId: generateRequestId()
        }
      });
    } catch (error) {
      console.error('Error in file upload handler:', error);
      return new HttpResponse(
        JSON.stringify({ 
          success: false, 
          error: 'Internal server error' 
        }),
        { status: 500 }
      );
    }
  }),
];

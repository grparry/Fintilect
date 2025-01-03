import { http } from 'msw';
import {
  PendingPayment,
  PaymentStatus,
  PendingPaymentFilters,
  Priority,
  PaymentMethod,
} from '../../types/bill-pay.types';
import { mockPendingPayments } from '../payment-processing/mockPaymentData';

export const pendingPaymentsHandlers = [
  http.get('/api/pending-payments', async ({ request }) => {
    const url = new URL(request.url);
    const filters: PendingPaymentFilters = {
      clientId: url.searchParams.get('clientId') || undefined,
      payeeId: url.searchParams.get('payeeId') || undefined,
      method: url.searchParams.get('method')?.split(',') as PaymentMethod[] || undefined,
      status: url.searchParams.get('status')?.split(',') as PaymentStatus[] || undefined,
      priority: url.searchParams.get('priority')?.split(',') as Priority[] || undefined,
      startDate: url.searchParams.get('startDate') || undefined,
      endDate: url.searchParams.get('endDate') || undefined,
      minAmount: url.searchParams.get('minAmount')
        ? parseFloat(url.searchParams.get('minAmount')!)
        : undefined,
      maxAmount: url.searchParams.get('maxAmount')
        ? parseFloat(url.searchParams.get('maxAmount')!)
        : undefined,
      page: url.searchParams.get('page') ? parseInt(url.searchParams.get('page')!) : 1,
      limit: url.searchParams.get('limit') ? parseInt(url.searchParams.get('limit')!) : 10,
      sortBy: url.searchParams.get('sortBy') || undefined,
      sortOrder: (url.searchParams.get('sortOrder') as 'asc' | 'desc') || undefined
    };

    let filteredPayments = [...mockPendingPayments];

    // Apply filters
    if (filters.status?.length) {
      filteredPayments = filteredPayments.filter((payment) =>
        filters.status!.includes(payment.status)
      );
    }

    if (filters.priority?.length) {
      filteredPayments = filteredPayments.filter((payment) =>
        filters.priority!.includes(payment.priority)
      );
    }

    if (filters.startDate) {
      filteredPayments = filteredPayments.filter(
        (payment) => new Date(payment.effectiveDate) >= new Date(filters.startDate!)
      );
    }

    if (filters.endDate) {
      filteredPayments = filteredPayments.filter(
        (payment) => new Date(payment.effectiveDate) <= new Date(filters.endDate!)
      );
    }

    if (filters.minAmount !== undefined) {
      filteredPayments = filteredPayments.filter(
        (payment) => payment.amount >= filters.minAmount!
      );
    }

    if (filters.maxAmount !== undefined) {
      filteredPayments = filteredPayments.filter(
        (payment) => payment.amount <= filters.maxAmount!
      );
    }

    // Handle search term separately from filters
    const searchTerm = url.searchParams.get('searchTerm');
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredPayments = filteredPayments.filter(
        (payment) =>
          payment.payeeName.toLowerCase().includes(term) ||
          payment.clientName.toLowerCase().includes(term) ||
          payment.id.toLowerCase().includes(term)
      );
    }

    // Sort by effectiveDate by default
    filteredPayments.sort(
      (a, b) => new Date(a.effectiveDate).getTime() - new Date(b.effectiveDate).getTime()
    );

    return new Response(
      JSON.stringify({
        success: true,
        data: filteredPayments,
      }),
      { status: 200 }
    );
  }),

  http.post('/api/pending-payments', async ({ request }) => {
    const payment = (await request.json()) as Omit<
      PendingPayment,
      'id' | 'createdAt' | 'updatedAt' | 'status'
    >;

    const newPayment: PendingPayment = {
      ...payment,
      id: `pmt_${Date.now()}`,
      status: PaymentStatus.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockPendingPayments.push(newPayment);

    return new Response(
      JSON.stringify({
        success: true,
        data: newPayment,
      }),
      { status: 200 }
    );
  }),
];

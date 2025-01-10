import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PendingPayments from '../PendingPayments';
import { pendingPaymentsApi } from '../../../../services/api/pending-payments.api';
import {
  PaymentStatus,
  PaymentMethod,
  Priority,
  PendingPayment,
  PendingPaymentSummary,
  PendingPaymentListResponse
} from '../../../../types/bill-pay.types';
import { ApiSuccessResponse } from '../../../../types/api.types';

jest.mock('../../../../services/api/pending-payments.api');
jest.mock('../../../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: 'test-user', name: 'Test User' }
  })
}));

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    {children}
  </LocalizationProvider>
);

describe('PendingPayments Component', () => {
  const mockPendingPayments: PendingPayment[] = [
    {
      id: '1',
      clientId: 'client-1',
      clientName: 'Test Client',
      payeeId: 'payee-1',
      payeeName: 'Test Payee',
      amount: 1000,
      currency: 'USD',
      method: PaymentMethod.ACH,
      status: PaymentStatus.PENDING,
      effectiveDate: '2024-01-01',
      description: 'Test payment',
      priority: Priority.MEDIUM,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      recipient: {
        name: 'Test Bank',
        accountNumber: '123456789',
        routingNumber: '987654321',
        bankName: 'Test Bank'
      }
    }
  ];

  const mockMeta = {
    timestamp: '2024-01-01T00:00:00Z',
    requestId: 'test-request-id'
  };

  const mockSummary: PendingPaymentSummary = {
    totalAmount: 1000,
    byMethod: {
      [PaymentMethod.ACH]: { count: 1, amount: 1000 },
      [PaymentMethod.WIRE]: { count: 0, amount: 0 },
      [PaymentMethod.CHECK]: { count: 0, amount: 0 },
      [PaymentMethod.CARD]: { count: 0, amount: 0 },
      [PaymentMethod.RTP]: { count: 0, amount: 0 }
    },
    byStatus: {
      [PaymentStatus.PENDING]: 1,
      [PaymentStatus.APPROVED]: 0,
      [PaymentStatus.REJECTED]: 0,
      [PaymentStatus.PROCESSING]: 0,
      [PaymentStatus.COMPLETED]: 0,
      [PaymentStatus.FAILED]: 0,
      [PaymentStatus.CANCELLED]: 0,
      [PaymentStatus.EXPIRED]: 0,
      [PaymentStatus.PENDING_APPROVAL]: 0,
      [PaymentStatus.DRAFT]: 0,
      [PaymentStatus.SUBMITTED]: 0,
      [PaymentStatus.SCHEDULED]: 0,
      [PaymentStatus.RETURNED]: 0,
      [PaymentStatus.STOP_PAYMENT]: 0,
      [PaymentStatus.REVERSED]: 0,
      [PaymentStatus.REFUNDED]: 0,
      [PaymentStatus.RESENT]: 0,
      [PaymentStatus.REINITIATED]: 0,
      [PaymentStatus.PENDING_REVERSAL]: 0,
      [PaymentStatus.PENDING_REFUND]: 0,
      [PaymentStatus.PENDING_RETURN]: 0,
      [PaymentStatus.PENDING_STOP_PAYMENT]: 0,
      [PaymentStatus.PENDING_RESEND]: 0,
      [PaymentStatus.PENDING_REINITIATE]: 0
    },
    byPriority: {
      [Priority.HIGH]: 0,
      [Priority.MEDIUM]: 1,
      [Priority.LOW]: 0
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (pendingPaymentsApi.fetchPayments as jest.Mock).mockResolvedValue({
      success: true,
      data: {
        data: mockPendingPayments,
        total: 1,
        page: 1,
        limit: 10
      },
      meta: mockMeta
    } as ApiSuccessResponse<PendingPaymentListResponse>);

    (pendingPaymentsApi.getSummary as jest.Mock).mockResolvedValue({
      success: true,
      data: mockSummary,
      meta: mockMeta
    } as ApiSuccessResponse<PendingPaymentSummary>);

    (pendingPaymentsApi.bulkApprove as jest.Mock).mockResolvedValue({
      success: true,
      data: [{ id: '1', success: true }],
      meta: mockMeta
    });

    (pendingPaymentsApi.bulkReject as jest.Mock).mockResolvedValue({
      success: true,
      data: [{ id: '1', success: true }],
      meta: mockMeta
    });
  });

  it('renders the component and fetches pending payments', async () => {
    await act(async () => {
      render(<PendingPayments />, { wrapper: TestWrapper });
    });

    await waitFor(() => {
      expect(screen.getByText('Test Bank')).toBeInTheDocument();
      expect(screen.getByText('$1,000.00')).toBeInTheDocument();
    });

    expect(pendingPaymentsApi.fetchPayments).toHaveBeenCalledWith(expect.objectContaining({
      page: 1,
      limit: 10,
      status: PaymentStatus.PENDING
    }));
  });

  it('handles payment approval', async () => {
    (pendingPaymentsApi.approvePayment as jest.Mock).mockResolvedValue({
      success: true,
      data: { ...mockPendingPayments[0], status: PaymentStatus.APPROVED },
      meta: mockMeta
    });

    await act(async () => {
      render(<PendingPayments />, { wrapper: TestWrapper });
    });

    await waitFor(() => {
      expect(screen.getByText('Test Bank')).toBeInTheDocument();
    });

    const approveButton = screen.getByRole('button', { name: /approve/i });
    await act(async () => {
      fireEvent.click(approveButton);
    });

    await waitFor(() => {
      expect(pendingPaymentsApi.approvePayment).toHaveBeenCalledWith('1', {
        approvedBy: 'test-user',
        approvedAt: expect.any(String)
      });
    });
  });

  it('handles payment rejection', async () => {
    (pendingPaymentsApi.rejectPayment as jest.Mock).mockResolvedValue({
      success: true,
      data: { ...mockPendingPayments[0], status: PaymentStatus.REJECTED },
      meta: mockMeta
    });

    await act(async () => {
      render(<PendingPayments />, { wrapper: TestWrapper });
    });

    await waitFor(() => {
      expect(screen.getByText('Test Bank')).toBeInTheDocument();
    });

    const rejectButton = screen.getByRole('button', { name: /reject/i });
    await act(async () => {
      fireEvent.click(rejectButton);
    });

    await waitFor(() => {
      expect(pendingPaymentsApi.rejectPayment).toHaveBeenCalledWith('1', {
        rejectedBy: 'test-user',
        rejectedAt: expect.any(String),
        reason: expect.any(String)
      });
    });
  });

  it('handles bulk approval', async () => {
    await act(async () => {
      render(<PendingPayments />, { wrapper: TestWrapper });
    });

    await waitFor(() => {
      expect(screen.getByText('Test Bank')).toBeInTheDocument();
    });

    const checkbox = screen.getByRole('checkbox', { name: /select payment/i });
    await act(async () => {
      fireEvent.click(checkbox);
    });

    const bulkApproveButton = screen.getByRole('button', { name: /bulk approve/i });
    await act(async () => {
      fireEvent.click(bulkApproveButton);
    });

    await waitFor(() => {
      expect(pendingPaymentsApi.bulkApprove).toHaveBeenCalledWith(['1'], {
        approvedBy: 'test-user',
        approvedAt: expect.any(String)
      });
    });
  });

  it('handles bulk rejection', async () => {
    await act(async () => {
      render(<PendingPayments />, { wrapper: TestWrapper });
    });

    await waitFor(() => {
      expect(screen.getByText('Test Bank')).toBeInTheDocument();
    });

    const checkbox = screen.getByRole('checkbox', { name: /select payment/i });
    await act(async () => {
      fireEvent.click(checkbox);
    });

    const bulkRejectButton = screen.getByRole('button', { name: /bulk reject/i });
    await act(async () => {
      fireEvent.click(bulkRejectButton);
    });

    await waitFor(() => {
      expect(pendingPaymentsApi.bulkReject).toHaveBeenCalledWith(['1'], {
        rejectedBy: 'test-user',
        rejectedAt: expect.any(String),
        reason: expect.any(String)
      });
    });
  });
});

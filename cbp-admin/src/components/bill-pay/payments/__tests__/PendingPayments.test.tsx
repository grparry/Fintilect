import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PendingPayments from '../PendingPayments';
import { pendingPaymentsApi } from '../../../../services/api/pending-payments.api';
import { PaymentStatus, PaymentMethod, Priority } from '../../../../types/bill-pay.types';

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
  const mockPendingPayments = [
    {
      id: '1',
      userId: 'test-user',
      method: PaymentMethod.ACH,
      status: PaymentStatus.PENDING,
      amount: 1000,
      currency: 'USD',
      effectiveDate: '2024-01-01',
      dueDate: '2024-01-05',
      priority: Priority.HIGH,
      clientId: 'client-1',
      clientName: 'Test Client',
      payeeId: 'payee-1',
      payeeName: 'Test Payee',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (pendingPaymentsApi.fetchPayments as jest.Mock).mockResolvedValue({
      success: true,
      data: {
        data: mockPendingPayments,
        total: 1,
        page: 1,
        limit: 10
      }
    });
    (pendingPaymentsApi.getSummary as jest.Mock).mockResolvedValue({
      success: true,
      data: {
        totalCount: 1,
        totalAmount: 1000,
        pendingCount: 1,
        pendingAmount: 1000,
        approvedCount: 0,
        approvedAmount: 0,
        rejectedCount: 0,
        rejectedAmount: 0
      }
    });
    (pendingPaymentsApi.bulkApprove as jest.Mock).mockResolvedValue({
      success: true,
      data: { message: 'Payments approved' }
    });
    (pendingPaymentsApi.bulkReject as jest.Mock).mockResolvedValue({
      success: true,
      data: { message: 'Payments rejected' }
    });
  });

  it('renders the component and fetches pending payments', async () => {
    await act(async () => {
      render(<PendingPayments />, { wrapper: TestWrapper });
    });

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('Test Client')).toBeInTheDocument();
      expect(screen.getByText('Test Payee')).toBeInTheDocument();
      expect(screen.getByText('$1,000.00')).toBeInTheDocument();
    });

    expect(pendingPaymentsApi.fetchPayments).toHaveBeenCalledWith(expect.objectContaining({
      page: 1,
      limit: 10
    }));
  });

  it('handles payment approval', async () => {
    (pendingPaymentsApi.approvePayment as jest.Mock).mockResolvedValue({
      success: true,
      data: { message: 'Payment approved' }
    });

    await act(async () => {
      render(<PendingPayments />, { wrapper: TestWrapper });
    });

    // Wait for loading to complete and find the approve button
    await waitFor(() => {
      expect(screen.getByText('Test Client')).toBeInTheDocument();
    });

    const approveButton = screen.getByRole('button', { name: 'Approve' });
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
      data: { message: 'Payment rejected' }
    });

    await act(async () => {
      render(<PendingPayments />, { wrapper: TestWrapper });
    });

    // Wait for loading to complete and find the reject button
    await waitFor(() => {
      expect(screen.getByText('Test Client')).toBeInTheDocument();
    });

    const rejectButton = screen.getByRole('button', { name: 'Reject' });
    await act(async () => {
      fireEvent.click(rejectButton);
    });

    await waitFor(() => {
      expect(pendingPaymentsApi.rejectPayment).toHaveBeenCalledWith('1', {
        rejectedBy: 'test-user',
        rejectedAt: expect.any(String),
        reason: 'Rejected by admin'
      });
    });
  });

  it('handles bulk approval', async () => {
    await act(async () => {
      render(<PendingPayments />, { wrapper: TestWrapper });
    });

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('Test Client')).toBeInTheDocument();
    });

    // Select the payment
    const checkbox = screen.getByRole('checkbox', { name: 'Select payment' });
    await act(async () => {
      fireEvent.click(checkbox);
    });

    // Click bulk approve button
    const bulkApproveButton = screen.getByRole('button', { name: 'Bulk approve selected payments' });
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

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('Test Client')).toBeInTheDocument();
    });

    // Select the payment
    const checkbox = screen.getByRole('checkbox', { name: 'Select payment' });
    await act(async () => {
      fireEvent.click(checkbox);
    });

    // Click bulk reject button
    const bulkRejectButton = screen.getByRole('button', { name: 'Bulk reject selected payments' });
    await act(async () => {
      fireEvent.click(bulkRejectButton);
    });

    await waitFor(() => {
      expect(pendingPaymentsApi.bulkReject).toHaveBeenCalledWith(['1'], {
        rejectedBy: 'test-user',
        rejectedAt: expect.any(String),
        reason: 'Bulk rejection'
      });
    });
  });

  it('filters payments by search term', async () => {
    await act(async () => {
      render(<PendingPayments />, { wrapper: TestWrapper });
    });

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('Test Client')).toBeInTheDocument();
    });

    // Enter search term
    const searchInput = screen.getByRole('textbox', { name: 'Search' });
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'Test Client' } });
    });

    // Verify filtered results
    expect(screen.getByText('Test Client')).toBeInTheDocument();
    expect(screen.getByText('$1,000.00')).toBeInTheDocument();
  });
});

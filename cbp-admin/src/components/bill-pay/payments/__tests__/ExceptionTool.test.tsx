import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ExceptionTool from '../ExceptionTool';
import { paymentApi } from '../../../../services/api/payment.api';
import { PaymentException, ExceptionStatus, Priority } from '../../../../types/bill-pay.types';

jest.mock('../../../../services/api/payment.api');
jest.mock('../../../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: 'test-user', name: 'Test User' }
  })
}));

describe('ExceptionTool Component', () => {
  const mockExceptions = [
    {
      id: '1',
      paymentId: 'payment-1',
      type: 'VALIDATION',
      status: 'PENDING',
      description: 'Invalid account number',
      createdAt: '2024-01-01T00:00:00Z'
    }
  ];

  const mockApi = {
    getPaymentExceptions: jest.fn().mockResolvedValue(mockExceptions),
    resolvePaymentException: jest.fn().mockResolvedValue({ success: true, message: 'Exception resolved' }),
    retryPaymentException: jest.fn().mockResolvedValue({ success: true, message: 'Exception retried' })
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component and fetches exceptions', async () => {
    render(<ExceptionTool api={mockApi} onClose={mockOnClose} />);

    expect(screen.getByText('Payment Exceptions')).toBeInTheDocument();
    await waitFor(() => {
      expect(mockApi.getPaymentExceptions).toHaveBeenCalled();
      expect(screen.getByText('Invalid account number')).toBeInTheDocument();
    });
  });

  it('handles exception resolution', async () => {
    render(<ExceptionTool api={mockApi} onClose={mockOnClose} />);

    await waitFor(() => {
      const resolveButton = screen.getByText(/resolve/i);
      fireEvent.click(resolveButton);
    });

    const resolutionInput = screen.getByLabelText(/resolution notes/i);
    fireEvent.change(resolutionInput, { target: { value: 'Fixed account number' } });

    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockApi.resolvePaymentException).toHaveBeenCalledWith('1', {
        type: 'manual',
        notes: 'Fixed account number'
      });
    });
  });

  it('handles exception retry', async () => {
    render(<ExceptionTool api={mockApi} onClose={mockOnClose} />);

    await waitFor(() => {
      const retryButton = screen.getByText(/retry/i);
      fireEvent.click(retryButton);
    });

    await waitFor(() => {
      expect(mockApi.retryPaymentException).toHaveBeenCalledWith('1');
      expect(screen.getByText('Exception retried')).toBeInTheDocument();
    });
  });
});

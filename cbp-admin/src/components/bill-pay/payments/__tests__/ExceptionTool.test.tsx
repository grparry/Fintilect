import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ExceptionTool from '../ExceptionTool';
import { PaymentException, ExceptionStatus, ExceptionResolution } from '../../../../types/bill-pay.types';
import { ApiSuccessResponse } from '../../../../types/api.types';

jest.mock('../../../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: 'test-user', name: 'Test User' }
  })
}));

describe('ExceptionTool Component', () => {
  const mockExceptions: PaymentException[] = [
    {
      id: '1',
      paymentId: 'payment-1',
      type: 'VALIDATION',
      status: ExceptionStatus.PENDING,
      message: 'Invalid account number',
      details: { accountNumber: '123456789' },
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  ];

  const mockApi = {
    getExceptions: jest.fn().mockResolvedValue({
      success: true,
      data: mockExceptions,
      message: 'Exceptions retrieved successfully'
    } as ApiSuccessResponse<PaymentException[]>),
    resolveException: jest.fn().mockResolvedValue({
      success: true,
      data: undefined,
      message: 'Exception resolved'
    } as ApiSuccessResponse<void>),
    retryException: jest.fn().mockResolvedValue({
      success: true,
      data: undefined,
      message: 'Exception retried'
    } as ApiSuccessResponse<void>)
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component and fetches exceptions', async () => {
    render(<ExceptionTool api={mockApi} onClose={mockOnClose} />);

    expect(screen.getByText('Exception Tool')).toBeInTheDocument();
    await waitFor(() => {
      expect(mockApi.getExceptions).toHaveBeenCalled();
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

    const expectedResolution: ExceptionResolution = {
      type: 'manual',
      action: 'retry',
      notes: 'Fixed account number',
      userId: 'test-user',
      timestamp: expect.any(String)
    };

    await waitFor(() => {
      expect(mockApi.resolveException).toHaveBeenCalledWith('1', expectedResolution);
    });
  });

  it('handles exception retry', async () => {
    render(<ExceptionTool api={mockApi} onClose={mockOnClose} />);

    await waitFor(() => {
      const retryButton = screen.getByText(/retry/i);
      fireEvent.click(retryButton);
    });

    await waitFor(() => {
      expect(mockApi.retryException).toHaveBeenCalledWith('1');
      expect(screen.getByText('Exception retried')).toBeInTheDocument();
    });
  });
});

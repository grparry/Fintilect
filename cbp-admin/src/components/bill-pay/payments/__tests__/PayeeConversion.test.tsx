import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import PayeeConversion from '../PayeeConversion';
import { paymentApi } from '../../../../services/api/payment.api';

// Mock the API
jest.mock('../../../../services/api/payment.api');
jest.mock('../../../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: 'test-user', name: 'Test User' }
  })
}));

describe('PayeeConversion Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component and fetches files', async () => {
    (paymentApi.getPayeeConversionFiles as jest.Mock).mockResolvedValue({
      success: true,
      data: [
        {
          id: 'file_001',
          name: 'payees_batch1.csv',
          status: 'PENDING',
          createdAt: '2024-12-28T17:02:57-07:00',
          validation: {
            totalRecords: 100,
            validRecords: 0,
            invalidRecords: 0,
            errors: [],
            warnings: []
          }
        }
      ]
    });

    await act(async () => {
      render(<PayeeConversion />);
    });

    expect(screen.getByText('Payee Conversion')).toBeInTheDocument();
    await waitFor(() => {
      expect(paymentApi.getPayeeConversionFiles).toHaveBeenCalled();
      expect(screen.getByText('payees_batch1.csv')).toBeInTheDocument();
    });
  });

  it('handles file upload', async () => {
    const mockFile = new File(['test'], 'test.csv', { type: 'text/csv' });
    (paymentApi.uploadPayeeConversionFile as jest.Mock).mockResolvedValue({
      success: true,
      data: {
        id: 'test-file',
        name: 'test.csv',
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        validation: {
          totalRecords: 10,
          validRecords: 0,
          invalidRecords: 0,
          errors: [],
          warnings: []
        }
      }
    });

    (paymentApi.getPayeeConversionFiles as jest.Mock).mockResolvedValue({
      success: true,
      data: []
    });

    await act(async () => {
      render(<PayeeConversion />);
    });

    const input = screen.getByLabelText('Upload File');
    await act(async () => {
      fireEvent.change(input, { target: { files: [mockFile] } });
    });

    await waitFor(() => {
      expect(paymentApi.uploadPayeeConversionFile).toHaveBeenCalled();
      expect(screen.getByText('File Validation Results')).toBeInTheDocument();
      expect(screen.getByText('Total Records: 10')).toBeInTheDocument();
    });
  });

  it('displays validation results', async () => {
    const mockValidation = {
      totalRecords: 10,
      validRecords: 8,
      invalidRecords: 2,
      errors: [{ field: 'accountNumber', message: 'Invalid format' }],
      warnings: []
    };

    (paymentApi.getPayeeConversionFiles as jest.Mock).mockResolvedValue({
      success: true,
      data: [
        {
          id: 'file_001',
          name: 'payees_batch1.csv',
          status: 'PENDING',
          createdAt: '2024-12-28T17:02:57-07:00',
          validation: mockValidation
        }
      ]
    });

    await act(async () => {
      render(<PayeeConversion />);
    });

    await waitFor(() => {
      expect(screen.getByText('payees_batch1.csv')).toBeInTheDocument();
      expect(screen.getByText('PENDING')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    (paymentApi.getPayeeConversionFiles as jest.Mock).mockRejectedValue(
      new Error('Network error')
    );

    await act(async () => {
      render(<PayeeConversion />);
    });

    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });
  });
});

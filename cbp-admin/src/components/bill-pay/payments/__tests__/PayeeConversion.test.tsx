import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import PayeeConversion from '../PayeeConversion';
import { paymentApi } from '../../../../services/api/payment.api';
import {
  PayeeConversionFile,
  PayeeConversionValidation,
  PayeeConversionFileUploadResponse,
  PayeeConversionRecord
} from '../../../../types/bill-pay.types';
import { ApiSuccessResponse } from '../../../../types/api.types';

// Mock the API
jest.mock('../../../../services/api/payment.api');
jest.mock('../../../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: 'test-user', name: 'Test User' }
  })
}));

describe('PayeeConversion Component', () => {
  const mockMeta = {
    timestamp: '2024-01-01T00:00:00Z',
    requestId: 'test-request-id'
  };

  const mockValidation: PayeeConversionValidation = {
    valid: true,
    errors: [],
    warnings: [],
    totalRecords: 100,
    validRecords: 98,
    invalidRecords: 2
  };

  const mockFile: PayeeConversionFile = {
    id: 'file_001',
    name: 'payees_batch1.csv',
    status: 'PENDING',
    createdAt: '2024-12-28T17:02:57-07:00'
  };

  const mockUploadResponse: PayeeConversionFileUploadResponse = {
    id: 'file_001',
    name: 'test.csv',
    status: 'PENDING',
    validation: {
      totalRecords: 10,
      validRecords: 8,
      invalidRecords: 2,
      errors: [{ field: 'accountNumber', message: 'Invalid format' }],
      warnings: []
    },
    createdAt: '2024-01-01T00:00:00Z'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component and fetches files', async () => {
    (paymentApi.getPayeeConversionFiles as jest.Mock).mockResolvedValue({
      success: true,
      data: [mockFile],
      meta: mockMeta
    } as ApiSuccessResponse<PayeeConversionFile[]>);

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
      data: mockUploadResponse,
      meta: mockMeta
    } as ApiSuccessResponse<PayeeConversionFileUploadResponse>);

    (paymentApi.getPayeeConversionFiles as jest.Mock).mockResolvedValue({
      success: true,
      data: [],
      meta: mockMeta
    } as ApiSuccessResponse<PayeeConversionFile[]>);

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
    const mockFileWithValidation: PayeeConversionFile = {
      ...mockFile,
      processedAt: '2024-12-28T17:03:57-07:00',
      status: 'PROCESSED'
    };

    (paymentApi.getPayeeConversionFiles as jest.Mock).mockResolvedValue({
      success: true,
      data: [mockFileWithValidation],
      meta: mockMeta
    } as ApiSuccessResponse<PayeeConversionFile[]>);

    (paymentApi.getPayeeConversionRecords as jest.Mock).mockResolvedValue({
      success: true,
      data: [{
        id: 'record_001',
        fileId: 'file_001',
        payeeName: 'Test Payee',
        status: 'PROCESSED',
        createdAt: '2024-12-28T17:02:57-07:00',
        processedAt: '2024-12-28T17:03:57-07:00'
      }],
      meta: mockMeta
    } as ApiSuccessResponse<PayeeConversionRecord[]>);

    await act(async () => {
      render(<PayeeConversion />);
    });

    await waitFor(() => {
      expect(screen.getByText('payees_batch1.csv')).toBeInTheDocument();
      expect(screen.getByText('PROCESSED')).toBeInTheDocument();
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

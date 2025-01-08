import { manualPaymentsService } from '../manual-payments.service';
import api from '../api';
import { ApiPaginatedResponse, PaymentApiResponse, ApiSuccessResponse } from '../../types/api.types';
import { Client, ManualPayment, ManualPaymentValidation } from '../../types/bill-pay.types';

// Mock the api module
jest.mock('../api');
const mockedApi = api as jest.Mocked<typeof api>;

describe('ManualPaymentsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Happy path tests
  describe('fetchClients', () => {
    it('should fetch paginated clients successfully', async () => {
      const mockData: ApiPaginatedResponse<Client[]> = {
        success: true,
        data: [
          {
            id: '1',
            name: 'Client 1',
            status: 'active',
            createdAt: '2025-01-08T12:00:00Z',
            updatedAt: '2025-01-08T12:00:00Z',
          },
          {
            id: '2',
            name: 'Client 2',
            status: 'active',
            createdAt: '2025-01-08T12:00:00Z',
            updatedAt: '2025-01-08T12:00:00Z',
          },
        ],
        meta: {
          currentPage: 1,
          totalPages: 1,
          pageSize: 10,
          totalCount: 2,
          hasNextPage: false,
          hasPreviousPage: false,
          timestamp: '2025-01-08T12:00:00Z',
          requestId: 'test-request-1',
        },
      };

      const mockResponse: ApiSuccessResponse<ApiPaginatedResponse<Client[]>> = {
        success: true,
        data: mockData,
      };

      mockedApi.get.mockResolvedValueOnce(mockResponse);

      const result = await manualPaymentsService.fetchClients({ 
        status: 'active',
        search: '',
        environment: 'production'
      });

      expect(mockedApi.get).toHaveBeenCalledWith('/api/v2/clients', {
        params: { status: 'active', search: '', environment: 'production' },
      });
      expect(result).toEqual(mockResponse.data.data);
    });
  });

  describe('validatePayment', () => {
    it('should validate payment successfully', async () => {
      const mockPaymentInput = {
        clientId: '1',
        payeeId: '1',
        amount: 100,
        paymentType: 'ACH' as const,
        effectiveDate: '2025-01-10',
        accountNumber: '123456789',
        routingNumber: '987654321',
        bankName: 'Test Bank',
        updatedAt: '2025-01-08T12:00:00Z',
      };

      const mockValidation: ManualPaymentValidation = {
        valid: true,
        errors: [],
      };

      const mockResponse: ApiSuccessResponse<PaymentApiResponse<ManualPaymentValidation>> = {
        success: true,
        data: {
          success: true,
          data: mockValidation,
        },
      };

      mockedApi.post.mockResolvedValueOnce(mockResponse);

      const result = await manualPaymentsService.validatePayment(mockPaymentInput);

      expect(mockedApi.post).toHaveBeenCalledWith(
        '/api/v2/payments/manual/validate',
        mockPaymentInput
      );
      expect(result).toEqual(mockValidation);
    });

    it('should handle validation error', async () => {
      const mockPaymentInput = {
        clientId: '1',
        payeeId: '1',
        amount: -100, // Invalid amount
        paymentType: 'ACH' as const,
        effectiveDate: '2025-01-10',
        accountNumber: '123456789',
        routingNumber: '987654321',
        bankName: 'Test Bank',
        updatedAt: '2025-01-08T12:00:00Z',
      };

      const errorMessage = 'Amount must be positive';
      mockedApi.post.mockRejectedValueOnce({
        response: {
          data: {
            code: 'VALIDATION_ERROR',
            message: errorMessage,
          },
        },
      });

      await expect(manualPaymentsService.validatePayment(mockPaymentInput)).rejects.toThrow(
        errorMessage
      );
    });
  });

  describe('validateBankDetails', () => {
    it('should validate bank details successfully', async () => {
      const mockValidation = {
        valid: true,
        bankName: 'Test Bank',
      };

      const mockResponse: ApiSuccessResponse<PaymentApiResponse<typeof mockValidation>> = {
        success: true,
        data: {
          success: true,
          data: mockValidation,
        },
      };

      mockedApi.post.mockResolvedValueOnce(mockResponse);

      const result = await manualPaymentsService.validateBankDetails(
        '123456789',
        '987654321'
      );

      expect(mockedApi.post).toHaveBeenCalledWith('/api/v2/payments/manual/validate-bank', {
        routingNumber: '123456789',
        accountNumber: '987654321',
      });
      expect(result).toEqual(mockValidation);
    });

    it('should handle invalid bank details', async () => {
      mockedApi.post.mockRejectedValueOnce({
        response: {
          data: {
            code: 'INVALID_BANK_DETAILS',
            message: 'Invalid routing number',
          },
        },
      });

      const result = await manualPaymentsService.validateBankDetails(
        'invalid',
        '987654321'
      );

      expect(result).toEqual({
        valid: false,
        error: 'Invalid routing number',
      });
    });
  });

  // Pagination test
  describe('fetchDrafts', () => {
    it('should fetch paginated draft payments', async () => {
      const mockData: ApiPaginatedResponse<ManualPayment[]> = {
        success: true,
        data: [
          {
            id: '1',
            clientId: '1',
            payeeId: '1',
            amount: 100,
            status: 'Draft',
            paymentType: 'ACH',
            effectiveDate: '2025-01-10',
            accountNumber: '123456789',
            routingNumber: '987654321',
            bankName: 'Test Bank',
            createdAt: '2025-01-08T12:00:00Z',
            updatedAt: '2025-01-08T12:00:00Z',
          },
        ],
        meta: {
          currentPage: 1,
          totalPages: 1,
          pageSize: 10,
          totalCount: 1,
          hasNextPage: false,
          hasPreviousPage: false,
          timestamp: '2025-01-08T12:00:00Z',
          requestId: 'test-request-2',
        },
      };

      const mockResponse: ApiSuccessResponse<ApiPaginatedResponse<ManualPayment[]>> = {
        success: true,
        data: mockData,
      };

      mockedApi.get.mockResolvedValueOnce(mockResponse);

      const result = await manualPaymentsService.fetchDrafts({});

      expect(mockedApi.get).toHaveBeenCalledWith('/api/v2/payments/manual/drafts', {
        params: {},
      });
      expect(result).toEqual(mockResponse.data.data);
    });
  });

  // Critical error case
  describe('submitPayment', () => {
    it('should handle payment submission error', async () => {
      const mockPaymentInput = {
        clientId: '1',
        payeeId: '1',
        amount: 100,
        paymentType: 'ACH' as const,
        effectiveDate: '2025-01-10',
        accountNumber: '123456789',
        routingNumber: '987654321',
        bankName: 'Test Bank',
        updatedAt: '2025-01-08T12:00:00Z',
      };

      const errorMessage = 'Daily limit exceeded';
      mockedApi.post.mockRejectedValueOnce({
        response: {
          data: {
            code: 'PAYMENT_SUBMISSION_ERROR',
            message: errorMessage,
          },
        },
      });

      await expect(manualPaymentsService.submitPayment(mockPaymentInput)).rejects.toThrow(
        errorMessage
      );
    });
  });
});

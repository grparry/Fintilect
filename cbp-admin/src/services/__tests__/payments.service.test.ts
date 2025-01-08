import { paymentsService } from '../payments.service';
import api from '../api';
import { Payment, PaymentStatus, PaymentMethod, Priority } from '../../types/bill-pay.types';

jest.mock('../api');

describe('PaymentsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchPayments', () => {
    it('should fetch paginated payments successfully', async () => {
      const mockPayments: Payment[] = [
        {
          id: '1',
          clientId: 'client1',
          clientName: 'Test Client',
          payeeId: 'payee1',
          payeeName: 'Test Payee',
          amount: 100,
          currency: 'USD',
          method: PaymentMethod.ACH,
          status: PaymentStatus.PENDING,
          effectiveDate: '2025-01-07',
          priority: Priority.MEDIUM,
          createdAt: '2025-01-07T00:00:00Z',
          updatedAt: '2025-01-07T00:00:00Z'
        },
        {
          id: '2',
          clientId: 'client1',
          clientName: 'Test Client',
          payeeId: 'payee2',
          payeeName: 'Test Payee 2',
          amount: 200,
          currency: 'USD',
          method: PaymentMethod.ACH,
          status: PaymentStatus.COMPLETED,
          effectiveDate: '2025-01-07',
          priority: Priority.MEDIUM,
          createdAt: '2025-01-07T00:00:00Z',
          updatedAt: '2025-01-07T00:00:00Z'
        }
      ];

      const mockResponse = {
        data: mockPayments,
        meta: {
          totalCount: 2,
          currentPage: 1,
          totalPages: 1,
          pageSize: 10,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };

      (api.getPaginated as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await paymentsService.fetchPayments({
        page: 1,
        pageSize: 10,
      });

      expect(api.getPaginated).toHaveBeenCalledWith('/api/payments', {
        params: {
          page: 1,
          pageSize: 10,
          sortBy: undefined,
          sortDirection: undefined,
        },
      });

      expect(result).toEqual({
        payments: mockPayments,
        meta: mockResponse.meta,
      });
    });
  });
});

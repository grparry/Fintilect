import { PaymentService } from '../../services/payment.service';
import { MockDatabase } from '../mocks/mockDb';
import { HttpError } from '../../middleware/error.middleware';

describe('PaymentService', () => {
  let service: PaymentService;
  let mockDb: MockDatabase;
  
  beforeEach(() => {
    mockDb = new MockDatabase();
    service = new PaymentService();
    (service as any).repository = mockDb;
  });

  afterEach(() => {
    mockDb.reset();
  });

  describe('listPayments', () => {
    it('should return paginated payments', async () => {
      const result = await service.listPayments({
        page: 1,
        limit: 10
      });

      expect(result.data).toHaveLength(2);
      expect(result.data[0]).toEqual(expect.objectContaining({
        id: '1',
        amount: 100.00,
        status: 'PENDING'
      }));
    });

    it('should filter by date range', async () => {
      const result = await service.listPayments({
        page: 1,
        limit: 10,
        startDate: '2025-01-15',
        endDate: '2025-01-31'
      });

      expect(result.data).toHaveLength(2);
      expect(result.data.every(payment => 
        new Date(payment.paymentDate) >= new Date('2025-01-15') &&
        new Date(payment.paymentDate) <= new Date('2025-01-31')
      )).toBe(true);
    });
  });

  describe('getPaymentDetails', () => {
    it('should return payment details', async () => {
      const result = await service.getPaymentDetails('1');

      expect(result).toEqual(expect.objectContaining({
        id: '1',
        amount: 100.00,
        status: 'PENDING',
        payeeId: '1'
      }));
    });

    it('should throw 404 when payment not found', async () => {
      await expect(service.getPaymentDetails('999'))
        .rejects.toThrow(new HttpError(404, 'Payment not found'));
    });
  });

  // Note: We're not testing write operations as they're not implemented in the mock
  describe('createPayment', () => {
    it('should validate payment data', async () => {
      const invalidData = {
        amount: -100,
        payeeId: '1',
        paymentDate: '2025-01-15'
      };

      await expect(service.createPayment(invalidData))
        .rejects.toThrow(HttpError);
    });
  });
});

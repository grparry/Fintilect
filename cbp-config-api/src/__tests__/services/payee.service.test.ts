import { PayeeService } from '../../services/payee.service';
import { MockDatabase } from '../mocks/mockDb';
import { HttpError } from '../../middleware/error.middleware';

describe('PayeeService', () => {
  let service: PayeeService;
  let mockDb: MockDatabase;
  
  beforeEach(() => {
    mockDb = new MockDatabase();
    service = new PayeeService();
    (service as any).repository = mockDb;
  });

  afterEach(() => {
    mockDb.reset();
  });

  describe('listPayees', () => {
    it('should return paginated payees', async () => {
      const result = await service.listPayees({
        page: 1,
        limit: 10
      });

      expect(result.data).toHaveLength(2);
      expect(result.data[0]).toEqual(expect.objectContaining({
        id: '1',
        name: 'Test Payee 1',
        status: 'ACTIVE'
      }));
    });

    it('should mask sensitive data', async () => {
      const result = await service.listPayees({
        page: 1,
        limit: 10
      });

      expect(result.data[0].accountNumber).toMatch(/^\*+\d{4}$/);
      expect(result.data[1].accountNumber).toMatch(/^\*+\d{4}$/);
    });
  });

  describe('getPayeeDetails', () => {
    it('should return payee details', async () => {
      const result = await service.getPayeeDetails('1');

      expect(result).toEqual(expect.objectContaining({
        id: '1',
        name: 'Test Payee 1',
        status: 'ACTIVE',
        paymentMethods: ['ACH', 'CHECK']
      }));
    });

    it('should throw 404 when payee not found', async () => {
      await expect(service.getPayeeDetails('999'))
        .rejects.toThrow(new HttpError(404, 'Payee not found'));
    });

    it('should mask sensitive data', async () => {
      const result = await service.getPayeeDetails('1');
      expect(result.accountNumber).toMatch(/^\*+\d{4}$/);
    });
  });

  // Note: We're not testing write operations as they're not implemented in the mock
  describe('input validation', () => {
    describe('validatePayeeData', () => {
      it('should validate routing number format', () => {
        const invalidData = {
          name: 'Test Payee',
          accountNumber: '1234567890',
          routingNumber: '123', // Invalid routing number
          paymentMethods: ['ACH']
        };

        expect(() => (service as any).validatePayeeData(invalidData))
          .toThrow(HttpError);
      });

      it('should validate required payment methods', () => {
        const invalidData = {
          name: 'Test Payee',
          accountNumber: '1234567890',
          routingNumber: '987654321',
          paymentMethods: [] // Empty payment methods
        };

        expect(() => (service as any).validatePayeeData(invalidData))
          .toThrow(HttpError);
      });

      it('should validate address fields', () => {
        const invalidData = {
          name: 'Test Payee',
          accountNumber: '1234567890',
          routingNumber: '987654321',
          paymentMethods: ['ACH'],
          address: '',
          city: '',
          state: '',
          zipCode: '123' // Invalid zip code
        };

        expect(() => (service as any).validatePayeeData(invalidData))
          .toThrow(HttpError);
      });
    });
  });
});

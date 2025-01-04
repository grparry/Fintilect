import { UserService } from '../../services/user.service';
import { MockDatabase } from '../mocks/mockDb';
import { HttpError } from '../../middleware/error.middleware';

describe('UserService', () => {
  let service: UserService;
  let mockDb: MockDatabase;
  
  beforeEach(() => {
    mockDb = new MockDatabase();
    service = new UserService();
    (service as any).repository = mockDb;
  });

  afterEach(() => {
    mockDb.reset();
  });

  describe('getPayeeOptions', () => {
    it('should return user payee options', async () => {
      const result = await service.getPayeeOptions('1', '1');

      expect(result).toEqual(expect.objectContaining({
        defaultPaymentMethod: 'ACH',
        allowedPaymentMethods: ['ACH', 'CHECK'],
        paymentLimits: {
          daily: 1000,
          weekly: 5000,
          monthly: 20000
        }
      }));
    });

    it('should throw 404 when options not found', async () => {
      await expect(service.getPayeeOptions('999', '1'))
        .rejects.toThrow(new HttpError(404, 'Payee options not found'));
    });
  });

  describe('getHostInfo', () => {
    it('should return host information', async () => {
      const result = await service.getHostInfo('1');

      expect(result).toEqual(expect.objectContaining({
        id: '1',
        name: 'Test Host',
        connectionStatus: 'ACTIVE',
        features: ['ACH', 'WIRE']
      }));
    });

    it('should throw 404 when host info not found', async () => {
      await expect(service.getHostInfo('999'))
        .rejects.toThrow(new HttpError(404, 'Host information not found'));
    });
  });

  // Note: We're not testing write operations as they're not implemented in the mock
  describe('validatePaymentLimits', () => {
    it('should validate payment limits hierarchy', () => {
      const invalidLimits = {
        daily: 5000,
        weekly: 1000,  // Less than daily
        monthly: 20000
      };

      expect(() => (service as any).validatePaymentLimits(invalidLimits))
        .toThrow(HttpError);
    });

    it('should validate minimum limits', () => {
      const invalidLimits = {
        daily: -100,
        weekly: 5000,
        monthly: 20000
      };

      expect(() => (service as any).validatePaymentLimits(invalidLimits))
        .toThrow(HttpError);
    });

    it('should accept valid limits', () => {
      const validLimits = {
        daily: 1000,
        weekly: 5000,
        monthly: 20000
      };

      expect(() => (service as any).validatePaymentLimits(validLimits))
        .not.toThrow();
    });
  });
});

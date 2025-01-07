import { PaymentService } from '../../services/payment.service';
import { MockDatabase } from '../utils/testHelpers';
import { HttpError } from '../../utils/errors';

describe('PaymentService', () => {
  let paymentService: PaymentService;
  let mockDb: jest.Mocked<MockDatabase>;
  const testDate = new Date('2025-01-06T18:00:00-07:00');

  beforeEach(() => {
    mockDb = {
      executeProc: jest.fn(),
      executeQuery: jest.fn(),
      executeProcWithTransaction: jest.fn(),
      executeStoredProcedure: jest.fn(),
      beginTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      connect: jest.fn(),
      disconnect: jest.fn(),
      close: jest.fn()
    };
    paymentService = new PaymentService(mockDb);
  });

  describe('listPayments', () => {
    it('should list payments with pagination', async () => {
      const mockPayments = [
        {
          PaymentId: '1',
          PayeeId: '123',
          Amount: 100,
          Currency: 'USD',
          Status: 'PENDING',
          EffectiveDate: testDate,
          CreatedDate: testDate,
          CreatedBy: 'system'
        }
      ];

      mockDb.executeProc.mockResolvedValue({ recordset: mockPayments });

      const result = await paymentService.listPayments(1, 10);
      expect(result).toEqual([{
        id: '1',
        payeeId: '123',
        amount: 100,
        currency: 'USD',
        status: 'PENDING',
        effectiveDate: testDate,
        createdAt: testDate,
        createdBy: 'system',
        description: undefined,
        reference: undefined,
        updatedAt: undefined,
        updatedBy: undefined,
        clearedAt: undefined,
        reason: undefined
      }]);
      expect(mockDb.executeProc).toHaveBeenCalledWith('GetPayments', { offset: 0, pageSize: 10 });
    });

    it('should handle invalid pagination parameters', async () => {
      await expect(paymentService.listPayments(0, 10)).rejects.toThrow('Invalid page number');
      await expect(paymentService.listPayments(1, 0)).rejects.toThrow('Invalid page size');
    });
  });

  describe('getPayment', () => {
    it('should get a payment by id', async () => {
      const mockPayment = {
        PaymentId: '1',
        PayeeId: '123',
        Amount: 100,
        Currency: 'USD',
        Status: 'PENDING',
        EffectiveDate: testDate,
        CreatedDate: testDate,
        CreatedBy: 'system'
      };

      mockDb.executeProc.mockResolvedValue({ recordset: [mockPayment] });

      const result = await paymentService.getPayment('1');
      expect(result).toEqual({
        id: '1',
        payeeId: '123',
        amount: 100,
        currency: 'USD',
        status: 'PENDING',
        effectiveDate: testDate,
        createdAt: testDate,
        createdBy: 'system',
        description: undefined,
        reference: undefined,
        updatedAt: undefined,
        updatedBy: undefined,
        clearedAt: undefined,
        reason: undefined
      });
      expect(mockDb.executeProc).toHaveBeenCalledWith('GetPaymentDetails', { id: '1' });
    });

    it('should throw error if payment not found', async () => {
      mockDb.executeProc.mockResolvedValue({ recordset: [] });

      await expect(paymentService.getPayment('999')).rejects.toThrow(HttpError);
    });
  });

  describe('createPayment', () => {
    it('should create a payment', async () => {
      const paymentData = {
        payeeId: '123',
        amount: 100,
        currency: 'USD',
        effectiveDate: testDate,
        description: 'Test payment',
        reference: 'REF123'
      };

      const mockPayment = {
        PaymentId: '1',
        PayeeId: '123',
        Amount: 100,
        Currency: 'USD',
        Status: 'PENDING',
        EffectiveDate: testDate,
        Description: 'Test payment',
        Reference: 'REF123',
        CreatedDate: testDate,
        CreatedBy: 'system'
      };

      mockDb.executeProc.mockResolvedValue({ recordset: [mockPayment] });

      const result = await paymentService.createPayment(paymentData);
      expect(result).toEqual({
        id: '1',
        payeeId: '123',
        amount: 100,
        currency: 'USD',
        status: 'PENDING',
        effectiveDate: testDate,
        description: 'Test payment',
        reference: 'REF123',
        createdAt: testDate,
        createdBy: 'system',
        updatedAt: undefined,
        updatedBy: undefined,
        clearedAt: undefined,
        reason: undefined
      });
      expect(mockDb.executeProc).toHaveBeenCalledWith('InsertPayment', paymentData);
    });

    it('should throw error if creation fails', async () => {
      mockDb.executeProc.mockResolvedValue({ recordset: [] });

      const paymentData = {
        payeeId: '123',
        amount: 100,
        currency: 'USD'
      };

      await expect(paymentService.createPayment(paymentData)).rejects.toThrow(HttpError);
    });
  });

  describe('updatePayment', () => {
    it('should update a payment', async () => {
      const updateData = {
        amount: 150,
        description: 'Updated payment'
      };

      const mockPayment = {
        PaymentId: '1',
        PayeeId: '123',
        Amount: 150,
        Currency: 'USD',
        Status: 'PENDING',
        EffectiveDate: testDate,
        Description: 'Updated payment',
        CreatedDate: testDate,
        CreatedBy: 'system',
        ModifiedDate: testDate,
        ModifiedBy: 'admin'
      };

      mockDb.executeProc.mockResolvedValue({ recordset: [mockPayment] });

      const result = await paymentService.updatePayment('1', updateData);
      expect(result).toEqual({
        id: '1',
        payeeId: '123',
        amount: 150,
        currency: 'USD',
        status: 'PENDING',
        effectiveDate: testDate,
        description: 'Updated payment',
        createdAt: testDate,
        createdBy: 'system',
        updatedAt: testDate,
        updatedBy: 'admin',
        reference: undefined,
        clearedAt: undefined,
        reason: undefined
      });
      expect(mockDb.executeProc).toHaveBeenCalledWith('UpdatePaymentDetails', { id: '1', ...updateData });
    });

    it('should throw error if payment not found', async () => {
      mockDb.executeProc.mockResolvedValue({ recordset: [] });

      await expect(paymentService.updatePayment('999', { amount: 150 })).rejects.toThrow(HttpError);
    });
  });
});

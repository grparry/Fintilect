import { PaymentService } from '../../services/payment.service';
import { TestDb } from '../../config/test.db';
import { TestContext } from '../integration/context/TestContext';
import { HttpError } from '../../utils/errors';
import { PaymentTestHelper, mockPayments } from '../integration/helpers/payment.helper';

describe('PaymentService', () => {
  let paymentService: PaymentService;
  let testDb: TestDb;

  beforeEach(async () => {
    await TestContext.setup();
    testDb = TestContext.getTestDatabase();
    paymentService = new PaymentService(testDb);
    PaymentTestHelper.setupPaymentMocks(testDb);
  });

  afterEach(async () => {
    await TestContext.cleanup();
  });

  describe('listPayments', () => {
    it('should list all active payments with pagination', async () => {
      const result = await paymentService.listPayments(1, 10);
      expect(result.data).toBeDefined();
      expect(result.data).toHaveLength(2); 
      expect(result.data[0].id).toBe(mockPayments.standard.PaymentId);
      expect(result.data[1].id).toBe(mockPayments.pending.PaymentId);
      expect(result.pagination.total).toBe(2);
      TestContext.verifyMockCalls('PAYMENT', 1);
    });

    it('should handle empty results', async () => {
      testDb.setMockResponse('PAYMENT', () => ({
        recordset: [],
        recordsets: [],
        output: {},
        rowsAffected: [0]
      }));

      const result = await paymentService.listPayments(1, 10);
      expect(result.data).toHaveLength(0);
      expect(result.pagination.total).toBe(0);
      TestContext.verifyMockCalls('PAYMENT', 1);
    });

    it('should throw error for invalid page number', async () => {
      await expect(paymentService.listPayments(0, 10))
        .rejects
        .toThrow('Invalid page number');
    });

    it('should throw error for invalid page size', async () => {
      await expect(paymentService.listPayments(1, 0))
        .rejects
        .toThrow('Invalid page size');
    });
  });

  describe('getPayment', () => {
    it('should get a payment by id', async () => {
      const result = await paymentService.getPayment(mockPayments.standard.PaymentId);
      expect(result).toBeDefined();
      expect(result?.id).toBe(mockPayments.standard.PaymentId);
      expect(result?.status).toBe(mockPayments.standard.Status);
      TestContext.verifyMockCalls('PAYMENT_GET', 1);
    });

    it('should return null when payment not found', async () => {
      const result = await paymentService.getPayment('nonexistent');
      expect(result).toBeNull();
      TestContext.verifyMockCalls('PAYMENT_GET', 1);
    });

    it('should throw error for invalid payment id', async () => {
      await expect(paymentService.getPayment(''))
        .rejects
        .toThrow('Invalid payment ID');
    });
  });

  describe('createPayment', () => {
    const validPayment = {
      payeeId: 'payee-1',
      amount: 100,
      currency: 'USD',
      description: 'Test payment'
    };

    it('should create payment with valid data', async () => {
      const result = await paymentService.createPayment(validPayment);
      expect(result).toBeDefined();
      expect(result.payeeId).toBe(validPayment.payeeId);
      expect(result.amount).toBe(validPayment.amount);
      expect(result.currency).toBe(validPayment.currency);
      TestContext.verifyMockCalls('INSERT_PAYMENT', 1);
    });

    it('should throw error for invalid data', async () => {
      const invalidPayment = { ...validPayment, amount: -100 };
      await expect(paymentService.createPayment(invalidPayment))
        .rejects
        .toThrow('Invalid payment amount');
    });
  });

  describe('updatePayment', () => {
    const validUpdates = {
      amount: 200,
      description: 'Updated payment'
    };

    it('should update payment', async () => {
      const result = await paymentService.updatePayment(mockPayments.standard.PaymentId, validUpdates);
      expect(result).toBeDefined();
      expect(result.amount).toBe(validUpdates.amount);
      expect(result.description).toBe(validUpdates.description);
      TestContext.verifyMockCalls('UPDATE_PAYMENT', 1);
    });

    it('should throw error for invalid data', async () => {
      const invalidUpdates = { ...validUpdates, amount: -200 };
      await expect(paymentService.updatePayment(mockPayments.standard.PaymentId, invalidUpdates))
        .rejects
        .toThrow('Invalid payment amount');
    });

    it('should throw error when payment not found', async () => {
      await expect(paymentService.updatePayment('nonexistent', validUpdates))
        .rejects
        .toThrow('Payment not found');
    });
  });
});
